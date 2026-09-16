# Example: litefuse on k3s

Reference deployment used while building the Kubernetes collection layer. It runs on a
single-node k3s cluster (`vm-152`) and collects the `litefuse-prod` namespace into the Doris
cluster that ships with litefuse (a separate `otel` database). Two releases:

| File | Chart | What it installs |
|---|---|---|
| `dog-values.yaml` | `ai-observe-stack` | the DOG Stack: gateway (1 replica, debug output on), Grafana; Doris is litefuse's own |
| `collector-values.yaml` | `dog-k8s-collector` | agent + cluster collector for `litefuse-prod`, seven log rules |

What the collector example exercises:

| Difficulty | Where | How it is solved |
|---|---|---|
| Seven log formats on one node | web/worker (Node.js), Doris FE, Doris BE, PostgreSQL, Valkey, SeaweedFS | one `logs.rules` entry per container, six of them a `preset` |
| Two formats in one stream | Doris FE writes `RuntimeLogger` and `AuditLogger` lines to stderr | two rules on the same container; the presets carry a `selector.bodyPrefix` |
| Empty header message | Doris BE memory summaries: `...cpp:243] ` then the body on the next lines | preset regex uses `\]\s?`, multiline first-line pattern joins the lines |
| Timestamps without a zone | Doris, PostgreSQL, Valkey | read in `timezone` (UTC); any IANA name works, the node's zoneinfo is mounted into the agent |
| Events without a service | Kubernetes Events | the gateway fills `service_name` with `kubernetes-events` |

`sample-logs/` holds real lines from each container, useful for testing rule changes offline:

```bash
# run the rules of collector-values.yaml against a sample with the real collector image (helm, yq, docker)
../../../hack/test-rule.sh -f collector-values.yaml -n litefuse-prod -c be sample-logs/be.log
```

Install:

```bash
cd helm-charts
helm upgrade --install dog-stack ./ai-observe-stack -n dog-stack --create-namespace \
  -f examples/dog-k8s-collector/litefuse/dog-values.yaml
helm test dog-stack -n dog-stack --logs
helm upgrade --install dog-k8s-collector ./dog-k8s-collector -n dog-stack \
  -f examples/dog-k8s-collector/litefuse/collector-values.yaml
```
