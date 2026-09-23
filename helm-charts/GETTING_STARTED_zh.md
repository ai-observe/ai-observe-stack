# DOG Stack 上手指南：采集一个 Kubernetes 集群

这份指南带你从头到尾走一遍：把一个 K8s 集群的容器日志、kubelet / 节点 / 集群指标和 Kubernetes Events 采进 DOG Stack，并在 Grafana 里看到它们。它分两部分，按你的起点选一个入口：

| 你的情况 | 从哪里开始 |
|---|---|
| 已经有一个在跑的 DOG Stack（自己用 chart 装的、别的方式部署的、或者在另一个集群） | [第一部分：部署 agent 和 cluster](#第一部分已经有-dog-stack部署-agent-和-cluster) |
| 什么都没有，要从零拉起 | [第二部分：从零拉起 DOG Stack 和采集器](#第二部分没有-dog-stack从零拉起)，它做完后端会把你带回第一部分 |

每一步都附带"你应该看到什么"，卡住时按第 1.8 节排查。所有命令假设你在仓库的 `helm-charts/` 目录下，用本地 chart 目录安装。先获取一次：

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/helm-charts
helm dependency build ./ai-observe-stack   # 拉取 Doris Operator 子 chart；接入已有 Doris 时也需要
```

## 0. 先认识两个 chart

```
  你的应用（OTLP SDK）──────────────┐
                                    │  OTLP
  dog-k8s-collector ────────────────┤
    agent   DaemonSet  每节点一个     │      容器日志、kubelet / 节点指标、节点本地 OTLP 入口
    cluster Deployment 每集群一个     │      集群指标、Kubernetes Events
                                    ▼
  ai-observe-stack（DOG Stack 本体）
    gateway  OpenTelemetry Collector  收 OTLP，写 Doris
    doris    Apache Doris             存日志、指标、链路
    grafana  Grafana + Doris 插件     看
```

- **`ai-observe-stack`** 是后端。装一次，任何会说 OTLP 的东西都能往它的 Gateway 发。它自己不采集任何东西。
- **`dog-k8s-collector`** 是采集器。每个要采的 K8s 集群装一份，用一个字符串 `gateway.endpoint` 指向 Gateway。多个集群可以指向同一个 DOG Stack，靠 `clusterName` 区分。
- 两个 chart 之间没有 Helm 依赖，各自 `helm install`，各自升级。

安装之后集群里会多出这些对象（release 名分别为 `dog` 和 `dog-k8s-collector`，命名空间 `dog`）：

| 对象 | 名字 | 来自 |
|---|---|---|
| StatefulSet + Service | `dog-ai-observe-stack-otel-gateway` | ai-observe-stack |
| Deployment + Service | `dog-ai-observe-stack-grafana` | ai-observe-stack |
| Secret | `dog-ai-observe-stack-doris-credentials`、`dog-ai-observe-stack-grafana-admin` | ai-observe-stack |
| DorisCluster（internal 模式） | `dog-ai-observe-stack-doris` | ai-observe-stack |
| DaemonSet | `dog-k8s-collector-agent` | dog-k8s-collector |
| Deployment | `dog-k8s-collector-cluster` | dog-k8s-collector |
| ConfigMap | `dog-k8s-collector-agent-config`、`dog-k8s-collector-cluster-config` | dog-k8s-collector |

---

## 第一部分：已经有 DOG Stack，部署 agent 和 cluster

### 1.1 找到 Gateway 的地址

采集器只需要一个信息：Gateway 的 OTLP gRPC 地址，形式是 `host:port`，不带 `http://`。

| 你的 DOG Stack 是怎么来的 | 地址 |
|---|---|
| 用 `ai-observe-stack` chart 装的，release 名 `dog`，命名空间 `dog` | `dog-ai-observe-stack-otel-gateway.dog.svc:4317`。安装时的 NOTES 打印过它；或者 `kubectl get svc -n dog` 找名字里带 `otel-gateway` 且不带 `headless` 的那个 |
| 自己部署的 OpenTelemetry Collector（带 Doris exporter） | 它的 OTLP gRPC Service，通常是 `<service>.<namespace>.svc:4317` |
| DOG Stack 在另一个集群 | Gateway 对外暴露的地址：`gateway.service.type: LoadBalancer` 的外部 IP，或 Ingress 的域名。跨集群走 gRPC 明文时确认网络层允许 4317 |

先确认从这个集群能连上（把地址换成你的）：

```bash
kubectl run -it --rm otlp-check --image=busybox:1.36 --restart=Never -- \
  nc -zv dog-ai-observe-stack-otel-gateway.dog.svc 4317
```

看到 `open` 就通了。看到 `refused` 或超时，先解决网络，后面的步骤不会成功。

### 1.2 检查前提

- **Kubernetes 1.24+，Helm 3.8+。**
- **权限。** 安装会创建 ClusterRole 和 ClusterRoleBinding，你的 kubeconfig 用户需要集群级 RBAC 权限。
- **PodSecurity。** agent 以 root 运行并挂载节点的 `/var/log/pods`、`/`（只读）和 `/var/lib/otelcol`。如果目标命名空间启用了 `restricted` 级别，先放开：

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged --overwrite
```

- **节点。** 容器日志在 `/var/log/pods` 下（containerd、CRI-O、Docker 都是）；节点有 `/usr/share/zoneinfo`（主流发行版都有，Bottlerocket / Talos 这类极简系统没有，见 1.8）。
- **镜像。** 节点能拉 `otel/opentelemetry-collector-k8s:0.160.0`。私有仓库用 `imagePullSecrets` 和 `agent.image` / `cluster.image`。

### 1.3 安装

**最小安装**，三个参数：

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=prod-cn-1 \
  --set platform=eks
```

- `gateway.endpoint`：1.1 节的地址，必填。
- `clusterName`：标在每条数据上的 `k8s.cluster.name`，多集群时靠它区分。不填默认 release 名。
- `platform`：`generic` / `k3s` / `eks` / `gke` / `aks` / `ack` / `openshift`。决定云资源探测器和 journald 的 unit 名，不确定就 `generic`。

**用 values 文件**（推荐，方便以后改），`examples/dog-k8s-collector/values.yaml` 就是这个形状：

```yaml
# collector-values.yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: prod-cn-1
platform: eks
```

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml
```

安装完成 Helm 会打印 NOTES，内容是：发往哪个 Gateway、集群名、装了哪些工作负载、各自采什么，以及验证命令。默认全部 preset 里除了 Prometheus 注解抓取和 journald 都是开的：

| preset | 默认 | 采什么 | 跑在 |
|---|---|---|---|
| `logsCollection` | 开 | 所有命名空间的容器 stdout / stderr | agent |
| `kubeletMetrics` | 开 | 节点、Pod、容器、卷的 CPU / 内存 / 网络 / 文件系统，含 limit 利用率 | agent |
| `hostMetrics` | 开 | 节点主机：cpu、memory、load、disk、filesystem、network | agent |
| `otlp` | 开 | 节点本地 OTLP 入口（给应用 SDK 用，见 1.5.5） | agent |
| `clusterMetrics` | 开 | Deployment 可用副本、节点状态、Pod phase、配额…… | cluster |
| `kubernetesEvents` | 开 | Kubernetes Events，以日志形式存 | cluster |
| `prometheusScrape` | 关 | 带 `prometheus.io/scrape` 注解的 Pod | agent |
| `journald` | 关 | 节点 journal（需要带 journalctl 的镜像） | agent |

### 1.4 确认它在工作

按顺序做，每步几秒。

**1. Pod 起来了。** 每个节点一个 agent，一个 cluster：

```bash
kubectl get pods -n dog -l app.kubernetes.io/instance=dog-k8s-collector -o wide
```

```
NAME                                         READY   STATUS    NODE
dog-k8s-collector-agent-7x2kq                1/1     Running   node-1
dog-k8s-collector-agent-p9m4c                1/1     Running   node-2
dog-k8s-collector-cluster-6f5d9c8b7d-hq2xn   1/1     Running   node-1
```

**2. agent 没有报错。** 应该什么都不打印：

```bash
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'
```

看到 `connection refused` 或 `Unavailable` 是 Gateway 地址不对或不通，回 1.1；看到 `forbidden` 是 RBAC 没建成功。

**3. Doris 里有数据。** 用 DOG Stack 的 Doris 客户端（internal 模式先 `kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 9030:9030`，然后 `mysql -h127.0.0.1 -P9030 -uroot`）：

```sql
SELECT service_name, count(*) AS records
FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute
  AND cast(resource_attributes['k8s.cluster.name'] as string) = 'prod-cn-1'
GROUP BY 1 ORDER BY 2 DESC;
```

第一批数据在 agent 启动后 30 秒内到。`service_name` 是每个工作负载的名字（Deployment / StatefulSet / DaemonSet 名），Events 显示为 `kubernetes-events`。只有安装之后写入的日志会出现，因为默认不回读节点上已有的文件（`logs.startAt: end`）。

**4. Grafana 面板。** 打开 DOG Stack 的 Grafana（第二部分 2.2 节说怎么开），左侧 Dashboards：

- **Logs Explorer**：按命名空间、服务、级别、关键字过滤日志，右上角 "Records by rule" 显示每条记录是被哪条解析规则处理的。
- **Kubernetes Events**：Warning 计数、Top 原因、事件表。
- **K8s Observability**：节点和 Pod 的 CPU / 内存。
- **Collector Self-Monitoring**：agent、cluster、gateway 自己的队列长度、失败和拒绝计数。

四步都对了，采集器就在工作。下面是按需调整。

### 1.5 按需调整

所有改动都是改 values 文件然后 `helm upgrade`：

```bash
helm upgrade dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml
```

改了采集配置只会滚动重启 agent 或 cluster，节点上的文件 offset 保留，不会重复采集。

#### 1.5.1 采哪些命名空间和容器

```yaml
logs:
  namespaces:
    include: ["*"]                          # 或者列表：[shop, payment]
    exclude: [kube-system, monitoring]
  containers:
    exclude: [istio-proxy, linkerd-proxy]   # 容器名，所有命名空间都跳过
```

排除优先于包含。采集器自己的 Pod 永远不采。

#### 1.5.2 应用打 JSON 行：什么都不用配

以 `{` 开头的行会被自动解析：`level` / `severity` 进 `severity_text`，`message` / `msg` 提升为 `body`，其余键进 `log_attributes`，时间戳沿用容器写入时间（和应用时间只差毫秒）。在 Logs Explorer 里能按级别过滤，展开一条能看到全部字段。

字段名不常见时改候选：

```yaml
logs:
  json:
    severityFields: [lvl]
    messageFields: [event]
```

#### 1.5.3 应用打文本行：先找预设

13 个内置预设覆盖常见格式，规则里一行 `preset:` 就够。以一个 Spring Boot 服务为例，它跑在命名空间 `shop`、容器名 `api`：

```yaml
logs:
  rules:
    - name: shop-api
      selector: {namespace: "^shop$", container: "^api$"}
      preset: java-spring
```

| 预设 | 适用 |
|---|---|
| `java-spring` | Spring Boot 3 默认控制台格式，含堆栈合并 |
| `python-logging` | Python `logging.basicConfig` 默认格式 |
| `go-zap-console` | zap console encoder |
| `glog` | C++ / Go glog、SeaweedFS |
| `nginx-access`、`nginx-error` | nginx 访问日志（combined）、错误日志 |
| `mysql`、`postgres`、`redis` | 三个数据库的官方镜像默认格式 |
| `doris-fe`、`doris-fe-audit`、`doris-be` | Apache Doris |
| `json-generic` | 单行 JSON（同自动检测，用于显式指定） |

`selector.container` 匹配的是**容器名**，不是 Pod 名或 Deployment 名。查容器名：

```bash
kubectl get pod -n shop -l app=api -o jsonpath='{.items[0].spec.containers[*].name}'
```

#### 1.5.4 应用是自己的格式：写一条规则

规则用命名分组的正则：`ts` 分组是时间戳、`level` 是级别、`msg` 是消息。假设日志长这样：

```
2026-09-14T10:00:00.123Z info  order 42 created
```

```yaml
logs:
  rules:
    - name: shop-worker
      selector: {namespace: "^shop$", container: "^worker$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s+(?P<level>[a-z]+)\s+(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}     # %z 读末尾的 Z
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}   # 堆栈续行并入上一条
      drop: ['GET /healthz']                             # 在节点上直接丢弃
```

日志不带时区而容器不是 UTC 的，加 `timestamp: {..., timezone: Asia/Shanghai}`。

**部署前先在本地测**，几秒出结果，不用等 Pod 重启：

```bash
kubectl logs -n shop -l app=worker -c worker --tail=30 > worker.log
hack/test-rule.sh -f collector-values.yaml -n shop -c worker worker.log
```

它用真实的 Collector 镜像跑一遍样例，打印每条记录解析出的 `Timestamp`、`SeverityText`、`Body` 和属性；`dog.log.rule` 是你的规则名就说明 selector 命中了。需要 helm、yq、docker。完整的五步写法和常见错误见采集器手册的[第 3 节](./dog-k8s-collector/USER_GUIDE_zh.md#3-为自己的服务写解析规则)。

#### 1.5.5 应用直接发 OTLP（链路、指标、结构化日志）

用了 OpenTelemetry SDK 的应用把数据发到**节点本地的 agent**，这样能自动带上 Pod、命名空间、工作负载元数据。先把端口暴露到节点：

```yaml
presets:
  otlp:
    hostPortHttp: 4318
    hostPortGrpc: 4317
```

应用的 Pod 模板：

```yaml
env:
  - name: HOST_IP
    valueFrom: {fieldRef: {fieldPath: status.hostIP}}
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: http://$(HOST_IP):4318
  - name: OTEL_SERVICE_NAME
    value: checkout
```

不想改代码指定服务名的，给 Pod 加注解 `resource.opentelemetry.io/service.name: checkout`。

#### 1.5.6 抓应用的 Prometheus 指标

```yaml
presets:
  prometheusScrape:
    enabled: true
```

然后给应用的 Pod 打注解 `prometheus.io/scrape: "true"`、`prometheus.io/port: "9090"`、`prometheus.io/path: "/metrics"`。agent 按节点分片抓取，指标进 `otel_metrics_*` 表，带上 Pod 的命名空间、名字、工作负载和标签，`service_name` 就是工作负载名。

#### 1.5.7 多个集群

每个集群装一份采集器，`gateway.endpoint` 指向同一个 Gateway（跨集群用 LoadBalancer 或 Ingress 地址），`clusterName` 各不相同。查询和面板都能按 `k8s.cluster.name` 过滤。

#### 1.5.8 资源

默认每个 agent 请求 100m CPU / 128Mi，上限 1 核 / 512Mi；参考点：一个采集七种格式、每分钟 3 000 行的节点约 10m CPU、31 MiB。日志量大的节点提高 `agent.resources.limits.memory` 即可，内存限制器按 limit 的百分比工作，不用改。Gateway 短暂不可用时每个节点缓冲 `agent.queueSize`（默认 20 000 条）在本地磁盘，agent 重启不丢。

### 1.6 不用 Helm：kubectl 清单

`examples/dog-k8s-collector/kubectl/collectors.yaml` 是从 chart 生成的同一套对象。改 `kubectl/values.yaml` 里的 `gateway.endpoint` 和 `clusterName`，重新生成，apply：

```bash
cd examples/dog-k8s-collector/kubectl
./render.sh -n dog                # 需要 helm 和 yq；没有的话直接改 collectors.yaml 里的 endpoint 和 k8s.cluster.name
kubectl apply -n dog -f collectors.yaml
```

之后改配置要 `kubectl rollout restart daemonset/dog-k8s-collector-agent deployment/dog-k8s-collector-cluster`，因为 kubectl 不会像 Helm 那样自动重启。详见 [kubectl/README.md](./examples/dog-k8s-collector/kubectl/README.md)。

### 1.7 升级与卸载

```bash
helm upgrade dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml   # 改配置或升级 chart
helm history dog-k8s-collector -n dog && helm rollback dog-k8s-collector 1 -n dog     # 回滚
helm uninstall dog-k8s-collector -n dog                                               # 卸载
```

卸载不影响 DOG Stack 和 Doris 里的数据。节点上的 `/var/lib/otelcol`（文件 offset）会留下，重装后接着上次的位置读；要从头读就在每个节点删掉它。

### 1.8 常见问题

| 现象 | 原因与处理 |
|---|---|
| `helm install` 报 `gateway.endpoint is required` | 没填 Gateway 地址，见 1.1 |
| `helm install dog ./ai-observe-stack` 报 `missing in charts/ directory: doris-operator` | 没拉取 Doris Operator 子 chart；执行 `helm dependency build ./ai-observe-stack`（接入已有 Doris 时也需要） |
| `helm install` 报 `additional properties 'xxx' not allowed` | 顶层键拼错。合法的顶层键：`gateway`、`clusterName`、`platform`、`timezone`、`imagePullSecrets`、`presets`、`logs`、`agent`、`cluster`、`nameOverride`、`fullnameOverride` |
| agent Pod `CreateContainerConfigError` 或被 PodSecurity 拒绝 | 命名空间是 `restricted`，打 `privileged` 标签，见 1.2 |
| agent 日志 `permission denied` `/var/log/pods` | 同上 |
| agent 日志 `connection refused` / `Unavailable` | Gateway 地址错、Gateway 没起来、或网络策略挡了 4317；数据会在节点上排队，修好后自动补发 |
| agent 日志 `unknown time zone` | 规则写了时区名但节点没有 `/usr/share/zoneinfo`；只用 UTC，或把 `agent.image.repository` 换成 `otel/opentelemetry-collector-contrib` |
| agent 日志 `journalctl: executable file not found` | 开了 `presets.journald` 但镜像没有 journalctl；关掉或换自建镜像 |
| 某个命名空间没日志 | 被 `logs.namespaces.exclude` / `containers.exclude` 排除；或文件在安装前就存在且 `startAt: end` |
| 日志有但 `service_name` 为空 | agent 没拿到 Pod 元数据，看日志里有没有 RBAC `forbidden` |
| 规则没生效（`dog.log.rule` 为空） | `selector.container` 写成了 Pod 名；或前面有一条更宽的规则先认领了（先到先得）；用 `hack/test-rule.sh` 验证 |
| 时间差 8 小时 | 日志不带时区，容器不是 UTC，缺 `timestamp.timezone` |
| Logs Explorer 有数据但级别全空 | 文本日志没有解析规则；写规则或用预设，见 1.5.3 |

看 agent 实际在跑的配置（带注释和规则名）：

```bash
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'
```

---

## 第二部分：没有 DOG Stack，从零拉起

目标：装好 Gateway + Doris + Grafana，再装采集器。做完 2.3 之后回第一部分的 1.4 验证。

### 2.1 决定 Doris 在哪

两条路，选一条：

| | A：让 chart 部署 Doris | B：接入已有 Doris |
|---|---|---|
| 适合 | 试用、开发、没有现成 Doris | 已有 Doris / SelectDB 集群 |
| 需要 | PersistentVolume 供应器；FE 和 BE 各至少 2 核 4 GiB；一个集群只装一个 Operator，同集群第二套 DOG Stack 要设 `doris.internal.operator.enabled: false` | FE 的 9030（MySQL）和 8030（HTTP）从集群内可达；一个有 `CREATE DATABASE` 权限的账号 |
| 数据在哪 | 集群内的 PVC | 你的 Doris |

### 2.2 安装 DOG Stack

**路 A：chart 部署 Doris。** 开发规格用 `examples/ai-observe-stack/dev.yaml`（FE / BE 各 1 副本、2 核 4 GiB、不持久化、单 Gateway、debug 输出开）；生产规格用 `prod.yaml`（3 + 3 副本、持久化、3 个 Gateway、Ingress）。

```bash
helm install dog ./ai-observe-stack -n dog --create-namespace -f examples/ai-observe-stack/dev.yaml
```

Doris FE / BE 拉镜像和初始化要两到五分钟，Gateway 会等 FE 的 9030 和 8030 就绪再启动。`dev.yaml` 打开了 Gateway 的 debug 输出；采集器装在同一集群时，在采集器上加 `logs.excludePaths: [/var/log/pods/dog_dog-ai-observe-stack-otel-gateway-*/*/*.log]` 把这个 Pod 挡在外面，否则 Gateway 打印的那份数据会被再采一遍。

**路 B：已有 Doris。** 先把账号放进 Secret，不要写在 values 里：

```bash
kubectl create namespace dog
kubectl create secret generic doris-credentials -n dog \
  --from-literal=username=otel --from-literal=password='***'
```

```yaml
# dog-values.yaml
doris:
  mode: external
  database: otel                               # Gateway 会自动建库建表
  external:
    host: doris-fe.doris.svc.cluster.local     # FE 地址
    port: 9030
    feHttpPort: 8030
    existingSecret: doris-credentials
  internal:
    operator:
      enabled: false                           # 不装 Doris Operator
```

```bash
helm install dog ./ai-observe-stack -n dog -f dog-values.yaml
```

`examples/ai-observe-stack/minimal-external-doris.yaml` 就是这份文件。

**两条路装完之后**都会打印 NOTES，记下里面的 Gateway 地址，形如 `dog-ai-observe-stack-otel-gateway.dog.svc:4317`。然后三步确认：

```bash
kubectl get pods -n dog                                  # gateway-0、grafana（路 A 还有 doris fe / be）都 Running
helm test dog -n dog --logs                              # 发一条日志经 Gateway 到 Doris，看到 OK: record found in Doris
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d; echo
```

打开 Grafana：

```bash
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
```

浏览器 `http://localhost:3000`，用户 `admin`，密码就是上面打印的（默认 `admin`，用 `grafana.adminPassword` 或 `grafana.existingSecret` 改）。此时面板是空的，因为还没有任何东西往 Gateway 发数据，`helm test` 那一条除外。

### 2.3 安装采集器

同一个命名空间，Gateway 地址就是 NOTES 里的：

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged --overwrite   # 仅当启用了 PodSecurity restricted
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster \
  --set platform=generic
```

然后按[第一部分 1.4](#14-确认它在工作)验证，按 1.5 调整。

### 2.4 端到端走一遍

装完两个 chart，用一个最小的应用把整条链路验证一次。部署一个每秒打一行 JSON 的 Pod：

```bash
kubectl create namespace demo
kubectl run json-app -n demo --image=busybox:1.36 --restart=Never -- sh -c \
  'i=0; while true; do i=$((i+1)); echo "{\"time\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"level\":\"info\",\"msg\":\"tick $i\"}"; sleep 1; done'
```

30 秒后在 Doris 里：

```sql
SELECT timestamp, severity_text, body, cast(resource_attributes['k8s.pod.name'] as string) AS pod
FROM otel.otel_logs
WHERE cast(resource_attributes['k8s.namespace.name'] as string) = 'demo'
ORDER BY timestamp DESC LIMIT 5;
```

应该看到 `severity_text = INFO`、`body = tick 42` 这样的行，说明容器日志被采到、JSON 被解析、K8s 元数据被补上。Grafana 的 Logs Explorer 里选命名空间 `demo` 能看到同样的东西。收尾：

```bash
kubectl delete namespace demo
```

### 2.5 上生产前的清单

| 项 | 改哪里 | 说明 |
|---|---|---|
| Doris 副本与磁盘 | `doris.internal.cluster.fe/be.replicas`、`persistence.storageClass`、`size` | 生产至少 3 + 3，`replicationNum: 3` |
| Gateway 副本与队列 | `gateway.replicas`、`gateway.persistence.size`、`gateway.dorisExporter.sendingQueue` | 每副本一个 PVC 存队列；写入跟不上看 Collector Self-Monitoring 的 `otelcol_exporter_queue_size` |
| 数据保留 | `gateway.dorisExporter.historyDays` | 默认 7 天 |
| Grafana 密码 | `grafana.adminPassword` 或 `grafana.existingSecret` | 默认 `admin` |
| 对外访问 | `ingress`、`gateway.service.type` | Grafana 的域名；集群外 SDK 用 OTLP/HTTP 的 Ingress 路径或 LoadBalancer |
| 私有镜像仓库 | `global.imagePullSecrets`（DOG）、`imagePullSecrets`（采集器）、各 `image.repository`、`global.helperImages`（DOG chart 用到的 busybox 和 curl） | 两个 chart 分别设 |
| 关掉演示输出 | `gateway.debug.enabled: false` | `dev.yaml` 里是开的，会打印采样数据 |
| 采集范围 | `logs.namespaces.exclude` | 通常排除 `kube-system` |

`examples/ai-observe-stack/prod.yaml` 是一份可以直接改的生产 values。

### 2.6 一个完整的参考部署：litefuse

仓库里有一个在真实系统上验证过的例子：单节点 k3s，采集 `litefuse-prod` 命名空间的七种日志格式（Node.js、Doris FE / BE、PostgreSQL、Valkey、SeaweedFS），写入 litefuse 自带的 Doris。两个 values 文件加真实样例日志在 [`examples/dog-k8s-collector/litefuse/`](./examples/dog-k8s-collector/litefuse/)：

```bash
helm upgrade --install dog-stack ./ai-observe-stack -n dog-stack --create-namespace \
  -f examples/dog-k8s-collector/litefuse/dog-values.yaml
helm test dog-stack -n dog-stack --logs
helm upgrade --install dog-k8s-collector ./dog-k8s-collector -n dog-stack \
  -f examples/dog-k8s-collector/litefuse/collector-values.yaml
```

`collector-values.yaml` 里七条规则六条用预设，是"文本日志怎么配"最完整的样板。

---

## 附录：速查

**两个 chart 的文档**

| chart | README | 使用手册 | 内容 |
|---|---|---|---|
| ai-observe-stack | [README_zh.md](./ai-observe-stack/README_zh.md) | [USER_GUIDE_zh.md](./ai-observe-stack/USER_GUIDE_zh.md) | 安装、发送数据、Gateway 与 Doris 扩缩容、保留、升级、排障、values 参考 |
| dog-k8s-collector | [README_zh.md](./dog-k8s-collector/README_zh.md) | [USER_GUIDE_zh.md](./dog-k8s-collector/USER_GUIDE_zh.md) | 安装、日志采集配置、写规则五步、指标与 Events、节点 OTLP、Agent 与 Cluster 扩缩容、排障、values 参考 |

**常用命令**

```bash
# 状态
kubectl get pods -n dog
helm list -n dog

# 日志
kubectl logs -n dog dog-ai-observe-stack-otel-gateway-0 | grep -i 'error\|doris'
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'
kubectl logs -n dog deploy/dog-k8s-collector-cluster | grep '"level":"error"'

# 生效的配置
kubectl get cm -n dog dog-ai-observe-stack-otel-gateway-config -o jsonpath='{.data.config\.yaml}'
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'

# 端到端
helm test dog -n dog --logs

# 面板与 Doris
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 9030:9030   # internal 模式
```

**Doris 里的表**

| 表 | 内容 | 常用列 |
|---|---|---|
| `otel_logs` | 容器日志、Events、SDK 日志 | `timestamp`、`service_name`、`severity_text`、`body`、`resource_attributes['k8s.*']`、`log_attributes['dog.log.rule']` |
| `otel_metrics_gauge` / `_sum` / `_histogram` / `_exponential_histogram` / `_summary` | 指标，按类型分表 | `metric_name`、`value`、`attributes` |
| `otel_traces` | 链路 | `trace_id`、`span_name`、`service_name` |

VARIANT 列在 `WHERE` / `GROUP BY` 里要 `cast(... as string)`。
