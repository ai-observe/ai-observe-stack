#!/usr/bin/env bash
# Render the dog-k8s-collector chart (agent DaemonSet + cluster Deployment) as a plain
# manifest, for clusters where Helm is not used.
#
#   ./render.sh                       # uses ./values.yaml, namespace dog-stack
#   ./render.sh -n observability      # another namespace
#   ./render.sh -f my-values.yaml     # your own values (log rules, platform, endpoint...)
#
# Needs: helm, yq (https://github.com/mikefarah/yq).
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
chart="$here/../../../dog-k8s-collector"
values="$here/values.yaml"; ns="dog-stack"; out="$here/collectors.yaml"
while getopts "f:n:o:" o; do case $o in f) values=$OPTARG ;; n) ns=$OPTARG ;; o) out=$OPTARG ;; *) exit 1 ;; esac; done
for t in helm yq; do command -v $t >/dev/null || { echo "missing: $t"; exit 1; }; done

version=$(yq '.version' "$chart/Chart.yaml")
{
  cat <<HDR
# dog-k8s-collector without Helm: agent (DaemonSet) + cluster collector (Deployment).
# Generated from helm-charts/dog-k8s-collector $version by examples/dog-k8s-collector/kubectl/render.sh
# with $(basename "$values"); namespace: $ns. Regenerate instead of editing.
#
#   kubectl create namespace $ns   # if needed; PodSecurity "restricted" namespaces need the privileged label
#   kubectl apply -n $ns -f collectors.yaml
#
# Before applying, check in the ConfigMaps below:
#   exporters.otlp_grpc.endpoint   -> your gateway (gateway.endpoint in values)
#   processors.resource            -> k8s.cluster.name (clusterName in values)
HDR
  helm template dog-k8s-collector "$chart" -n "$ns" -f "$values" \
    | yq eval-all '
        select(.kind != "Secret")
        | del(.. | .["helm.sh/chart"]?)
        | del(.. | .["checksum/config"]?)
        | (.. | select(has("app.kubernetes.io/managed-by")) | .["app.kubernetes.io/managed-by"]) = "kubectl"
        | .metadata.namespace = "'"$ns"'"
        | with(select(.kind == "ClusterRole" or .kind == "ClusterRoleBinding"); del(.metadata.namespace))
      ' -
} > "$out"
echo "wrote $out ($(grep -c '^kind:' "$out") objects)"
