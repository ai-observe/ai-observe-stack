# Deployment

This guide covers two ways to deploy AIObserve Stack. Choose the method that fits your environment:

| Method | Best for |
|--------|----------|
| Docker Compose | Local testing, development, PoC |
| Kubernetes (Helm) | Production, scalable environments |

Each method deploys the core components: OpenTelemetry Collector, Apache Doris, and Grafana with Doris App Plugin. For data collection configuration.

# Docker Compose

Best for local testing, development, and proof of concepts (PoC).

[AIObserve Stack - Docker Compose](docker/README.md)

## Prerequisites

- Docker Engine (v20.10+)
- Docker Compose (v2.0+)

## Deploy

1. Clone the repository:

   ```bash
   git clone https://github.com/ai-observe/ai-observe-stack.git
   cd ai-observe-stack/docker
   ```

2. If you already have an existing Apache Doris cluster, configure the connection and start in external mode:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Doris connection details:

   ```bash
   DORIS_FE_HTTP_ENDPOINT=http://<DORIS_FE_HOST>:<FE_HTTP_PORT>
   DORIS_FE_MYSQL_ENDPOINT=<DORIS_FE_HOST>:<FE_MYSQL_PORT>
   DORIS_USERNAME=root
   DORIS_PASSWORD=
   ```

   Then start the services (OTel Collector + Grafana only):

   ```bash
   docker compose -f docker-compose-without-doris.yaml up -d
   ```

3. If you don't have a Doris cluster, simply start the full stack with the built-in Doris:

   ```bash
   docker compose up -d
   ```

4. Verify the services are running:

   ```bash
   docker compose ps
   ```

   All services should show `running` status.

5. Access Grafana at http://localhost:3000 and log in with `admin` / `admin`.

## Service endpoints

| Service | Endpoint | Credentials |
|---------|----------|-------------|
| Grafana | http://localhost:3000 | admin / admin |
| OTel gRPC | localhost:4317 | - |
| OTel HTTP | localhost:4318 | - |

## Stop and clean up

To stop services while preserving data:

```bash
docker compose down
```

To stop services and remove all data:

```bash
docker compose down -v
```

# Kubernetes (Helm)

Best for production deployments, development environments, and scalable setups.

[AIObserve Stack Helm Chart](helm-charts/README.md)

## Prerequisites

- Kubernetes cluster (v1.20+)
- Helm (v3.0+)
- kubectl configured to access your cluster
- PersistentVolume provisioner (for data persistence)

## Deploy

1. Add the AIObserve Stack Helm repository:

   ```bash
   helm repo add ai-observe-stack https://charts.velodb.io
   helm repo update
   ```

2. Create a namespace for AIObserve Stack:

   ```bash
   kubectl create namespace ai-observe-stack
   ```

3. Install AIObserve Stack:

   ```bash
   helm install my-aiobs ai-observe-stack/ai-observe-stack -n ai-observe-stack
   ```

   If you have an existing Doris cluster, use external mode instead:

   ```bash
   helm install my-aiobs ai-observe-stack/ai-observe-stack -n ai-observe-stack \
     --set doris.mode=external \
     --set doris.external.host=<DORIS_FE_HOST> \
     --set doris.external.port=9030 \
     --set doris.external.feHttpPort=8030 \
     --set doris.internal.operator.enabled=false
   ```

4. Verify all pods are running:

   ```bash
   kubectl get pods -n ai-observe-stack
   ```

   Wait until all pods show `Running` status.

5. Access Grafana:

   ```bash
   kubectl port-forward svc/my-aiobs-grafana 3000:3000 -n ai-observe-stack
   ```

   Open http://localhost:3000 and log in with `admin` / `admin`.

## Service endpoints

| Service | Port-forward command |
|---------|---------------------|
| Grafana | `kubectl port-forward svc/my-aiobs-grafana 3000:3000 -n ai-observe-stack` |
| Doris FE UI | `kubectl port-forward svc/my-aiobs-doris-fe 8030:8030 -n ai-observe-stack` |
| Doris MySQL | `kubectl port-forward svc/my-aiobs-doris-fe 9030:9030 -n ai-observe-stack` |

## Uninstall

```bash
helm uninstall my-aiobs -n ai-observe-stack
kubectl delete namespace ai-observe-stack
```

