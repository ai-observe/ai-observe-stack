# Collection layer with kubectl (DOG Stack deployed elsewhere)

For a Kubernetes cluster whose DOG Stack (gateway + Doris + Grafana) was deployed some other
way, or lives in another cluster, and that should be collected with plain `kubectl apply`.

`collectors.yaml` is **generated** from the `dog-k8s-collector` chart, so it is exactly what
`helm install` would deploy: the agent DaemonSet, the cluster collector Deployment, their RBAC
and ConfigMaps. Edit `values.yaml` (or pass your own) and regenerate; do not edit the manifest
by hand.

## 1. Point it at your gateway

In `values.yaml`, set `gateway.endpoint` to your gateway's OTLP gRPC address (`host:4317`) and
`clusterName`. Then:

```bash
./render.sh                       # writes collectors.yaml for namespace dog-stack
./render.sh -n observability      # another namespace
```

Needs `helm` and `yq`. Without them, edit the two `exporters.otlp_grpc.endpoint` values and the
`k8s.cluster.name` entry inside the ConfigMaps of the shipped `collectors.yaml` directly.

## 2. Apply

```bash
kubectl create namespace dog-stack
kubectl label namespace dog-stack pod-security.kubernetes.io/enforce=privileged   # only if PodSecurity is enforced
kubectl apply -n dog-stack -f collectors.yaml
kubectl -n dog-stack get pods            # one dog-k8s-collector-agent per node, one dog-k8s-collector-cluster
```

Container logs, kubelet / node / cluster metrics and Kubernetes Events now reach your gateway;
check `otel_logs` in Doris or the Logs Explorer dashboard.

## 3. Parsing your own log formats

Same rules engine and presets as the chart: put `logs.rules` in `values.yaml`, regenerate, apply.
The collector chart's [user guide](../../../dog-k8s-collector/USER_GUIDE.md) explains the rules, and
`helm-charts/hack/test-rule.sh -f values.yaml -n <ns> -c <container> sample.log` tests them
locally before applying.

## What is in the manifest

| Object | Name | Purpose |
|---|---|---|
| ServiceAccount, ClusterRole, ClusterRoleBinding | `dog-k8s-collector-agent` | pods / nodes / namespaces / replicasets read, `nodes/stats` + `nodes/proxy` for kubelet metrics |
| ServiceAccount, ClusterRole, ClusterRoleBinding | `dog-k8s-collector-cluster` | cluster-wide object list / watch, `leases` for leader election |
| ConfigMap | `dog-k8s-collector-agent-config` | agent configuration (file_log rules, kubelet_stats, host_metrics, otlp, k8s_attributes, otlp_grpc exporter) |
| ConfigMap | `dog-k8s-collector-cluster-config` | cluster collector configuration (k8s_cluster, k8s_objects Events) |
| DaemonSet | `dog-k8s-collector-agent` | one per node, runs as root, mounts `/var/log/pods`, `/` (read-only), `/var/lib/otelcol` and `/usr/share/zoneinfo` |
| Deployment | `dog-k8s-collector-cluster` | one replica |

No Secret: only the gateway talks to Doris.

## Upgrade / remove

Regenerate from the newer chart and `kubectl apply` again. A changed ConfigMap does not restart
pods by itself (Helm adds a checksum annotation for that), so after a configuration change:

```bash
kubectl -n dog-stack rollout restart daemonset/dog-k8s-collector-agent deployment/dog-k8s-collector-cluster
```

Remove with `kubectl delete -n dog-stack -f collectors.yaml`. The agents' file offsets stay in
`/var/lib/otelcol` on each node.
