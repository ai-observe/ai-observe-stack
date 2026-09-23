# AIObserve Stack Helm Chart

> 从 0.1.x 升级？0.2.0 是破坏性版本：values 结构重排、Gateway 对象改名，K8s 采集器移到了 `dog-k8s-collector` chart。请先阅读 [UPGRADING.md](./UPGRADING.md)。

[English](./README.md) · **[上手指南](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/GETTING_STARTED_zh.md)**（端到端，两个 chart） · **[使用手册](./USER_GUIDE_zh.md)**（安装、发送数据、扩缩容、排障、values 完整参考）

**AIObserve Stack**（DOG Stack：**D**oris + **O**penTelemetry + **G**rafana）是一个可观测后端：接收 OTLP 的 OpenTelemetry Gateway、存日志 / 指标 / 链路的 Apache Doris、带 Doris App 插件的 Grafana。任何会说 OTLP 的东西都能往它发：SDK、别的 Collector，以及配套的 `dog-k8s-collector` chart。

## 默认安装装什么

```
  应用 SDK、其他 Collector ────────── OTLP ──────────┐
  dog-k8s-collector（agent + cluster 采集器）─────────┤
                                                     ▼
              ┌──────────────────────────────────────────────┐
  gateway     │ OpenTelemetry Collector（StatefulSet，PVC）    │  service.name 派生、
              │   otel/opentelemetry-collector-contrib 0.160  │  时间戳保护、Stream Load
              └──────────────────────┬───────────────────────┘
                                     ▼
              ┌──────────────────────────────────────────────┐
  doris       │ Apache Doris（Operator 部署或外部集群）         │  otel_logs、otel_traces、
              └──────────────────────┬───────────────────────┘  otel_metrics_<type>
                                     ▼
              ┌──────────────────────────────────────────────┐
  grafana     │ Grafana 11 + Doris App 插件 + 预置面板         │
              └──────────────────────────────────────────────┘
```

Gateway 从不采集。它是唯一和 Doris 说话的组件，持有唯一一份 Doris 凭据和持久化队列。采集 K8s 集群是独立的 `dog-k8s-collector` chart，和其他数据源一样往 Gateway 发。

## 前置要求

- Kubernetes 1.24+、Helm 3.8+
- PersistentVolume 供应器（Gateway 队列；Operator 部署 Doris 时也需要）
- 外部 Doris：用户需要 `CREATE DATABASE` 权限（或预建表并设置 `gateway.dorisExporter.createSchema=false`）

## 快速开始

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/helm-charts
helm dependency update ./ai-observe-stack  # 拉取 Doris Operator 子 chart；任何 Doris 模式都需要
```

**由 chart 部署 Doris**（依赖 Doris Operator）：

```bash
helm install dog ./ai-observe-stack -n dog --create-namespace
```

**接入已有 Doris 集群**：

```bash
kubectl create namespace dog
kubectl create secret generic doris-credentials -n dog \
  --from-literal=username=otel --from-literal=password='***'

helm install dog ./ai-observe-stack -n dog \
  --set doris.mode=external \
  --set doris.external.host=doris-fe.doris.svc.cluster.local \
  --set doris.external.existingSecret=doris-credentials \
  --set doris.internal.operator.enabled=false
```

然后：

```bash
kubectl get pods -n dog                 # gateway-0/1、grafana（internal 模式还有 Doris）
helm test dog -n dog --logs             # 经 Gateway 发一条日志，到 Doris 里查证
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d
```

OTLP 发到 `dog-ai-observe-stack-otel-gateway.dog.svc:4317`（gRPC）或 `:4318`（HTTP）。

## 采集 K8s 集群

那是独立的 [`dog-k8s-collector`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/dog-k8s-collector/README_zh.md) chart：一个 agent DaemonSet（带规则引擎和预设的容器日志、kubelet 与节点指标、节点本地 OTLP 入口、Prometheus 注解）和一个 cluster Deployment（集群指标、Kubernetes Events），每个集群装一份，指向这个 Gateway：

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 --set clusterName=my-cluster
```

[`helm-charts/examples/dog-k8s-collector/`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/examples/dog-k8s-collector/) 里有 values 示例、litefuse 参考部署，以及给不用 Helm 的集群准备的 `kubectl` 清单。

## Doris 与凭据

| 键 | 默认 | 含义 |
|---|---|---|
| `doris.mode` | `internal` | `internal` 用 Operator 部署 Doris；`external` 接入已有集群 |
| `doris.database` | `otel` | `createSchema` 开启时由 Gateway 创建 |
| `doris.external.host` / `port` / `feHttpPort` | – / `9030` / `8030` | MySQL 端口用于建表和 Grafana，FE HTTP 用于 Stream Load |
| `doris.external.user` / `password` | `root` / `""` | 写入 `<release>-ai-observe-stack-doris-credentials` |
| `doris.external.existingSecret` | `""` | 使用自己的 Secret（`userKey` / `passwordKey` 指定键名） |
| `gateway.dorisExporter.createHistoryDays` | `1` | Exporter 预建多少天的历史分区 |
| `gateway.dorisExporter.historyDays` | `7` | 保留天数 |
| `gateway.dorisExporter.sendingQueue` | 50 000 条，批 8 192–16 384 | 持久化在 Gateway 的 PVC |
| `gateway.dorisExporter.retryMaxElapsedTime` | `10m` | Doris 持续拒绝的批次超过此时长后丢弃并记错误日志 |
| `gateway.timeGuard` | 开 | 分区窗口之外的时间戳改为观测时间（原值保留在 `log.original_time_unix_nano`） |

凭据只存在于 Secret 中：Doris 在 `<release>-ai-observe-stack-doris-credentials`（或 `doris.external.existingSecret`），Grafana 管理员在 `<release>-ai-observe-stack-grafana-admin`（或 `grafana.existingSecret`）。Gateway、Grafana 和 `helm test` Pod 以环境变量读取，ConfigMap 里没有任何明文。

## Gateway 参数

| 键 | 默认 | 含义 |
|---|---|---|
| `gateway.replicas` | `2` | StatefulSet，每副本一个 PVC |
| `gateway.persistence.size` | `10Gi` | 队列与可选的 Collector 日志文件 |
| `gateway.memoryLimiter.limitPercentage` | `75` | 相对容器内存 limit 的百分比 |
| `gateway.maxRecvMsgSizeMib` | `64` | 接受的最大 OTLP/gRPC 请求 |
| `gateway.service.type` | `ClusterIP` | 集群外的 SDK 用 `LoadBalancer` |
| `gateway.podSecurityContext` | uid/gid/fsGroup 10001 | 让 contrib 镜像在任何 CSI 驱动上都能写 PVC |
| `global.imagePullSecrets` | `[]` | 私有仓库，作用于所有 Pod |
| `gateway.extraConfig` | `{}` | 原生 Collector 配置，合并到生成的配置之上 |

`extraConfig` 是逃生舱：可以加或改任何 receiver / processor / exporter，也能改 pipeline。合并用 `mergeOverwrite`，你写的键会替换生成的同名键。

## 示例

| 文件 | 场景 |
|---|---|
| `examples/ai-observe-stack/minimal-external-doris.yaml` | 接入已有 Doris 的最小 DOG Stack |
| `examples/ai-observe-stack/dev.yaml` | 笔记本集群：小规格 Operator Doris、单 Gateway、debug exporter |
| `examples/ai-observe-stack/prod.yaml` | 高可用 Doris、三个 Gateway、Grafana 与 OTLP/HTTP 的 TLS Ingress |
| `examples/dog-k8s-collector/` | `dog-k8s-collector` chart 的 values 示例、litefuse 参考部署、`kubectl` 清单 |

## 验证与排障

```bash
helm test <release> -n <ns> --logs                                   # 端到端检查
kubectl logs -n <ns> <release>-ai-observe-stack-otel-gateway-0 | grep -i 'doris\|error'
```

| 现象 | 原因 / 处理 |
|---|---|
| `values key "otel" is from chart 0.1.x` | 改 values 键名，见 UPGRADING.md |
| Gateway CrashLoop，`file_storage` 建不了目录 | 覆盖了 `gateway.podSecurityContext` 但没给 `fsGroup` |
| Gateway 报 `no partition for this tuple` | 记录早于 `createHistoryDays`；时间戳保护默认会拦住，除非被关闭 |
| Gateway 报 `Exporting failed` 且带 Doris HTTP 错误 | 检查 `doris.external.*`、Secret，以及用户是否有建库权限 |
| Grafana 启动卡住 | `grafana.plugins` 会联网下载；离线集群保持为空 |

Grafana 面板：chart 预置 *K8s Observability*、*Logs Explorer*、*Kubernetes Events*；Doris App 插件镜像另带 *OTel Overview* 和 *Collector Self-Monitoring*（Gateway 和每个 dog-k8s-collector Pod 的队列长度、丢弃与拒绝计数）。

## 升级与卸载

```bash
helm upgrade <release> ./ai-observe-stack -n <ns> -f my-values.yaml
helm uninstall <release> -n <ns>
kubectl delete pvc -n <ns> -l app.kubernetes.io/instance=<release>      # Gateway 队列
kubectl delete pvc -n <ns> -l 'app.doris.ownerreference/name in (<release>-ai-observe-stack-doris-fe,<release>-ai-observe-stack-doris-be)'   # Doris 数据（internal 模式）
```

0.1.x → 0.2.0 见 [UPGRADING.md](./UPGRADING.md)。K8s 采集器是独立的 release（`helm uninstall dog-k8s-collector`）。

## 服务端点

| Service | 端口 | 用途 |
|---|---|---|
| `<release>-ai-observe-stack-otel-gateway` | 4317 / 4318 | OTLP gRPC / HTTP |
| `<release>-ai-observe-stack-otel-gateway` | 8888 | Gateway Prometheus 指标 |
| `<release>-ai-observe-stack-grafana` | 3000 | Grafana |
| `<release>-ai-observe-stack-doris-fe-service` | 9030 / 8030 | Doris MySQL / FE HTTP（internal 模式） |
