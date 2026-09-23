# OrbStack 日志采集 DaemonSet 测试说明

本文档用于在本地 OrbStack Kubernetes 中验证 Helm 日志采集 DaemonSet：

- 默认 values 不启用日志采集 DaemonSet
- ACK/Kubernetes values 可以正确渲染日志采集 DaemonSet
- DaemonSet 可以采集业务 Pod stdout/stderr
- `file_storage` 能持久化 offset，Collector 重启后不重复采集
- Docker runtime 场景下的日志 symlink 可以正确读取

## 适用范围

该测试只验证节点级日志采集链路，不部署完整 Doris/Grafana。

测试链路如下：

```text
业务 Pod stdout/stderr
  -> 节点 /var/log/pods/*/*/*.log
  -> logCollector DaemonSet filelog receiver
  -> 临时 OTel Gateway
  -> Gateway debug exporter stdout
```

生产环境仍应使用 `values-ack.yaml` 将日志发往正式 OTel Gateway，再由 Gateway 写入 Doris。

## 前置条件

1. OrbStack 已启动 Kubernetes。

```bash
orbctl status
orbctl k8s
kubectl config current-context
kubectl get nodes -o wide
```

期望：

- `orbctl status` 返回 `Running`
- `kubectl config current-context` 为 `orbstack`
- `kubectl get nodes` 至少有一个 `Ready` 节点

2. 本地有 Helm。

如果没有安装 Helm，可以临时下载到 `/tmp`，不写入系统路径：

```bash
mkdir -p /tmp/aiobs-helm
cd /tmp/aiobs-helm
curl -fsSL https://get.helm.sh/helm-v3.15.4-darwin-arm64.tar.gz -o helm.tgz
tar -xzf helm.tgz
mv darwin-arm64/helm ./helm
./helm version --short
```

下文命令默认使用：

```bash
HELM=/tmp/aiobs-helm/helm
```

如果你已经安装 Helm，可以改成：

```bash
HELM=helm
```

## 1. 静态渲染验证

在仓库根目录执行：

```bash
cd /Users/jeffrey/Documents/litefuse/ai-observe-stack

ruby -ryaml -e 'ARGV.each { |f| YAML.load_file(f); puts "OK #{f}" }' \
  helm-charts/ai-observe-stack/Chart.yaml \
  helm-charts/ai-observe-stack/values.yaml \
  helm-charts/ai-observe-stack/values-ack.yaml
```

准备临时 chart，避免把依赖包写入仓库：

```bash
rm -rf /tmp/aiobs-chart-test
mkdir -p /tmp/aiobs-chart-test
cp -R helm-charts/ai-observe-stack /tmp/aiobs-chart-test/ai-observe-stack
$HELM dependency update /tmp/aiobs-chart-test/ai-observe-stack
```

执行 lint：

```bash
$HELM lint /tmp/aiobs-chart-test/ai-observe-stack
```

验证默认 values 不生成 logCollector：

```bash
$HELM template ai-observe-stack /tmp/aiobs-chart-test/ai-observe-stack > /tmp/aiobs-default.yaml

if rg -n "log-collector|filelog/container|file_storage" /tmp/aiobs-default.yaml; then
  echo "ERROR: default values should not render log collector"
  exit 1
else
  echo "OK: default values do not render log collector"
fi
```

验证 `values-ack.yaml` 会生成关键配置：

```bash
$HELM template ai-observe-stack /tmp/aiobs-chart-test/ai-observe-stack \
  -f /tmp/aiobs-chart-test/ai-observe-stack/values-ack.yaml \
  > /tmp/aiobs-ack.yaml

rg -n \
  "kind: DaemonSet|prepare-file-storage|/var/log/pods/\\*/\\*/\\*\\.log|poll_interval|fingerprint_size|storage: file_storage|retry_on_failure" \
  /tmp/aiobs-ack.yaml
```

期望能看到：

- `kind: DaemonSet`
- `prepare-file-storage`
- `/var/log/pods/*/*/*.log`
- `poll_interval: 1s`
- `fingerprint_size: 1kb`
- `storage: file_storage`
- `retry_on_failure`

## 2. 创建 OrbStack 集成测试环境

创建测试 namespace：

```bash
kubectl create namespace aiobs-logtest
```

部署临时 OTel Gateway。

注意：该 Gateway 使用 `debug` exporter，只用于测试接收日志；不要用于生产。

```bash
kubectl apply -n aiobs-logtest -f - <<'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: ai-observe-stack-otel-test-gateway-config
data:
  config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    processors:
      batch: {}
    exporters:
      debug:
        verbosity: detailed
    extensions:
      health_check:
        endpoint: 0.0.0.0:13133
    service:
      extensions: [health_check]
      pipelines:
        logs:
          receivers: [otlp]
          processors: [batch]
          exporters: [debug]
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-observe-stack-otel-test-gateway
spec:
  replicas: 1
  selector:
    matchLabels:
      app: aiobs-logtest-gateway
  template:
    metadata:
      labels:
        app: aiobs-logtest-gateway
    spec:
      containers:
        - name: otel-gateway
          image: otel/opentelemetry-collector-contrib:0.144.0
          imagePullPolicy: IfNotPresent
          command:
            - /otelcol-contrib
            - --config=/etc/otelcol/config.yaml
          ports:
            - name: otlp-grpc
              containerPort: 4317
            - name: otlp-http
              containerPort: 4318
            - name: health-check
              containerPort: 13133
          readinessProbe:
            httpGet:
              path: /
              port: health-check
            initialDelaySeconds: 3
            periodSeconds: 5
          volumeMounts:
            - name: config
              mountPath: /etc/otelcol
              readOnly: true
      volumes:
        - name: config
          configMap:
            name: ai-observe-stack-otel-test-gateway-config
---
apiVersion: v1
kind: Service
metadata:
  name: ai-observe-stack-otel-collector
spec:
  selector:
    app: aiobs-logtest-gateway
  ports:
    - name: otlp-grpc
      port: 4317
      targetPort: 4317
    - name: otlp-http
      port: 4318
      targetPort: 4318
    - name: health-check
      port: 13133
      targetPort: 13133
EOF
```

等待临时 Gateway 就绪：

```bash
kubectl wait --for=condition=Available \
  deployment/ai-observe-stack-otel-test-gateway \
  -n aiobs-logtest \
  --timeout=180s
```

## 3. 渲染并部署 logCollector

OrbStack 使用 Docker runtime，`/var/log/pods/*/*/*.log` 可能继续指向 `/var/lib/docker/containers/*/*-json.log`。

因此本地 OrbStack 测试需要额外挂载 Docker runtime 日志目录，并关闭 resolved path 字段，让 `container` parser 使用原始 Kubernetes 路径解析 metadata。

创建测试 values：

```bash
cat > /tmp/aiobs-logtest-values.yaml <<'EOF'
logCollector:
  enabled: true
  hostPaths:
    dockerContainers: /var/lib/docker/containers
  filelog:
    includeFilePathResolved: false
    includeFileNameResolved: false
    exclude:
      - /var/log/pods/aiobs-logtest_ai-observe-stack-otel-test-gateway-*/*/*.log
      - /var/log/pods/aiobs-logtest_ai-observe-stack-log-collector-*/*/*.log
  export:
    otlp:
      endpoint: ai-observe-stack-otel-collector:4317
EOF
```

说明：

- `dockerContainers`：解决 Docker runtime 二级 symlink 目标不可见问题。
- `includeFilePathResolved=false`：避免 `container` parser 使用 `/var/lib/docker/containers/...` 路径解析 K8s metadata。
- `exclude`：避免测试 Gateway 的 debug stdout 被 logCollector 再次采集，形成自采集噪声。生产 Gateway 通常不会这样输出每条日志。

只渲染 logCollector 模板：

```bash
$HELM template ai-observe-stack /tmp/aiobs-chart-test/ai-observe-stack \
  -f /tmp/aiobs-logtest-values.yaml \
  --show-only templates/log-collector.yaml \
  > /tmp/aiobs-logcollector-only.yaml
```

检查关键配置：

```bash
rg -n \
  "/var/log/pods|include_file_path_resolved|docker-containers|storage: file_storage|prepare-file-storage" \
  /tmp/aiobs-logcollector-only.yaml
```

部署 logCollector：

```bash
kubectl apply -n aiobs-logtest -f /tmp/aiobs-logcollector-only.yaml

kubectl rollout status \
  daemonset/ai-observe-stack-log-collector \
  -n aiobs-logtest \
  --timeout=180s
```

检查 Pod 状态：

```bash
kubectl get pods -n aiobs-logtest -o wide
kubectl logs -n aiobs-logtest \
  -l app.kubernetes.io/name=ai-observe-stack-log-collector \
  --tail=100
```

期望：

- logCollector Pod 为 `Running`
- 日志中出现 `Everything is ready. Begin running and processing data.`
- 没有 `permission denied`
- 没有 `failed to detect a valid log path`

## 4. 验证业务 stdout 可以被采集

创建一个持续输出 60 行日志的业务 Pod：

```bash
TOKEN="aiobs-business-$(date +%s)"
echo "$TOKEN" >/tmp/aiobs-logtest-token

kubectl run log-business \
  -n aiobs-logtest \
  --image=busybox:1.36 \
  --restart=Never \
  --env="TOKEN=$TOKEN" \
  -- sh -c 'i=1; while [ "$i" -le 60 ]; do echo "${TOKEN}-line-${i}"; i=$((i+1)); sleep 1; done'
```

等待 20 秒后检查业务 Pod 输出：

```bash
sleep 20

kubectl logs -n aiobs-logtest pod/log-business --tail=10
```

检查 logCollector 是否开始 watch 业务 Pod 日志文件：

```bash
kubectl logs -n aiobs-logtest \
  -l app.kubernetes.io/name=ai-observe-stack-log-collector \
  --since=90s \
  | rg "log-business|error|failed" || true
```

期望看到类似：

```text
Started watching file ... /var/log/pods/aiobs-logtest_log-business_.../log-business/0.log
```

检查临时 Gateway 是否收到业务日志：

```bash
kubectl logs -n aiobs-logtest \
  deployment/ai-observe-stack-otel-test-gateway \
  --since=2m \
  | grep "$TOKEN" \
  | head -40
```

期望看到类似：

```text
Body: Str(aiobs-business-...-line-1
Body: Str(aiobs-business-...-line-2
...
```

## 5. 验证 Collector 重启后不重复采集

等待业务 Pod 完成：

```bash
kubectl wait --for=jsonpath='{.status.phase}'=Succeeded \
  pod/log-business \
  -n aiobs-logtest \
  --timeout=120s
```

统计重启前已收到的日志数量：

```bash
TOKEN=$(cat /tmp/aiobs-logtest-token)

kubectl logs -n aiobs-logtest \
  deployment/ai-observe-stack-otel-test-gateway \
  --since=10m \
  | grep "$TOKEN" \
  > /tmp/aiobs-token-matches-before.txt || true

printf 'before_total_matches='
wc -l < /tmp/aiobs-token-matches-before.txt
```

重启 logCollector：

```bash
kubectl rollout restart daemonset/ai-observe-stack-log-collector -n aiobs-logtest

kubectl rollout status \
  daemonset/ai-observe-stack-log-collector \
  -n aiobs-logtest \
  --timeout=180s
```

等待 batch 刷新后统计总量、唯一行数和重复行：

```bash
sleep 10

kubectl logs -n aiobs-logtest \
  deployment/ai-observe-stack-otel-test-gateway \
  --since=10m \
  | grep "$TOKEN" \
  > /tmp/aiobs-token-matches.txt || true

printf 'total_matches='
wc -l < /tmp/aiobs-token-matches.txt

printf 'unique_lines='
sed -E 's/.*(aiobs-business-[0-9]+-line-[0-9]+).*/\1/' \
  /tmp/aiobs-token-matches.txt \
  | sort -u \
  | wc -l

echo "duplicates:"
sed -E 's/.*(aiobs-business-[0-9]+-line-[0-9]+).*/\1/' \
  /tmp/aiobs-token-matches.txt \
  | sort \
  | uniq -c \
  | awk '$1>1 {print}'
```

期望：

```text
total_matches=60
unique_lines=60
duplicates:
```

如果 `duplicates:` 后没有输出，说明没有重复采集。

## 6. 常见问题

### logCollector 启动时报 permission denied

典型错误：

```text
storage client: open /var/lib/otelcol/file_storage/receiver_filelog_container: permission denied
```

原因：

- `file_storage` 的 hostPath 目录由 kubelet 创建，默认可能是 root 权限。
- collector 镜像进程不是 root，无法写 offset 文件。

解决：

- Chart 中默认启用 `prepare-file-storage` initContainer。
- 该 initContainer 会执行 `chown -R 10001:10001 /storage`。

检查渲染结果：

```bash
rg -n "prepare-file-storage|chown -R" /tmp/aiobs-logcollector-only.yaml
```

### logCollector 报 failed to detect a valid log path

典型错误：

```text
failed to detect a valid log path
```

常见原因：

- Docker runtime 下启用了 `include_file_path_resolved=true`
- `container` parser 拿到的是 `/var/lib/docker/containers/...-json.log`
- 该路径不包含 Kubernetes pod/namespace/container 信息，无法解析 metadata

OrbStack 测试解决方式：

```yaml
logCollector:
  hostPaths:
    dockerContainers: /var/lib/docker/containers
  filelog:
    includeFilePathResolved: false
    includeFileNameResolved: false
```

### 短生命周期 Pod 没采到

如果测试 Pod 很快结束，并且 `startAt: end`，Collector 首次发现文件时可能从文件末尾开始读，导致前面已经写完的日志被跳过。

测试建议：

- 使用持续输出 30 秒以上的 Pod。
- 生产场景中业务 Pod 通常是长期运行服务，不会受这个短生命周期测试方式影响。

### 临时 Gateway 日志很多

测试 Gateway 使用 `debug` exporter，会把收到的日志打印到 stdout。

如果 logCollector 同时采集测试 Gateway 自己的 stdout，就会形成自采集噪声。测试 values 里通过 `exclude` 排除了：

```yaml
logCollector:
  filelog:
    exclude:
      - /var/log/pods/aiobs-logtest_ai-observe-stack-otel-test-gateway-*/*/*.log
      - /var/log/pods/aiobs-logtest_ai-observe-stack-log-collector-*/*/*.log
```

生产环境的 Gateway 通常不会把每条业务日志通过 debug exporter 打到 stdout。

## 7. 清理测试资源

测试完成后删除 namespace：

```bash
kubectl delete namespace aiobs-logtest
kubectl wait --for=delete namespace/aiobs-logtest --timeout=120s
```

确认没有残留：

```bash
kubectl get ns | grep aiobs-logtest || true
kubectl get pods -A | grep aiobs-logtest || true
```

## 8. 本次验证结论记录

在 OrbStack 本地 Kubernetes 中，按本文步骤验证得到：

- logCollector DaemonSet 可以正常启动
- `prepare-file-storage` 解决了 `file_storage` offset 目录权限问题
- Docker runtime 下额外挂载 `/var/lib/docker/containers` 后，可以读取 `/var/log/pods/*/*/*.log` 的 symlink 目标
- 业务 Pod stdout 可以通过 OTLP 发送到临时 Gateway
- 业务 Pod 输出 60 行日志时，Gateway 侧统计：
  - `total_matches=60`
  - `unique_lines=60`
  - `duplicates:` 无输出
- 重启 logCollector DaemonSet 后未出现重复采集

