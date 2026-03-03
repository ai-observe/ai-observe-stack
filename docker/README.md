# AIObserve Stack - Docker Compose

AIObserve Stack (Doris + OTel + Grafana Doris App Plugin) is a complete observability solution where all components are distributed as standalone Docker images:

- **Apache Doris** - High-performance real-time analytical database
- **OpenTelemetry Collector** - Telemetry data collection gateway
- **Grafana** - Visualization and monitoring dashboards

These images can be deployed together using Docker Compose.

## Use Cases

- Local testing and development
- Proof of Concept (PoC)

## Architecture

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

## Exposed Ports

Docker Compose exposes the following ports based on the default OTel Collector configuration:

| Port | Purpose |
|------|---------|
| `3000` | Grafana Web UI |
| `4317` | OTLP gRPC receiver (standard endpoint for Traces, Logs, Metrics) |
| `4318` | OTLP HTTP receiver (HTTP alternative to gRPC) |
| `8888` | Prometheus metrics (Collector self-monitoring metrics) |
| `8889` | Prometheus exporter metrics |
| `9030` | Doris MySQL Protocol (query port) |
| `13133` | Health check (`health_check` extension endpoint) |
| `8030` | Doris FE HTTP (Web UI) |

These ports support integration with various telemetry data sources, enabling the OpenTelemetry Collector to meet diverse data collection needs.

## Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/ai-observe/ai-observe-stack.git
cd ai-observe-stack/docker
```

### 2. Start Services

If you already have an Apache Doris cluster, configure the connection info and start in external mode (deploys only OTel Collector + Grafana):

```bash
cp .env.example .env
```

Edit `.env` with your Doris connection details:

```bash
# Doris FE HTTP endpoint (for Stream Load)
DORIS_FE_HTTP_ENDPOINT=http://<DORIS_FE_HOST>:<FE_HTTP_PORT>

# Doris FE MySQL endpoint (for queries)
DORIS_FE_MYSQL_ENDPOINT=<DORIS_FE_HOST>:<FE_MYSQL_PORT>

# Doris credentials
DORIS_USERNAME=root
DORIS_PASSWORD=
```

Then start the services:

```bash
docker compose -f docker-compose-without-doris.yaml up -d
```

If you don't have a Doris cluster, start the full stack with the built-in Doris using the default configuration:

```bash
docker compose up -d
```

### 3. Verify Services

```bash
docker compose ps
```

All services should show `running` status.

### 4. Access Grafana

Visit http://localhost:3000 and log in with `admin` / `admin`.

## Access Endpoints

| Service | URL/Endpoint | Credentials |
|---------|--------------|-------------|
| Grafana | http://localhost:3000 | admin / admin |
| Doris FE UI | http://localhost:8030 | root / (empty) |
| Doris MySQL | localhost:9030 | root / (empty) |
| OTel gRPC | localhost:4317 | - |
| OTel HTTP | localhost:4318 | - |
| OTel Health | http://localhost:13133 | - |
| OTel Metrics | http://localhost:8888/metrics | - |

## Configuration

### Environment Variables

Modify configuration via `.env` file or environment variables:

```bash
# Doris image version
DORIS_IMAGE=apache/doris:4.0.3-all-slim

# Port mappings
DORIS_FE_HTTP_PORT=8030
DORIS_FE_MYSQL_PORT=9030
DORIS_BE_HTTP_PORT=8040
```

### Timezone Configuration

By default, all components use **UTC** timezone. To use a different timezone (e.g., `Asia/Shanghai`), you need to update two configurations to keep them in sync:

**1. Update OTel Collector Configuration**

Edit `otel-collector-config/otel-collector-config.yaml`:

```yaml
exporters:
  doris:
    timezone: Asia/Shanghai  # Change this
```

**2. Update Doris Container Timezone**

Edit `docker-compose.yaml` and add the `TZ` environment variable to the doris service:

```yaml
services:
  doris:
    image: ${DORIS_IMAGE:-apache/doris:4.0.3-all-slim}
    environment:
      - SKIP_CHECK_ULIMIT=true
      - TZ=Asia/Shanghai  # Add this line
```

Restart services after changes:

```bash
docker compose down && docker compose up -d
```

> **Important**: Both timezone settings must match. Otherwise, Grafana dashboards will display time incorrectly (e.g., "Last 15 minutes" queries return no data).

### Configuring OpenTelemetry Collector

The OTel Collector configuration file is located at `otel-collector-config/otel-collector-config.yaml`.

You can modify:
- Add/modify receivers (e.g., Prometheus, Jaeger, Zipkin, Fluentd)
- Adjust batch processing parameters
- Configure additional exporters

Example - Adding a Fluentd receiver:

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

### Configuring Grafana

- Datasource config: `grafana/provisioning/datasources/datasources.yaml`
- Dashboard config: `grafana/provisioning/dashboards/dashboards.yaml`
- Dashboard JSON files: `grafana/dashboards/`

## Data Schema

AIObserve Stack automatically creates three main tables in Doris:

| Table | Purpose |
|-------|---------|
| `otel.otel_traces` | Distributed tracing data |
| `otel.otel_logs` | Log data |
| `otel.otel_metrics` | Metrics data |

All tables feature:
- Dynamic partitioning (7-day retention by default)
- Inverted indexes for accelerated search
- Duplicate Key model (append-only writes)

## Sending Test Data

### Using otel-cli

```bash
# Send a test trace
otel-cli exec \
  --endpoint localhost:4317 \
  --service my-service \
  --name "test-span" \
  -- echo "Hello AIObserve Stack!"
```

### Using curl (OTLP/HTTP)

```bash
# Send a test log
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

## Troubleshooting

### Check OTel Collector Health

```bash
curl http://localhost:13133/
```

### Check Doris Status

```bash
# Check BE status
mysql -h 127.0.0.1 -P 9030 -uroot -e "SHOW BACKENDS\G"

# Or check from inside the container
docker exec -it doris mysql -h 127.0.0.1 -P 9030 -uroot -e "SHOW BACKENDS\G"
```

### View OTel Collector Logs

```bash
docker compose logs otel-collector -f
```

### Verify Data in Doris

```bash
docker exec -it doris mysql -h 127.0.0.1 -P 9030 -uroot -e "
SELECT 'traces' as type, COUNT(*) as count FROM otel.otel_traces
UNION ALL
SELECT 'logs', COUNT(*) FROM otel.otel_logs
UNION ALL
SELECT 'metrics', COUNT(*) FROM otel.otel_metrics;
"
```

### Check Container Status

```bash
docker compose ps
```

All services should show `healthy` status.

## Stopping Services

Built-in Doris mode:

```bash
# Stop services (keep data)
docker compose down

# Stop services and remove volumes
docker compose down -v
```

External Doris mode:

```bash
# Stop services (keep data)
docker compose -f docker-compose-without-doris.yaml down

# Stop services and remove volumes
docker compose -f docker-compose-without-doris.yaml down -v
```
