# dog-k8s-collector 使用手册

这个 chart 把一个 K8s 集群采进 DOG Stack 的 Gateway：一个 **agent** DaemonSet（每节点一个：`/var/log/pods` 的容器日志、kubelet 与节点指标、节点本地 OTLP 入口、Prometheus 注解）和一个 **cluster** Deployment（集群指标、Kubernetes Events）。前提是有一个在跑的 Gateway；安装 DOG Stack 本体是 `ai-observe-stack` chart 和[它的手册](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/ai-observe-stack/USER_GUIDE_zh.md)。

1. [安装](#1-安装)
2. [配置日志采集](#2-配置日志采集)
3. [为自己的服务写解析规则](#3-为自己的服务写解析规则)
4. [指标与 Kubernetes Events](#4-指标与-kubernetes-events)
5. [节点本地 OTLP 入口](#5-节点本地-otlp-入口)
6. [扩缩容与资源](#6-扩缩容与资源)
7. [排障](#7-排障)
8. [values 完整参考](#8-values-完整参考)

---

## 1. 安装

你需要 Gateway 的 OTLP gRPC 地址。用 `ai-observe-stack` chart 以 release 名 `dog` 装在命名空间 `dog` 的 DOG Stack，地址是 `dog-ai-observe-stack-otel-gateway.dog.svc:4317`；DOG Stack 的 NOTES 会打印它。

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # 仅当启用了 PodSecurity restricted
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster --set platform=eks
kubectl -n dog get pods                                                      # 每节点一个 agent，一个 cluster 采集器
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'      # 应该为空
```

或者写成 values 文件（`examples/dog-k8s-collector/values.yaml`）：

```yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: my-cluster        # 每条记录上的 k8s.cluster.name
platform: generic              # generic | k3s | eks | gke | aks | ack | openshift
```

`platform` 决定云资源探测器和 journald 的 unit 名，其余在各平台一致。Agent 以 root 运行，挂载 `/var/log/pods`、`/`（只读）和 `/var/lib/otelcol`，所以需要那个 PodSecurity 标签。每个集群一个 release；多个集群可以指向同一个 Gateway，靠 `clusterName` 区分。

**会收到什么。** 所有容器的 stdout / stderr，每条带 `k8s.namespace.name`、`k8s.pod.name`、`k8s.container.name`、工作负载名（`k8s.deployment.name` 等）、`k8s.node.name`、`k8s.cluster.name`、镜像名与 tag，以及 `presets.kubernetesAttributes.labels` 列出的 Pod 标签；`service_name` 取工作负载名，除非应用自己设置了 `service.name`。指标进 `otel_metrics_<type>`，Events 进 `otel_logs` 且 `service_name = kubernetes-events`。刚装完 Logs Explorer 只有之后写入的日志，因为默认不回读老文件（`logs.startAt: end`）。

**不用 Helm**：`examples/dog-k8s-collector/kubectl/collectors.yaml` 是从这个 chart 生成的；在 `kubectl/values.yaml` 填 Gateway 地址，跑 `render.sh`，`kubectl apply`（[README](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/examples/dog-k8s-collector/kubectl/README.md)）。

**哪些 preset 跑在哪**：`logsCollection`、`kubeletMetrics`、`hostMetrics`、`otlp`、`prometheusScrape`、`journald` 在 agent；`clusterMetrics`、`kubernetesEvents` 在 cluster 采集器。一组的 preset 全关，对应的工作负载就不部署。

---
## 2. 配置日志采集

日志采集全部在 values 的 `logs` 块里，开关是 `presets.logsCollection.enabled`。默认行为是：**所有命名空间的所有容器**，stdout 和 stderr 都采，JSON 行自动解析，其他格式原样入库。

### 2.1 采哪些

```yaml
logs:
  namespaces:
    include: ["*"]                         # 或者列出来: [shop, payment]
    exclude: [kube-system, monitoring]
  containers:
    exclude: [istio-proxy, linkerd-proxy]  # 容器名，所有命名空间都跳过
```

排除优先于包含。chart 自己的两个 Pod（agent 和 cluster 采集器）永远被排除。同一集群里 `gateway.debug.enabled: true` 的 DOG Stack Gateway 会把收到的数据打印一份，用 `logs.excludePaths`（或排除它的命名空间）把那个 Pod 挡在外面，避免回环。

要看某条日志是从哪个文件来的，`log_attributes['log.file.path']` 里有节点上的路径。

### 2.2 首次安装是否回读老日志

`logs.startAt: end`（默认）只读安装之后写入的行。改成 `beginning` 会把节点上现存的日志文件从头读一遍，**只在第一次安装生效**，之后 Agent 记住了 offset。回读的老日志如果早于 Doris 的分区窗口（默认一天），会被 Gateway 改写成当前时间入库，原始时间放在 `log_attributes['log.original_time_unix_nano']`。

### 2.3 应用打 JSON 行

什么都不用配。以 `{` 开头的行会被解析：

| 字段 | 从哪些 key 里找（按顺序） | 落到 |
|---|---|---|
| 级别 | `level`、`severity`（文字或 pino 的数字） | `severity_text` / `severity_number` |
| 消息 | `message`、`msg` | `body` |
| 其余 key | | `log_attributes` |
| 时间戳 | 不解析，沿用容器运行时的写入时间 | `timestamp` |

写入时间和应用自己打的时间只差微秒到毫秒，顺序不变，这也是官方 chart 和各家发行版的默认做法；默认配置因此只有 7 个算子。要用应用自己的时间戳，两种办法：

- 全局开 `logs.json.parseTimestamp: true`，自动检测会依次尝试 `timestampFields`（默认 `time`、`timestamp`、`ts`、`@timestamp`，RFC3339 / 无 T 的日期 / epoch 毫秒 / epoch 秒），每个候选字段多四个算子。
- 只给某个服务写一条 `format: json` 规则（第 3 节），显式规则总是解析时间戳。

字段名不在列表里时改候选：

```yaml
logs:
  json:
    severityFields: [lvl]
    messageFields: [event]
    timestampFields: [event_time]     # 显式 json 规则的默认，或 parseTimestamp: true 时生效
```

注意列表是整体替换，写了 `[lvl]` 就只剩这一个。

### 2.4 应用打文本行

先看有没有现成预设。`preset: <名字>` 一行就够：

| 预设 | 适用 | 样例行 |
|---|---|---|
| `java-spring` | Spring Boot 3 默认控制台 | `2026-09-10T10:00:00.123+08:00  INFO 1 --- [main] c.e.App : Started` |
| `python-logging` | `logging.basicConfig` 默认格式 | `2026-09-10 10:00:00,123 - app.worker - WARNING - queue is full` |
| `go-zap-console` | zap console encoder | `2026-09-10T10:00:00.123+0800\tINFO\tmain.go:42\tlistening` |
| `glog` | C++ / Go glog、SeaweedFS | `I0909 09:41:28.262837  1234 file.cc:353] msg` |
| `nginx-access` | nginx combined 访问日志 | `10.0.0.1 - - [10/Sep/2026:10:00:00 +0000] "GET / HTTP/1.1" 200 612 "-" "curl"` |
| `nginx-error` | nginx 错误日志 | `2026/09/10 10:00:00 [error] 29#29: *1 open() failed` |
| `mysql` | MySQL 8 错误日志 | `2026-09-10T02:00:00.123456Z 0 [Note] [MY-010116] [Server] msg` |
| `postgres` | 官方镜像默认 `log_line_prefix` | `2026-09-05 14:37:58.611 UTC [52] LOG:  checkpoint starting` |
| `redis` | Redis / Valkey | `1:M 09 Sep 2026 09:45:39.847 * Background saving terminated` |
| `doris-fe` | Doris FE 运行日志 | `RuntimeLogger 2026-09-09 09:47:49,347 INFO (thread\|id) [Class.m():1] msg` |
| `doris-fe-audit` | Doris FE 审计日志（与运行日志同一流） | `AuditLogger 2026-09-10 02:45:19,580 [query] \|QueryId=...` |
| `doris-be` | Doris BE glog | `I20260909 09:45:27.241125 443 storage_engine.cpp:829] msg` |
| `json-generic` | 单行 JSON | `{"ts":"...","level":"info","msg":"..."}` |

```yaml
logs:
  rules:
    - name: api
      selector: {namespace: "^shop$", container: "^api$"}
      preset: java-spring
```

预设里的任何键都能在规则里覆盖，比如 PostgreSQL 容器时区不是 UTC：

```yaml
    - name: pg
      selector: {container: "^postgresql$"}
      preset: postgres
      timestamp: {timezone: Asia/Shanghai}
```

没有合适的预设，看第 3 节写一条。

### 2.5 堆栈跟踪（多行）

默认**不合并**多行，因为一条错的"首行规则"会把不相干的行粘在一起。预设里 `java-spring`、`python-logging`、`go-zap-console`、`mysql`、`postgres`、`doris-*` 自带合适的首行规则。自己的规则里显式写：

```yaml
      multiline:
        firstLinePattern: '^\d{4}-\d{2}-\d{2}T'   # 以时间戳开头的才是新记录
```

整个集群只有一种格式时可以开全局的 `logs.multiline.enabled: true` 并给 `firstLinePattern`。全局开关打开时，自带首行规则的预设和规则会再多一步合并（每条记录最多多两秒延迟），二选一。

### 2.6 丢掉噪音

在节点上直接丢，不进 Gateway 和 Doris：

```yaml
    - name: api
      selector: {container: "^api$"}
      preset: java-spring
      drop:
        - 'GET /healthz'
        - 'DEBUG'
```

只想丢不想解析：`format: none` 加 `drop`。

### 2.7 同一个容器两种格式

用 `selector.bodyPrefix` 按行首区分，两条规则指向同一个容器。Doris FE 就是这样：

```yaml
    - name: fe
      selector: {container: "^fe$"}
      preset: doris-fe          # 预设自带 bodyPrefix: ^RuntimeLogger
    - name: fe-audit
      selector: {container: "^fe$"}
      preset: doris-fe-audit    # 预设自带 bodyPrefix: ^AuditLogger
```

---

## 3. 为自己的服务写解析规则

五步，二十分钟。

### 第 1 步：拿到容器名和一行样例

规则的 selector 匹配的是**容器名**，不是 Pod 名或 Deployment 名。

```bash
kubectl get pod -n shop -l app=checkout -o jsonpath='{.items[0].spec.containers[*].name}'
# checkout istio-proxy

kubectl logs -n shop -l app=checkout -c checkout --tail=20 > checkout.log
```

样例文件多留几行，最好包含一条错误和一段堆栈。

### 第 2 步：决定格式

- 行以 `{` 开头 → JSON，只有字段名特殊时才需要规则（``json.timestampFields` 等）。
- 2.4 节的表里有 → `preset: <名字>`。
- 都不是 → `format: regex`，继续。

### 第 3 步：写正则

Go RE2 语法，命名分组。三个分组名有特殊含义：

| 分组 | 作用 |
|---|---|
| `ts` | 时间戳，交给 `timestamp.layout` 解析 |
| `level` | 级别，交给 `severity` 映射 |
| `msg` | 消息正文（body 保持整行，`msg` 进属性；JSON 规则则把消息提升为 body） |

其他分组名原样成为 `log_attributes` 的 key。不需要提取的部分用非捕获分组 `(?:...)` 或直接跳过。

样例行 `2026-09-10T09:09:15.866Z info \t[Job.health] loads=0/4` 对应的规则：

```yaml
logs:
  rules:
    - name: checkout
      selector: {namespace: "^shop$", container: "^checkout$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s+(?P<level>[a-z]+)\s*(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}     # %z 读末尾的 Z
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}
```

`(?s:.*)` 让 `msg` 能跨越合并后的多行。RE2 没有 lookahead / lookbehind。

**时间戳 layout 速查**（`layoutType: strptime`，默认）：

| 记号 | 含义 | 记号 | 含义 |
|---|---|---|---|
| `%Y` `%m` `%d` | 年 月 日 | `%H` `%M` `%S` | 时 分 秒 |
| `%L` | 毫秒（3 位） | `%f` | 微秒（6 位） |
| `%s` | 纳秒（9 位） | `%z` | 时区偏移 `+0800` |
| `%Z` | 时区名 `UTC` | `%b` | 月份缩写 `Sep` |
| `%y` | 两位年 | `%p` | AM / PM |

日志里**没有时区**时（`2026-09-10 10:00:00,123` 这种）按 `timezone`（默认 UTC）解释。容器不是 UTC 的，给规则单独指定：

```yaml
      timestamp: {layout: "%Y-%m-%d %H:%M:%S,%L", timezone: Asia/Shanghai}
```

任何 IANA 名字都可以：Agent 把节点的 `/usr/share/zoneinfo` 只读挂进容器（`agent.tzdata.hostPath`）。日志里**带**时区的（`Z`、`+08:00`），layout 用 `%z` 读它，不要写成字面量 `Z`，否则会被当成没有时区的时间再按 `timezone` 解释一次。

epoch 时间戳：`{layoutType: epoch, layout: ms}`（`s` / `ms` / `ns`）。Go 风格的 layout：`{layoutType: gotime, layout: "2006-01-02T15:04:05Z07:00"}`。

**级别映射。** 不写 `mapping` 时识别标准词：`trace / debug / info / notice / warn(ing) / error / err / fatal / critical / emergency / alert`（不区分大小写）。预设自带各自的映射（glog 的 `I W E F`、Redis 的 `. - * #`），JSON 自动检测额外识别 pino 的数字级别。别的词自己映射：

```yaml
      severity: {field: level, mapping: {info: [notice, LOG], warn: [warning], error: [err, PANIC]}}
```

### 第 4 步：本地测试，不用部署

```bash
helm-charts/hack/test-rule.sh -f my-values.yaml -n shop -c checkout checkout.log
```

需要 `helm`、`yq`、`docker`。它用你的 values 渲染出 Agent 的解析配置，用真实的 Collector 镜像跑一遍样例，几秒后打印每条记录：

```
Timestamp: 2026-09-10 09:09:15.866 +0000 UTC
SeverityText: INFO
Body: Str(2026-09-10T09:09:15.866Z info 	[Job.health] loads=0/4)
Attributes:
     -> dog.log.rule: Str(checkout)
     -> level: Str(info)
     -> msg: Str([Job.health] loads=0/4)
```

看三样：`dog.log.rule` 是不是你的规则名（不是说明 selector 没命中）；`Timestamp` 是不是日志里的时间（不是说明 `ts` 分组或 layout 错了，会退回容器写入时间）；`SeverityText` 是不是标准词。正则不匹配的行原样放行：被规则认领，但没有级别和解析字段；测试脚本跑规则时把解析错误打开，所以会对这种行打印 `regex pattern does not match`。集群里这类失败默认静音（`quiet: true`），排查时给规则加 `quiet: false` 就能看到每一条不匹配的行。

### 第 5 步：部署并验证

```bash
helm upgrade dog-k8s-collector ./dog-k8s-collector -n dog -f my-values.yaml
```

Agent 会滚动重启（每节点一个，一分钟内完成）。两分钟后：

```sql
SELECT cast(log_attributes['dog.log.rule'] as string) AS rule, severity_text, count(*)
FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute
  AND cast(resource_attributes['k8s.container.name'] as string) = 'checkout'
GROUP BY 1, 2;
```

`rule` 应该是 `checkout`，`severity_text` 应该有值。Logs Explorer 面板右上角的 **Records by rule** 和 **Unparsed (no severity)** 是同一个信息的图形版：认领了记录但从不匹配的规则，表现为该规则下的记录没有级别。

### 常见错误

| 现象 | 原因 |
|---|---|
| `dog.log.rule` 为空 | selector 写的是 Pod 名或 Deployment 名；或者正则没加 `^…$` 锚点，被前面一条更宽的规则先认领了（规则按顺序，先到先得） |
| 时间戳全是采集时间 | `ts` 分组名写错、layout 与实际格式不符（常见：`,` 和 `.` 分隔毫秒不一致）、或行没被正则匹配 |
| 时间差 8 小时 | 日志不带时区而容器不是 UTC，缺 `timestamp.timezone`；或者日志带 `Z` 但 layout 写成了字面量 `Z` 而不是 `%z` |
| 堆栈每行一条记录 | 没写 `multiline.firstLinePattern` |
| 不相干的行被粘成一条 | `firstLinePattern` 太窄，没覆盖所有正常行的开头 |
| Agent 启动失败，日志里 `invalid regex` | Go RE2 不支持 lookahead；`\d` 之类在 YAML 单引号里没问题，双引号里要写 `\\d` |

---

## 4. 指标与 Kubernetes Events

默认全开，正常情况不用动。

```yaml
presets:
  kubeletMetrics: {enabled: true, interval: 15s}     # 节点 / Pod / 容器 / 卷的 CPU、内存、网络、文件系统
  hostMetrics: {enabled: true, interval: 15s}        # 节点自身：cpu、memory、disk、filesystem、network、load
  clusterMetrics: {enabled: true, interval: 30s}     # Deployment 可用副本、节点状态、Pod phase、配额……
  kubernetesEvents: {enabled: true}                  # 以日志存储；Gateway 给它们 service_name kubernetes-events
  selfMonitoring: {enabled: true}                    # 采集器自己的队列、失败、拒绝计数
```

**抓应用的 Prometheus 指标。** 给 Pod 打注解，Agent 按节点分片抓取：

```yaml
presets:
  prometheusScrape: {enabled: true, interval: 30s}
```

```yaml
# 应用的 Pod 模板
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "9090"
  prometheus.io/path: "/metrics"
```

要抓不带注解的目标，`presets.prometheusScrape.extraScrapeConfigs` 接受原生 Prometheus `scrape_configs`。

**指标存在哪。** 按类型分表：`otel_metrics_gauge`、`otel_metrics_sum`、`otel_metrics_histogram`、`otel_metrics_exponential_histogram`、`otel_metrics_summary`。查询时先看 `metric_name` 在哪张表：

```sql
SELECT metric_name, count(*) FROM otel.otel_metrics_gauge
WHERE timestamp > now() - interval 5 minute GROUP BY 1 ORDER BY 1;
```

**Events。** 存在 `otel_logs`，`log_attributes['k8s.resource.name'] = 'events'`，body 是 Event 对象的 JSON：

```sql
SELECT timestamp, json_extract_string(body, '$.object.type') type,
       json_extract_string(body, '$.object.reason') reason,
       json_extract_string(body, '$.object.regarding.name') object,
       json_extract_string(body, '$.object.note') note
FROM otel.otel_logs
WHERE cast(log_attributes['k8s.resource.name'] as string) = 'events'
  AND json_extract_string(body, '$.object.type') = 'Warning'
ORDER BY timestamp DESC LIMIT 50;
```

Kubernetes Events 面板就是这条查询的图形版。

---

## 5. 节点本地 OTLP 入口

应用用 OpenTelemetry SDK 打点（链路、指标、结构化日志）时，两个入口：

| 入口 | 地址 | 什么时候用 |
|---|---|---|
| 节点本地 Agent | `http://$(HOST_IP):4318`（HTTP）/ `$(HOST_IP):4317`（gRPC） | 首选。Agent 会给数据补上 Pod、命名空间、工作负载等 K8s 元数据 |
| Gateway | `http://dog-ai-observe-stack-otel-gateway.dog.svc:4318` | 集群外的应用，或不需要 K8s 元数据 |

节点本地入口要先暴露到节点端口：

```yaml
presets:
  otlp:
    hostPortHttp: 4318
    hostPortGrpc: 4317
```

应用的 Pod 模板里：

```yaml
env:
  - name: HOST_IP
    valueFrom: {fieldRef: {fieldPath: status.hostIP}}
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: http://$(HOST_IP):4318
  - name: OTEL_SERVICE_NAME
    value: checkout
```

`service_name` 的规则：SDK 设了 `service.name` 就用它；没设的话 Gateway 按 Deployment → StatefulSet → DaemonSet → CronJob → Job → Pod 的顺序取工作负载名。不改代码也能指定：给 Pod 加注解 `resource.opentelemetry.io/service.name: checkout`。

---

## 6. 扩缩容与资源

### Agent（每节点一个）

节点增减时 DaemonSet 自动跟随，不需要操作。要调的是单个 Agent 的资源：

```yaml
agent:
  resources:
    requests: {cpu: 100m, memory: 128Mi}
    limits:   {cpu: 1,    memory: 512Mi}
```

参考点：单节点 k3s 上采集 litefuse 的七个容器（每分钟约 3 000 行，含七条解析规则），Agent 稳定在约 10 m CPU、31 MiB 内存，用量大致随行数线性增长。日志量大的节点把 memory limit 提到 1 GiB 即可，`memoryLimiter` 是相对 limit 的百分比，改 limit 不用改它。

Agent 到 Gateway 的队列 `agent.queueSize`（默认 20 000 条）决定 Gateway 短暂不可用时节点上能缓冲多少；它持久化在节点的 `/var/lib/otelcol`，Agent 重启不丢。

不想在某些节点跑（比如 GPU 节点）：

```yaml
agent:
  nodeSelector: {node-role.kubernetes.io/observability: "true"}
  tolerations: []        # 默认是 operator: Exists，会跑到所有节点包括控制面
```

### Cluster 采集器

一个副本就够，它的负载只和集群对象数量有关。要高可用时开两个，leader 选举保证只有一个在采：

```yaml
cluster:
  replicas: 2
  leaderElection: {enabled: true}
```

大集群（Pod 数上万）把内存 limit 提到 1 GiB，`presets.clusterMetrics.interval` 拉长到 60s。

## 7. 排障

| 现象 | 看哪里 | 原因与处理 |
|---|---|---|
| `helm install` 报 `gateway.endpoint is required` | | 填 Gateway 的 OTLP gRPC 地址，`host:4317` |
| `helm install` 报 `values key "collectors" belongs to ...` | | 预发布版的布局；改用 `presets.*`、`agent`、`cluster`、`clusterName`、`platform`、`gateway.endpoint` |
| `helm install` 报 `additional properties 'xxx' not allowed` | | 顶层键拼错，schema 拒绝 |
| Agent CrashLoop，日志 `permission denied` `/var/log/pods` | `kubectl logs ds/…-agent` | PodSecurity，给命名空间打 `privileged` 标签 |
| Agent CrashLoop，日志 `journalctl not found` | | `presets.journald.enabled` 开了但镜像没有 journalctl，关掉或换镜像 |
| Agent CrashLoop，日志 `unknown time zone` | | 规则写了时区名但节点没有 `/usr/share/zoneinfo`（`agent.tzdata.hostPath`）；用 UTC 或换 contrib 镜像 |
| Agent 日志对 Gateway `connection refused` / `Unavailable` | | `gateway.endpoint` 不对、Gateway 没起来或有网络策略；期间记录在节点上排队 |
| 某个命名空间没日志 | `helm get values dog-k8s-collector -n dog` | `logs.namespaces` / `containers.exclude` 排除了；或文件在安装前就存在且 `startAt: end` |
| 日志有但 `service_name` 为空 | | 资源上没有工作负载属性，通常是 k8s_attributes 没拿到 Pod 信息：看 Agent 日志有没有 RBAC `forbidden` |
| 规则没生效 | 第 3 节 | 容器名写错、规则顺序、正则不匹配 |
| 数据到得晚，Collector Self-Monitoring 上 `otelcol_exporter_queue_size` 接近 `agent.queueSize` | Collector Self-Monitoring 面板 | Gateway 写入跟不上；队列满时阻塞（`block_on_overflow`），不丢数据但延迟变大：扩 Gateway（DOG Stack 手册第 5 节） |

看 Agent 最终生效的配置（含注释和规则名）：

```bash
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'
```

---

## 8. values 完整参考

| 键 | 默认 | 含义 |
|---|---|---|
| `gateway.endpoint` | （必填） | DOG Stack Gateway 的 OTLP gRPC 地址，`host:port` |
| `gateway.balancerName` | `""` | 配合 `dns:///…-headless…` 的 endpoint 用 `round_robin`，把采集器的 gRPC 连接分散到各 Gateway 副本；空 = 一条连接固定到一个副本 |
| `gateway.tls.insecure` | `true` | 到 Gateway 走明文 gRPC |
| `clusterName` | `""`（取 release 名） | 标在每条记录上的 `k8s.cluster.name` |
| `platform` | `generic` | `generic` / `k3s` / `eks` / `gke` / `aks` / `ack` / `openshift`，决定云探测器与 journald unit |
| `timezone` | `UTC` | 不带时区的日志行按哪个 IANA 时区解释，规则的 `timestamp.timezone` 可覆盖 |
| `imagePullSecrets` | `[]` | 两个工作负载的拉取凭据 |

### presets

| 键 | 默认 | 含义 |
|---|---|---|
| `presets.logsCollection.enabled` | `true` | 容器日志（agent）；细节在 `logs` |
| `presets.kubeletMetrics.enabled` / `interval` / `insecureSkipVerify` | `true` / `15s` / `true` | 节点、Pod、容器、卷指标，含 limit 利用率 |
| `presets.hostMetrics.enabled` / `interval` / `processes` | `true` / `15s` / `false` | 节点主机指标；进程指标需要 hostPID |
| `presets.clusterMetrics.enabled` / `interval` | `true` / `30s` | 集群对象指标（cluster 采集器） |
| `presets.kubernetesEvents.enabled` | `true` | Kubernetes Events 以日志形式（cluster 采集器） |
| `presets.otlp.enabled` / `hostPortGrpc` / `hostPortHttp` | `true` / `0` / `0` | 节点本地 OTLP 入口；暴露到节点的端口，0 不暴露 |
| `presets.prometheusScrape.enabled` / `interval` / `extraScrapeConfigs` | `false` / `30s` / `[]` | 按节点抓 `prometheus.io/scrape` 的 Pod（Pod 身份提升为资源属性，因而带上工作负载名和标签）；原生 scrape_configs |
| `presets.journald.enabled` / `directory` / `units` | `false` / `/var/log/journal` / 按平台 | 节点 journal，需要带 journalctl 的镜像 |
| `presets.kubernetesAttributes.labels` / `annotations` / `otelAnnotations` | 3 个 `app.kubernetes.io/*` 标签 / `[]` / `true` | 提取的 Pod 标签与注解；`resource.opentelemetry.io/*` 注解成为资源属性 |
| `presets.resourceDetection.enabled` / `extraDetectors` | `true` / `[]` | 云 / 集群探测 |
| `presets.selfMonitoring.enabled` | `true` | 每个采集器抓自己的 `:8888` |

### logs

| 键 | 默认 | 含义 |
|---|---|---|
| `logs.namespaces.include` / `exclude` | `["*"]` / `[]` | 采 / 跳过哪些命名空间（排除优先） |
| `logs.containers.exclude` | `[]` | 跳过的容器名 |
| `logs.excludePaths` | `[]` | `/var/log/pods` 下额外的排除 glob |
| `logs.startAt` | `end` | `end` 只读新行；`beginning` 首次安装回读 |
| `logs.maxLogSize` | `1MiB` | 单条上限 |
| `logs.dockerContainersPath` | `""` | Docker 运行时节点的 symlink 目标目录 |
| `logs.json.autodetect` | `true` | 自动解析没被规则认领的 JSON 行 |
| `logs.json.parseTimestamp` | `false` | 自动检测是否也解析时间戳（每个候选字段四个算子） |
| `logs.json.timestampFields` / `severityFields` / `messageFields` | `[time, timestamp, ts, @timestamp]` / `[level, severity]` / `[message, msg]` | 候选字段；也是显式 json 规则的默认 |
| `logs.multiline.enabled` / `firstLinePattern` | `false` / `""` | 全局堆栈合并 |
| `logs.rules[]` | `[]` | 解析规则，第 3 节 |

`logs.rules[]` 每条：`name`、`selector{namespace, container, bodyPrefix}`、`preset`、`regex`、`json{timestampFields, severityFields, messageFields}`、`format`（`none` / `json` / `regex`，不写则推断）、`timestamp{layout, layoutType, timezone}`、`severity{field, mapping}`、`multiline{firstLinePattern, maxLogSize, flushPeriod}`、`drop[]`、`quiet`（默认 `true`）。

### agent / cluster

| 键 | 默认 | 含义 |
|---|---|---|
| `agent.image.repository` / `tag` | `otel/opentelemetry-collector-k8s` / `0.160.0` | |
| `agent.resources` | 100m / 128Mi，1 / 512Mi | 每节点 |
| `agent.nodeSelector` / `tolerations` / `priorityClassName` | `{}` / `[operator: Exists]` / `""` | |
| `agent.storage.enabled` / `hostPath` | `true` / `/var/lib/otelcol` | 节点上的 offset 与持久化队列 |
| `agent.tzdata.hostPath` | `/usr/share/zoneinfo` | 节点时区数据库只读挂入；`""` 不挂 |
| `agent.memoryLimiter.limitPercentage` / `spikeLimitPercentage` | `75` / `20` | 相对内存 limit 的百分比 |
| `agent.queueSize` | `20000` | Gateway 不可达时每节点缓冲的记录数 |
| `agent.logging.level` | `info` | |
| `agent.extraConfig` | `{}` | 原生 Collector 配置，合并到生成的配置之上 |
| `cluster.image.repository` / `tag` | `otel/opentelemetry-collector-k8s` / `0.160.0` | |
| `cluster.replicas` | `1` | 多副本时走 leader 选举 |
| `cluster.resources` | 50m / 128Mi，500m / 512Mi | |
| `cluster.nodeSelector` / `tolerations` | `{}` / `[]` | |
| `cluster.leaderElection.enabled` | `true` | |
| `cluster.logging.level` / `extraConfig` | `info` / `{}` | |
