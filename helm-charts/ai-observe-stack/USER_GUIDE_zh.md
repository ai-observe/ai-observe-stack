# AIObserve Stack 使用手册

这份手册按"你想做什么"组织。第 1 到 3 节安装 DOG Stack 本体（Gateway + Doris + Grafana），其余章节配置和运维它。采集 K8s 集群是独立的 `dog-k8s-collector` chart，有[自己的手册](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/dog-k8s-collector/USER_GUIDE_zh.md)。参数的完整清单在最后一节。

1. [安装前准备](#1-安装前准备)
2. [第一次安装](#2-第一次安装)
3. [确认它在工作](#3-确认它在工作)
4. [发送数据：OTLP 与 K8s 采集器](#4-发送数据otlp-与-k8s-采集器)
5. [扩缩容与资源](#5-扩缩容与资源)
6. [数据保留与 Doris](#6-数据保留与-doris)
7. [升级、回滚、卸载](#7-升级回滚卸载)
8. [排障](#8-排障)
9. [values 完整参考](#9-values-完整参考)

---
## 1. 安装前准备

**集群。** Kubernetes 1.24+，Helm 3.8+，一个 PersistentVolume 供应器（Gateway 队列；chart 部署 Doris 时也用）。默认安装不需要任何特权；K8s 采集器 chart 需要（第 4 节）。

**你在装的是什么。** DOG Stack 是一个后端：接收 OTLP 的 Gateway、存数据的 Doris、看数据的 Grafana。它自己不采集任何东西。应用的 SDK、别的 Collector，或 `dog-k8s-collector` chart（第 4 节）往 Gateway 发。

**Doris。** 两种选择：

- 让 chart 用 Doris Operator 部署一套（`doris.mode: internal`，默认）。需要 PersistentVolume 供应器，FE / BE 各至少 4 GiB 内存。Operator 是集群级的（ClusterRole 和 webhook 名字固定），一个集群只能有一个 release 装它；同一集群的第二套 DOG Stack 要设 `doris.internal.operator.enabled: false`。
- 接入已有 Doris（`doris.mode: external`）。需要 FE 的 MySQL 端口（默认 9030）和 HTTP 端口（默认 8030）在集群内可达，账号有 `CREATE DATABASE` 权限（或者你预先建好库表，见第 6 节）。

**凭据。** 外部 Doris 的账号密码放进 Secret，不要写在 values 里：

```bash
kubectl create secret generic doris-credentials -n dog \
  --from-literal=username=otel --from-literal=password='***'
```

**一个必填项。** Doris 在哪。集群名和平台是采集器 chart 的参数，不在这个 chart 里。

---

## 2. 第一次安装

写一个 values 文件，只写要改的键，其余用默认。最小的外部 Doris 版本：

```yaml
# my-values.yaml
doris:
  mode: external
  external:
    host: doris-fe.doris.svc.cluster.local
    existingSecret: doris-credentials
  internal:
    operator:
      enabled: false        # 不装 Doris Operator
```

```bash
helm repo add ai-observe-stack https://charts.velodb.io
helm repo update
helm upgrade --install dog ai-observe-stack/ai-observe-stack -n dog --create-namespace -f my-values.yaml
```

`helm upgrade --install` 第一次跑是安装，以后跑是升级，一条命令记住即可。

**由 chart 部署 Doris** 时把 `doris` 整块删掉，默认就是 internal，加上资源大小即可（`examples/ai-observe-stack/dev.yaml` 是笔记本规格，`examples/ai-observe-stack/prod.yaml` 是三副本）。

装完 `helm` 会打印 NOTES：Gateway 的 OTLP 地址、Grafana 密码在哪、以及对着它安装 K8s 采集器的命令。

---

## 3. 确认它在工作

按顺序做四件事，每件 10 秒。

**1. Pod 都起来了。** `gateway.replicas` 个 gateway、一个 grafana，internal 模式还有 Doris FE / BE。

```bash
kubectl get pods -n dog
```

**2. 端到端测试。** 向 Gateway 发一条日志，到 Doris 里查证：

```bash
helm test dog -n dog --logs
```

看到 `Phase: Succeeded` 和 `OK: record found in Doris` 就通了。失败时输出会写明卡在发送还是查询。

**3. Gateway 日志没有 error。**

```bash
kubectl logs -n dog dog-ai-observe-stack-otel-gateway-0 | grep '"level":"error"'
```

**4. 打开 Grafana。**

```bash
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d
```

`http://localhost:3000`，用户 `admin`，密码从 Secret 取（默认 `admin`；用 `grafana.adminPassword` 或 `grafana.existingSecret` 改）。面板：chart 预置 **Logs Explorer**（先看这个）、**Kubernetes Events**、**K8s Observability**；Doris App 插件另带 **OTel Overview**、**Collector Self-Monitoring**。一有数据进来就会有内容：`helm test` 发的那条、你的 SDK，或 K8s 采集器（第 4 节）。

直接查 Doris 也行：

```sql
SELECT service_name, count(*) FROM otel.otel_logs
WHERE timestamp > now() - interval 10 minute GROUP BY 1 ORDER BY 2 DESC;
```

---

## 4. 发送数据：OTLP 与 K8s 采集器

**任何会说 OTLP 的东西**都能往 Gateway 发：集群内是 `dog-ai-observe-stack-otel-gateway.dog.svc:4317`（gRPC）或 `:4318`（HTTP），集群外用 `gateway.service.type: LoadBalancer` 或 `otel` 的 Ingress 路径（`examples/ai-observe-stack/prod.yaml`）。用 OpenTelemetry SDK 的话：

```yaml
env:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: http://dog-ai-observe-stack-otel-gateway.dog.svc:4318
  - name: OTEL_SERVICE_NAME
    value: checkout
```

`service_name` 的规则：SDK 设了 `service.name` 就用它；没设的话 Gateway 按 Deployment → StatefulSet → DaemonSet → CronJob → Job → Pod 的顺序取 K8s 工作负载名（`gateway.serviceName.deriveFromWorkload`），Kubernetes Events 取 `gateway.serviceName.kubernetesEvents`。不改代码也能指定：给 Pod 加注解 `resource.opentelemetry.io/service.name: checkout`（由下面的采集器读取）。

**采集 K8s 集群**（所有容器的日志、kubelet / 节点 / 集群指标、Kubernetes Events）是 `dog-k8s-collector` chart，每个集群装一份，指向这个 Gateway：

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # 仅当启用了 PodSecurity restricted
helm install dog-k8s-collector ai-observe-stack/dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster
```

那个 chart 的[使用手册](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/dog-k8s-collector/USER_GUIDE_zh.md)讲它采什么、日志解析规则与预设、节点本地 OTLP 入口（SDK 数据补上 Pod 元数据）、扩缩容和排障。`helm-charts/examples/dog-k8s-collector/` 有 values 示例，以及给不用 Helm 的集群准备的 `kubectl` 清单。

---

## 5. 扩缩容与资源

Gateway 和 Doris 的伸缩方式不同；Agent 和 Cluster 采集器见采集器 chart 的手册。

### Gateway（StatefulSet）

写 Doris 的吞吐由 Gateway 副本数决定，每个副本一个 PVC 存队列：

```yaml
gateway:
  replicas: 3
  resources:
    limits: {cpu: 2, memory: 2Gi}
  persistence:
    size: 20Gi
  dorisExporter:
    sendingQueue:
      numConsumers: 8        # 并发 Stream Load 数
      queueSize: 100000
      batch: {minSize: 8192, maxSize: 16384, flushTimeout: 5s}
```

什么时候该扩，看 Collector Self-Monitoring 面板：`otelcol_exporter_queue_size` 持续接近 `queueSize` 说明 Doris 写不过来，加副本或加 `numConsumers`；队列满时阻塞（`block_on_overflow`），表现为采集器侧延迟增大而不是丢数据；`otelcol_exporter_send_failed_*` 增长说明 Doris 在报错，先看 Gateway 日志。每个采集器 Pod 和一个 Gateway 副本保持一条 gRPC 连接（ClusterIP Service 按连接分流，不按请求），新副本只会接到重连的采集器；要让每个采集器分散到所有副本，在采集 chart 里设 `gateway.endpoint: dns:///<release>-ai-observe-stack-otel-gateway-headless.<命名空间>.svc:4317` 和 `gateway.balancerName: round_robin`。

`replicas` 改小时，被删副本 PVC 里未发送的队列会留在 PVC 里，等下次扩回来才发出。缩容前先看该副本队列是否为空。

### Doris（internal 模式）

```yaml
doris:
  internal:
    cluster:
      fe: {replicas: 3}
      be: {replicas: 3}
      persistence: {be: {size: 500Gi}}
```

改副本数后 Doris Operator 负责扩缩。存储按实际压缩比估：装完跑一天，用 `SHOW DATA FROM otel.otel_logs` 看一天的大小，乘以 `historyDays` 和 `replicationNum`。

---

## 6. 数据保留与 Doris

```yaml
gateway:
  dorisExporter:
    historyDays: 7             # 保留天数（Doris 动态分区自动删旧分区）
    createHistoryDays: 1       # 预建多少天的历史分区，决定能接收多旧的数据
    replicationNum: 1          # 副本数，生产至少 2
    tables: {logs: otel_logs, traces: otel_traces, metrics: otel_metrics}
```

`historyDays` 改大只影响之后的分区。表名改了之后要同步改 Grafana 面板里的 SQL。

**时间戳窗口。** 早于 `createHistoryDays` 或晚于 5 分钟的记录会被 Gateway 改成接收时间入库（原始时间在 `log_attributes['log.original_time_unix_nano']`），因为 Doris 会拒绝整批。要接收更早的数据就把 `createHistoryDays` 调大。

**低权限账号。** 默认由 Gateway 建库建表，账号要有 `CREATE DATABASE`。不想给这个权限：先用高权限账号装一次让它建好表（或者从一个已有环境 `SHOW CREATE TABLE` 拷 DDL），然后：

```yaml
gateway:
  dorisExporter:
    createSchema: false
```

之后账号只需要目标库的 `LOAD_PRIV` 和 `SELECT_PRIV`。

---

## 7. 升级、回滚、卸载

**升级 chart 或改配置。** 同一条命令：

```bash
helm upgrade dog ai-observe-stack/ai-observe-stack -n dog -f my-values.yaml
```

改 Gateway 配置只重启 Gateway，队列在 PVC 里不丢。

**回滚。**

```bash
helm history dog -n dog
helm rollback dog 3 -n dog
```

**从 0.1.x 升级**是破坏性的，values 键全部改名，见 [UPGRADING.md](./UPGRADING.md)。

**卸载。**

```bash
helm uninstall dog -n dog
kubectl delete pvc -n dog -l app.kubernetes.io/instance=dog   # Gateway 队列；internal 模式下还有 Doris 的数据盘
```

Doris 里的数据不受卸载影响。K8s 采集器是独立的 release：`helm uninstall dog-k8s-collector -n dog`。

---

## 8. 排障

先跑 `helm test dog -n dog --logs`，它能区分"发不到 Gateway"和"Gateway 写不进 Doris"。

| 现象 | 看哪里 | 原因与处理 |
|---|---|---|
| `helm install` 报 `values key "otel" is from chart 0.1.x` | | 旧版 values，按 UPGRADING.md 改键名 |
| `helm install` 报 `additional properties 'xxx' not allowed` | | 顶层键拼错，schema 拒绝 |
| Gateway CrashLoop，`file_storage` 建不了目录 | `kubectl logs …-otel-gateway-0` | 覆盖了 `gateway.podSecurityContext` 但没给 `fsGroup` |
| Gateway 日志 `Exporting failed … connection refused` | `kubectl logs …-otel-gateway-0` | `doris.external.host` / `feHttpPort` 不对，或网络策略 |
| Gateway 日志 `401` / `Access denied` | | Secret 里的账号密码不对 |
| Gateway 日志 `no partition for this tuple` | | 有记录早于分区窗口且 `timeGuard` 被关了；开回来或调大 `createHistoryDays` |
| Gateway 日志 `DATA_QUALITY_ERROR` 持续 10 分钟后 `dropping data` | | 一批数据 Doris 始终拒绝，已按 `retryMaxElapsedTime` 丢弃；看错误里的 `ErrorURL` 找原因 |
| Grafana 起不来，卡在 plugins | `kubectl logs …-grafana` | `grafana.plugins` 需要联网下载，离线集群留空 |
| Grafana 面板全空 | Configuration → Data sources → Doris → Test | 数据源连不上 Doris 的 9030；或 `doris.database` 不是 `otel`（面板 SQL 写死了库名，改成你的库名） |

看 Gateway 最终生效的配置：

```bash
kubectl get cm -n dog dog-ai-observe-stack-otel-gateway-config -o jsonpath='{.data.config\.yaml}'
```

---

## 9. values 完整参考

只列会改的键；`resources`、`image`、`nodeSelector`、`tolerations`、`ingress` 这类标准 Kubernetes 字段照 Helm 惯例。

### global

| 键 | 默认 | 说明 |
|---|---|---|
| `global.timezone` | `UTC` | Doris exporter 的 IANA 时区 |
| `global.imagePullSecrets` | `[]` | 作用于所有 Pod 的拉取凭据 |

### doris

| 键 | 默认 | 说明 |
|---|---|---|
| `doris.mode` | `internal` | `internal` 由 Operator 部署，`external` 接入已有 |
| `doris.database` | `otel` | 库名 |
| `doris.internal.operator.enabled` | `true` | 是否随 chart 安装 Doris Operator；external 模式设 false |
| `doris.internal.cluster.fe.replicas` / `be.replicas` | `1` / `1` | 副本数 |
| `doris.internal.cluster.fe.image` / `be.image` | `apache/doris:fe-4.0.3` / `be-4.0.3` | 镜像 |
| `doris.internal.cluster.persistence.enabled` | `true` | 数据盘 |
| `doris.internal.cluster.persistence.fe.size` / `be.size` | `20Gi` / `20Gi` | 盘大小 |
| `doris.external.host` | `""` | FE 地址 |
| `doris.external.port` | `9030` | MySQL 协议端口（建表、Grafana） |
| `doris.external.feHttpPort` | `8030` | FE HTTP（Stream Load） |
| `doris.external.user` / `password` | `root` / `""` | 未用 existingSecret 时写进 chart 生成的 Secret |
| `doris.external.existingSecret` | `""` | 已有 Secret 名 |
| `doris.external.userKey` / `passwordKey` | `username` / `password` | Secret 里的键名 |

### gateway

| 键 | 默认 | 说明 |
|---|---|---|
| `gateway.enabled` | `true` | |
| `gateway.image.repository` / `tag` | `otel/opentelemetry-collector-contrib` / `0.160.0` | |
| `gateway.replicas` | `2` | |
| `gateway.podManagementPolicy` | `Parallel` | |
| `gateway.resources` | 200m / 256Mi，1 / 1Gi | |
| `gateway.nodeSelector` / `tolerations` / `affinity` / `priorityClassName` | `{}` / `[]` / `{}` / `""` | |
| `gateway.podSecurityContext` | uid / gid / fsGroup 10001 | contrib 镜像非 root；fsGroup 让 PVC 在任何 CSI 驱动上可写 |
| `gateway.maxRecvMsgSizeMib` | `64` | 接受的最大 OTLP/gRPC 请求（Agent 一批可能超过 gRPC 默认的 4 MiB） |
| `gateway.service.type` / `annotations` | `ClusterIP` / `{}` | 集群外 SDK 用 `LoadBalancer` |
| `gateway.selfMonitoring.enabled` | `true` | Gateway 抓自己的 `:8888` |
| `gateway.ports.otlpGrpc` / `otlpHttp` / `metrics` / `healthCheck` | `4317` / `4318` / `8888` / `13133` | |
| `gateway.persistence.enabled` / `size` / `storageClass` / `path` | `true` / `10Gi` / `""` / `/var/lib/otelcol` | 每副本一个 PVC |
| `gateway.logging.level` / `format` | `info` / `json` | |
| `gateway.logging.fileOutput.enabled` | `false` | 同时写日志文件到 PVC |
| `gateway.memoryLimiter.limitPercentage` / `spikeLimitPercentage` | `75` / `20` | 相对容器内存 limit 的百分比 |
| `gateway.dorisExporter.tables.logs` / `traces` / `metrics` | `otel_logs` / `otel_traces` / `otel_metrics` | 表名（指标表加类型后缀） |
| `gateway.dorisExporter.createSchema` | `true` | 自动建库建表 |
| `gateway.dorisExporter.historyDays` | `7` | 保留天数 |
| `gateway.dorisExporter.createHistoryDays` | `1` | 预建历史分区天数 |
| `gateway.dorisExporter.replicationNum` | `1` | Doris 副本数 |
| `gateway.dorisExporter.timeout` | `60s` | Stream Load 超时 |
| `gateway.dorisExporter.retryMaxElapsedTime` | `10m` | 失败批次最长重试 |
| `gateway.dorisExporter.sendingQueue.enabled` / `numConsumers` / `queueSize` | `true` / `8` / `50000` | |
| `gateway.dorisExporter.sendingQueue.batch.minSize` / `maxSize` / `flushTimeout` | `8192` / `16384` / `5s` | |
| `gateway.serviceName.deriveFromWorkload` | `true` | 没有 service.name 时取工作负载名 |
| `gateway.serviceName.kubernetesEvents` | `kubernetes-events` | 给 Kubernetes Events 的 service_name |
| `gateway.timeGuard.enabled` | `true` | 分区窗口外的时间戳改为接收时间 |
| `gateway.timeGuard.maxPastSeconds` / `maxFutureSeconds` | `null`（由 createHistoryDays 推导）/ `300` | |
| `gateway.debug.enabled` / `verbosity` | `false` / `basic` | debug exporter，演示用 |
| `gateway.extraConfig` | `{}` | 原生 Collector 配置，合并覆盖 |

### grafana / dorisPlugin / ingress

| 键 | 默认 | 说明 |
|---|---|---|
| `grafana.enabled` | `true` | |
| `grafana.adminUser` / `adminPassword` | `admin` / `admin` | 写入 `<release>-ai-observe-stack-grafana-admin` |
| `grafana.existingSecret` | `""` | 自己的 Secret，键 `admin-user` / `admin-password` |
| `grafana.plugins` | `[]` | 启动时联网安装的插件 |
| `grafana.env` | `{}` | 额外环境变量 |
| `grafana.service.type` / `port` | `ClusterIP` / `3000` | |
| `grafana.persistence.enabled` / `size` | `false` / `10Gi` | |
| `dorisPlugin.enabled` / `pluginId` | `true` / `doris-app` | Doris App 插件 |
| `dorisPlugin.image.repository` / `tag` | `velodb/doris-app-plugin` / `latest` | |
| `ingress.enabled` / `className` / `annotations` / `hosts` / `tls` | `false` … | Grafana 的 Ingress |
