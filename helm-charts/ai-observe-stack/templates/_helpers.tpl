{{/* ==========================================================================
   Naming
   ========================================================================== */}}
{{- define "aiobs.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "aiobs.fullname" -}}
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

{{- define "aiobs.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "aiobs.labels" -}}
helm.sh/chart: {{ include "aiobs.chart" . }}
{{ include "aiobs.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "aiobs.selectorLabels" -}}
app.kubernetes.io/name: {{ include "aiobs.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/* Component names. The gateway is rendered as <release>-otel-gateway (values key `gateway`). */}}
{{- define "aiobs.gateway.fullname" -}}{{ include "aiobs.fullname" . }}-otel-gateway{{- end }}
{{- define "aiobs.grafana.fullname" -}}{{ include "aiobs.fullname" . }}-grafana{{- end }}
{{- define "aiobs.grafana.secretName" -}}{{ .Values.grafana.existingSecret | default (printf "%s-grafana-admin" (include "aiobs.fullname" .)) }}{{- end }}
{{- define "aiobs.doris.clusterName" -}}{{ include "aiobs.fullname" . }}-doris{{- end }}
{{- define "aiobs.doris.secretName" -}}
{{- if and (eq .Values.doris.mode "external") .Values.doris.external.existingSecret -}}
{{ .Values.doris.external.existingSecret }}
{{- else -}}
{{ include "aiobs.fullname" . }}-doris-credentials
{{- end -}}
{{- end }}
{{- define "aiobs.doris.secretUserKey" -}}
{{- if and (eq .Values.doris.mode "external") .Values.doris.external.existingSecret -}}{{ .Values.doris.external.userKey }}{{- else -}}username{{- end -}}
{{- end }}
{{- define "aiobs.doris.secretPasswordKey" -}}
{{- if and (eq .Values.doris.mode "external") .Values.doris.external.existingSecret -}}{{ .Values.doris.external.passwordKey }}{{- else -}}password{{- end -}}
{{- end }}

{{/* In-cluster OTLP gRPC endpoint of the gateway, or the user override */}}
{{- define "aiobs.gateway.otlpGrpcEndpoint" -}}
{{ include "aiobs.gateway.fullname" . }}.{{ .Release.Namespace }}.svc:{{ .Values.gateway.ports.otlpGrpc }}
{{- end }}
{{- define "aiobs.gateway.otlpHttpEndpoint" -}}
http://{{ include "aiobs.gateway.fullname" . }}.{{ .Release.Namespace }}.svc:{{ .Values.gateway.ports.otlpHttp }}
{{- end }}

{{/* ==========================================================================
   Doris connection
   ========================================================================== */}}
{{- define "aiobs.doris.host" -}}
{{- if eq .Values.doris.mode "external" -}}
{{ required "doris.external.host is required when doris.mode is external" .Values.doris.external.host }}
{{- else -}}
{{ include "aiobs.doris.clusterName" . }}-fe-service
{{- end -}}
{{- end }}

{{- define "aiobs.doris.port" -}}
{{- if eq .Values.doris.mode "external" -}}{{ .Values.doris.external.port | default 9030 }}{{- else -}}9030{{- end -}}
{{- end }}

{{- define "aiobs.doris.feHttpPort" -}}
{{- if eq .Values.doris.mode "external" -}}{{ .Values.doris.external.feHttpPort | default 8030 }}{{- else -}}8030{{- end -}}
{{- end }}

{{- define "aiobs.doris.feHttpEndpoint" -}}
http://{{ include "aiobs.doris.host" . }}:{{ include "aiobs.doris.feHttpPort" . }}
{{- end }}

{{- define "aiobs.doris.mysqlEndpoint" -}}
{{ include "aiobs.doris.host" . }}:{{ include "aiobs.doris.port" . }}
{{- end }}

{{- define "aiobs.doris.user" -}}
{{- if eq .Values.doris.mode "external" -}}{{ .Values.doris.external.user | default "root" }}{{- else -}}root{{- end -}}
{{- end }}

{{- define "aiobs.doris.password" -}}
{{- if eq .Values.doris.mode "external" -}}{{ .Values.doris.external.password | default "" }}{{- end -}}
{{- end }}

{{- define "aiobs.doris.database" -}}
{{ .Values.doris.database | default "otel" }}
{{- end }}

{{/* ==========================================================================
   Sanity checks evaluated at render time
   ========================================================================== */}}
{{- define "aiobs.validate" -}}
{{- $q := .Values.gateway.dorisExporter.sendingQueue -}}
{{- if lt (int $q.queueSize) (int $q.batch.minSize) -}}
{{- fail (printf "gateway.dorisExporter.sendingQueue.queueSize (%d) must be >= batch.minSize (%d): the queue is sized in items and must hold at least one batch" (int $q.queueSize) (int $q.batch.minSize)) -}}
{{- end -}}
{{- $d := .Values.gateway.dorisExporter -}}
{{- if gt (int $d.createHistoryDays) (int $d.historyDays) -}}
{{- fail (printf "gateway.dorisExporter.createHistoryDays (%d) must be <= historyDays (%d)" (int $d.createHistoryDays) (int $d.historyDays)) -}}
{{- end -}}
{{- $fn := include "aiobs.fullname" . -}}
{{- if gt (len $fn) 41 -}}
{{- fail (printf "release/chart name %q is too long (%d chars): Service and StatefulSet names would exceed 63 characters; use a shorter release name or set fullnameOverride (max 41 chars)" $fn (len $fn)) -}}
{{- end -}}
{{- range $k := list "otel" "logCollector" "openObservabilityStack" -}}
{{- if hasKey $.Values $k -}}
{{- fail (printf "values key %q is from chart 0.1.x and is no longer read; see UPGRADING.md (0.2.0 uses gateway / doris / grafana; Kubernetes collection is the dog-k8s-collector chart)" $k) -}}
{{- end -}}
{{- end -}}
{{- range $k := list "agent" "cluster" "collectors" "logs" "metrics" "events" "otlp" "journald" "kubernetesAttributes" "resourceDetection" "clusterName" "platform" "presets" -}}
{{- if hasKey $.Values $k -}}
{{- fail (printf "values key %q belongs to the dog-k8s-collector chart (Kubernetes collection); this chart only deploys the DOG Stack backend. See helm-charts/GETTING_STARTED.md" $k) -}}
{{- end -}}
{{- end -}}
{{- if and .Values.global (or (hasKey .Values.global "clusterName") (hasKey .Values.global "platform")) -}}
{{- fail "global.clusterName / global.platform belong to the dog-k8s-collector chart (top-level clusterName / platform there)" -}}
{{- end -}}
{{- end }}
