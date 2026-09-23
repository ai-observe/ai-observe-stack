# DOG Stack Getting Started: collecting a Kubernetes cluster

This guide walks the whole path: container logs, kubelet / node / cluster metrics and Kubernetes Events of a Kubernetes cluster into a DOG Stack, visible in Grafana. It has two parts; pick the entry that matches where you start. 中文版：[GETTING_STARTED_zh.md](./GETTING_STARTED_zh.md).

| Your situation | Start at |
|---|---|
| A DOG Stack is already running (installed with the chart, deployed some other way, or in another cluster) | [Part 1: deploy the agent and cluster collector](#part-1-a-dog-stack-exists-deploy-the-agent-and-cluster-collector) |
| Nothing yet, start from scratch | [Part 2: bring up the DOG Stack and the collector](#part-2-no-dog-stack-yet-bring-everything-up); once the backend is up it sends you back to Part 1 |

Every step says what you should see; when stuck, use section 1.8. Commands assume you are in the repository's `helm-charts/` directory and install from the local chart directories. Get them once:

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/helm-charts
helm dependency update ./ai-observe-stack  # fetches the Doris Operator subchart; required even with an existing Doris
```

## 0. The two charts

```
  your applications (OTLP SDK) ───────┐
                                      │  OTLP
  dog-k8s-collector ──────────────────┤
    agent   DaemonSet  one per node    │      container logs, kubelet / node metrics, node-local OTLP entry
    cluster Deployment one per cluster │      cluster metrics, Kubernetes Events
                                      ▼
  ai-observe-stack (the DOG Stack)
    gateway  OpenTelemetry Collector   receives OTLP, writes Doris
    doris    Apache Doris              stores logs, metrics, traces
    grafana  Grafana + Doris plugin    shows them
```

- **`ai-observe-stack`** is the backend. Installed once; anything that speaks OTLP can send to its gateway. It collects nothing by itself.
- **`dog-k8s-collector`** is the collector. Installed once in every Kubernetes cluster to collect, pointed at the gateway with one string, `gateway.endpoint`. Several clusters can share one DOG Stack, told apart by `clusterName`.
- No Helm dependency between them: separate `helm install`, separate upgrades.

Objects created (release names `dog` and `dog-k8s-collector`, namespace `dog`):

| Object | Name | From |
|---|---|---|
| StatefulSet + Service | `dog-ai-observe-stack-otel-gateway` | ai-observe-stack |
| Deployment + Service | `dog-ai-observe-stack-grafana` | ai-observe-stack |
| Secrets | `dog-ai-observe-stack-doris-credentials`, `dog-ai-observe-stack-grafana-admin` | ai-observe-stack |
| DorisCluster (internal mode) | `dog-ai-observe-stack-doris` | ai-observe-stack |
| DaemonSet | `dog-k8s-collector-agent` | dog-k8s-collector |
| Deployment | `dog-k8s-collector-cluster` | dog-k8s-collector |
| ConfigMaps | `dog-k8s-collector-agent-config`, `dog-k8s-collector-cluster-config` | dog-k8s-collector |

---

## Part 1: a DOG Stack exists, deploy the agent and cluster collector

### 1.1 Find the gateway address

The collector needs one piece of information: the gateway's OTLP gRPC address, as `host:port`, no `http://`.

| How your DOG Stack was deployed | Address |
|---|---|
| with the `ai-observe-stack` chart, release `dog`, namespace `dog` | `dog-ai-observe-stack-otel-gateway.dog.svc:4317`. The install NOTES printed it; or `kubectl get svc -n dog` and take the one named `…otel-gateway` without `headless` |
| your own OpenTelemetry Collector with the Doris exporter | its OTLP gRPC Service, usually `<service>.<namespace>.svc:4317` |
| in another cluster | the gateway's external address: the `gateway.service.type: LoadBalancer` IP, or the Ingress host. Plaintext gRPC across clusters needs port 4317 open on the network |

Check it is reachable from this cluster (replace the address with yours):

```bash
kubectl run -it --rm otlp-check --image=busybox:1.36 --restart=Never -- \
  sh -c 'sleep 2; nc -zv dog-ai-observe-stack-otel-gateway.dog.svc 4317'
```

`open` means it works. `refused` or a timeout means fix the network first; nothing below will work.

### 1.2 Prerequisites

- **Kubernetes 1.24+, Helm 3.8+.**
- **Permissions.** The install creates a ClusterRole and ClusterRoleBinding; your kubeconfig user needs cluster-level RBAC rights.
- **PodSecurity.** The agent runs as root and mounts the node's `/var/log/pods`, `/` (read-only) and `/var/lib/otelcol`. If the namespace enforces `restricted`, relax it:

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged --overwrite
```

- **Nodes.** Container logs live under `/var/log/pods` (containerd, CRI-O and Docker all do this); nodes have `/usr/share/zoneinfo` (every mainstream distribution; minimal images like Bottlerocket or Talos do not, see 1.8).
- **Images.** Nodes can pull `otel/opentelemetry-collector-k8s:0.160.0`. For private registries use `imagePullSecrets` and `agent.image` / `cluster.image`.

### 1.3 Install

**Minimal install**, three parameters:

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=prod-eu-1 \
  --set platform=eks
```

- `gateway.endpoint`: the address from 1.1, required.
- `clusterName`: stamped on every record as `k8s.cluster.name`; tells clusters apart. Defaults to the release name.
- `platform`: `generic` / `k3s` / `eks` / `gke` / `aks` / `ack` / `openshift`. Selects the cloud resource detectors and the journald unit names; `generic` when unsure.

**With a values file** (recommended, easier to change later); `examples/dog-k8s-collector/values.yaml` has this shape:

```yaml
# collector-values.yaml
gateway:
  endpoint: dog-ai-observe-stack-otel-gateway.dog.svc:4317
clusterName: prod-eu-1
platform: eks
```

```bash
helm install dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml
```

Helm prints NOTES: the gateway it sends to, the cluster name, which workloads were installed and what each collects, and the verification commands. Every preset except Prometheus annotation scraping and journald is on by default:

| preset | default | collects | runs in |
|---|---|---|---|
| `logsCollection` | on | stdout / stderr of every container in every namespace | agent |
| `kubeletMetrics` | on | node, pod, container and volume CPU / memory / network / filesystem, with limit utilisation | agent |
| `hostMetrics` | on | the node itself: cpu, memory, load, disk, filesystem, network | agent |
| `otlp` | on | node-local OTLP entry point for application SDKs (1.5.5) | agent |
| `clusterMetrics` | on | deployment availability, node conditions, pod phase, quotas… | cluster |
| `kubernetesEvents` | on | Kubernetes Events, stored as logs | cluster |
| `prometheusScrape` | off | pods annotated `prometheus.io/scrape` | agent |
| `journald` | off | the node journal (needs an image with journalctl) | agent |

### 1.4 Check that it works

In order; each takes seconds.

**1. Pods are up.** One agent per node, one cluster collector:

```bash
kubectl get pods -n dog -l app.kubernetes.io/instance=dog-k8s-collector -o wide
```

```
NAME                                         READY   STATUS    NODE
dog-k8s-collector-agent-7x2kq                1/1     Running   node-1
dog-k8s-collector-agent-p9m4c                1/1     Running   node-2
dog-k8s-collector-cluster-6f5d9c8b7d-hq2xn   1/1     Running   node-1
```

**2. The agent reports no errors.** This should print nothing:

```bash
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'
```

`connection refused` or `Unavailable` means the gateway address is wrong or unreachable, back to 1.1; `forbidden` means the RBAC objects were not created.

**3. Data in Doris.** With the DOG Stack's Doris client (internal mode: `kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 9030:9030`, then `mysql -h127.0.0.1 -P9030 -uroot`):

```sql
SELECT service_name, count(*) AS records
FROM otel.otel_logs
WHERE timestamp > now() - interval 5 minute
  AND cast(resource_attributes['k8s.cluster.name'] as string) = 'prod-eu-1'
GROUP BY 1 ORDER BY 2 DESC;
```

The first records arrive within 30 seconds of the agent starting. `service_name` is the workload name (Deployment / StatefulSet / DaemonSet); Events show as `kubernetes-events`. Only lines written after the install appear, because existing files on the nodes are not re-read (`logs.startAt: end`).

**4. Grafana dashboards.** Open the DOG Stack's Grafana (Part 2, section 2.2 explains how), then Dashboards:

- **Logs Explorer**: filter by namespace, service, severity and text; "Records by rule" at the top shows which parsing rule handled each record.
- **Kubernetes Events**: Warning counts, top reasons, the event table.
- **K8s Observability**: node and pod CPU / memory.
- **Collector Self-Monitoring**: queue length, failures and refusals of the agent, cluster collector and gateway.

All four correct means the collector is working. What follows is tuning.

### 1.5 Adjusting

Every change is an edit of the values file followed by:

```bash
helm upgrade dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml
```

A collection change rolls only the agent or the cluster collector; file offsets on the nodes are kept, nothing is collected twice.

#### 1.5.1 Which namespaces and containers

```yaml
logs:
  namespaces:
    include: ["*"]                          # or a list: [shop, payment]
    exclude: [kube-system, monitoring]
  containers:
    exclude: [istio-proxy, linkerd-proxy]   # container names, skipped in every namespace
```

Exclusions win over inclusions. The collector's own pods are never collected.

#### 1.5.2 Applications that log JSON lines: nothing to configure

Lines starting with `{` are parsed automatically: `level` / `severity` becomes `severity_text`, `message` / `msg` is promoted to `body`, every other key lands in `log_attributes`, and the timestamp stays the container write time (within milliseconds of the application's). Logs Explorer filters them by severity; expanding a record shows all fields.

Unusual field names:

```yaml
logs:
  json:
    severityFields: [lvl]
    messageFields: [event]
```

#### 1.5.3 Applications that log text: look for a preset first

13 built-in presets cover the common formats; one `preset:` line in a rule is enough. For a Spring Boot service in namespace `shop`, container `api`:

```yaml
logs:
  rules:
    - name: shop-api
      selector: {namespace: "^shop$", container: "^api$"}
      preset: java-spring
```

| Preset | For |
|---|---|
| `java-spring` | Spring Boot 3 default console format, with stack-trace joining |
| `python-logging` | Python `logging.basicConfig` default format |
| `go-zap-console` | zap console encoder |
| `glog` | C++ / Go glog, SeaweedFS |
| `nginx-access`, `nginx-error` | nginx combined access log, error log |
| `mysql`, `postgres`, `redis` | the three databases' official-image defaults |
| `doris-fe`, `doris-fe-audit`, `doris-be` | Apache Doris |
| `json-generic` | single-line JSON (same as auto-detection, for explicit use) |

`selector.container` matches the **container name**, not the pod or deployment name. To find it:

```bash
kubectl get pod -n shop -l app=api -o jsonpath='{.items[0].spec.containers[*].name}'
```

#### 1.5.4 Your own format: write a rule

A rule is a regex with named groups: `ts` is the timestamp, `level` the severity, `msg` the message. For lines like

```
2026-09-14T10:00:00.123Z info  order 42 created
```

```yaml
logs:
  rules:
    - name: shop-worker
      selector: {namespace: "^shop$", container: "^worker$"}
      regex: '^(?P<ts>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s+(?P<level>[a-z]+)\s+(?P<msg>(?s:.*))$'
      timestamp: {layout: "%Y-%m-%dT%H:%M:%S.%L%z"}     # %z reads the trailing Z
      severity: {field: level}
      multiline: {firstLinePattern: '^\d{4}-\d{2}-\d{2}T'}   # stack-trace lines join the record above
      drop: ['GET /healthz']                             # discarded on the node
```

For lines without a zone from a container that is not on UTC, add `timestamp: {..., timezone: Asia/Shanghai}`.

**Test locally before deploying**; seconds, no pod restarts:

```bash
kubectl logs -n shop -l app=worker -c worker --tail=30 > worker.log
hack/test-rule.sh -f collector-values.yaml -n shop -c worker worker.log
```

It runs the sample through the real collector image and prints `Timestamp`, `SeverityText`, `Body` and the attributes of every record; `dog.log.rule` equal to your rule name means the selector matched. Needs helm, yq and docker. The full five-step method and the common mistakes are in the collector guide, [section 3](./dog-k8s-collector/USER_GUIDE.md#3-writing-a-parsing-rule-for-your-own-service).

#### 1.5.5 Applications sending OTLP directly (traces, metrics, structured logs)

Applications with an OpenTelemetry SDK send to the **node-local agent**, which adds pod, namespace and workload metadata. Expose the ports on the node first:

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

To name the service without touching code, annotate the pod with `resource.opentelemetry.io/service.name: checkout`.

#### 1.5.6 Scraping application Prometheus metrics

```yaml
presets:
  prometheusScrape:
    enabled: true
```

Then annotate the application's pods with `prometheus.io/scrape: "true"`, `prometheus.io/port: "9090"`, `prometheus.io/path: "/metrics"`. The agent scrapes them per node; the metrics land in the `otel_metrics_*` tables with the pod's namespace, name, workload and labels attached, so `service_name` is the workload name.

#### 1.5.7 Several clusters

One collector release per cluster, `gateway.endpoint` pointing at the same gateway (LoadBalancer or Ingress address across clusters), a different `clusterName` each. Queries and dashboards filter on `k8s.cluster.name`.

#### 1.5.8 Resources

Each agent requests 100m CPU / 128Mi and is limited to 1 CPU / 512Mi; reference point: a node collecting seven formats at 3 000 lines per minute sits at about 10m CPU and 31 MiB. On busy nodes raise `agent.resources.limits.memory`; the memory limiter works in percent of the limit and needs no change. While the gateway is unreachable each node buffers `agent.queueSize` records (20 000 by default) on local disk, surviving agent restarts.

### 1.6 Without Helm: the kubectl manifest

`examples/dog-k8s-collector/kubectl/collectors.yaml` holds the same objects, generated from the chart. Set `gateway.endpoint` and `clusterName` in `kubectl/values.yaml`, regenerate, apply:

```bash
cd examples/dog-k8s-collector/kubectl
./render.sh -n dog                # needs helm and yq; without them edit the endpoint and k8s.cluster.name inside collectors.yaml
kubectl apply -n dog -f collectors.yaml
```

Configuration changes afterwards need `kubectl rollout restart daemonset/dog-k8s-collector-agent deployment/dog-k8s-collector-cluster`, since kubectl does not restart pods the way Helm does. Details in [kubectl/README.md](./examples/dog-k8s-collector/kubectl/README.md).

### 1.7 Upgrade and uninstall

```bash
helm upgrade dog-k8s-collector ./dog-k8s-collector -n dog -f collector-values.yaml   # config change or chart upgrade
helm history dog-k8s-collector -n dog && helm rollback dog-k8s-collector 1 -n dog     # rollback
helm uninstall dog-k8s-collector -n dog                                               # uninstall
```

Uninstalling leaves the DOG Stack and the data in Doris untouched. `/var/lib/otelcol` on the nodes (file offsets) stays; a reinstall continues from the last position, delete it on every node to start from scratch.

### 1.8 Common problems

| Symptom | Cause and fix |
|---|---|
| `helm install` says `gateway.endpoint is required` | the gateway address is missing, see 1.1 |
| `helm install dog ./ai-observe-stack` says `missing in charts/ directory: doris-operator` | the Doris Operator subchart was not fetched; run `helm dependency update ./ai-observe-stack` (needed with an existing Doris too) |
| `helm dependency build` says `no repository definition for https://charts.selectdb.com` | `build` only uses repositories added with `helm repo add`; use `helm dependency update ./ai-observe-stack`, which needs no `helm repo add` |
| `helm install` says `additional properties 'xxx' not allowed` | a top-level key is misspelt. Valid top-level keys: `gateway`, `clusterName`, `platform`, `timezone`, `imagePullSecrets`, `presets`, `logs`, `agent`, `cluster`, `nameOverride`, `fullnameOverride` |
| agent pod `CreateContainerConfigError` or rejected by PodSecurity | the namespace enforces `restricted`; add the `privileged` label, see 1.2 |
| agent log `permission denied` on `/var/log/pods` | same |
| agent log `connection refused` / `Unavailable` | wrong gateway address, gateway down, or a network policy blocking 4317; records queue on the node and are sent once fixed |
| agent log `unknown time zone` | a rule names a zone but the node has no `/usr/share/zoneinfo`; use UTC, or set `agent.image.repository` to `otel/opentelemetry-collector-contrib` |
| agent log `journalctl: executable file not found` | `presets.journald` is on but the image has no journalctl; turn it off or build an image |
| a namespace has no logs | excluded by `logs.namespaces.exclude` / `containers.exclude`; or the file existed before the install and `startAt: end` |
| logs arrive but `service_name` is empty | the agent could not read pod metadata; look for RBAC `forbidden` in its log |
| a rule has no effect (`dog.log.rule` empty) | `selector.container` holds the pod name; or an earlier, wider rule claimed the record first (first match wins); verify with `hack/test-rule.sh` |
| times off by hours | the line has no zone, the container is not on UTC, `timestamp.timezone` is missing |
| Logs Explorer shows data but no severity | text logs without a parsing rule; add a rule or preset, see 1.5.3 |

The configuration the agent actually runs (comments and rule names included):

```bash
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'
```

---

## Part 2: no DOG Stack yet, bring everything up

Goal: gateway + Doris + Grafana, then the collector. After 2.3, go back to Part 1, section 1.4, to verify.

### 2.1 Decide where Doris lives

Two paths, pick one:

| | A: the chart deploys Doris | B: an existing Doris |
|---|---|---|
| For | trials, development, no Doris around | an existing Doris / SelectDB cluster |
| Needs | a PersistentVolume provisioner; at least 2 CPU / 4 GiB each for FE and BE; one operator per cluster, a second DOG Stack in the same cluster sets `doris.internal.operator.enabled: false` | FE ports 9030 (MySQL) and 8030 (HTTP) reachable from the cluster; an account with `CREATE DATABASE` |
| Data lives | in PVCs inside the cluster | in your Doris |

### 2.2 Install the DOG Stack

**Path A: the chart deploys Doris.** Development size is `examples/ai-observe-stack/dev.yaml` (FE / BE one replica each, 2 CPU / 4 GiB, no persistence, one gateway, debug output on); production size is `prod.yaml` (3 + 3 replicas, persistence, three gateways, Ingress).

```bash
helm install dog ./ai-observe-stack -n dog --create-namespace -f examples/ai-observe-stack/dev.yaml
```

Doris FE / BE take two to five minutes to pull and initialise; the gateway waits until FE answers on 9030 and 8030 and a BE is online before starting. `dev.yaml` turns on the gateway's debug output; when the collector runs in the same cluster, keep that pod out of collection with `logs.excludePaths: [/var/log/pods/dog_dog-ai-observe-stack-otel-gateway-*/*/*.log]` on the collector, otherwise the gateway's copy of every record is collected again.

**Path B: an existing Doris.** Put the account in a Secret, never in values:

```bash
kubectl create namespace dog
kubectl create secret generic doris-credentials -n dog \
  --from-literal=username=otel --from-literal=password='***'
```

```yaml
# dog-values.yaml
doris:
  mode: external
  database: otel                               # the gateway creates the database and tables
  external:
    host: doris-fe.doris.svc.cluster.local     # FE address
    port: 9030
    feHttpPort: 8030
    existingSecret: doris-credentials
  internal:
    operator:
      enabled: false                           # do not install the Doris Operator
```

```bash
helm install dog ./ai-observe-stack -n dog -f dog-values.yaml
```

`examples/ai-observe-stack/minimal-external-doris.yaml` is this file.

**Either path** ends with NOTES; note the gateway address in them, `dog-ai-observe-stack-otel-gateway.dog.svc:4317`. Then three checks:

```bash
kubectl get pods -n dog                                  # gateway-0, grafana (and doris fe / be on path A) Running
helm test dog -n dog --logs                              # one log record through the gateway into Doris: OK: record found in Doris
kubectl get secret -n dog dog-ai-observe-stack-grafana-admin -o jsonpath='{.data.admin-password}' | base64 -d; echo
```

Open Grafana:

```bash
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
```

Browser `http://localhost:3000`, user `admin`, the password printed above (default `admin`; change with `grafana.adminPassword` or `grafana.existingSecret`). The dashboards are empty at this point: nothing sends to the gateway yet, apart from the `helm test` record.

### 2.3 Install the collector

Same namespace, the gateway address from the NOTES:

```bash
kubectl label namespace dog pod-security.kubernetes.io/enforce=privileged --overwrite   # only if PodSecurity restricted is enforced
helm install dog-k8s-collector ./dog-k8s-collector -n dog \
  --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
  --set clusterName=my-cluster \
  --set platform=generic
```

Then verify with [Part 1, section 1.4](#14-check-that-it-works) and tune with 1.5.

### 2.4 End to end

With both charts installed, prove the whole path with a minimal application: a pod printing one JSON line per second.

```bash
kubectl create namespace demo
kubectl run json-app -n demo --image=busybox:1.36 --restart=Never -- sh -c \
  'i=0; while true; do i=$((i+1)); echo "{\"time\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"level\":\"info\",\"msg\":\"tick $i\"}"; sleep 1; done'
```

After 30 seconds, in Doris:

```sql
SELECT timestamp, severity_text, body, cast(resource_attributes['k8s.pod.name'] as string) AS pod
FROM otel.otel_logs
WHERE cast(resource_attributes['k8s.namespace.name'] as string) = 'demo'
ORDER BY timestamp DESC LIMIT 5;
```

Rows with `severity_text = INFO` and `body = tick 42` show that container logs are collected, JSON is parsed and Kubernetes metadata is attached. Logs Explorer with namespace `demo` shows the same. Clean up:

```bash
kubectl delete namespace demo
```

### 2.5 Before production

| Item | Where | Note |
|---|---|---|
| Doris replicas and disks | `doris.internal.cluster.fe/be.replicas`, `persistence.storageClass`, `size` | at least 3 + 3 in production, `replicationNum: 3` |
| Gateway replicas and queue | `gateway.replicas`, `gateway.persistence.size`, `gateway.dorisExporter.sendingQueue` | one PVC per replica for the queue; if writes lag, watch `otelcol_exporter_queue_size` on Collector Self-Monitoring |
| Retention | `gateway.dorisExporter.historyDays` | 7 days by default |
| Grafana password | `grafana.adminPassword` or `grafana.existingSecret` | default `admin` |
| External access | `ingress`, `gateway.service.type` | a host for Grafana; SDKs outside the cluster use the OTLP/HTTP Ingress path or a LoadBalancer |
| Private registry | `global.imagePullSecrets` (DOG), `imagePullSecrets` (collector), the `image.repository` keys, `global.helperImages` (busybox and curl of the DOG chart) | set in both charts |
| Demo output off | `gateway.debug.enabled: false` | `dev.yaml` has it on; it prints sampled data |
| Collection scope | `logs.namespaces.exclude` | usually `kube-system` |

`examples/ai-observe-stack/prod.yaml` is a production values file to start from.

### 2.6 A complete reference deployment: litefuse

The repository carries an example verified on a real system: a single-node k3s cluster, the `litefuse-prod` namespace with seven log formats (Node.js, Doris FE / BE, PostgreSQL, Valkey, SeaweedFS), written into litefuse's own Doris. Two values files and real sample logs live in [`examples/dog-k8s-collector/litefuse/`](./examples/dog-k8s-collector/litefuse/):

```bash
helm upgrade --install dog-stack ./ai-observe-stack -n dog-stack --create-namespace \
  -f examples/dog-k8s-collector/litefuse/dog-values.yaml
helm test dog-stack -n dog-stack --logs
helm upgrade --install dog-k8s-collector ./dog-k8s-collector -n dog-stack \
  -f examples/dog-k8s-collector/litefuse/collector-values.yaml
```

`collector-values.yaml` has seven rules, six of them presets; it is the most complete template for "how do I configure text logs".

---

## Appendix: quick reference

**Documentation per chart**

| Chart | README | User guide | Covers |
|---|---|---|---|
| ai-observe-stack | [README.md](./ai-observe-stack/README.md) | [USER_GUIDE.md](./ai-observe-stack/USER_GUIDE.md) | install, sending data, gateway and Doris scaling, retention, upgrades, troubleshooting, values reference |
| dog-k8s-collector | [README.md](./dog-k8s-collector/README.md) | [USER_GUIDE.md](./dog-k8s-collector/USER_GUIDE.md) | install, log collection, writing rules in five steps, metrics and Events, node-local OTLP, agent and cluster scaling, troubleshooting, values reference |

**Everyday commands**

```bash
# status
kubectl get pods -n dog
helm list -n dog

# logs
kubectl logs -n dog dog-ai-observe-stack-otel-gateway-0 | grep -i 'error\|doris'
kubectl logs -n dog ds/dog-k8s-collector-agent | grep '"level":"error"'
kubectl logs -n dog deploy/dog-k8s-collector-cluster | grep '"level":"error"'

# effective configuration
kubectl get cm -n dog dog-ai-observe-stack-otel-gateway-config -o jsonpath='{.data.config\.yaml}'
kubectl get cm -n dog dog-k8s-collector-agent-config -o jsonpath='{.data.config\.yaml}'

# end to end
helm test dog -n dog --logs

# dashboards and Doris
kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 9030:9030   # internal mode
```

**Tables in Doris**

| Table | Content | Columns you will use |
|---|---|---|
| `otel_logs` | container logs, Events, SDK logs | `timestamp`, `service_name`, `severity_text`, `body`, `resource_attributes['k8s.*']`, `log_attributes['dog.log.rule']` |
| `otel_metrics_gauge` / `_sum` / `_histogram` / `_exponential_histogram` / `_summary` | metrics, one table per type | `metric_name`, `value`, `attributes` |
| `otel_traces` | traces | `trace_id`, `span_name`, `service_name` |

VARIANT columns need `cast(... as string)` in `WHERE` / `GROUP BY`.
