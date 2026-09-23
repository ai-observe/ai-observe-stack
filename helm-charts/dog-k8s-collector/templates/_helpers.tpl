{{/* ==========================================================================
   Naming
   ========================================================================== */}}
{{- define "dogc.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "dogc.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "dogc.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "dogc.labels" -}}
helm.sh/chart: {{ include "dogc.chart" . }}
app.kubernetes.io/name: {{ include "dogc.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "dogc.agent.fullname" -}}{{ include "dogc.fullname" . }}-agent{{- end }}
{{- define "dogc.cluster.fullname" -}}{{ include "dogc.fullname" . }}-cluster{{- end }}

{{/* The agent runs when any node-level preset is on; the cluster collector when any cluster-level preset is on */}}
{{- define "dogc.agent.enabled" -}}
{{- $p := .Values.presets -}}
{{- or $p.logsCollection.enabled $p.kubeletMetrics.enabled $p.hostMetrics.enabled $p.otlp.enabled $p.prometheusScrape.enabled (not (empty $p.prometheusScrape.extraScrapeConfigs)) $p.journald.enabled -}}
{{- end }}
{{- define "dogc.cluster.enabled" -}}
{{- or .Values.presets.clusterMetrics.enabled .Values.presets.kubernetesEvents.enabled -}}
{{- end }}

{{- define "dogc.gateway.endpoint" -}}
{{ required "gateway.endpoint is required: the DOG Stack gateway's OTLP gRPC address, e.g. dog-ai-observe-stack-otel-gateway.dog.svc:4317" .Values.gateway.endpoint }}
{{- end }}

{{- define "dogc.clusterName" -}}
{{ .Values.clusterName | default .Release.Name }}
{{- end }}

{{/* ==========================================================================
   Platform profile: detectors and journald units per `platform`
   ========================================================================== */}}
{{- define "dogc.platform.detectors" -}}
{{- $p := .Values.platform -}}
{{- /* no `system`: in a pod it sets host.name to the agent pod name, a new value per restart */ -}}
{{- $base := list "env" "k8s_api" -}}
{{- $extra := dict "eks" (list "eks" "ec2") "gke" (list "gcp") "aks" (list "aks" "azure") "openshift" (list "openshift") -}}
{{- $d := concat $base (get $extra $p | default list) .Values.presets.resourceDetection.extraDetectors | uniq -}}
{{ toYaml $d }}
{{- end }}

{{- define "dogc.platform.journaldUnits" -}}
{{- if .Values.presets.journald.units -}}
{{ toYaml .Values.presets.journald.units }}
{{- else -}}
{{- $u := dict "k3s" (list "k3s") "openshift" (list "kubelet" "crio") -}}
{{ toYaml (get $u .Values.platform | default (list "kubelet" "containerd")) }}
{{- end -}}
{{- end }}

{{/* ==========================================================================
   Logs: file globs from namespaces / containers
   ========================================================================== */}}
{{- define "dogc.logs.includeGlobs" -}}
{{- $out := list -}}
{{- range .Values.logs.namespaces.include -}}
{{- if eq . "*" -}}
{{- $out = append $out "/var/log/pods/*/*/*.log" -}}
{{- else -}}
{{- $out = append $out (printf "/var/log/pods/%s_*/*/*.log" .) -}}
{{- end -}}
{{- end -}}
{{ toYaml $out }}
{{- end }}

{{- define "dogc.logs.excludeGlobs" -}}
{{- $out := list -}}
{{- $out = append $out (printf "/var/log/pods/%s_%s-*/*/*.log" .Release.Namespace (include "dogc.agent.fullname" .)) -}}
{{- $out = append $out (printf "/var/log/pods/%s_%s-*/*/*.log" .Release.Namespace (include "dogc.cluster.fullname" .)) -}}
{{- range .Values.logs.namespaces.exclude -}}
{{- $out = append $out (printf "/var/log/pods/%s_*/*/*.log" .) -}}
{{- end -}}
{{- range .Values.logs.containers.exclude -}}
{{- $out = append $out (printf "/var/log/pods/*/%s/*.log" .) -}}
{{- end -}}
{{- range .Values.logs.excludePaths -}}
{{- $out = append $out . -}}
{{- end -}}
{{ toYaml $out }}
{{- end }}

{{/* ==========================================================================
   Logs: resolve rules (apply presets, infer format) -> YAML list under key `rules`
   ========================================================================== */}}
{{- define "dogc.logs.resolvedRules" -}}
{{- $root := . -}}
{{- $out := list -}}
{{- range $i, $rule := .Values.logs.rules -}}
{{- $name := required (printf "logs.rules[%d].name is required" $i) $rule.name -}}
{{- $r := dict -}}
{{- if $rule.preset -}}
{{- $file := printf "files/presets/logs/%s.yaml" $rule.preset -}}
{{- $raw := $root.Files.Get $file -}}
{{- if not $raw -}}{{- fail (printf "logs.rules[%s]: unknown preset %q (no %s in chart)" $name $rule.preset $file) -}}{{- end -}}
{{- $r = mergeOverwrite (deepCopy (fromYaml $raw)) (deepCopy $rule) -}}
{{- else -}}
{{- $r = deepCopy $rule -}}
{{- end -}}
{{- /* format: explicit, else from the preset, else inferred from the keys present */ -}}
{{- if not $r.format -}}
{{- $_ := set $r "format" (ternary "regex" (ternary "json" "none" (hasKey $r "json")) (hasKey $r "regex")) -}}
{{- end -}}
{{- if and (eq $r.format "regex") (not $r.regex) -}}{{- fail (printf "logs.rules[%s]: format regex needs a regex" $name) -}}{{- end -}}
{{- if not (hasKey $r "selector") -}}{{- $_ := set $r "selector" dict -}}{{- end -}}
{{- $out = append $out $r -}}
{{- end -}}
{{- if and .Values.presets.logsCollection.enabled .Values.logs.json.autodetect -}}
{{- $tsFields := ternary .Values.logs.json.timestampFields (list) (default false .Values.logs.json.parseTimestamp) -}}
{{- $auto := dict "name" "json-autodetect" "format" "json" "selector" (dict "bodyPrefix" "^\\s*\\{") "json" (dict "timestampFields" $tsFields "severityFields" .Values.logs.json.severityFields "messageFields" .Values.logs.json.messageFields) "quiet" true -}}
{{- $out = append $out $auto -}}
{{- end -}}
rules:
{{ toYaml $out }}
{{- end }}

{{/* expr condition for a rule selector */}}
{{- define "dogc.logs.ruleCondition" -}}
{{- $s := .selector | default dict -}}
{{- $parts := list -}}
{{- if $s.namespace -}}{{- $parts = append $parts (printf "resource[\"k8s.namespace.name\"] matches %q" $s.namespace) -}}{{- end -}}
{{- if $s.container -}}{{- $parts = append $parts (printf "resource[\"k8s.container.name\"] matches %q" $s.container) -}}{{- end -}}
{{- if $s.bodyPrefix -}}{{- $parts = append $parts (printf "body matches %q" $s.bodyPrefix) -}}{{- end -}}
{{- if .exclusive -}}{{- $parts = append $parts "attributes[\"dog.log.rule\"] == nil" -}}{{- end -}}
{{- if $parts -}}{{ join " and " $parts }}{{- else -}}true{{- end -}}
{{- end }}

{{/* IANA zone for a rule's zone-less timestamps: timestamp.timezone, else `timezone` */}}
{{- define "dogc.logs.ruleTimezone" -}}
{{- $ts := .rule.timestamp | default dict -}}
{{- $ts.timezone | default .root.Values.timezone | default "UTC" -}}
{{- end }}

{{/* ==========================================================================
   Sanity checks evaluated at render time
   ========================================================================== */}}
{{- define "dogc.validate" -}}
{{- if lt (int .Values.agent.queueSize) 1024 -}}
{{- fail (printf "agent.queueSize (%d) must be >= 1024 (the queue is sized in records and must hold one batch)" (int .Values.agent.queueSize)) -}}
{{- end -}}
{{- if not (has .Values.platform (list "generic" "k3s" "eks" "gke" "aks" "ack" "openshift")) -}}
{{- fail (printf "platform %q is not one of generic|k3s|eks|gke|aks|ack|openshift" .Values.platform) -}}
{{- end -}}
{{- if not (or (include "dogc.agent.enabled" . | eq "true") (include "dogc.cluster.enabled" . | eq "true")) -}}
{{- fail "every preset is disabled; nothing to deploy" -}}
{{- end -}}
{{- if and .Values.presets.logsCollection.enabled (not .Values.logs.namespaces.include) -}}
{{- fail "logs.namespaces.include is empty; list namespaces (or [\"*\"]), or set presets.logsCollection.enabled=false" -}}
{{- end -}}
{{- $fn := include "dogc.fullname" . -}}
{{- if gt (len $fn) 48 -}}
{{- fail (printf "release/chart name %q is too long (%d chars); the agent and cluster names would exceed 63 characters. Use a shorter release name or fullnameOverride (max 48 chars)" $fn (len $fn)) -}}
{{- end -}}
{{- /* a non-UTC zone renders `location:` in the parsers, which needs tzdata in the agent (the node's zoneinfo mount) */ -}}
{{- $needsTz := ne (.Values.timezone | default "UTC") "UTC" -}}
{{- $names := list -}}
{{- range $i, $rule := .Values.logs.rules -}}
{{- if has $rule.name $names -}}{{- fail (printf "logs.rules[%d]: duplicate rule name %q" $i $rule.name) -}}{{- end -}}
{{- if eq $rule.name "json-autodetect" -}}{{- fail "logs.rules: the name json-autodetect is reserved for the implicit JSON rule" -}}{{- end -}}
{{- $names = append $names $rule.name -}}
{{- if and $rule.timestamp $rule.timestamp.timezone (ne $rule.timestamp.timezone "UTC") -}}{{- $needsTz = true -}}{{- end -}}
{{- end -}}
{{- if and $needsTz (not .Values.agent.tzdata.hostPath) -}}
{{- fail "a time zone other than UTC is used (timezone or logs.rules[].timestamp.timezone) but agent.tzdata.hostPath is empty: the otelcol-k8s image has no tzdata, so the collector would fail to start. Keep the zoneinfo mount, or switch agent.image.repository to otel/opentelemetry-collector-contrib" -}}
{{- end -}}
{{- range $k := list "collectors" "metrics" "events" "otlp" "journald" "kubernetesAttributes" "resourceDetection" "global" -}}
{{- if hasKey $.Values $k -}}
{{- fail (printf "values key %q belongs to the ai-observe-stack chart's 0.2.0 pre-release layout; in dog-k8s-collector use presets.* (what to collect), agent / cluster (how they run), clusterName / platform / timezone / gateway.endpoint" $k) -}}
{{- end -}}
{{- end -}}
{{- range $i, $rule := .Values.logs.rules -}}
{{- if and $rule.timestamp $rule.timestamp.tzOffset -}}
{{- fail (printf "logs.rules[%s]: tzOffset was removed; use timestamp.timezone with an IANA name (e.g. Asia/Shanghai)" $rule.name) -}}
{{- end -}}
{{- if and $rule.format (hasPrefix "preset:" $rule.format) -}}
{{- fail (printf "logs.rules[%s]: `format: preset:<name>` became `preset: <name>`" $rule.name) -}}
{{- end -}}
{{- end -}}
{{- end }}
