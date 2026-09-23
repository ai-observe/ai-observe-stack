# dog-k8s-collector

[English](./README.md) · **[上手指南](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/GETTING_STARTED_zh.md)**（端到端，两个 chart） · **[使用手册](./USER_GUIDE_zh.md)**（安装、日志规则与预设、指标、扩缩容、排障、values 参考） · [DOG Stack chart](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/ai-observe-stack/README_zh.md)

把一个 K8s 集群采进 DOG Stack（Doris + OpenTelemetry + Grafana）的 Gateway。两个工作负载，都往 Gateway 发 OTLP：

| 工作负载 | 怎么跑 | 采什么 |
|---|---|---|
| **agent**（DaemonSet） | 每节点一个，root | `/var/log/pods` 的容器 stdout / stderr（带 13 个预设的规则引擎）、kubelet 与节点指标、给 SDK 的节点本地 OTLP 入口、带 Prometheus 注解的 Pod，可选节点 journal |
| **cluster**（Deployment） | 一个副本，多副本 leader 选举 | 集群对象指标、Kubernetes Events |

两者是否部署由你开启的 `presets` 推导。前提是有一个在跑的 DOG Stack Gateway，它由 [`ai-observe-stack`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/ai-observe-stack/README_zh.md) chart 部署。

## 快速开始

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git && cd ai-observe-stack/helm-charts
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # 仅当启用了 PodSecurity restricted
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster --set platform=eks
kubectl -n dog get pods                                                      # 每节点一个 agent，一个 cluster 采集器
```

或者用 values 文件（`examples/dog-k8s-collector/values.yaml`）：

```yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: my-cluster
platform: generic                # generic | k3s | eks | gke | aks | ack | openshift
presets:                         # 除 prometheusScrape 和 journald 外默认全开
  logsCollection: {enabled: true}
  kubeletMetrics: {enabled: true}
  hostMetrics: {enabled: true}
  clusterMetrics: {enabled: true}
  kubernetesEvents: {enabled: true}
  otlp: {enabled: true}
logs:
  namespaces: {exclude: [kube-system]}
  rules: []                      # 你自己的日志格式，见下
```

不用 Helm：[`examples/dog-k8s-collector/kubectl/`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/examples/dog-k8s-collector/kubectl/) 是从这个 chart 生成的同一套对象的普通清单。

## 采什么

| 信号 | 采集器 | Receiver | 说明 |
|---|---|---|---|
| 所有命名空间的容器 stdout / stderr | agent | `file_log` 读 `/var/log/pods` | CRI 与 Docker 两种封装、partial 行拼接、JSON 行自动解析 |
| 节点、Pod、容器、卷指标 | agent | `kubelet_stats` | 含 CPU / 内存 limit 利用率 |
| 节点主机指标 | agent | `host_metrics` 读 `/hostfs` | cpu、memory、disk、filesystem、network、load |
| 集群对象（Deployment、StatefulSet、节点、Pod、配额……） | cluster | `k8s_cluster` | 节点状态、Pod phase 与状态原因 |
| Kubernetes Events | cluster | `k8s_objects`（watch） | 以日志形式存储，`service_name` 为 `kubernetes-events` |
| 应用 OTLP | agent（节点本地） | `otlp` | `presets.otlp.hostPortHttp` 可把 4318 暴露到节点 |
| 带 Prometheus 注解的 Pod | agent | `prometheus` | 默认关闭（`presets.prometheusScrape.enabled`） |
| 节点 journal（kubelet、containerd） | agent | `journald` | 默认关闭：镜像里没有 `journalctl` |

Agent 以 root 运行，挂载 `/var/log/pods`、`/`（只读）和 `/var/lib/otelcol`；启用 PodSecurity `restricted` 的命名空间需要打 `privileged` 标签。`platform`（`generic`、`k3s`、`eks`、`gke`、`aks`、`ack`、`openshift`）决定云资源探测器和 journald 的 unit 名。

## 日志解析规则

规则按顺序求值，第一条 selector 命中的规则认领该记录，并把规则名写进 `log_attributes["dog.log.rule"]`。没人认领的记录照样入库，时间戳取容器写入时间，没有级别。没有规则认领的 JSON 行会被自动解析（`logs.json.autodetect`）。

```yaml
logs:
  rules:
    - name: checkout                                   # 字段名不常见的 JSON
      selector: {namespace: "^shop$", container: "^checkout$"}
      json: {timestampFields: [event_time], severityFields: [lvl], messageFields: [event]}
      drop: ['"event":"healthcheck"']

    - name: billing                                    # 内置预设
      selector: {container: "^billing$"}
      preset: java-spring

    - name: worker                                     # 自己写正则
      selector: {container: "^worker$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\S+Z)\s+(?P<level>[a-z]+)\s+(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}
```

| 字段 | 含义 |
|---|---|
| `selector.namespace`、`selector.container` | 对 K8s 名字的正则 |
| `selector.bodyPrefix` | 对 body 的正则：同一容器混两种格式时用（如 Doris FE 的运行日志与审计日志） |
| `preset` | 下面预设之一；规则里显式写的键覆盖预设 |
| `format` | 由键推断（`regex` / `json` / 预设）；`none` 只认领不解析，配合 `drop` 用 |
| `regex` | Go RE2 命名分组；`ts` → 时间戳、`level` → 级别；body 保持整行，其余分组（含 `msg`）成为日志属性 |
| `timestamp` | `layout` + `layoutType`（`strptime`、`gotime`、`epoch`）+ `timezone`（IANA 名，日志不带时区时用） |
| `severity` | `field` 与可选 `mapping`（`{info: [...], warn: [...], error: [...]}`） |
| `multiline.firstLinePattern` | 把堆栈续行并入上一条记录（不设则关闭） |
| `drop` | 正则列表；命中的记录在节点上直接丢弃 |

预设在 `files/presets/logs/`：`json-generic`、`java-spring`、`python-logging`、`go-zap-console`、`glog`、`nginx-access`、`nginx-error`、`mysql`、`postgres`、`redis`、`doris-fe`、`doris-fe-audit`、`doris-be`。不部署就能测规则：`helm-charts/hack/test-rule.sh -f my-values.yaml -n <ns> -c <容器> sample.log`（在仓库的克隆里；示例和测试脚本不随打包的 chart 分发）。


## 参数

| 键 | 默认 | 含义 |
|---|---|---|
| `gateway.endpoint` | （必填） | Gateway 的 OTLP gRPC 地址 |
| `clusterName` | release 名 | 每条记录上的 `k8s.cluster.name` |
| `platform` | `generic` | 云资源探测器与 journald unit |
| `timezone` | `UTC` | 不带时区的日志行按哪个时区解释；规则级用 `timestamp.timezone` |
| `logs.namespaces.include` / `exclude`、`logs.containers.exclude` | 全部 / 无 | 采集范围 |
| `logs.json.autodetect` | `true` | 没有规则的 JSON 行自动解析 |
| `agent.resources` | 100m / 128Mi – 1 / 512Mi | 每节点 |
| `agent.queueSize` | `20000` | Gateway 不可达时每节点缓冲的记录数 |
| `agent.tolerations` | `operator: Exists` | 所有节点都跑，含控制面 |
| `cluster.replicas` | `1` | 多副本时走 leader 选举 |
| `agent.extraConfig` / `cluster.extraConfig` | `{}` | 原生 Collector 配置，合并到生成的配置之上 |

完整清单见[使用手册](./USER_GUIDE_zh.md)第 8 节。

## 验证

```bash
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'       # 应为空
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'   # 生成的配置，含注释
```

然后看 DOG Stack Grafana 里的 Logs Explorer 和 Kubernetes Events 面板，或直接查 Doris：

```sql
SELECT service_name, count(*) FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute GROUP BY 1 ORDER BY 2 DESC;
```
