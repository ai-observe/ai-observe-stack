# dog-k8s-collector

[中文文档](./README_zh.md) · **[Getting started](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/GETTING_STARTED.md)** (end to end, both charts) · **[User guide](./USER_GUIDE.md)** (install, log rules and presets, metrics, scaling, troubleshooting, values reference) · [DOG Stack chart](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/ai-observe-stack/README.md)

Collects a Kubernetes cluster into a DOG Stack (Doris + OpenTelemetry + Grafana) gateway. Two
workloads, both sending OTLP to the gateway:

| Workload | Runs | Collects |
|---|---|---|
| **agent** (DaemonSet) | one per node, as root | container stdout / stderr from `/var/log/pods` through a rules engine with 13 presets, kubelet and node metrics, a node-local OTLP entry point for SDKs, Prometheus-annotated pods, optionally the node journal |
| **cluster** (Deployment) | one replica, leader election when more | cluster object metrics, Kubernetes Events |

Which of the two run is derived from the `presets` you enable. The chart needs a running DOG
Stack gateway; it is deployed by the [`ai-observe-stack`](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/ai-observe-stack/README.md) chart.

## Quick start

```bash
helm repo add ai-observe-stack https://charts.velodb.io
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # only if PodSecurity restricted is enforced
helm install dog-k8s-collector ai-observe-stack/dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster --set platform=eks
kubectl -n dog get pods                                                      # one agent per node, one cluster collector
```

Or with a values file (`examples/dog-k8s-collector/values.yaml`):

```yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: my-cluster
platform: generic                # generic | k3s | eks | gke | aks | ack | openshift
presets:                         # all on by default except prometheusScrape and journald
  logsCollection: {enabled: true}
  kubeletMetrics: {enabled: true}
  hostMetrics: {enabled: true}
  clusterMetrics: {enabled: true}
  kubernetesEvents: {enabled: true}
  otlp: {enabled: true}
logs:
  namespaces: {exclude: [kube-system]}
  rules: []                      # your log formats, see below
```

Without Helm: [`examples/dog-k8s-collector/kubectl/`](https://github.com/bingquanzhao/ai-observe-stack/blob/master/helm-charts/examples/dog-k8s-collector/kubectl/) holds the
same objects as a plain manifest generated from this chart.

## What is collected

| Signal | Collector | Receiver | Notes |
|---|---|---|---|
| Container stdout / stderr of every namespace | agent | `file_log` on `/var/log/pods` | CRI and Docker envelopes, partial-line joining, JSON lines parsed automatically |
| Node, pod, container, volume metrics | agent | `kubelet_stats` | plus CPU / memory limit utilisation |
| Node host metrics | agent | `host_metrics` on `/hostfs` | cpu, memory, disk, filesystem, network, load |
| Cluster objects (deployments, statefulsets, nodes, pods, quotas…) | cluster | `k8s_cluster` | node conditions, pod phase and status reasons |
| Kubernetes Events | cluster | `k8s_objects` (watch) | stored as logs, `service_name` = `kubernetes-events` |
| OTLP from your applications | agent (node-local) | `otlp` | `presets.otlp.hostPortHttp` exposes 4318 on the node |
| Prometheus-annotated pods | agent | `prometheus` | off by default (`presets.prometheusScrape.enabled`) |
| Node journal (kubelet, containerd) | agent | `journald` | off by default: needs an image with `journalctl` |

The agent runs as root and mounts `/var/log/pods`, `/` (read-only) and `/var/lib/otelcol`;
namespaces enforcing PodSecurity `restricted` must be labelled `privileged`.
`platform` (`generic`, `k3s`, `eks`, `gke`, `aks`, `ack`, `openshift`) selects the cloud
resource detectors and the journald unit names.

## Log parsing rules

Rules are evaluated in order; the first whose selector matches a record claims it and stores its
name in `log_attributes["dog.log.rule"]`. Records nobody claims are still stored, with the container
write time as timestamp and no severity. JSON lines are parsed automatically (`logs.json.autodetect`)
when no rule claims them.

```yaml
logs:
  rules:
    - name: checkout                                   # JSON with unusual field names
      selector: {namespace: "^shop$", container: "^checkout$"}
      json: {timestampFields: [event_time], severityFields: [lvl], messageFields: [event]}
      drop: ['"event":"healthcheck"']

    - name: billing                                    # a built-in preset
      selector: {container: "^billing$"}
      preset: java-spring

    - name: worker                                     # your own regex
      selector: {container: "^worker$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\S+Z)\s+(?P<level>[a-z]+)\s+(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}
```

| Field | Meaning |
|---|---|
| `selector.namespace`, `selector.container` | Regex on the Kubernetes names |
| `selector.bodyPrefix` | Regex on the body: two formats in one container (e.g. Doris FE runtime vs audit lines) |
| `preset` | one of the presets below; keys you set in the rule override the preset's |
| `format` | inferred from the keys (`regex` / `json` / preset); `none` claims without parsing, useful with `drop` |
| `regex` | Go RE2 with named groups; `ts` → timestamp, `level` → severity; the body keeps the full line, every other group (including `msg`) becomes a log attribute |
| `timestamp` | `layout` + `layoutType` (`strptime`, `gotime`, `epoch`) + `timezone` (IANA name) for logs without a zone |
| `severity` | `field` and an optional `mapping` (`{info: [...], warn: [...], error: [...]}`) |
| `multiline.firstLinePattern` | Joins stack-trace continuation lines to the record above (off unless set) |
| `drop` | Regexes; matching records are discarded on the node |

Presets live in `files/presets/logs/`: `json-generic`, `java-spring`, `python-logging`,
`go-zap-console`, `glog`, `nginx-access`, `nginx-error`, `mysql`, `postgres`, `redis`, `doris-fe`,
`doris-fe-audit`, `doris-be`. Test a rule against a sample file without deploying:
`helm-charts/hack/test-rule.sh -f my-values.yaml -n <ns> -c <container> sample.log` (in a clone of the repository; examples and the tester are not part of the packaged chart).


## Settings

| Key | Default | Meaning |
|---|---|---|
| `gateway.endpoint` | (required) | OTLP gRPC address of the gateway |
| `clusterName` | release name | `k8s.cluster.name` on every record |
| `platform` | `generic` | cloud resource detectors and journald units |
| `timezone` | `UTC` | zone for log lines that print no zone; `timestamp.timezone` per rule |
| `logs.namespaces.include` / `exclude`, `logs.containers.exclude` | all / none | scope |
| `logs.json.autodetect` | `true` | JSON lines parsed without a rule |
| `agent.resources` | 100m / 128Mi – 1 / 512Mi | per node |
| `agent.queueSize` | `20000` | records buffered per node while the gateway is unreachable |
| `agent.tolerations` | `operator: Exists` | run on every node, control plane included |
| `cluster.replicas` | `1` | more replicas use leader election |
| `agent.extraConfig` / `cluster.extraConfig` | `{}` | raw collector config merged over the generated one |

The full list is in the [user guide](./USER_GUIDE.md), section 8.

## Verifying

```bash
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'       # should be empty
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'   # the generated config, comments included
```

Then the Logs Explorer and Kubernetes Events dashboards in the DOG Stack's Grafana, or in Doris:

```sql
SELECT service_name, count(*) FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute GROUP BY 1 ORDER BY 2 DESC;
```
