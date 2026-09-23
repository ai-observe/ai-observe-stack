# Upgrading

## 0.1.x → 0.2.0 (breaking)

0.2.0 reduces this chart to the DOG Stack itself (**gateway** StatefulSet + Doris + Grafana) and
moves Kubernetes collection (node **agent** DaemonSet + **cluster** collector Deployment) to the
separate `dog-k8s-collector` chart, installed once per cluster and pointed at the gateway. The
OpenTelemetry Collector moves from 0.144.0 to 0.160.0. There is no compatibility layer: the chart
refuses to render while a 0.1.x top-level key is still present, so an upgrade is a values rewrite
plus one StatefulSet recreate.

If you relied on `logCollector.enabled: true`, install the collector chart afterwards (its values are
documented in `helm-charts/dog-k8s-collector/USER_GUIDE.md`):

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n <namespace> \
  --set gateway.endpoint=<release>-ai-observe-stack-otel-gateway.<namespace>.svc:4317 --set clusterName=<name>
```

### 1. Values

Every 0.1.x top-level key was renamed or split. The chart fails with
`values key "otel" is from chart 0.1.x and is no longer read` (and the same for
`logCollector`, `openObservabilityStack`, `agent`, `cluster`) until the old keys are gone.

| 0.1.x | 0.2.0 | Note |
|---|---|---|
| `openObservabilityStack.timezone` | `global.timezone` | Same meaning (Doris exporter time zone). |
| `openObservabilityStack.clusterName` | `clusterName` in dog-k8s-collector | Stamped as `k8s.cluster.name` by the collectors. |
| `otel.*` | `gateway.*` | The block configures the gateway; `otel.replicas` → `gateway.replicas`, `otel.persistence` → `gateway.persistence`, `otel.dorisExporter` → `gateway.dorisExporter`. |
| `otel.batch.*` | `gateway.dorisExporter.sendingQueue.batch.*` | The `batch` processor is deprecated upstream; batching happens in the exporter queue. `queueSize` is counted in items and must be ≥ `batch.minSize`. |
| `otel.config` (whole-config override) | `gateway.extraConfig` | A partial config merged over the generated one, not a replacement. |
| `otel.selfMonitoring.hostmetrics` | removed | It measured the gateway container only; node metrics come from dog-k8s-collector's `presets.hostMetrics`. |
| `otel.memoryLimiter.limitMib` / `spikeLimitMib` | `gateway.memoryLimiter.limitPercentage` / `spikeLimitPercentage` | Percent of the container memory limit, like the collectors. |
| `logCollector.*` | dog-k8s-collector chart | `logCollector.filelog.include` / `exclude` → `logs.namespaces` / `logs.containers.exclude` / `logs.excludePaths`; `logCollector.hostPaths.dockerContainers` → `logs.dockerContainersPath`; `logCollector.storage.path` → `agent.storage.hostPath` (no initContainer chown, the agent runs as root). |
| `values-dev.yaml`, `values-prod.yaml`, `values-ack.yaml`, `values-external-doris.yaml` | `helm-charts/examples/ai-observe-stack/*.yaml` (this chart) and `helm-charts/examples/dog-k8s-collector/` (dog-k8s-collector) | Rewritten for the new keys. |
| `doris.external.beHttpPort` | removed | Was never used. |

`values.schema.json` rejects unknown top-level keys, so a typo now fails at `helm install` instead of
being silently ignored.

### 2. Doris credentials

Credentials are no longer rendered into the collector ConfigMap. The chart creates
`<release>-ai-observe-stack-doris-credentials` from `doris.external.user` / `password`, or reads
`doris.external.existingSecret` (keys `username` / `password`, names configurable through
`userKey` / `passwordKey`). Grafana's datasource and the `helm test` pod read the same Secret.

### 3. Renamed Kubernetes objects

The gateway StatefulSet, its Services and its ConfigMap are renamed from
`<release>-ai-observe-stack-otel-collector` to `<release>-ai-observe-stack-otel-gateway`
(label `app.kubernetes.io/component: otel-gateway`), and the PVC template is now called `data`
(was `logs`). `helm upgrade` creates the new objects and deletes the old ones, which means:

- Anything that sends OTLP to the old Service name must be repointed to
  `<release>-ai-observe-stack-otel-gateway.<namespace>.svc:4317` / `:4318`.
- The old PVC `logs-<release>-ai-observe-stack-otel-collector-0` is left behind. Data still
  queued in it at the moment of the switch is lost (seconds of data). Delete it once the new
  gateway is healthy:

  ```bash
  kubectl delete pvc -n <namespace> logs-<release>-ai-observe-stack-otel-collector-0
  ```

### 4. Collector configuration (if you use `extraConfig`)

Component names follow the 0.160 snake_case convention: `filelog` → `file_log`,
`k8sattributes` → `k8s_attributes`, `kubeletstats` → `kubelet_stats`, `hostmetrics` → `host_metrics`,
`resourcedetection` → `resource_detection`, `otlp` exporter → `otlp_grpc`. The `batch` processor
and `health_check.check_collector_pipeline` are gone. `k8s_attributes` emits semantic-convention
v1 attribute names (`k8s.pod.label.<key>` instead of `k8s.pod.labels.<key>`,
`container.image.tag` singular).

### 5. Doris

Metrics are written to per-type tables (`otel_metrics_gauge`, `otel_metrics_sum`,
`otel_metrics_histogram`, …) instead of a single `otel_metrics`; the shipped dashboards use them.
Filtering or grouping on VARIANT columns requires a cast, e.g.
`cast(resource_attributes['k8s.namespace.name'] as string)`.

Log records whose timestamp is outside the partition window (older than
`createHistoryDays` or more than five minutes in the future) are re-stamped with the receive time:
logs keep the original in `log_attributes.log.original_time_unix_nano`, spans in
`span.original_start_time_unix_nano`, metric datapoints are re-stamped (`gateway.timeGuard`). Before 0.2.0 one such record made Doris reject the whole batch forever.

### 6. Node requirements for the agent

Now in the dog-k8s-collector chart: the agent DaemonSet runs as root, mounts `/var/log/pods`, `/`
(read-only, host metrics), `/var/lib/otelcol` (read-write, offsets and queue) and
`/usr/share/zoneinfo`. Namespaces enforcing PodSecurity `restricted` must be relabelled
`privileged`. `journald` stays off by default because the stock images do not ship `journalctl`.

### 7. Grafana

`grafana.plugins` defaults to an empty list (was `[]` plus a Doris plugin download in some
values files). The Doris app plugin comes from the `dorisPlugin` image, so nothing is downloaded at
start-up; a cluster without internet access no longer hangs on `GF_INSTALL_PLUGINS`.
Three dashboards are provisioned from `files/dashboards/*.json`: *K8s Observability*, *Logs Explorer*,
*Kubernetes Events*; the plugin image adds *OTel Overview* and *Collector Self-Monitoring*.

The admin password is no longer an environment variable in the Deployment: it lives in
`<release>-ai-observe-stack-grafana-admin` (keys `admin-user` / `admin-password`) or in `grafana.existingSecret`,
and NOTES no longer prints it.

### 8. Gateway pod security context

The gateway pod now runs with `runAsUser` / `fsGroup` 10001 (the contrib image's user) so the
persisted queue on the PVC is writable on every CSI driver. Existing volumes are re-owned on the
first start (`fsGroupChangePolicy: OnRootMismatch`); no action needed. The gRPC receiver accepts
requests up to `gateway.maxRecvMsgSizeMib` (64 MiB) instead of the 4 MiB default.
