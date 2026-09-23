# Collecting a Kubernetes cluster

The DOG Stack (`ai-observe-stack` chart) is a backend: gateway + Doris + Grafana. Collecting a
Kubernetes cluster is the `dog-k8s-collector` chart: an **agent** DaemonSet (container logs,
kubelet and node metrics, node-local OTLP entry, Prometheus annotations) and a **cluster**
Deployment (cluster metrics, Kubernetes Events), both sending OTLP to a gateway.

You need a running gateway and its OTLP gRPC address; for a DOG Stack installed as release `dog`
in namespace `dog` it is `dog-ai-observe-stack-otel-gateway.dog.svc:4317`.

## With Helm

```bash
helm install dog-k8s-collector ../../dog-k8s-collector -n dog -f values.yaml
kubectl -n dog get pods          # one agent per node, one cluster collector
```

Every file below installs on its own (`-f <file>`); each carries the gateway address, change it to yours.

| File | What it shows |
|---|---|
| `values.yaml` | the minimum: gateway address, cluster name, platform; everything collected with defaults |
| `json-app.yaml` | a JSON-logging application with custom field names, a drop filter, a Java preset |
| `platform-ack.yaml` | Alibaba Cloud ACK: platform switch, Prometheus annotation scraping, ACK namespaces excluded |
| `litefuse/` | the reference deployment on k3s: `dog-values.yaml` for the DOG Stack, `collector-values.yaml` with seven log formats, sample log lines |

## Without Helm

[`kubectl/`](./kubectl/): `collectors.yaml` is generated from the chart; set the gateway address
in `kubectl/values.yaml`, run `render.sh`, `kubectl apply`.

## What you get

Every container's stdout / stderr with `k8s.namespace.name`, `k8s.pod.name`, `k8s.container.name`,
the workload name, node, cluster, image and selected pod labels; `service_name` derived from the
workload; kubelet, node and cluster metrics in `otel_metrics_*`; Kubernetes Events in `otel_logs`
with `service_name = kubernetes-events`. Grafana: Logs Explorer, Kubernetes Events,
K8s Observability, Collector Self-Monitoring.

## Parsing your own log formats

Both paths use the same `logs.rules` engine and the 13 presets: the collector chart's
[user guide](../../dog-k8s-collector/USER_GUIDE.md), sections 2 and 3. `helm-charts/hack/test-rule.sh`
tests a rule against a sample log file without deploying.

## Tagging application signals (optional)

Applications that send OTLP directly can name themselves without code changes: annotate the pod
with `resource.opentelemetry.io/service.name: <name>` (the agent turns it into `service.name`), or
set `OTEL_RESOURCE_ATTRIBUTES` from the downward API.
