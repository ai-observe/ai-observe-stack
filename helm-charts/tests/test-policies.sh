#!/usr/bin/env bash
set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
work_dir=$(mktemp -d)
chart_dir="$work_dir/ai-observe-stack"
rendered="$work_dir/rendered.yaml"
trap 'rm -rf "$work_dir"' EXIT

# Keep chart dependencies out of the working tree so this test is safe to run
# locally and in CI from a freshly cloned repository.
cp -R "$script_dir/../ai-observe-stack" "$chart_dir"
helm dependency update "$chart_dir" >/dev/null

helm template policy-test "$chart_dir" -f "$script_dir/policy-values.yaml" > "$rendered"

grep -Fq 'transform/redaction:' "$rendered"
grep -Fq 'filter/noise:' "$rendered"
grep -Fq 'delete_key(resource.attributes, "tenant.secret")' "$rendered"
grep -Fq 'delete_key(span.attributes, "http.request.header.authorization")' "$rendered"
grep -Fq 'replace_pattern(log.body, "(?i)credential\\s*[:=]\\s*\\S+", "[REDACTED]") where IsString(log.body)' "$rendered"
grep -Fq 'GET /healthz' "$rendered"
grep -Fq 'healthcheck.duration' "$rendered"
grep -Fq 'service.name' "$rendered"
grep -Fq 'processors: [memory_limiter, transform, transform/redaction, filter/noise]' "$rendered"

helm template policy-disabled "$chart_dir" \
  --set doris.mode=external \
  --set doris.internal.operator.enabled=false \
  --set doris.external.host=doris.example.com \
  --set gateway.policies.redaction.enabled=false \
  --set gateway.policies.filter.enabled=false > "$rendered"

! grep -Fq 'transform/redaction:' "$rendered"
! grep -Fq 'filter/noise:' "$rendered"
grep -Fq 'processors: [memory_limiter, transform]' "$rendered"

echo "OTel policy template tests passed."
