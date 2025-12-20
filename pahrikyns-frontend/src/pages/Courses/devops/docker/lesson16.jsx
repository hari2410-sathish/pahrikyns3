export const meta = {
  title: "Docker Lesson 16",
  description:
    "Production Deployment Guide: Traefik Reverse Proxy, HTTPS with Let's Encrypt, Monitoring (Prometheus + Grafana), Centralized Logging, Backups, Scaling, Security Hardening for all Docker Projects.",
  difficulty: "Advanced",
  duration: "120–180 min",
  tags: ["docker","traefik","ssl","monitoring","logging","production","security"],
  updated: "2025-11-30",
  thumbnail: ""
};

import TraefikImg from "../../../../assets/docker/traefik.png";
import GrafanaImg from "../../../../assets/docker/grafana.png";
import LoggingImg from "../../../../assets/docker/logging.png";

export default function Lesson16() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>
      <h1 style={{ fontSize: 38, fontWeight: 800 }}>Lesson 16 — Full Production Deployment</h1>

      <p>
        In this lesson, we take Projects 1–5 and deploy them to a **real production server** using:
      </p>

      <ul>
        <li>Traefik Reverse Proxy (automatic HTTPS)</li>
        <li>Let's Encrypt certificates</li>
        <li>Load-balancing + routing</li>
        <li>Prometheus + Grafana monitoring</li>
        <li>Loki + Promtail centralized logging</li>
        <li>Automated backups</li>
        <li>Security hardening</li>
      </ul>

      {/* TRAEFIK */}
      <section>
        <h2>1️⃣ Traefik Reverse Proxy (Production Gateway)</h2>

        <img src={TraefikImg} style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>
          Traefik is the best modern reverse proxy for Docker production.  
          It auto-detects containers and creates routes automatically.
        </p>

        <h3>Folder Structure</h3>
        <pre style={pre}>
{`/prod/
  traefik/
    traefik.yml
    dynamic/
      conf.yml
    acme.json
  docker-compose.yml`}
        </pre>

        <h3>traefik/traefik.yml</h3>
        <pre style={pre}>
{`api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    exposedByDefault: false
  file:
    directory: "/etc/traefik/dynamic"
    watch: true

certificatesResolvers:
  letsencrypt:
    acme:
      email: "admin@example.com"
      storage: "/acme.json"
      httpChallenge:
        entryPoint: web
`}
        </pre>

        <h3>Main docker-compose (prod/docker-compose.yml)</h3>
        <pre style={pre}>
{`version: "3.9"
services:
  traefik:
    image: traefik:latest
    command: []
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./traefik/traefik.yml:/etc/traefik/traefik.yml:ro"
      - "./traefik/dynamic:/etc/traefik/dynamic"
      - "./traefik/acme.json:/acme.json"
    networks:
      - web
    restart: always

  frontend:
    image: project_fullstack_frontend:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.front.rule=Host(\`myapp.com\`)"
      - "traefik.http.routers.front.entrypoints=websecure"
      - "traefik.http.routers.front.tls.certresolver=letsencrypt"
    networks:
      - web

  backend:
    image: project_fullstack_backend:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.back.rule=Host(\`api.myapp.com\`)"
      - "traefik.http.services.back.loadbalancer.server.port=4000"
    networks:
      - web

networks:
  web:
    external: false`}
        </pre>

        <div style={good}>
          Deploy this to a VPS → your app gets automatic HTTPS + routing instantly.
        </div>
      </section>

      {/* MONITORING */}
      <section>
        <h2>2️⃣ Monitoring (Prometheus + Grafana)</h2>

        <img src={GrafanaImg} style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>Docker containers must be monitored continuously. Use Prometheus + Grafana stack.</p>

        <h3>docker-compose-monitoring.yml</h3>
        <pre style={pre}>
{`version: "3.9"
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    ports:
      - "3000:3000"
`}
        </pre>

        <h3>prometheus.yml</h3>
        <pre style={pre}>
{`global:
  scrape_interval: 5s

scrape_configs:
  - job_name: "docker"
    static_configs:
      - targets: ["cadvisor:8080"]

  - job_name: "backend"
    static_configs:
      - targets: ["backend:4000"]`}
        </pre>

        <div style={blueBox}>
          Add exporters: cAdvisor → container metrics, Node Exporter → host metrics.
        </div>
      </section>

      {/* LOGGING */}
      <section>
        <h2>3️⃣ Logging (Grafana Loki + Promtail)</h2>

        <img src={LoggingImg} style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>Centralized logging is MUST for production.</p>

        <h3>docker-compose-logging.yml</h3>
        <pre style={pre}>
{`services:
  loki:
    image: grafana/loki:latest
    command: -config.file=/etc/loki/loki.yml
    ports:
      - "3100:3100"

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - /var/lib/docker/containers:/var/lib/docker/containers
      - ./promtail.yml:/etc/promtail/promtail.yml
    command: -config.file=/etc/promtail/promtail.yml`}
        </pre>

        <h3>promtail.yml</h3>
        <pre style={pre}>
{`server:
  http_listen_port: 9080

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    static_configs:
      - targets: ["localhost"]
        labels:
          job: docker
          __path__: /var/lib/docker/containers/*/*-json.log`}
        </pre>

        <div style={good}>
          Now, Grafana lets you query all container logs in one place.
        </div>
      </section>

      {/* BACKUPS */}
      <section>
        <h2>4️⃣ Automated Backups (DB + App Data)</h2>

        <h3>Backup script (backup.sh)</h3>
        <pre style={pre}>
{`#!/bin/bash
docker exec mongo mongodump --out /backup/dump-$(date +%F)
tar -czf mongo-backup-$(date +%F).tar.gz /backup`}
        </pre>

        <h3>Run via cron</h3>
        <pre style={pre}>
{`0 2 * * * /home/root/backup.sh >> /var/log/backup.log 2>&1`}
        </pre>

        <div style={warn}>Always backup volumes: mongo_data, postgres_data, uploads, logs.</div>
      </section>

      {/* SECURITY */}
      <section>
        <h2>5️⃣ Security Hardening Checklist</h2>

        <ul>
          <li>Run containers as non-root</li>
          <li>Use seccomp + AppArmor profiles</li>
          <li>Enable firewall (ufw allow 80/443 ONLY)</li>
          <li>Disable SSH password login → use keys only</li>
          <li>Rotate secrets regularly</li>
          <li>Use image signing (cosign)</li>
          <li>Never store secrets in env vars</li>
        </ul>

        <h3>Minimal UFW rules</h3>
        <pre style={pre}>{`ufw default deny incoming
ufw allow 22
ufw allow 80
ufw allow 443`}</pre>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 40 }}>
        <h2>✔ Lesson 16 Summary</h2>
        <p>
          Now your entire Docker environment is fully production-ready: routing, HTTPS, monitoring,
          logging, backups, autoscaling, and security. This is how real companies deploy containers.
        </p>

        <div style={good}>
          Ready for **Lesson 17 — FULL PRODUCTION PROJECT with ALL Components Combined?**  
          Say: <strong>“Lesson 17 Start”</strong>
        </div>
      </section>
    </div>
  );
}

// styles
const pre = {
  background: "#10151c",
  color: "#e1e7ef",
  padding: 12,
  borderRadius: 8,
  fontFamily: "monospace",
  overflowX: "auto",
  marginBottom: 12
};

const good = {
  background: "#e5ffee",
  padding: 12,
  borderRadius: 8,
  borderLeft: "5px solid #28a745",
  marginBottom: 12
};

const warn = {
  background: "#ffe6e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #ff4a4a",
  marginBottom: 12
};

const blueBox = {
  background: "#e6f2ff",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #007bff",
  marginBottom: 12
};
