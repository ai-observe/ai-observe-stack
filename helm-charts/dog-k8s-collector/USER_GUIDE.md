# dog-k8s-collector User Guide

The chart collects a Kubernetes cluster into a DOG Stack gateway: an **agent** DaemonSet (one per node: container logs from `/var/log/pods`, kubelet and node metrics, a node-local OTLP entry point, Prometheus annotations) and a **cluster** Deployment (cluster metrics, Kubernetes Events). It needs a running gateway; installing the DOG Stack itself is the `ai-observe-stack` chart and [its guide](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/ai-observe-stack/USER_GUIDE.md). 中文版：[USER_GUIDE_zh.md](./USER_GUIDE_zh.md).

1. [Install](#1-install)
2. [Configuring log collection](#2-configuring-log-collection)
3. [Writing a parsing rule for your own service](#3-writing-a-parsing-rule-for-your-own-service)
4. [Metrics and Kubernetes Events](#4-metrics-and-kubernetes-events)
5. [Node-local OTLP entry point](#5-node-local-otlp-entry-point)
6. [Scaling and resources](#6-scaling-and-resources)
7. [Troubleshooting](#7-troubleshooting)
8. [Values reference](#8-values-reference)

---

## 1. Install

You need the gateway's OTLP gRPC address. For a DOG Stack installed by the `ai-observe-stack` chart as release `dog` in namespace `dog` it is `dog-ai-observe-stack-otel-gateway.dog.svc:4317`; the DOG Stack's NOTES print it.

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # only if PodSecurity restricted is enforced
helm install dog-k8s-collector ai-observe-stack/dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster --set platform=eks
kubectl -n dog get pods                                                      # one agent per node, one cluster collector
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'      # should print nothing
```

Or as a values file (`examples/dog-k8s-collector/values.yaml`):

```yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: my-cluster        # k8s.cluster.name on every record
platform: generic              # generic | k3s | eks | gke | aks | ack | openshift
```

`platform` selects the cloud resource detectors and journald unit names; everything else is the same on every platform. The agent runs as root and mounts `/var/log/pods`, `/` (read-only) and `/var/lib/otelcol`, hence the PodSecurity label. One release per cluster; several clusters can point at the same gateway, told apart by `clusterName`.

**What arrives.** Every container's stdout / stderr, each record carrying `k8s.namespace.name`, `k8s.pod.name`, `k8s.container.name`, the workload name (`k8s.deployment.name`, …), `k8s.node.name`, `k8s.cluster.name`, image name and tag, and the pod labels listed in `presets.kubernetesAttributes.labels`; `service_name` is the workload name unless the application set `service.name` itself. Metrics land in `otel_metrics_<type>`, Events in `otel_logs` with `service_name = kubernetes-events`. Right after the install the Logs Explorer dashboard only shows lines written from then on, because existing files are not re-read (`logs.startAt: end`).

**Without Helm**: `examples/dog-k8s-collector/kubectl/collectors.yaml` is generated from this chart; set the gateway address in `kubectl/values.yaml`, run `render.sh`, `kubectl apply` ([README](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/examples/dog-k8s-collector/kubectl/README.md)).

**Which presets run where**: `logsCollection`, `kubeletMetrics`, `hostMetrics`, `otlp`, `prometheusScrape`, `journald` run in the agent; `clusterMetrics` and `kubernetesEvents` in the cluster collector. Disable every preset of a group and that workload is not deployed.

---
## 2. Configuring log collection

Everything about logs lives under `logs` in values, with `presets.logsCollection.enabled` as the switch. The default behaviour: **every container in every namespace**, stdout and stderr, JSON lines parsed automatically, everything else stored as is.

### 2.1 What to collect

```yaml
logs:
  namespaces:
    include: ["*"]                         # or a list: [shop, payment]
    exclude: [kube-system, monitoring]
  containers:
    exclude: [istio-proxy, linkerd-proxy]  # container names, skipped in every namespace
```

Exclusions win over inclusions. The chart's own two pods (agent and cluster collector) are always excluded. A DOG Stack gateway in the same cluster with `gateway.debug.enabled: true` prints a copy of what it receives; exclude that pod with `logs.excludePaths` (or its namespace) to avoid a loop.

To see which file a record came from, `log_attributes['log.file.path']` holds the path on the node.

### 2.2 Re-reading old logs on first install

`logs.startAt: end` (default) reads only lines written after the install. `beginning` reads the files that already exist on the node once, **on the first install only**; afterwards the agent remembers its offsets. Old lines older than Doris' partition window (one day by default) are re-stamped by the gateway with the current time; the original goes to `log_attributes['log.original_time_unix_nano']`.

### 2.3 Applications that log JSON lines

Nothing to configure. Lines starting with `{` are parsed:

| Field | Keys tried, in order | Stored as |
|---|---|---|
| Severity | `level`, `severity` (words or pino numbers) | `severity_text` / `severity_number` |
| Message | `message`, `msg` | `body` |
| Everything else | | `log_attributes` |
| Timestamp | not parsed; the container runtime's write time is kept | `timestamp` |

The write time is within microseconds to milliseconds of the application's own timestamp and preserves ordering; this is also what the official chart and every distribution do by default, and it keeps the default configuration at 7 operators. To use the application's timestamp:

- globally, `logs.json.parseTimestamp: true`: auto-detection then tries `timestampFields` (`time`, `timestamp`, `ts`, `@timestamp`; RFC3339, date without `T`, epoch millis, epoch seconds), four operators per candidate field;
- for one service, a `format: json` rule (section 3): explicit rules always parse the timestamp.

If your field names are not in the lists, change the candidates:

```yaml
logs:
  json:
    severityFields: [lvl]
    messageFields: [event]
    timestampFields: [event_time]     # default for explicit json rules, or with parseTimestamp: true
```

Lists replace, they do not merge: `[lvl]` leaves exactly that one.

### 2.4 Applications that log text

Check for a preset first. `preset: <name>` is one line:

| Preset | For | Sample line |
|---|---|---|
| `java-spring` | Spring Boot 3 default console | `2026-09-10T10:00:00.123+08:00  INFO 1 --- [main] c.e.App : Started` |
| `python-logging` | `logging.basicConfig` default | `2026-09-10 10:00:00,123 - app.worker - WARNING - queue is full` |
| `go-zap-console` | zap console encoder | `2026-09-10T10:00:00.123+0800\tINFO\tmain.go:42\tlistening` |
| `glog` | C++ / Go glog, SeaweedFS | `I0909 09:41:28.262837  1234 file.cc:353] msg` |
| `nginx-access` | nginx combined access log | `10.0.0.1 - - [10/Sep/2026:10:00:00 +0000] "GET / HTTP/1.1" 200 612 "-" "curl"` |
| `nginx-error` | nginx error log | `2026/09/10 10:00:00 [error] 29#29: *1 open() failed` |
| `mysql` | MySQL 8 error log | `2026-09-10T02:00:00.123456Z 0 [Note] [MY-010116] [Server] msg` |
| `postgres` | official image default `log_line_prefix` | `2026-09-05 14:37:58.611 UTC [52] LOG:  checkpoint starting` |
| `redis` | Redis / Valkey | `1:M 09 Sep 2026 09:45:39.847 * Background saving terminated` |
| `doris-fe` | Doris FE runtime log | `RuntimeLogger 2026-09-09 09:47:49,347 INFO (thread\|id) [Class.m():1] msg` |
| `doris-fe-audit` | Doris FE audit log (same stream) | `AuditLogger 2026-09-10 02:45:19,580 [query] \|QueryId=...` |
| `doris-be` | Doris BE glog | `I20260909 09:45:27.241125 443 storage_engine.cpp:829] msg` |
| `json-generic` | single-line JSON | `{"ts":"...","level":"info","msg":"..."}` |

```yaml
logs:
  rules:
    - name: api
      selector: {namespace: "^shop$", container: "^api$"}
      preset: java-spring
```

Any key of a preset can be overridden in the rule, for example a PostgreSQL container whose zone is not UTC:

```yaml
    - name: pg
      selector: {container: "^postgresql$"}
      preset: postgres
      timestamp: {timezone: Asia/Shanghai}
```

No suitable preset: write a rule, section 5.

### 2.5 Stack traces (multiline)

Multiline joining is **off** by default, because one wrong "first line" pattern glues unrelated lines together. The presets `java-spring`, `python-logging`, `go-zap-console`, `mysql`, `postgres` and `doris-*` carry a suitable pattern. In your own rules, set it explicitly:

```yaml
      multiline:
        firstLinePattern: '^\d{4}-\d{2}-\d{2}T'   # only lines starting with a timestamp begin a record
```

A cluster with a single log format can turn on the global `logs.multiline.enabled: true` with a `firstLinePattern`. With the global switch on, presets and rules that carry their own pattern add a second join step (up to two more seconds of latency per record); use one or the other.

### 2.6 Dropping noise

Dropped on the node, never reaching the gateway or Doris:

```yaml
    - name: api
      selector: {container: "^api$"}
      preset: java-spring
      drop:
        - 'GET /healthz'
        - 'DEBUG'
```

To drop without parsing: `format: none` plus `drop`.

### 2.7 Two formats in one container

Use `selector.bodyPrefix` to split by line prefix, two rules on the same container. Doris FE is the example:

```yaml
    - name: fe
      selector: {container: "^fe$"}
      preset: doris-fe          # the preset carries bodyPrefix: ^RuntimeLogger
    - name: fe-audit
      selector: {container: "^fe$"}
      preset: doris-fe-audit    # the preset carries bodyPrefix: ^AuditLogger
```

---

## 3. Writing a parsing rule for your own service

Five steps, twenty minutes.

### Step 1: get the container name and a sample

A rule's selector matches the **container name**, not the pod or deployment name.

```bash
kubectl get pod -n shop -l app=checkout -o jsonpath='{.items[0].spec.containers[*].name}'
# checkout istio-proxy

kubectl logs -n shop -l app=checkout -c checkout --tail=20 > checkout.log
```

Keep a few lines, ideally including one error and a stack trace.

### Step 2: choose the format

- Lines start with `{` → JSON; a rule is only needed for unusual field names (``json.timestampFields` etc.).
- In the table of section 2.4 → `preset: <name>`.
- Neither → `format: regex`, continue.

### Step 3: write the regex

Go RE2 syntax with named groups. Three group names are special:

| Group | Role |
|---|---|
| `ts` | timestamp, parsed with `timestamp.layout` |
| `level` | severity, mapped by `severity` |
| `msg` | message (the body keeps the full line and `msg` becomes an attribute; JSON rules promote the message to the body) |

Other group names become `log_attributes` keys as they are. Skip what you do not need with non-capturing groups `(?:...)`.

For the sample line `2026-09-10T09:09:15.866Z info \t[Job.health] loads=0/4`:

```yaml
logs:
  rules:
    - name: checkout
      selector: {namespace: "^shop$", container: "^checkout$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s+(?P<level>[a-z]+)\s*(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}     # %z reads the trailing Z
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}
```

`(?s:.*)` lets `msg` span the joined lines. RE2 has no lookahead or lookbehind.

**Timestamp layout cheat sheet** (`layoutType: strptime`, the default):

| Token | Meaning | Token | Meaning |
|---|---|---|---|
| `%Y` `%m` `%d` | year month day | `%H` `%M` `%S` | hour minute second |
| `%L` | milliseconds (3 digits) | `%f` | microseconds (6 digits) |
| `%s` | nanoseconds (9 digits) | `%z` | zone offset `+0800` |
| `%Z` | zone name `UTC` | `%b` | month abbreviation `Sep` |
| `%y` | two-digit year | `%p` | AM / PM |

When the log line carries **no zone** (`2026-09-10 10:00:00,123`) it is read in `timezone` (UTC by default). For a container that is not on UTC, set it on the rule:

```yaml
      timestamp: {layout: "%Y-%m-%d %H:%M:%S,%L", timezone: Asia/Shanghai}
```

Any IANA name works: the agent mounts the node's `/usr/share/zoneinfo` read-only (`agent.tzdata.hostPath`). When the line **does** carry a zone (`Z`, `+08:00`), read it with `%z` in the layout; a literal `Z` would be treated as a zone-less time and re-read in `timezone`.

Epoch timestamps: `{layoutType: epoch, layout: ms}` (`s` / `ms` / `ns`). Go-style layouts: `{layoutType: gotime, layout: "2006-01-02T15:04:05Z07:00"}`.

**Severity mapping.** Without `mapping`, the standard words are recognised: `trace / debug / info / notice / warn(ing) / error / err / fatal / critical / emergency / alert` (case-insensitive). Presets carry their own mappings (glog's `I W E F`, Redis' `. - * #`), JSON auto-detection also understands pino's numeric levels. Map anything else yourself:

```yaml
      severity: {field: level, mapping: {info: [notice, LOG], warn: [warning], error: [err, PANIC]}}
```

### Step 4: test locally, without deploying

```bash
helm-charts/hack/test-rule.sh -f my-values.yaml -n shop -c checkout checkout.log
```

Needs `helm`, `yq` and `docker`. It renders the agent's parsing configuration from your values, runs the sample through the real collector image, and prints every record after a few seconds:

```
Timestamp: 2026-09-10 09:09:15.866 +0000 UTC
SeverityText: INFO
Body: Str(2026-09-10T09:09:15.866Z info 	[Job.health] loads=0/4)
Attributes:
     -> dog.log.rule: Str(checkout)
     -> level: Str(info)
     -> msg: Str([Job.health] loads=0/4)
```

Look at three things: `dog.log.rule` is your rule's name (if not, the selector did not match); `Timestamp` is the time from the line (if not, the `ts` group or the layout is wrong and the record fell back to the container write time); `SeverityText` is a standard word. A line the regex does not match passes through unchanged, claimed by the rule but without severity or parsed fields; the tester runs the rules with parse errors visible, so it prints `regex pattern does not match` for such lines. In the cluster these failures are silent by default (`quiet: true`); set `quiet: false` on a rule to log every mismatching line while debugging.

### Step 5: deploy and verify

```bash
helm upgrade dog-k8s-collector ai-observe-stack/dog-k8s-collector -n dog -f my-values.yaml
```

The agents restart (one per node, within a minute). Two minutes later:

```sql
SELECT cast(log_attributes['dog.log.rule'] as string) AS rule, severity_text, count(*)
FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute
  AND cast(resource_attributes['k8s.container.name'] as string) = 'checkout'
GROUP BY 1, 2;
```

`rule` should be `checkout` and `severity_text` should be set. The **Records by rule** and **Unparsed (no severity)** panels at the top of Logs Explorer show the same thing graphically: a rule that claims records but never matches shows up as records of that rule with no severity.

### Common mistakes

| Symptom | Cause |
|---|---|
| `dog.log.rule` is empty | the selector uses the pod or deployment name; or the regex has no `^…$` anchors and an earlier, wider rule claimed the record (rules are evaluated in order, first match wins) |
| every timestamp is the collection time | wrong `ts` group name, layout does not match (typically `,` vs `.` before the millis), or the regex did not match |
| times are off by hours | the line has no zone and the container is not on UTC, `timestamp.timezone` missing; or the line ends in `Z` but the layout spells a literal `Z` instead of `%z` |
| one record per stack-trace line | no `multiline.firstLinePattern` |
| unrelated lines glued together | `firstLinePattern` too narrow, it does not match every normal line |
| agent fails to start with `invalid regex` | RE2 has no lookahead; `\d` is fine inside YAML single quotes, inside double quotes it must be `\\d` |

---

## 4. Metrics and Kubernetes Events

Everything is on by default and normally needs no change.

```yaml
presets:
  kubeletMetrics: {enabled: true, interval: 15s}     # node / pod / container / volume CPU, memory, network, filesystem
  hostMetrics: {enabled: true, interval: 15s}        # the node itself: cpu, memory, disk, filesystem, network, load
  clusterMetrics: {enabled: true, interval: 30s}     # deployment availability, node conditions, pod phase, quotas…
  kubernetesEvents: {enabled: true}                  # stored as logs; the gateway names them kubernetes-events
  selfMonitoring: {enabled: true}                    # the collectors' own queues, failures, refusals
```

**Scraping application Prometheus metrics.** Annotate the pods; the agent scrapes them, sharded per node:

```yaml
presets:
  prometheusScrape: {enabled: true, interval: 30s}
```

```yaml
# the application's pod template
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "9090"
  prometheus.io/path: "/metrics"
```

For targets without annotations, `presets.prometheusScrape.extraScrapeConfigs` takes raw Prometheus `scrape_configs`.

**Where metrics are stored.** One table per type: `otel_metrics_gauge`, `otel_metrics_sum`, `otel_metrics_histogram`, `otel_metrics_exponential_histogram`, `otel_metrics_summary`. Find the table of a `metric_name` first:

```sql
SELECT metric_name, count(*) FROM otel.otel_metrics_gauge
WHERE timestamp > now() - interval 5 minute GROUP BY 1 ORDER BY 1;
```

**Events** are stored in `otel_logs` with `log_attributes['k8s.resource.name'] = 'events'`; the body is the Event object as JSON:

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

The Kubernetes Events dashboard is this query drawn.

---

## 5. Node-local OTLP entry point

For applications instrumented with an OpenTelemetry SDK (traces, metrics, structured logs) there are two entry points:

| Entry point | Address | When |
|---|---|---|
| node-local agent | `http://$(HOST_IP):4318` (HTTP) / `$(HOST_IP):4317` (gRPC) | preferred: the agent adds pod, namespace and workload metadata |
| gateway | `http://dog-ai-observe-stack-otel-gateway.dog.svc:4318` | applications outside the cluster, or when Kubernetes metadata is not needed |

The node-local entry must first be exposed on the node:

```yaml
presets:
  otlp:
    hostPortHttp: 4318
    hostPortGrpc: 4317
```

In the application's pod template:

```yaml
env:
  - name: HOST_IP
    valueFrom: {fieldRef: {fieldPath: status.hostIP}}
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: http://$(HOST_IP):4318
  - name: OTEL_SERVICE_NAME
    value: checkout
```

`service_name` rules: if the SDK sets `service.name` it is used; otherwise the gateway takes the workload name in the order Deployment → StatefulSet → DaemonSet → CronJob → Job → Pod. Without touching code: annotate the pod with `resource.opentelemetry.io/service.name: checkout`.

---

## 6. Scaling and resources

### Agent (one per node)

The DaemonSet follows node additions and removals by itself. What you tune is the resources of one agent:

```yaml
agent:
  resources:
    requests: {cpu: 100m, memory: 128Mi}
    limits:   {cpu: 1,    memory: 512Mi}
```

Reference point: on a single-node k3s cluster collecting the seven litefuse containers (about 3 000 lines per minute, seven parsing rules) the agent sits at about 10 m CPU and 31 MiB, growing roughly linearly with the line rate. On busy nodes raise the memory limit to 1 GiB; `memoryLimiter` is a percentage of the limit, so it needs no change.

The agent-to-gateway queue `agent.queueSize` (20 000 records by default) is how much a node buffers while the gateway is unavailable; it is persisted under `/var/lib/otelcol` on the node and survives agent restarts.

To keep the agent off some nodes (GPU nodes, say):

```yaml
agent:
  nodeSelector: {node-role.kubernetes.io/observability: "true"}
  tolerations: []        # default is operator: Exists, which also runs on control-plane nodes
```

### Cluster collector

One replica is enough; its load depends only on the number of objects in the cluster. For availability run two, leader election keeps one active:

```yaml
cluster:
  replicas: 2
  leaderElection: {enabled: true}
```

On large clusters (tens of thousands of pods) raise the memory limit to 1 GiB and `presets.clusterMetrics.interval` to 60s.

## 7. Troubleshooting

| Symptom | Where to look | Cause and fix |
|---|---|---|
| `helm install` says `gateway.endpoint is required` | | set it to the gateway's OTLP gRPC address, `host:4317` |
| `helm install` says `values key "collectors" belongs to ...` | | pre-release layout; use `presets.*`, `agent`, `cluster`, `clusterName`, `platform`, `gateway.endpoint` |
| `helm install` says `additional properties 'xxx' not allowed` | | a top-level key is misspelt, the schema rejects it |
| agent CrashLoop, log says `permission denied` on `/var/log/pods` | `kubectl logs ds/…-agent` | PodSecurity: label the namespace `privileged` |
| agent CrashLoop, log says `journalctl not found` | | `presets.journald.enabled` is on but the image has no journalctl; turn it off or use another image |
| agent CrashLoop, log says `unknown time zone` | | a rule names a zone but the node has no `/usr/share/zoneinfo` (`agent.tzdata.hostPath`); use UTC or the contrib image |
| agent log `connection refused` / `Unavailable` to the gateway | | `gateway.endpoint` wrong, gateway not up, or a network policy; records are queued on the node meanwhile |
| a namespace has no logs | `helm get values dog-k8s-collector -n dog` | excluded by `logs.namespaces` / `containers.exclude`; or the file existed before the install and `startAt: end` |
| logs arrive but `service_name` is empty | | no workload attributes on the resource, usually k8s_attributes could not read pods: look for RBAC `forbidden` in the agent log |
| a rule has no effect | section 3 | wrong container name, rule order, regex does not match |
| records arrive late, `otelcol_exporter_queue_size` near `agent.queueSize` on Collector Self-Monitoring | Collector Self-Monitoring dashboard | the gateway cannot keep up; the queue blocks on overflow (`block_on_overflow`), so nothing is dropped but latency grows: scale the gateway (DOG Stack guide, section 5) |

To see the configuration the agent actually runs (comments and rule names included):

```bash
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'
```

---

## 8. Values reference

| Key | Default | Meaning |
|---|---|---|
| `gateway.endpoint` | (required) | OTLP gRPC address of the DOG Stack gateway, `host:port` |
| `gateway.balancerName` | `""` | `round_robin` with a `dns:///…-headless…` endpoint spreads a collector's gRPC connection over gateway replicas; empty = one connection to one replica |
| `gateway.tls.insecure` | `true` | plaintext gRPC to the gateway |
| `clusterName` | `""` (release name) | `k8s.cluster.name` stamped on every record |
| `platform` | `generic` | `generic` / `k3s` / `eks` / `gke` / `aks` / `ack` / `openshift`; selects cloud detectors and journald units |
| `timezone` | `UTC` | IANA zone for log lines without one; a rule's `timestamp.timezone` overrides it |
| `imagePullSecrets` | `[]` | pull secrets for both workloads |

### presets

| Key | Default | Meaning |
|---|---|---|
| `presets.logsCollection.enabled` | `true` | container logs (agent); details under `logs` |
| `presets.kubeletMetrics.enabled` / `interval` / `insecureSkipVerify` | `true` / `15s` / `true` | node, pod, container, volume metrics plus limit utilisation |
| `presets.hostMetrics.enabled` / `interval` / `processes` | `true` / `15s` / `false` | node host metrics; processes need hostPID |
| `presets.clusterMetrics.enabled` / `interval` | `true` / `30s` | cluster object metrics (cluster collector) |
| `presets.kubernetesEvents.enabled` | `true` | Kubernetes Events as logs (cluster collector) |
| `presets.otlp.enabled` / `hostPortGrpc` / `hostPortHttp` | `true` / `0` / `0` | node-local OTLP entry; ports exposed on the node, 0 = not exposed |
| `presets.prometheusScrape.enabled` / `interval` / `extraScrapeConfigs` | `false` / `30s` / `[]` | scrape `prometheus.io/scrape` pods per node (pod identity promoted to resource attributes, so the workload name and labels are attached); raw scrape_configs |
| `presets.journald.enabled` / `directory` / `units` | `false` / `/var/log/journal` / per platform | node journal, needs an image with journalctl |
| `presets.kubernetesAttributes.labels` / `annotations` / `otelAnnotations` | 3 `app.kubernetes.io/*` labels / `[]` / `true` | pod labels and annotations extracted; `resource.opentelemetry.io/*` annotations become resource attributes |
| `presets.resourceDetection.enabled` / `extraDetectors` | `true` / `[]` | cloud / cluster detection |
| `presets.selfMonitoring.enabled` | `true` | each collector scrapes its own `:8888` |

### logs

| Key | Default | Meaning |
|---|---|---|
| `logs.namespaces.include` / `exclude` | `["*"]` / `[]` | namespaces to read / skip (exclusions win) |
| `logs.containers.exclude` | `[]` | container names to skip |
| `logs.excludePaths` | `[]` | extra exclude globs under `/var/log/pods` |
| `logs.startAt` | `end` | `end` only new lines; `beginning` re-reads once on first install |
| `logs.maxLogSize` | `1MiB` | maximum record size |
| `logs.dockerContainersPath` | `""` | symlink target directory on Docker-runtime nodes |
| `logs.json.autodetect` | `true` | parse JSON lines that no rule claimed |
| `logs.json.parseTimestamp` | `false` | auto-detection also parses the timestamp (four operators per candidate field) |
| `logs.json.timestampFields` / `severityFields` / `messageFields` | `[time, timestamp, ts, @timestamp]` / `[level, severity]` / `[message, msg]` | candidate fields; also the defaults of explicit json rules |
| `logs.multiline.enabled` / `firstLinePattern` | `false` / `""` | cluster-wide stack-trace joining |
| `logs.rules[]` | `[]` | parsing rules, section 3 |

Each `logs.rules[]` entry: `name`, `selector{namespace, container, bodyPrefix}`, `preset`, `regex`, `json{timestampFields, severityFields, messageFields}`, `format` (`none` / `json` / `regex`; inferred when omitted), `timestamp{layout, layoutType, timezone}`, `severity{field, mapping}`, `multiline{firstLinePattern, maxLogSize, flushPeriod}`, `drop[]`, `quiet` (default `true`).

### agent / cluster

| Key | Default | Meaning |
|---|---|---|
| `agent.image.repository` / `tag` | `otel/opentelemetry-collector-k8s` / `0.160.0` | |
| `agent.resources` | 100m / 128Mi, 1 / 512Mi | per node |
| `agent.nodeSelector` / `tolerations` / `priorityClassName` | `{}` / `[operator: Exists]` / `""` | |
| `agent.storage.enabled` / `hostPath` | `true` / `/var/lib/otelcol` | file offsets and the persisted queue on the node |
| `agent.tzdata.hostPath` | `/usr/share/zoneinfo` | node zone database mounted read-only; `""` disables |
| `agent.memoryLimiter.limitPercentage` / `spikeLimitPercentage` | `75` / `20` | percent of the memory limit |
| `agent.queueSize` | `20000` | records buffered per node while the gateway is unreachable |
| `agent.logging.level` | `info` | |
| `agent.extraConfig` | `{}` | raw collector config merged over the generated one |
| `cluster.image.repository` / `tag` | `otel/opentelemetry-collector-k8s` / `0.160.0` | |
| `cluster.replicas` | `1` | several replicas use leader election |
| `cluster.resources` | 50m / 128Mi, 500m / 512Mi | |
| `cluster.nodeSelector` / `tolerations` | `{}` / `[]` | |
| `cluster.leaderElection.enabled` | `true` | |
| `cluster.logging.level` / `extraConfig` | `info` / `{}` | |
