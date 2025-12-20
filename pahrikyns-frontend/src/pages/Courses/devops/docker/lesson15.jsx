export const meta = {
  title: "Docker Lesson 15",
  description:
    "Real-world Docker Projects — Full-Stack App, Microservices, CI/CD with Docker, Kubernetes Migration, and Swarm Production Stack. Practical Dockerfiles, docker-compose files, CI pipelines, k8s manifests and production notes.",
  difficulty: "Advanced",
  duration: "240–360 min",
  tags: ["docker", "project", "compose", "ci", "kubernetes", "swarm", "microservices"],
  updated: "2025-11-30",
  thumbnail: ""
};

// Optional images (placeholders)
import ProjectImg from "../../../../assets/projects/fullstack.png";
import MicroImg from "../../../../assets/projects/microservices.png";
import CiImg from "../../../../assets/projects/cicd.png";
import K8sImg from "../../../../assets/projects/kubernetes.png";
import SwarmImg from "../../../../assets/projects/swarm.png";

export default function Lesson15AllProjects() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.7, fontSize: 16 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
        Lesson 15 — Real-World Docker Projects (All: 1 → 5)
      </h1>

      <p style={{ color: "#444" }}>
        This lesson contains five complete practical projects you can run locally and use in interviews/portfolios.
        Each project includes Dockerfiles, orchestration files, and production tips. Copy the snippets into your repo,
        create the files as named in the headers, and run the included commands.
      </p>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          PROJECT 1 — FULL-STACK (React + Node + DB + NGINX)
         ---------------------------------------------------------- */}
      <section>
        <h2>Project 1 — Full-Stack Dockerization (React + Node + MongoDB + Nginx)</h2>
        <img src={ProjectImg} alt="fullstack" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Structure (recommended repo layout):
        </p>
        <pre style={pre}>
{`/project-fullstack
  /frontend   (React app)
    Dockerfile
  /backend    (Node/Express app)
    Dockerfile
  /nginx
    nginx.conf
    Dockerfile (optional)
  docker-compose.yml
  .env`}
        </pre>

        <h3>Frontend Dockerfile (frontend/Dockerfile)</h3>
        <pre style={pre}>
{`# multi-stage build for React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional custom NGINX config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
        </pre>

        <h3>Backend Dockerfile (backend/Dockerfile)</h3>
        <pre style={pre}>
{`FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "server.js"]`}
        </pre>

        <h3>Nginx config (nginx/nginx.conf)</h3>
        <pre style={pre}>
{`server {
  listen 80;
  server_name _;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
  location /api/ {
    proxy_pass http://backend:4000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`}
        </pre>

        <h3>docker-compose.yml (top-level)</h3>
        <pre style={pre}>
{`version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    image: project_fullstack_frontend:latest
    secrets:
      - node_env
    restart: unless-stopped
    networks:
      - webnet

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: project_fullstack_backend:latest
    environment:
      - MONGO_URI=mongodb://mongo:27017/appdb
    depends_on:
      - mongo
    restart: unless-stopped
    networks:
      - webnet

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped
    networks:
      - webnet

  nginx:
    image: nginx:stable-alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend
    networks:
      - webnet

volumes:
  mongo_data:

secrets:
  node_env:
    external: false

networks:
  webnet:`}
        </pre>

        <h3>Notes & production tips</h3>
        <ul>
          <li>Use multi-stage builds to minimize final image size.</li>
          <li>Pin versions and use image digests in production.</li>
          <li>Use environment files (.env) but load secrets via Docker secrets or Vault in production.</li>
          <li>Persist MongoDB data with named volumes and backup regularly.</li>
          <li>Set restart policies: <code>restart: unless-stopped</code> or <code>on-failure</code>.</li>
          <li>Use reverse proxy with TLS (letsencrypt/Traefik) in prod.</li>
        </ul>

        <h3>Quick local run</h3>
        <pre style={pre}>
{`# from /project-fullstack
docker-compose up --build -d

# view logs
docker-compose logs -f backend

# stop & remove
docker-compose down -v`}
        </pre>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          PROJECT 2 — MICROSERVICES
         ---------------------------------------------------------- */}
      <section>
        <h2>Project 2 — Microservices with Docker (API Gateway + User + Order + Redis + RabbitMQ)</h2>
        <img src={MicroImg} alt="micro" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>Repo layout (one repository with folders for each microservice):</p>
        <pre style={pre}>
{`/project-micro
  /gateway   (NGINX or Kong/Traefik)
  /user      (Node service)
  /order     (Node service)
  /worker    (background job consumer)
  docker-compose.yml`}
        </pre>

        <h3>Example docker-compose (micro) — simplified</h3>
        <pre style={pre}>
{`version: '3.8'
services:
  gateway:
    image: traefik:latest
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  user:
    build: ./user
    environment:
      - REDIS_URL=redis://redis:6379
    networks:
      - backend

  order:
    build: ./order
    environment:
      - RABBITMQ_URL=amqp://rabbitmq
    networks:
      - backend

  worker:
    build: ./worker
    depends_on:
      - rabbitmq
      - redis
    networks:
      - backend

  redis:
    image: redis:7
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "15672:15672"
    volumes:
      - rabbit_data:/var/lib/rabbitmq

volumes:
  redis_data:
  rabbit_data:

networks:
  backend:`}
        </pre>

        <h3>Key microservices patterns</h3>
        <ul>
          <li>Use a message broker (RabbitMQ) for async work and decoupling.</li>
          <li>Use Redis for caching and transient data.</li>
          <li>Design idempotent services for safe retries.</li>
          <li>Use healthchecks and readiness/liveness probes (docker-compose supports healthcheck).</li>
          <li>Keep services small and single-responsibility.</li>
        </ul>

        <h3>Local dev tip</h3>
        <p>
          Use compose profiles or separate compose.override.yml for developer-only services (dev DB seeds, test runners).
        </p>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          PROJECT 3 — CI/CD with Docker (GitHub Actions)
         ---------------------------------------------------------- */}
      <section>
        <h2>Project 3 — CI/CD Pipeline (GitHub Actions) for Docker Images</h2>
        <img src={CiImg} alt="ci" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          This pipeline builds images, scans them with Trivy, signs them with Cosign, pushes to registry,
          and deploys using SSH to a server or triggers a webhook for an orchestrator.
        </p>

        <h3>.github/workflows/ci-cd.yml (GitHub Actions)</h3>
        <pre style={pre}>
{`name: CI/CD Docker

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Registry
        uses: docker/login-action@v2
        with:
          registry: registry.example.com
          username: \${{ secrets.REGISTRY_USER }}
          password: \${{ secrets.REGISTRY_PASS }}

      - name: Build image
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: registry.example.com/myorg/backend:\${{ github.sha }}

      - name: Scan image with Trivy
        uses: aquasecurity/trivy-action@v0.9.0
        with:
          image-ref: registry.example.com/myorg/backend:\${{ github.sha }}

      - name: Sign with cosign
        env:
          COSIGN_PASSWORD: \${{ secrets.COSIGN_PASSWORD }}
        run: |
          cosign sign --key cosign.key registry.example.com/myorg/backend:\${{ github.sha }}

      - name: Deploy (SSH)
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: \${{ secrets.DEPLOY_HOST }}
          username: \${{ secrets.DEPLOY_USER }}
          key: \${{ secrets.DEPLOY_KEY }}
          script: |
            docker pull registry.example.com/myorg/backend:\${{ github.sha }}
            docker stop backend || true
            docker rm backend || true
            docker run -d --name backend -e MONGO_URI=... registry.example.com/myorg/backend:\${{ github.sha }}`}
        </pre>

        <h3>Pipeline notes</h3>
        <ul>
          <li>Store secrets in GitHub secrets or external secret manager.</li>
          <li>Use ephemeral deploy keys for servers; avoid long-lived SSH keys in repos.</li>
          <li>Enforce branch protection on main to require successful pipeline runs.</li>
        </ul>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          PROJECT 4 — KUBERNETES MIGRATION
         ---------------------------------------------------------- */}
      <section>
        <h2>Project 4 — Kubernetes Migration (Manifests & Notes)</h2>
        <img src={K8sImg} alt="k8s" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Example Kubernetes manifests for the Full-Stack app (frontend, backend, MongoDB) — use with a cluster (minikube / kind / cloud).
        </p>

        <h3>k8s/frontend-deployment.yaml</h3>
        <pre style={pre}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: registry.example.com/project_fullstack_frontend:latest
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "256Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  type: ClusterIP
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80`}
        </pre>

        <h3>k8s/backend-deployment.yaml</h3>
        <pre style={pre}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: registry.example.com/project_fullstack_backend:latest
          env:
            - name: MONGO_URI
              value: mongodb://mongo:27017/appdb
          ports:
            - containerPort: 4000
---
apiVersion: v1
kind: Service
metadata:
  name: backend-svc
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
    - port: 4000
      targetPort: 4000`}
        </pre>

        <h3>k8s/mongo-statefulset.yaml</h3>
        <pre style={pre}>
{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: "mongo"
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:6
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongo-data
              mountPath: /data/db
  volumeClaimTemplates:
    - metadata:
        name: mongo-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`}
        </pre>

        <h3>Ingress (example with NGINX Ingress)</h3>
        <pre style={pre}>
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: project-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-svc
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-svc
                port:
                  number: 4000`}
        </pre>

        <h3>K8s migration notes</h3>
        <ul>
          <li>Use liveness/readiness probes to avoid sending traffic to unhealthy pods.</li>
          <li>Use HorizontalPodAutoscaler for scalable backend services.</li>
          <li>Use Persistent Volumes supported by your cloud provider for databases.</li>
          <li>Use Secrets and ConfigMaps for sensitive & non-sensitive config; never store secrets in images.</li>
        </ul>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          PROJECT 5 — SWARM PRODUCTION STACK
         ---------------------------------------------------------- */}
      <section>
        <h2>Project 5 — Swarm Production 3-Tier (Nginx, API, DB) — Stack File</h2>
        <img src={SwarmImg} alt="swarm" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Example stack.yml to deploy on Docker Swarm. It includes overlay network, named volume, secrets and update policy.
        </p>

        <h3>stack-swarm.yml</h3>
        <pre style={pre}>
{`version: "3.9"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "80:80"
    configs:
      - source: nginx_conf
        target: /etc/nginx/conf.d/default.conf
    networks:
      - webnet
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure

  api:
    image: registry.example.com/project_fullstack_backend:latest
    environment:
      - MONGO_URI=mongodb://mongo:27017/appdb
    networks:
      - webnet
    deploy:
      replicas: 3
      placement:
        constraints:
          - node.role == worker
      update_config:
        parallelism: 1
        delay: 10s

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    networks:
      - webnet
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.labels.disk == ssd

networks:
  webnet:
    driver: overlay
    attachable: true

volumes:
  mongo_data:

configs:
  nginx_conf:
    file: ./nginx/nginx.conf`}
        </pre>

        <h3>Deploy to swarm</h3>
        <pre style={pre}>
{`# init swarm (on manager)
docker swarm init --advertise-addr <MANAGER_IP>

# deploy stack
docker stack deploy -c stack-swarm.yml mystack

# scale service
docker service scale mystack_api=5`}
        </pre>

        <h3>Swarm production tips</h3>
        <ul>
          <li>Run at least 3 manager nodes for quorum.</li>
          <li>Use external storage for DB volumes (NFS, Gluster, Portworx).</li>
          <li>Use secrets for DB passwords: <code>docker secret create db_pass -</code>.</li>
          <li>Use reverse proxy (Traefik) for automated Let's Encrypt TLS.</li>
          <li>Monitor with Prometheus & alert on failures.</li>
        </ul>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* ---------------------------------------------------------
          WRAP-UP / NEXT STEPS
         ---------------------------------------------------------- */}
      <section style={{ marginBottom: 40 }}>
        <h2>Wrap-up & Suggested Exercises</h2>
        <ol>
          <li>Implement Project 1 end-to-end and deploy to a small VPS with TLS via Traefik.</li>
          <li>Extend Project 2 with a background worker that consumes RabbitMQ and persists to MongoDB.</li>
          <li>Wire Project 3 CI to deploy to your server or to a Kubernetes cluster using kubectl context.</li>
          <li>Convert Project 1 into k8s manifests (Project 4) and run on kind or cloud provider.</li>
          <li>Deploy Project 5 to a Swarm cluster and test rolling updates and secrets usage.</li>
        </ol>

        <div style={good}>
          If you want, I can now:
          <ul>
            <li>Generate full repo scaffolding (zip) for Project 1 with sample code (frontend + backend) — say: <strong>"Scaffold Project 1"</strong></li>
            <li>Produce full GitHub Actions files for Projects 1 & 2 — say: <strong>"CI for Projects 1-2"</strong></li>
            <li>Provide production Traefik + Let's Encrypt configs — say: <strong>"Traefik TLS config"</strong></li>
            <li>Make step-by-step runbook / checklist for deploying to VPS — say: <strong>"Deploy runbook"</strong></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Styles
const pre = {
  background: "#0f1720",
  color: "#e6eef6",
  padding: 12,
  borderRadius: 8,
  overflowX: "auto",
  fontFamily: "monospace",
  marginBottom: 12
};

const good = {
  background: "#e6ffef",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #28a745",
  marginBottom: 12
};
