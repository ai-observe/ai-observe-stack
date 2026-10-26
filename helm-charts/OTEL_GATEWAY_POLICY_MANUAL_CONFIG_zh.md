# 非 Helm 部署：配置 OTel Gateway Policy

本文说明在不使用 Helm 的环境中，如何为 OpenTelemetry Collector Gateway 配置遥测脱敏和噪声过滤策略。

策略必须配置在所有 OTLP 数据进入 Doris 前经过的 **Gateway Collector** 上，而不是逐个业务服务、SDK 或 Agent Collector 上。业务服务继续通过 OTLP 上报即可。

## 前置条件

- 使用包含 `transform` 和 `filter` processor 的 Contrib 发行版，例如 `otel/opentelemetry-collector-contrib:0.144.0`。
- 已确定 Gateway 使用的配置文件；Kubernetes 通常由 ConfigMap 挂载到 `/etc/otelcol/config.yaml`，Docker Compose 通常通过 volume 挂载配置文件。
- 原有配置已经包含 `otlp` receiver 和目标 exporter（例如 `doris`）。

## 修改 Collector 配置

在 Gateway 的配置文件中增加以下 processors。属性键严格按名称匹配；日志正文规则只处理字符串类型的 `body`，不会解析 JSON 或二进制正文。

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 1024
    spike_limit_mib: 256

  transform/redaction:
    # 配置或 OTTL 运行错误会向上游传播，不会静默跳过策略。
    error_mode: propagate
    trace_statements:
      - context: resource
        statements:
          - delete_key(resource.attributes, "authorization")
          - delete_key(resource.attributes, "token")
      - context: span
        statements:
          - delete_key(span.attributes, "db.statement")
          - delete_key(span.attributes, "http.request.header.authorization")

    metric_statements:
      - context: resource
        statements:
          - delete_key(resource.attributes, "authorization")
          - delete_key(resource.attributes, "token")

    log_statements:
      - context: resource
        statements:
          - delete_key(resource.attributes, "authorization")
      - context: log
        statements:
          - delete_key(log.attributes, "password")
          - replace_pattern(log.body, "(?i)bearer\\s+[a-z0-9\\-._~+/]+=*", "[REDACTED]") where IsString(log.body)
          - replace_pattern(log.body, "(?i)(password|passwd|pwd)\\s*[:=]\\s*[^,\\s&;]+", "[REDACTED]") where IsString(log.body)

  filter/noise:
    error_mode: propagate
    traces:
      span:
        - 'name == "GET /healthz"'
    metrics:
      metric:
        - 'name == "healthcheck.duration"'
    logs:
      log_record:
        - 'resource.attributes["service.name"] == "health-check" and severity_number < SEVERITY_NUMBER_WARN'

  batch:
    timeout: 5s
```

接着在三条 pipeline 中将 processors 按下列顺序接入。`doris` 替换为当前环境已有的 exporter 名称；不要在数据已经导出后再追加策略。

```yaml
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, transform/redaction, filter/noise, batch]
      exporters: [doris]

    metrics:
      receivers: [otlp]
      processors: [memory_limiter, transform/redaction, filter/noise, batch]
      exporters: [doris]

    logs:
      receivers: [otlp]
      processors: [memory_limiter, transform/redaction, filter/noise, batch]
      exporters: [doris]
```

如果只需要脱敏，删除 `filter/noise` 定义，并从三条 pipeline 的 `processors` 列表中移除它。不要将 filter 定义为空。

## Kubernetes：通过 ConfigMap 更新

假设 Gateway 由名为 `otel-gateway` 的 Deployment 管理，ConfigMap 名为 `otel-gateway-config`：

```bash
# 导出现有配置并编辑 data.config.yaml
kubectl -n observability get configmap otel-gateway-config -o yaml > otel-gateway-config.yaml

# 编辑后应用 ConfigMap
kubectl -n observability apply -f otel-gateway-config.yaml

# Collector 默认不热加载配置；显式滚动重启
kubectl -n observability rollout restart deployment/otel-gateway
kubectl -n observability rollout status deployment/otel-gateway
```

如果 Gateway 使用 StatefulSet，将最后两条命令中的 `deployment/otel-gateway` 改为 `statefulset/otel-gateway`。

检查新 Pod 是否成功加载规则：

```bash
kubectl -n observability logs deployment/otel-gateway --tail=100
```

如果 OTTL 表达式无效，Collector 会在启动时失败；修正 ConfigMap 后再次滚动重启即可。生产环境建议先在非生产命名空间验证配置。

## Docker Compose：通过挂载文件更新

确认 Compose 服务使用配置文件挂载，例如：

```yaml
services:
  otel-gateway:
    image: otel/opentelemetry-collector-contrib:0.144.0
    command: ["--config=/etc/otelcol/config.yaml"]
    volumes:
      - ./otel-gateway-config.yaml:/etc/otelcol/config.yaml:ro
```

按上文修改 `otel-gateway-config.yaml` 后重启 Gateway：

```bash
docker compose restart otel-gateway
docker compose logs --tail=100 otel-gateway
```

## 验证建议

向 Gateway 上报一条包含 `db.statement` 或 `password` attribute 的 trace/log，以及一条正文含 `Bearer <token>` 的日志；确认 Doris 中对应字段不存在或正文显示 `[REDACTED]`。再上报 `GET /healthz` trace，确认该数据未写入 Doris。

Gateway 策略只能治理经过该 Gateway 的数据。应配合 Kubernetes `NetworkPolicy` 或出口控制，避免服务直接把 OTLP 数据发送到其他后端。
