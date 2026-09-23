# AIObserve Stack Helm Chart

> Upgrading from 0.1.x? 0.2.0 is a breaking release: new values layout, renamed gateway objects,
> and the Kubernetes collectors moved to the `dog-k8s-collector` chart. Read [UPGRADING.md](./UPGRADING.md) first.

[中文文档](./README_zh.md) · **[Getting started](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/GETTING_STARTED.md)** (end to end, both charts) · **[User guide](./USER_GUIDE.md)** (install, send data, scale, troubleshoot, full values reference)

**AIObserve Stack** (the *DOG Stack*: **D**oris + **O**penTelemetry + **G**rafana) is an
observability backend: an OpenTelemetry gateway that receives OTLP, Apache Doris that stores logs,
metrics and traces, and Grafana with the Doris app plugin to look at them. Anything that speaks
OTLP can send to it: SDKs, other collectors, and the companion `dog-k8s-collector` chart.

## What a default install deploys

```
  applications, SDKs, other collectors ──── OTLP ────┐
  dog-k8s-collector (agent + cluster collector) ─────┤
                                                     ▼
              ┌──────────────────────────────────────────────┐
  gateway     │ OpenTelemetry Collector (StatefulSet, PVC)    │  service.name derivation,
              │   otel/opentelemetry-collector-contrib 0.160  │  timestamp guard, Stream Load
              └──────────────────────┬───────────────────────┘
                                     ▼
              ┌──────────────────────────────────────────────┐
  doris       │ Apache Doris (operator-managed or external)   │  otel_logs, otel_traces,
              └──────────────────────┬───────────────────────┘  otel_metrics_<type>
                                     ▼
              ┌──────────────────────────────────────────────┐
  grafana     │ Grafana 11 + Doris app plugin + dashboards    │
              └──────────────────────────────────────────────┘
```

The gateway never collects. It is the only component that talks to Doris, holds the only Doris
credentials and a persisted queue. Collecting a Kubernetes cluster is the separate
`dog-k8s-collector` chart, which sends to the gateway like any other source.

## Prerequisites

- Kubernetes 1.24+ and Helm 3.8+
- A PersistentVolume provisioner (gateway queue, Doris when deployed by the operator)
- External Doris: a user with `CREATE DATABASE` (or pre-created tables and
  `gateway.dorisExporter.createSchema=false`)

## Quick start

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/helm-charts
helm dependency update ./ai-observe-stack  # fetches the Doris Operator subchart; required in every Doris mode
```

**With Doris deployed by the chart** (the Doris Operator is a dependency):

```bash
helm install dog ./ai-observe-stack -n dog --create-namespace
```

**Against an existing Doris cluster**:

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

Then:

```bash
kubectl get pods -n dog                 # gateway-0/1, grafana (and Doris in internal mode)
helm test dog -n dog --logs             # sends one log record through the gateway, checks Doris
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d
```

Send OTLP to `dog-ai-observe-stack-otel-gateway.dog.svc:4317` (gRPC) or `:4318` (HTTP).

## Collecting a Kubernetes cluster

That is the separate [`dog-k8s-collector`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/dog-k8s-collector/README.md) chart: an agent
DaemonSet (container logs with a rules engine and presets, kubelet and node metrics, node-local
OTLP entry, Prometheus annotations) and a cluster Deployment (cluster metrics, Kubernetes
Events), installed once per cluster and pointed at this gateway:

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 --set clusterName=my-cluster
```

[`helm-charts/examples/dog-k8s-collector/`](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/examples/dog-k8s-collector/) has values files, the
litefuse reference deployment and a plain `kubectl` manifest for clusters without Helm.

## Doris and credentials

| Key | Default | Meaning |
|---|---|---|
| `doris.mode` | `internal` | `internal` deploys Doris with the operator; `external` uses yours |
| `doris.database` | `otel` | Created by the gateway when `createSchema` is on |
| `doris.external.host` / `port` / `feHttpPort` | – / `9030` / `8030` | MySQL port for schema and Grafana, FE HTTP for Stream Load |
| `doris.external.user` / `password` | `root` / `""` | Written into `<release>-ai-observe-stack-doris-credentials` |
| `doris.external.existingSecret` | `""` | Use your own Secret (`userKey` / `passwordKey` name the keys) |
| `gateway.dorisExporter.createHistoryDays` | `1` | Days of past partitions the exporter creates |
| `gateway.dorisExporter.historyDays` | `7` | Retention |
| `gateway.dorisExporter.sendingQueue` | 50 000 items, batches 8 192–16 384 | Persisted on the gateway PVC |
| `gateway.dorisExporter.retryMaxElapsedTime` | `10m` | A batch Doris keeps rejecting is dropped after this, with an error log |
| `gateway.timeGuard` | on | Timestamps outside the partition window are replaced by the observed time (original kept in `log.original_time_unix_nano`) |

Credentials only ever exist in Secrets: Doris in `<release>-ai-observe-stack-doris-credentials` (or
`doris.external.existingSecret`), Grafana admin in `<release>-ai-observe-stack-grafana-admin` (or
`grafana.existingSecret`). The gateway, Grafana and the `helm test` pod read them as environment
variables; nothing lands in a ConfigMap.

## Gateway settings

| Key | Default | Meaning |
|---|---|---|
| `gateway.replicas` | `2` | StatefulSet, one PVC each |
| `gateway.persistence.size` | `10Gi` | Queue and optional collector log files |
| `gateway.memoryLimiter.limitPercentage` | `75` | Percent of the container memory limit |
| `gateway.maxRecvMsgSizeMib` | `64` | Largest OTLP/gRPC request accepted |
| `gateway.service.type` | `ClusterIP` | `LoadBalancer` for SDKs outside the cluster |
| `gateway.podSecurityContext` | uid/gid/fsGroup 10001 | Lets the contrib image write its PVC on any CSI driver |
| `global.imagePullSecrets` | `[]` | For private registries, applied to every pod |
| `gateway.extraConfig` | `{}` | Raw collector config merged over the generated one |

`extraConfig` is the escape hatch: any receiver, processor or exporter can be added or overridden,
and pipelines can be rewired. Values are merged with `mergeOverwrite`, so a key you set replaces the
generated one.

## Examples

| File | Scenario |
|---|---|
| `examples/ai-observe-stack/minimal-external-doris.yaml` | Smallest DOG Stack against an existing Doris |
| `examples/ai-observe-stack/dev.yaml` | Laptop cluster: small operator-managed Doris, one gateway, debug exporter |
| `examples/ai-observe-stack/prod.yaml` | HA Doris, three gateways, TLS ingress for Grafana and OTLP/HTTP |
| `examples/dog-k8s-collector/` | values for the `dog-k8s-collector` chart, the litefuse reference deployment and a `kubectl` manifest |

## Verifying and troubleshooting

```bash
helm test <release> -n <ns> --logs                                   # end-to-end check
kubectl logs -n <ns> <release>-ai-observe-stack-otel-gateway-0 | grep -i 'doris\|error'
```

| Symptom | Cause / fix |
|---|---|
| `values key "otel" is from chart 0.1.x` | Rename the values, see UPGRADING.md |
| Gateway CrashLoop, `file_storage` cannot create its directory | `gateway.podSecurityContext` was overridden without `fsGroup` |
| Gateway logs `no partition for this tuple` | A record older than `createHistoryDays`; the time guard prevents it unless disabled |
| Gateway logs `Exporting failed` with a Doris HTTP error | Check `doris.external.*`, the Secret, and that the user may create the database |
| Grafana stuck on start-up | `grafana.plugins` downloads from the internet; keep it empty in air-gapped clusters |

Grafana dashboards: the chart provisions *K8s Observability*, *Logs Explorer* and *Kubernetes
Events*; the Doris app plugin image adds *OTel Overview* and *Collector Self-Monitoring* (queue
size, dropped and refused counts of the gateway and of every dog-k8s-collector pod).

## Upgrading and uninstalling

```bash
helm upgrade <release> ./ai-observe-stack -n <ns> -f my-values.yaml
helm uninstall <release> -n <ns>
kubectl delete pvc -n <ns> -l app.kubernetes.io/instance=<release>      # gateway queues
kubectl delete pvc -n <ns> -l 'app.doris.ownerreference/name in (<release>-ai-observe-stack-doris-fe,<release>-ai-observe-stack-doris-be)'   # Doris data (internal mode)
```

See [UPGRADING.md](./UPGRADING.md) for 0.1.x → 0.2.0. The Kubernetes collector is its own release
(`helm uninstall dog-k8s-collector`).

## Endpoints

| Service | Port | Purpose |
|---|---|---|
| `<release>-ai-observe-stack-otel-gateway` | 4317 / 4318 | OTLP gRPC / HTTP |
| `<release>-ai-observe-stack-otel-gateway` | 8888 | Gateway Prometheus metrics |
| `<release>-ai-observe-stack-grafana` | 3000 | Grafana |
| `<release>-ai-observe-stack-doris-fe-service` | 9030 / 8030 | Doris MySQL / FE HTTP (internal mode) |
