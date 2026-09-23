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

Best for production deployments, development environments, and scalable setups. Two charts: `ai-observe-stack` deploys the DOG Stack backend (OpenTelemetry gateway, Grafana, optionally Doris); `dog-k8s-collector` collects a Kubernetes cluster into it. The end-to-end guide is [helm-charts/GETTING_STARTED.md](helm-charts/GETTING_STARTED.md).

## Prerequisites

- Kubernetes cluster (v1.24+)
- Helm (v3.8+)
- kubectl configured to access your cluster
- PersistentVolume provisioner (gateway queue; Doris when the chart deploys it)

## Deploy

1. Clone the repository and fetch the chart dependency (the Doris Operator subchart, required even with an existing Doris):

   ```bash
   git clone https://github.com/ai-observe/ai-observe-stack.git
   cd ai-observe-stack/helm-charts
   helm dependency update ./ai-observe-stack
   ```

2. Install the DOG Stack. With Doris deployed by the chart:

   ```bash
   helm install dog ./ai-observe-stack -n dog --create-namespace -f examples/ai-observe-stack/dev.yaml
   ```

   If you have an existing Doris cluster, put its account in a Secret and use external mode instead:

   ```bash
   kubectl create namespace dog
   kubectl create secret generic doris-credentials -n dog \
     --from-literal=username=<DORIS_USER> --from-literal=password='<DORIS_PASSWORD>'
   helm install dog ./ai-observe-stack -n dog \
     --set doris.mode=external \
     --set doris.external.host=<DORIS_FE_HOST> \
     --set doris.external.port=9030 \
     --set doris.external.feHttpPort=8030 \
     --set doris.external.existingSecret=doris-credentials \
     --set doris.internal.operator.enabled=false
   ```

3. Verify:

   ```bash
   kubectl get pods -n dog          # gateway, grafana (and Doris FE / BE with the chart-deployed Doris) Running
   helm test dog -n dog --logs      # sends one log record through the gateway and checks Doris
   ```

4. Access Grafana:

   ```bash
   kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000
   ```

   Open http://localhost:3000 and log in as `admin`; the password is in the Secret `dog-ai-observe-stack-grafana-admin` (default `admin`).

5. Collect the Kubernetes cluster (container logs, kubelet / node / cluster metrics, Kubernetes Events):

   ```bash
   helm install dog-k8s-collector ./dog-k8s-collector -n dog \
     --set gateway.endpoint=dog-ai-observe-stack-otel-gateway.dog.svc:4317 \
     --set clusterName=my-cluster
   ```

## Service endpoints

| Service | Address / port-forward command |
|---------|---------------------|
| Grafana | `kubectl port-forward -n dog svc/dog-ai-observe-stack-grafana 3000:3000` |
| OTLP gRPC / HTTP | `dog-ai-observe-stack-otel-gateway.dog.svc:4317` / `:4318` |
| Doris FE UI (chart-deployed Doris) | `kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 8030:8030` |
| Doris MySQL (chart-deployed Doris) | `kubectl port-forward -n dog svc/dog-ai-observe-stack-doris-fe-service 9030:9030` |

## Uninstall

```bash
helm uninstall dog-k8s-collector -n dog
helm uninstall dog -n dog
kubectl delete namespace dog
```
