# AIObserve Stack - Docker Compose

AIObserve Stack (Doris + OTel + Grafana Doris App Plugin) 是一个完整的可观测性解决方案，所有组件都以独立的 Docker 镜像分发：

- **Apache Doris** - 高性能实时分析数据库
- **OpenTelemetry Collector** - 遥测数据采集网关
- **Grafana** - 可视化与监控面板

这些镜像可以通过 Docker Compose 组合部署。

## 适用场景

- 本地测试与开发
- 概念验证 (PoC)

## 架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Applications                                   │
│                    (Instrumented with OpenTelemetry)                    │
└─────────────────────────┬───────────────────────────────────────────────┘
                          │ OTLP (gRPC: 4317 / HTTP: 4318)
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      OTel Collector (Gateway)                           │
│                   otel/opentelemetry-collector-contrib                  │
│                                                                         │
│  Receivers: OTLP (gRPC/HTTP)                                           │
│  Processors: batch, memory_limiter                                      │
│  Exporters: Doris (traces, logs, metrics)                              │
└─────────────────────────┬───────────────────────────────────────────────┘
                          │ Stream Load API (HTTP: 8040)
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     Apache Doris (All-in-One)                          │
│                   apache/doris:4.0.3-all-slim                          │
│                                                                         │
│  FE HTTP:  8030 (Web UI)                                               │
│  FE MySQL: 9030 (Query Protocol)                                       │
│  BE HTTP:  8040 (Stream Load)                                          │
└─────────────────────────┬───────────────────────────────────────────────┘
                          │ MySQL Protocol (9030)
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          Grafana                                        │
│                    grafana/grafana:11.4.0                              │
│                                                                         │
│  Datasource: Doris (MySQL Protocol)                                    │
│  Port: 3000                                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

## 暴露端口

Docker Compose 基于默认 OTel Collector 配置暴露以下端口：

| 端口 | 用途 |
|------|------|
| `3000` | Grafana Web UI |
| `4317` | OTLP gRPC receiver（Traces、Logs、Metrics 标准接收端口）|
| `4318` | OTLP HTTP receiver（gRPC 的 HTTP 替代方案）|
| `8888` | Prometheus metrics（Collector 自身监控指标）|
| `8889` | Prometheus exporter metrics |
| `9030` | Doris MySQL Protocol（查询端口）|
| `13133` | Health check（`health_check` 扩展端点）|
| `8030` | Doris FE HTTP（Web UI）|

这些端口支持多种遥测数据源的集成，使 OpenTelemetry Collector 能够满足多样化的数据采集需求。

## 部署步骤

### 1. 克隆仓库

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/docker
```

### 2. 启动服务

如果已有 Apache Doris 集群，配置连接信息后以外部模式启动（仅部署 OTel Collector + Grafana）：

```bash
cp .env.example .env
```

编辑 `.env`，填入 Doris 连接地址：

```bash
# Doris FE HTTP 端点（用于 Stream Load）
DORIS_FE_HTTP_ENDPOINT=http://<DORIS_FE_HOST>:<FE_HTTP_PORT>

# Doris FE MySQL 端点（用于查询）
DORIS_FE_MYSQL_ENDPOINT=<DORIS_FE_HOST>:<FE_MYSQL_PORT>

# Doris 认证信息
DORIS_USERNAME=root
DORIS_PASSWORD=
```

然后启动服务：

```bash
docker compose -f docker-compose-without-doris.yaml up -d
```

如果没有 Doris 集群，直接使用默认配置启动完整技术栈（包含内置 Doris）：

```bash
docker compose up -d
```

### 3. 验证服务运行

```bash
docker compose ps
```

所有服务应显示 `running` 状态。

### 4. 访问 Grafana

访问 http://localhost:3000 并使用 `admin` / `admin` 登录。

## 访问端点

| 服务 | URL/Endpoint | 凭据 |
|------|--------------|------|
| Grafana | http://localhost:3000 | admin / admin |
| Doris FE UI | http://localhost:8030 | root / (空) |
| Doris MySQL | localhost:9030 | root / (空) |
| OTel gRPC | localhost:4317 | - |
| OTel HTTP | localhost:4318 | - |
| OTel Health | http://localhost:13133 | - |
| OTel Metrics | http://localhost:8888/metrics | - |

## 修改配置

### 环境变量

通过 `.env` 文件或环境变量修改配置：

```bash
# Doris 镜像版本
DORIS_IMAGE=apache/doris:4.0.3-all-slim

# 端口映射
DORIS_FE_HTTP_PORT=8030
DORIS_FE_MYSQL_PORT=9030
DORIS_BE_HTTP_PORT=8040
```

### 时区配置

默认情况下，所有组件使用 **UTC** 时区。如需使用其他时区（如 `Asia/Shanghai`），需要同时修改两处配置以保持一致：

**1. 修改 OTel Collector 配置**

编辑 `otel-collector-config/otel-collector-config.yaml`：

```yaml
exporters:
  doris:
    timezone: Asia/Shanghai  # 修改此处
```

**2. 修改 Doris 容器时区**

编辑 `docker-compose.yaml`，为 doris 服务添加 `TZ` 环境变量：

```yaml
services:
  doris:
    image: ${DORIS_IMAGE:-apache/doris:4.0.3-all-slim}
    environment:
      - SKIP_CHECK_ULIMIT=true
      - TZ=Asia/Shanghai  # 添加此行
```

修改后重启服务：

```bash
docker compose down && docker compose up -d
```

> **重要**：两处时区配置必须保持一致，否则会导致 Grafana Dashboard 中时间显示异常（如 "Last 15 minutes" 查询无数据）。

### 配置 OpenTelemetry Collector

OTel Collector 配置文件位于 `otel-collector-config/otel-collector-config.yaml`。

可以修改的内容包括：
- 添加/修改 receivers（如 Prometheus、Jaeger、Zipkin、Fluentd）
- 调整 batch 处理参数
- 配置额外的 exporters

示例 - 添加 Fluentd receiver：

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  fluentforward:
    endpoint: 0.0.0.0:24224
```

### 配置 Grafana

- 数据源配置: `grafana/provisioning/datasources/datasources.yaml`
- Dashboard 配置: `grafana/provisioning/dashboards/dashboards.yaml`
- Dashboard JSON 文件: `grafana/dashboards/`

## 数据 Schema

AIObserve Stack 在 Doris 中自动创建三张主要表：

| 表名 | 用途 |
|------|------|
| `otel.otel_traces` | 分布式追踪数据 |
| `otel.otel_logs` | 日志数据 |
| `otel.otel_metrics` | 指标数据 |

所有表的特性：
- 动态分区（默认保留 7 天）
- 倒排索引加速搜索
- Duplicate Key 模型（追加写入）

## 发送测试数据

### 使用 otel-cli

```bash
# 发送测试 trace
otel-cli exec \
  --endpoint localhost:4317 \
  --service my-service \
  --name "test-span" \
  -- echo "Hello AIObserve Stack!"
```

### 使用 curl (OTLP/HTTP)

```bash
# 发送测试日志
curl -X POST http://localhost:4318/v1/logs \
  -H "Content-Type: application/json" \
  -d '{
    "resourceLogs": [{
      "resource": {
        "attributes": [{"key": "service.name", "value": {"stringValue": "test-service"}}]
      },
      "scopeLogs": [{
        "logRecords": [{
          "timeUnixNano": "'$(date +%s)000000000'",
          "severityText": "INFO",
          "body": {"stringValue": "Test log message from AIObserve Stack"}
        }]
      }]
    }]
  }'
```

## 故障排查

### 检查 OTel Collector 健康状态

```bash
curl http://localhost:13133/
```

### 检查 Doris 状态

```bash
# 检查 BE 状态
mysql -h 127.0.0.1 -P 9030 -uroot -e "SHOW BACKENDS\G"

# 或进入容器检查
docker exec -it doris mysql -h 127.0.0.1 -P 9030 -uroot -e "SHOW BACKENDS\G"
```

### 查看 OTel Collector 日志

```bash
docker compose logs otel-collector -f
```

### 验证 Doris 中的数据

```bash
docker exec -it doris mysql -h 127.0.0.1 -P 9030 -uroot -e "
SELECT 'traces' as type, COUNT(*) as count FROM otel.otel_traces
UNION ALL
SELECT 'logs', COUNT(*) FROM otel.otel_logs
UNION ALL
SELECT 'metrics', COUNT(*) FROM otel.otel_metrics;
"
```

### 检查容器状态

```bash
docker compose ps
```

所有服务应显示为 `healthy` 状态。

## 停止服务

内置 Doris 模式：

```bash
# 停止服务（保留数据）
docker compose down

# 停止服务并删除数据卷
docker compose down -v
```

外部 Doris 模式：

```bash
# 停止服务（保留数据）
docker compose -f docker-compose-without-doris.yaml down

# 停止服务并删除数据卷
docker compose -f docker-compose-without-doris.yaml down -v
```

