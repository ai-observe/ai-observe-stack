# AIObserve Stack User Guide

Organised by what you want to do. Sections 1 to 3 install the DOG Stack (gateway + Doris + Grafana); the rest configures and operates it. Collecting a Kubernetes cluster is the separate `dog-k8s-collector` chart with [its own guide](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/dog-k8s-collector/USER_GUIDE.md). The complete list of values is in the last section. 中文版：[USER_GUIDE_zh.md](./USER_GUIDE_zh.md).

1. [Before you install](#1-before-you-install)
2. [First install](#2-first-install)
3. [Check that it works](#3-check-that-it-works)
4. [Sending data: OTLP and the Kubernetes collector](#4-sending-data-otlp-and-the-kubernetes-collector)
5. [Scaling and resources](#5-scaling-and-resources)
6. [Retention and Doris](#6-retention-and-doris)
7. [Upgrade, rollback, uninstall](#7-upgrade-rollback-uninstall)
8. [Troubleshooting](#8-troubleshooting)
9. [Values reference](#9-values-reference)

---
## 1. Before you install

**Cluster.** Kubernetes 1.24+, Helm 3.8+, a PersistentVolume provisioner for the gateway queue (and for Doris when the chart deploys it). Nothing in the default install needs elevated privileges; the Kubernetes collector chart does (section 4).

**What you are installing.** The DOG Stack is a backend: a gateway that receives OTLP, Doris that stores it, Grafana that shows it. It does not collect anything by itself. Your applications' SDKs, other collectors, or the `dog-k8s-collector` chart (section 4) send to the gateway.

**Doris.** Two options:

- Let the chart deploy Doris with the Doris Operator (`doris.mode: internal`, the default). Needs a PersistentVolume provisioner and at least 4 GiB of memory for FE and BE each. The operator is cluster-wide (fixed ClusterRole and webhook names): only one release per cluster may install it; a second DOG Stack in the same cluster sets `doris.internal.operator.enabled: false`.
- Use an existing Doris cluster (`doris.mode: external`). The FE MySQL port (9030) and HTTP port (8030) must be reachable from the cluster, and the account needs `CREATE DATABASE` (or create the schema yourself, see section 6).

**Credentials.** Put the Doris account in a Secret, not in values:

```bash
kubectl create secret generic doris-credentials -n dog \
  --from-literal=username=otel --from-literal=password='***'
```

**One thing to fill in.** Where Doris is. The cluster name and platform are settings of the collector chart, not of this one.

---

## 2. First install

Write a values file with only the keys you change; everything else keeps its default. The smallest external-Doris version:

```yaml
# my-values.yaml
doris:
  mode: external
  external:
    host: doris-fe.doris.svc.cluster.local
    existingSecret: doris-credentials
  internal:
    operator:
      enabled: false        # do not install the Doris Operator
```

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/helm-charts
helm dependency update ./ai-observe-stack  # fetches the Doris Operator subchart; required in every Doris mode
helm upgrade --install dog ./ai-observe-stack -n dog --create-namespace -f my-values.yaml
```

`helm upgrade --install` installs the first time and upgrades afterwards; one command to remember.

**Doris deployed by the chart:** drop the `doris` block, internal is the default, and size it (`examples/ai-observe-stack/dev.yaml` is laptop-sized, `examples/ai-observe-stack/prod.yaml` is three replicas).

After the install Helm prints NOTES: the gateway's OTLP addresses, where the Grafana password is, and the command that installs the Kubernetes collector against it.

---

## 3. Check that it works

Four checks, ten seconds each.

**1. Pods are up.** `gateway.replicas` gateways, one Grafana, and Doris FE / BE in internal mode.

```bash
kubectl get pods -n dog
```

**2. End-to-end test.** Sends one log record to the gateway and looks for it in Doris:

```bash
helm test dog -n dog --logs
```

`Phase: Succeeded` and `OK: record found in Doris` means the path is open. On failure the output says whether it got stuck sending or querying.

**3. No errors in the gateway log.**

```bash
kubectl logs -n dog dog-ai-observe-stack-otel-gateway-0 | grep '"level":"error"'
```

**4. Open Grafana.**

```bash
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d
```

`http://localhost:3000`, user `admin`, the password from the Secret (default `admin`; set `grafana.adminPassword` or `grafana.existingSecret`). Dashboards: **Logs Explorer** (start here), **Kubernetes Events**, **K8s Observability** from the chart; **OTel Overview** and **Collector Self-Monitoring** from the Doris app plugin. They fill up as soon as something sends data: the `helm test` record, your SDKs, or the Kubernetes collector (section 4).

Querying Doris directly works too:

```sql
SELECT service_name, count(*) FROM otel.otel_logs
WHERE timestamp > now() - interval 10 minute GROUP BY 1 ORDER BY 2 DESC;
```

---

## 4. Sending data: OTLP and the Kubernetes collector

**Anything that speaks OTLP** can send to the gateway: `dog-ai-observe-stack-otel-gateway.dog.svc:4317` (gRPC) or `:4318` (HTTP) inside the cluster, `gateway.service.type: LoadBalancer` or the `otel` ingress path (`examples/ai-observe-stack/prod.yaml`) from outside. With an OpenTelemetry SDK:

```yaml
env:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: http://dog-ai-observe-stack-otel-gateway.dog.svc:4318
  - name: OTEL_SERVICE_NAME
    value: checkout
```

`service_name` rules: if the SDK sets `service.name` it is used; otherwise the gateway takes the Kubernetes workload name in the order Deployment → StatefulSet → DaemonSet → CronJob → Job → Pod (`gateway.serviceName.deriveFromWorkload`), and Kubernetes Events get `gateway.serviceName.kubernetesEvents`. Without touching code: annotate the pod with `resource.opentelemetry.io/service.name: checkout` (read by the collector below).

**Collecting the Kubernetes cluster** (every container's logs, kubelet / node / cluster metrics, Kubernetes Events) is the `dog-k8s-collector` chart, installed once per cluster and pointed at this gateway:

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged   # only if PodSecurity restricted is enforced
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster
```

That chart's [user guide](https://github.com/ai-observe/ai-observe-stack/blob/main/helm-charts/dog-k8s-collector/USER_GUIDE.md) covers what it collects, log parsing rules and presets, the node-local OTLP entry point (SDK records enriched with pod metadata), scaling and troubleshooting. `helm-charts/examples/dog-k8s-collector/` has values files and a plain `kubectl` manifest for clusters without Helm.

---

## 5. Scaling and resources

The gateway and Doris scale differently; the agent and cluster collector are covered in the collector chart's guide.

### Gateway (StatefulSet)

Write throughput to Doris comes from the number of gateway replicas; each has a PVC for its queue:

```yaml
gateway:
  replicas: 3
  resources:
    limits: {cpu: 2, memory: 2Gi}
  persistence:
    size: 20Gi
  dorisExporter:
    sendingQueue:
      numConsumers: 8        # concurrent Stream Loads
      queueSize: 100000
      batch: {minSize: 8192, maxSize: 16384, flushTimeout: 5s}
```

When to scale, on the Collector Self-Monitoring dashboard: `otelcol_exporter_queue_size` staying near `queueSize` means Doris cannot keep up, add replicas or `numConsumers`; the queue blocks on overflow (`block_on_overflow`), so a full queue shows as growing latency on the collectors rather than drops; `otelcol_exporter_send_failed_*` growing means Doris returns errors, read the gateway log first. Each collector pod keeps one gRPC connection to one gateway replica (a ClusterIP Service balances per connection, not per request), so a new replica only takes load from collectors that reconnect; to spread every collector over all replicas set `gateway.endpoint: dns:///<release>-ai-observe-stack-otel-gateway-headless.<namespace>.svc:4317` and `gateway.balancerName: round_robin` in the collector chart.

When `replicas` is reduced, records still queued in the removed replica's PVC stay there until it is scaled back. Check that its queue is empty before scaling down.

### Doris (internal mode)

```yaml
doris:
  internal:
    cluster:
      fe: {replicas: 3}
      be: {replicas: 3}
      persistence: {be: {size: 500Gi}}
```

The Doris Operator applies replica changes. Size storage from the real compression ratio: after a day, `SHOW DATA FROM otel.otel_logs` gives one day's size; multiply by `historyDays` and `replicationNum`.

---

## 6. Retention and Doris

```yaml
gateway:
  dorisExporter:
    historyDays: 7             # retention (Doris dynamic partitions drop old ones)
    createHistoryDays: 1       # past partitions created ahead, i.e. how old incoming data may be
    replicationNum: 1          # replicas, at least 2 in production
    tables: {logs: otel_logs, traces: otel_traces, metrics: otel_metrics}
```

A larger `historyDays` only affects partitions created afterwards. Changing table names requires changing the SQL in the Grafana dashboards.

**Timestamp window.** Records older than `createHistoryDays` or more than five minutes in the future are re-stamped by the gateway with the receive time (the original in `log_attributes['log.original_time_unix_nano']`), because Doris would reject the whole batch. To accept older data raise `createHistoryDays`.

**Low-privilege account.** By default the gateway creates the database and tables and needs `CREATE DATABASE`. To avoid granting it: install once with a privileged account so the tables exist (or copy the DDL from an existing environment with `SHOW CREATE TABLE`), then:

```yaml
gateway:
  dorisExporter:
    createSchema: false
```

From then on the account only needs `LOAD_PRIV` and `SELECT_PRIV` on the database.

---

## 7. Upgrade, rollback, uninstall

**Upgrading the chart or changing configuration.** Same command:

```bash
helm upgrade dog ./ai-observe-stack -n dog -f my-values.yaml
```

Changing gateway settings restarts only the gateway, whose queue lives on the PVC and is kept.

**Rollback.**

```bash
helm history dog -n dog
helm rollback dog 3 -n dog
```

**From 0.1.x** the upgrade is breaking, every values key was renamed: see [UPGRADING.md](./UPGRADING.md).

**Uninstall.**

```bash
helm uninstall dog -n dog
kubectl delete pvc -n dog -l app.kubernetes.io/instance=dog   # gateway queues
kubectl delete pvc -n dog -l 'app.doris.ownerreference/name in (dog-ai-observe-stack-doris-fe,dog-ai-observe-stack-doris-be)'   # Doris volumes (internal mode; created by the operator, without the release label)
```

Data in Doris is unaffected by an uninstall. The Kubernetes collector is a separate release: `helm uninstall dog-k8s-collector -n dog`.

---

## 8. Troubleshooting

Run `helm test dog -n dog --logs` first; it separates "cannot reach the gateway" from "the gateway cannot write Doris".

| Symptom | Where to look | Cause and fix |
|---|---|---|
| `helm install` says `values key "otel" is from chart 0.1.x` | | old values, rename the keys per UPGRADING.md |
| `helm install` says `additional properties 'xxx' not allowed` | | a top-level key is misspelt, the schema rejects it |
| gateway CrashLoop, `file_storage` cannot create its directory | `kubectl logs …-otel-gateway-0` | `gateway.podSecurityContext` was overridden without `fsGroup` |
| gateway log `Exporting failed … connection refused` | `kubectl logs …-otel-gateway-0` | `doris.external.host` / `feHttpPort` wrong, or a network policy |
| gateway log `401` / `Access denied` | | wrong user or password in the Secret |
| gateway log `no partition for this tuple` | | a record older than the partition window with `timeGuard` disabled; enable it or raise `createHistoryDays` |
| gateway log `DATA_QUALITY_ERROR` for 10 minutes then `dropping data` | | a batch Doris keeps rejecting was dropped after `retryMaxElapsedTime`; the `ErrorURL` in the message has the reason |
| Grafana stuck at start-up on plugins | `kubectl logs …-grafana` | `grafana.plugins` downloads from the internet; keep it empty in air-gapped clusters |
| Grafana dashboards empty | Configuration → Data sources → Doris → Test | the datasource cannot reach Doris on 9030; or `doris.database` is not `otel` (the dashboard SQL hard-codes the database, change it to yours) |

To see the configuration the gateway actually runs:

```bash
kubectl get cm -n dog dog-ai-observe-stack-otel-gateway-config -o jsonpath='{.data.config\.yaml}'
```

---

## 9. Values reference

Only keys you would change; `resources`, `image`, `nodeSelector`, `tolerations`, `ingress` follow the usual Helm conventions.

### global

| Key | Default | Meaning |
|---|---|---|
| `global.timezone` | `UTC` | IANA zone for the Doris exporter |
| `global.imagePullSecrets` | `[]` | pull secrets applied to every pod |
| `global.helperImages.busybox` / `curl` | `busybox:1.36` / `curlimages/curl:8.10.1` | init containers / `helm test` pod; point at a mirror for private registries |

### doris

| Key | Default | Meaning |
|---|---|---|
| `doris.mode` | `internal` | `internal` deploys with the operator, `external` uses an existing cluster |
| `doris.database` | `otel` | database name |
| `doris.internal.operator.enabled` | `true` | install the Doris Operator with the chart; set false in external mode |
| `doris.internal.cluster.fe.replicas` / `be.replicas` | `1` / `1` | replicas |
| `doris.internal.cluster.fe.image` / `be.image` | `apache/doris:fe-4.0.3` / `be-4.0.3` | images |
| `doris.internal.cluster.persistence.enabled` | `true` | data volumes |
| `doris.internal.cluster.persistence.fe.size` / `be.size` | `20Gi` / `20Gi` | volume sizes |
| `doris.external.host` | `""` | FE address |
| `doris.external.port` | `9030` | MySQL protocol (schema, Grafana) |
| `doris.external.feHttpPort` | `8030` | FE HTTP (Stream Load) |
| `doris.external.user` / `password` | `root` / `""` | written into the chart-managed Secret when no existingSecret |
| `doris.external.existingSecret` | `""` | name of your Secret |
| `doris.external.userKey` / `passwordKey` | `username` / `password` | key names in that Secret |

### gateway

| Key | Default | Meaning |
|---|---|---|
| `gateway.enabled` | `true` | |
| `gateway.image.repository` / `tag` | `otel/opentelemetry-collector-contrib` / `0.160.0` | |
| `gateway.replicas` | `2` | |
| `gateway.podManagementPolicy` | `Parallel` | |
| `gateway.resources` | 200m / 256Mi, 1 / 1Gi | |
| `gateway.nodeSelector` / `tolerations` / `affinity` / `priorityClassName` | `{}` / `[]` / `{}` / `""` | |
| `gateway.podSecurityContext` | uid / gid / fsGroup 10001 | the contrib image is non-root; fsGroup makes the PVC writable on every CSI driver |
| `gateway.maxRecvMsgSizeMib` | `64` | largest OTLP/gRPC request accepted (agent batches can exceed the 4 MiB gRPC default) |
| `gateway.service.type` / `annotations` | `ClusterIP` / `{}` | `LoadBalancer` for SDKs outside the cluster |
| `gateway.selfMonitoring.enabled` | `true` | the gateway scrapes its own `:8888` |
| `gateway.ports.otlpGrpc` / `otlpHttp` / `metrics` / `healthCheck` | `4317` / `4318` / `8888` / `13133` | |
| `gateway.persistence.enabled` / `size` / `storageClass` / `path` | `true` / `10Gi` / `""` / `/var/lib/otelcol` | one PVC per replica |
| `gateway.logging.level` / `format` | `info` / `json` | |
| `gateway.logging.fileOutput.enabled` | `false` | also write log files to the PVC |
| `gateway.memoryLimiter.limitPercentage` / `spikeLimitPercentage` | `75` / `20` | percent of the container memory limit |
| `gateway.dorisExporter.tables.logs` / `traces` / `metrics` | `otel_logs` / `otel_traces` / `otel_metrics` | table names (metric tables get a type suffix) |
| `gateway.dorisExporter.createSchema` | `true` | create database and tables |
| `gateway.dorisExporter.historyDays` | `7` | retention |
| `gateway.dorisExporter.createHistoryDays` | `1` | past partitions created ahead |
| `gateway.dorisExporter.replicationNum` | `1` | Doris replicas |
| `gateway.dorisExporter.timeout` | `60s` | Stream Load timeout |
| `gateway.dorisExporter.retryMaxElapsedTime` | `10m` | how long a failing batch is retried |
| `gateway.dorisExporter.sendingQueue.enabled` / `numConsumers` / `queueSize` | `true` / `8` / `50000` | |
| `gateway.dorisExporter.sendingQueue.batch.minSize` / `maxSize` / `flushTimeout` | `8192` / `16384` / `5s` | |
| `gateway.serviceName.deriveFromWorkload` | `true` | workload name when service.name is missing |
| `gateway.serviceName.kubernetesEvents` | `kubernetes-events` | service_name given to Kubernetes Events |
| `gateway.timeGuard.enabled` | `true` | re-stamp timestamps outside the partition window |
| `gateway.timeGuard.maxPastSeconds` / `maxFutureSeconds` | `null` (derived from createHistoryDays) / `300` | |
| `gateway.debug.enabled` / `verbosity` | `false` / `basic` | debug exporter, for demos |
| `gateway.extraConfig` | `{}` | raw collector config merged over the generated one |

### grafana / dorisPlugin / ingress

| Key | Default | Meaning |
|---|---|---|
| `grafana.enabled` | `true` | |
| `grafana.image.repository` / `tag` | `grafana/grafana` / `11.4.0` | |
| `grafana.adminUser` / `adminPassword` | `admin` / `admin` | written into `<release>-ai-observe-stack-grafana-admin` |
| `grafana.existingSecret` | `""` | your Secret with keys `admin-user` / `admin-password` |
| `grafana.plugins` | `[]` | plugins downloaded at start-up |
| `grafana.env` | `{}` | extra environment variables |
| `grafana.service.type` / `port` | `ClusterIP` / `3000` | |
| `grafana.persistence.enabled` / `size` | `false` / `10Gi` | |
| `dorisPlugin.enabled` / `pluginId` | `true` / `doris-app` | Doris app plugin |
| `dorisPlugin.image.repository` / `tag` | `velodb/doris-app-plugin` / `latest` | |
| `ingress.enabled` / `className` / `annotations` / `hosts` / `tls` | `false` … | Ingress for Grafana |
