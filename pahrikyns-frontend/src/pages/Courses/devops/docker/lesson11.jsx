export const meta = {
  title: "Docker Lesson 11",
  description:
    "Observability for Docker: monitoring (Prometheus, cAdvisor, node-exporter), logging (ELK/EFK, Loki, Fluentd), tracing (OpenTelemetry, Jaeger), alerting, dashboards, sample stacks, instrumenting apps, storage & retention, and production best practices.",
  difficulty: "Advanced",
  duration: "90–120 min",
  tags: ["docker", "monitoring", "prometheus", "grafana", "logging", "tracing", "observability"],
  updated: "2025-11-30",
  thumbnail: ""
};

// optional images (place under src/assets/docker/)
import ObsArch from "../../../../assets/docker/observability-architecture.png";
import PromGraf from "../../../../assets/docker/prom-graf.png";
import LokiImg from "../../../../assets/docker/loki.png";

export default function Lesson11() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 11 — Observability: Monitoring, Logging & Tracing</h1>

      <p style={{ color: "#555" }}>
        Observability = the combination of metrics, logs, and traces (the three pillars). In container platforms
        (Docker, Swarm, Kubernetes), observability tells you whether services are healthy, where latency comes from,
        and what caused failures. This lesson covers practical, production-ready observability for Docker stacks:
        Prometheus + Grafana for metrics, cAdvisor & node-exporter for container/node metrics, Loki/Fluentd/ELK for logs,
        OpenTelemetry & Jaeger for tracing, alerting rules, dashboards, and deployment examples.
      </p>

      <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "6px solid #007bff", marginBottom: 20 }}>
        <strong>Learning outcomes</strong>
        <ul>
          <li>Deploy Prometheus + Grafana to monitor Docker hosts and containers</li>
          <li>Collect container metrics (cAdvisor), node metrics (node-exporter) and application metrics (instrumentation)</li>
          <li>Centralize logs using Fluentd → Loki or Fluentd → Elasticsearch</li>
          <li>Instrument applications for distributed tracing and view with Jaeger</li>
          <li>Implement alerting and SLO-based rules</li>
          <li>Understand storage, retention, and scalability trade-offs</li>
        </ul>
      </div>

      {/* ARCHITECTURE */}
      <section>
        <h2>1️⃣ Observability architecture (high level)</h2>
        <img src={ObsArch} alt="observability architecture" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Typical stack:
        </p>
        <ul>
          <li><strong>Metrics:</strong> applications expose Prometheus metrics → Prometheus scrapes → stores TSDB → Grafana dashboards</li>
          <li><strong>Logs:</strong> containers send stdout to Docker logging driver or sidecar/log shipper (Fluentd/Promtail) → central store (Loki/Elasticsearch) → Grafana / Kibana</li>
          <li><strong>Traces:</strong> apps emit spans via OpenTelemetry → Jaeger/Tempo / SigNoz for visualization</li>
        </ul>
      </section>

      {/* PROMETHEUS SETUP */}
      <section style={{ marginTop: 18 }}>
        <h2>2️⃣ Prometheus — metrics collection</h2>

        <p>
          Prometheus scrapes HTTP endpoints that expose metrics in the Prometheus exposition format. For Docker:
        </p>
        <ul>
          <li>Use <code>cAdvisor</code> to collect container-level metrics</li>
          <li>Use <code>node_exporter</code> for host metrics (CPU, memory, disk, network)</li>
          <li>Instrument your app (client libraries) to expose Prometheus metrics</li>
        </ul>

        <h3>Prometheus scrape config (snippet)</h3>
        <pre style={pre}>
{`global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node1:9100','node2:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['node1:8080','node2:8080']

  - job_name: 'services'
    dns_sd_configs:
      - names: ['tasks.api.mystack']
        type: 'A'
        port: 9102`}
        </pre>

        <p>
          Use DNS service discovery for docker stacks/Swarm (or static configs for simple setups). Prometheus supports many discovery methods.
        </p>

        <h3>Run cAdvisor</h3>
        <pre style={pre}>
{`docker run -d --name=cadvisor --volume=/var/run/docker.sock:/var/run/docker.sock \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --publish=8080:8080 gcr.io/cadvisor/cadvisor:latest`}
        </pre>

        <h3>Run node-exporter</h3>
        <pre style={pre}>
{`docker run -d --name node-exporter --net host --pid host \
  -v "/:/host:ro,rslave" \
  quay.io/prometheus/node-exporter:latest \
  --path.rootfs=/host`}
        </pre>

        <div style={note}>
          For Swarm, run node-exporter as a global service so every node runs one instance.
        </div>
      </section>

      {/* GRAFANA */}
      <section style={{ marginTop: 18 }}>
        <h2>3️⃣ Grafana — dashboards & visualization</h2>

        <p>
          Grafana connects to Prometheus (and Loki/Elastic) to create dashboards. You can import community dashboards for Docker, cAdvisor, node-exporter and tune them.
        </p>

        <h3>Run Grafana (quick)</h3>
        <pre style={pre}>
{`docker run -d --name=grafana -p 3000:3000 grafana/grafana:latest`}
        </pre>

        <h3>Datasources to add</h3>
        <ul>
          <li>Prometheus: <code>http://prometheus:9090</code></li>
          <li>Loki: <code>http://loki:3100</code></li>
          <li>Elasticsearch (if using ELK)</li>
        </ul>

        <div style={good}>
          Import dashboards:
          <ul>
            <li>cAdvisor dashboard (container metrics)</li>
            <li>node-exporter host metrics</li>
            <li>Prometheus Rules dashboard (alerts)</li>
          </ul>
        </div>
      </section>

      {/* LOGGING */}
      <section style={{ marginTop: 18 }}>
        <h2>4️⃣ Logging — options & flows</h2>

        <p>
          Docker container logs (stdout/stderr) can be shipped in many ways:
        </p>
        <ul>
          <li>Docker logging drivers (fluentd, gelf, syslog)</li>
          <li>Sidecar log collectors (Fluentd, Filebeat, Promtail)</li>
          <li>Centralized stores: Elasticsearch, Loki (log indexing), or cloud logging services</li>
        </ul>

        <h3>Why choose Loki?</h3>
        <p>
          Loki indexes labels instead of full-text, which is cheaper at scale and pairs well with Grafana. Use Fluentd/Promtail to push logs to Loki.
        </p>

        <h3>Promtail (scraper) example (docker)</h3>
        <pre style={pre}>
{`docker run -d --name promtail \\
  -v /var/log:/var/log \\
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \\
  grafana/promtail:latest -config.file=/etc/promtail/promtail.yaml`}
        </pre>

        <h3>Simple Fluentd → Elasticsearch pipeline</h3>
        <pre style={pre}>
{`# docker run for fluentd
docker run -d --name fluentd -p 24224:24224 -v /var/log:/var/log fluent/fluentd:latest

# Elasticsearch
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.0.0`}
        </pre>

        <div style={note}>
          For production, configure proper index lifecycle management (ILM) in Elasticsearch and retention policies in Loki.
        </div>
      </section>

      {/* TRACING */}
      <section style={{ marginTop: 18 }}>
        <h2>5️⃣ Tracing — OpenTelemetry & Jaeger</h2>

        <p>
          Traces show request flow across services and where latency is spent. Instrument your app with OpenTelemetry SDKs and export to Jaeger/Tempo.
        </p>

        <h3>Run Jaeger (all-in-one)</h3>
        <pre style={pre}>
{`docker run -d --name jaeger -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 -p 16686:16686 jaegertracing/all-in-one:1.35`}
        </pre>

        <h3>Instrument a Node.js app (example)</h3>
        <pre style={pre}>
{`npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http

// minimal bootstrap (tracing.js)
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const exporter = new OTLPTraceExporter({ url: 'http://jaeger:4318/v1/traces' });

const sdk = new NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();`}
        </pre>

        <div style={good}>
          Jaeger UI: <code>http://&lt;host&gt;:16686</code> to view traces.
        </div>
      </section>

      {/* ALERTING AND RULES */}
      <section style={{ marginTop: 18 }}>
        <h2>6️⃣ Alerting — Prometheus Alertmanager</h2>

        <p>
          Prometheus Alertmanager receives alerts from Prometheus and routes to Slack/email/PagerDuty.
        </p>

        <h3>Prometheus rule example (SLO style)</h3>
        <pre style={pre}>
{`groups:
- name: production.rules
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{job="api",code=~"5.."}[5m]) > 0.01
    for: 5m
    labels:
      severity: page
    annotations:
      summary: "High 5xx rate on API"`
}
        </pre>

        <h3>Start Alertmanager (quick)</h3>
        <pre style={pre}>
{`docker run -d --name alertmanager -p 9093:9093 prom/alertmanager`}
        </pre>

        <div style={note}>
          Configure Alertmanager receivers & routes to match team on-call rotations and error severity.
        </div>
      </section>

      {/* STORAGE & RETENTION */}
      <section style={{ marginTop: 18 }}>
        <h2>7️⃣ Storage & Retention (TSDB & Logs)</h2>

        <p>
          Prometheus stores time-series data on local disk by default (TSDB). For long-term storage and high availability:
        </p>
        <ul>
          <li>Use remote_write to send metrics to Cortex/Thanos/Prometheus Remote Write destinations</li>
          <li>Use object storage (S3/GCS) for long-term metrics via Thanos/Cortex</li>
          <li>For logs: Loki can use object storage for retention; Elasticsearch needs disk and ILM</li>
        </ul>

        <h3>Prometheus remote_write (example)</h3>
        <pre style={pre}>
{`remote_write:
  - url: "https://cortex.example.com/api/v1/push"
    basic_auth:
      username: user
      password: pass`}
        </pre>

        <div style={warn}>
          Watch storage costs and retention windows — high-cardinality metrics increase TSDB size rapidly.
        </div>
      </section>

      {/* SCALES & HARDENING */}
      <section style={{ marginTop: 18 }}>
        <h2>8️⃣ Scaling Observability — best practices</h2>

        <ul>
          <li>Avoid very high-cardinality labels (user IDs, request IDs) in Prometheus metrics.</li>
          <li>Use histogram/summary buckets carefully for latency metrics.</li>
          <li>Separate monitoring cluster from production to avoid resource contention.</li>
          <li>Use sharding/remote write for very large environments (Cortex/Thanos).</li>
          <li>Compress logs and use ILM for Elasticsearch; use chunked storage for Loki.</li>
        </ul>
      </section>

      {/* DASHBOARDS & RUNBOOKS */}
      <section style={{ marginTop: 18 }}>
        <h2>9️⃣ Dashboards & Runbooks</h2>

        <p>
          Build dashboards for SLOs and operational metrics:
        </p>

        <ul>
          <li>Service health panel (error rate, latency P95/P99)</li>
          <li>Host panel (cpu, mem, disk, network)</li>
          <li>Container panel (container restarts, OOMs, writable layer usage)</li>
          <li>Logs panel with quick queries for errors and exceptions</li>
        </ul>

        <div style={note}>
          Create runbooks for critical alerts: what to check, commands to run, escalation steps, and common remediation.
        </div>
      </section>

      {/* EXAMPLE: DOCKER-COMPOSE STACK */}
      <section style={{ marginTop: 18 }}>
        <h2>🔟 Example observability stack (docker-compose)</h2>

        <p>Quick, minimal stack for local testing (not production-ready):</p>
        <pre style={pre}>
{`version: "3.9"
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/:/var/lib/docker:ro

  loki:
    image: grafana/loki:2.7.1
    ports:
      - "3100:3100"

  promtail:
    image: grafana/promtail:2.7.1
    volumes:
      - /var/log:/var/log
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    command: -config.file=/etc/promtail/promtail.yaml`}
        </pre>

        <div style={note}>
          For production, use separate persistent volumes, configure security (auth for Grafana), and scale components appropriately.
        </div>
      </section>

      {/* INSTRUMENTATION */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣1️⃣ Instrumenting applications</h2>

        <p>
          Prometheus client libraries exist for most languages (Go, Java, Python, Node.js, .NET). Key metrics to export:
        </p>

        <ul>
          <li><strong>Request rate</strong> (counter)</li>
          <li><strong>Request duration</strong> (histogram)</li>
          <li><strong>Error count</strong> (counter with labels)</li>
          <li><strong>Active connections</strong> (gauge)</li>
        </ul>

        <h3>Node.js example (prom-client)</h3>
        <pre style={pre}>
{`const client = require('prom-client');
const http = require('http');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 500, 1000]
});

// expose metrics
http.createServer((req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  } else {
    // instrumented handler...
  }
}).listen(9102);`}
        </pre>
      </section>

      {/* RUNBOOK EXAMPLE */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣2️⃣ Quick runbook snippets (what to check on alert)</h2>

        <pre style={pre}>
{`# High CPU on node:
ssh node
docker stats --no-stream
top | head

# Container restarts:
docker ps -a --filter "status=exited" --filter "status=created"
docker logs <container-id>

# Check Prometheus targets:
curl http://prometheus:9090/-/targets

# Check disk usage:
df -h /var/lib/docker`}
        </pre>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 24, marginBottom: 60 }}>
        <h2>✔ Conclusion</h2>

        <p>
          Observability is essential for running production containers. Start small (cAdvisor + Prometheus + Grafana + Loki),
          instrument business-critical services, and build alerts and runbooks. Evolve to scalable systems (Thanos/Cortex, Elasticsearch clusters,
          Tempo/Jaeger in HA) as your environment grows.
        </p>

        <div style={{ background: "#e8f7ff", padding: 12, borderRadius: 8, borderLeft: "6px solid #007bff", marginTop: 12 }}>
          Next: say <strong>“Give Prometheus Alerts”</strong> for a full set of practical alerting rules, or
          <strong> “Give Grafana Dashboard JSON”</strong> for a starter container metrics dashboard, or
          <strong> “Give CI pipeline for observability”</strong> to add scanning & deployment to CI.
        </div>
      </section>
    </div>
  );
}

// Styles
const pre = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 12,
  borderRadius: 8,
  overflowX: "auto",
  fontFamily: "monospace",
  marginBottom: 16
};

const note = {
  background: "#fff7e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #f4b400",
  marginBottom: 16
};

const warn = {
  background: "#ffe6e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #ff4a4a",
  marginBottom: 16
};

const good = {
  background: "#e8ffe6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #28a745",
  marginBottom: 16
};
