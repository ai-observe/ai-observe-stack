# Helm charts

**New here? Start with [GETTING_STARTED.md](./GETTING_STARTED.md)** ([中文](./GETTING_STARTED_zh.md)): the end-to-end path for both cases, a DOG Stack that already exists and one built from scratch.

Two charts. Install the first once, the second in every Kubernetes cluster you want to collect.

| Chart | What it deploys | Docs |
|---|---|---|
| [`ai-observe-stack/`](./ai-observe-stack/README.md) | the DOG Stack backend: OpenTelemetry gateway, Apache Doris (operator-managed or external), Grafana with the Doris app plugin and dashboards | [README](./ai-observe-stack/README.md) · [中文](./ai-observe-stack/README_zh.md) · [user guide](./ai-observe-stack/USER_GUIDE.md) · [UPGRADING](./ai-observe-stack/UPGRADING.md) |
| [`dog-k8s-collector/`](./dog-k8s-collector/README.md) | a Kubernetes collector pointed at that gateway: agent DaemonSet (container logs with a rules engine and presets, kubelet / node metrics, node-local OTLP) and cluster Deployment (cluster metrics, Events) | [README](./dog-k8s-collector/README.md) · [中文](./dog-k8s-collector/README_zh.md) · [user guide](./dog-k8s-collector/USER_GUIDE.md) |

```bash
helm install dog ./ai-observe-stack -n dog --create-namespace -f examples/ai-observe-stack/minimal-external-doris.yaml
helm install dog-k8s-collector ./dog-k8s-collector -n dog -f examples/dog-k8s-collector/values.yaml
```

- [`examples/ai-observe-stack/`](./examples/ai-observe-stack/) — values for the DOG Stack: minimal with an existing Doris, laptop, production.
- [`examples/dog-k8s-collector/`](./examples/dog-k8s-collector/) — values for the collector, the litefuse reference deployment with sample log lines, and a plain `kubectl` manifest ([`kubectl/`](./examples/dog-k8s-collector/kubectl/)) for clusters without Helm. Not part of the packaged charts.
- [`hack/test-rule.sh`](./hack/test-rule.sh) — try your `logs.rules` against a sample log file locally, in seconds, with the real collector image (needs helm, yq, docker).
