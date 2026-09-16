#!/usr/bin/env bash
# Try the chart's log rules against sample log lines, offline, in a few seconds.
#
#   helm-charts/hack/test-rule.sh -f my-values.yaml -n <namespace> -c <container> sample.log
#
# The sample file holds raw application lines (one record per line, as `kubectl logs`
# prints them). The script wraps them in the CRI envelope the node writes, places them
# under a fake /var/log/pods/<namespace>_<pod>_<uid>/<container>/0.log, renders the
# agent configuration from your values with `helm template`, and runs the real
# collector image with only file_log -> debug. What it prints is what would reach Doris:
# Timestamp, SeverityText, Body and the parsed attributes of every record.
#
# Needs: helm, yq (https://github.com/mikefarah/yq), docker.
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
chart="$here/../dog-k8s-collector"
values=""; ns="default"; container="app"; pod=""; image=""
usage() { sed -n '2,15p' "$0"; exit 1; }
while getopts "f:n:c:p:i:h" o; do
  case $o in
    f) values=$OPTARG ;; n) ns=$OPTARG ;; c) container=$OPTARG ;; p) pod=$OPTARG ;; i) image=$OPTARG ;; *) usage ;;
  esac
done
shift $((OPTIND - 1))
sample=${1:-}; [ -n "$sample" ] && [ -f "$sample" ] || usage
[ -n "$values" ] || { echo "-f <values.yaml> is required (the file with your logs.rules)"; exit 1; }
for t in helm yq docker; do command -v $t >/dev/null || { echo "missing: $t"; exit 1; }; done
pod=${pod:-$container-0}
[ -n "$image" ] || image=$(yq '.agent.image.repository + ":" + .agent.image.tag' "$chart/values.yaml")

work=$(mktemp -d); trap 'rm -rf "$work"' EXIT
# 1. rendered agent config -> its file_log operators (the rule engine output)
helm template rt "$chart" -f "$values" --set gateway.endpoint=gw:4317 --show-only templates/configmap-agent.yaml \
  | yq '.data["config.yaml"]' | yq '.receivers.file_log.operators' > "$work/ops.yaml"
# 2. sample lines in the CRI envelope, at a path the container operator understands
dir="$work/pods/${ns}_${pod}_00000000-0000-4000-8000-000000000000/$container"; mkdir -p "$dir"
now=$(date -u +%Y-%m-%dT%H:%M:%S.000000000Z)
awk -v t="$now" '{ print t " stdout F " $0 }' "$sample" > "$dir/0.log"
# 3. minimal collector config: same operators, debug exporter
cat > "$work/config.yaml" <<YAML
receivers:
  file_log:
    include: [/var/log/pods/*/*/*.log]
    start_at: beginning
    include_file_path: true
    operators: []
exporters:
  debug:
    verbosity: detailed
service:
  telemetry: {logs: {level: info, encoding: console}}
  pipelines:
    logs: {receivers: [file_log], processors: [], exporters: [debug]}
YAML
yq -i '.receivers.file_log.operators = load("'"$work"'/ops.yaml")' "$work/config.yaml"
# parse failures are silent in the chart by default; here we want to see them
yq -i '(.receivers.file_log.operators[] | select(has("on_error")) | .on_error) = "send"' "$work/config.yaml"
# the yq round trip turns the recombine separator into an empty string; the chart always joins with "\n"
yq -i '(.receivers.file_log.operators[] | select(.type == "recombine") | .combine_with) = "\n"' "$work/config.yaml"
# the otelcol-k8s image has no tzdata; give it the host's like the DaemonSet does (copied: Docker Desktop cannot mount /usr)
zi=/usr/share/zoneinfo; [ -d "$zi" ] && cp -RL "$zi" "$work/zoneinfo" 2>/dev/null || true
chmod -R a+rX "$work"
echo "== $sample as $ns/$pod/$container, rules from $values, image $image" >&2
# 4. run for a few seconds and print the records
timeout 20 docker run --rm --platform linux/amd64 -v "$work/pods:/var/log/pods:ro" -v "$work/config.yaml:/etc/otelcol/config.yaml:ro" $( [ -d "$work/zoneinfo" ] && echo -v "$work/zoneinfo:/usr/share/zoneinfo:ro" ) \
  "$image" --config /etc/otelcol/config.yaml 2>&1 \
  | grep -vE '^(ObservedTimestamp|Trace ID|Span ID|Flags|Resource SchemaURL|ScopeLogs|InstrumentationScope|SeverityNumber|Resource attributes|ResourceLog|Scope|LogRecord)' \
  | grep -vE '^[0-9T:.+-]+Z?\s+info\s' || true
