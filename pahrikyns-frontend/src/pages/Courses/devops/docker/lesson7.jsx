// ----------------------------------------------
// Docker Lesson 7 – REGISTRIES & PRIVATE REGISTRIES
// Comprehensive: Docker Hub, private registries (Harbor, ECR, GCR), TLS, auth, storage, GC, replication, signing, CI integration.
// ----------------------------------------------

export const meta = {
  title: "Docker Lesson 7",
  description:
    "Registry Masterclass: Docker Hub fundamentals, private registries (Harbor, AWS ECR, GCR), authentication, TLS, storage backends, garbage collection, replication, image lifecycle, signing, scanning, webhooks and CI/CD integration.",
  difficulty: "Advanced",
  duration: "60–90 min",
  tags: ["docker", "registry", "harbor", "ecr", "gcr", "security"],
  updated: "2025-11-30",
  thumbnail: ""
};

// IMAGE IMPORTS (optional — add images under src/assets/docker/)
import RegistryArch from "../../../../assets/docker/registry-architecture.png";
import HarborLogo from "../../../../assets/docker/harbor-logo.png";
import ECRLogo from "../../../../assets/docker/ecr-logo.png";

export default function Lesson7() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.8, fontSize: 17 }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Docker – Lesson 7: Registry & Private Registry Masterclass</h1>

      <p style={{ color: "#555" }}>
        Registries are where Docker images live. This lesson covers public registries (Docker Hub), private registries (self-hosted and cloud-hosted),
        security (TLS, auth, image signing), storage & garbage collection, replication & mirroring, CI/CD integration, and operational best practices.
      </p>

      <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "5px solid #007bff", marginBottom: 20 }}>
        <strong>Learning outcomes:</strong>
        <ul>
          <li>Understand how registries store images and manifests</li>
          <li>Set up a private registry (basic & production-ready)</li>
          <li>Secure registries with TLS & authentication</li>
          <li>Use cloud registries (ECR/GCR) and CI integration</li>
          <li>Manage lifecycle: GC, retention, quotas, replication</li>
          <li>Use signing & scanning to enforce supply-chain security</li>
        </ul>
      </div>

      {/* SECTION 1 */}
      <section>
        <h2>1️⃣ Registry fundamentals (manifests, layers, blobs)</h2>

        <p>
          A Docker registry stores:
        </p>
        <ul>
          <li><strong>Image manifests</strong> — describe tags, platforms, and point to blobs</li>
          <li><strong>Blobs (layers)</strong> — content-addressable blobs (sha256) shared across images</li>
          <li><strong>Tags</strong> — mutable references to manifests</li>
        </ul>

        <pre style={pre}>
{`# Example: pull by tag
docker pull nginx:latest

# Pull by digest (immutable)
docker pull nginx@sha256:<digest>`}
        </pre>

        <p>
          Tags are mutable; digests (sha256:...) are immutable and are recommended for reproducible deployments.
        </p>
      </section>

      {/* SECTION 2 */}
      <section style={{ marginTop: 18 }}>
        <h2>2️⃣ Public registry — Docker Hub</h2>

        <p>
          Docker Hub is the most common public registry with features like public/private repos, automated builds, rate limits, organization teams, and webhooks.
        </p>

        <h3>Common commands</h3>
        <pre style={pre}>
{`# login
docker login

# tag an image
docker tag myapp:latest yourusername/myapp:1.0.0

# push
docker push yourusername/myapp:1.0.0`}
        </pre>

        <div style={note}>
          Docker Hub has rate limits for anonymous and free-tier users — for CI/CD use authenticated pulls or a private registry.
        </div>
      </section>

      {/* SECTION 3 */}
      <section style={{ marginTop: 18 }}>
        <h2>3️⃣ Self-hosted registry (registry:2) – basic setup</h2>

        <p>
          The official Docker Registry image (<code>registry:2</code>) is the simplest way to run a private registry. It's great for dev or on-prem testing.
        </p>

        <h3>Run a basic registry (insecure, dev only)</h3>
        <pre style={pre}>
{`docker run -d -p 5000:5000 --name registry registry:2

# Tag and push
docker tag myapp:latest localhost:5000/myapp:latest
docker push localhost:5000/myapp:latest

# Pull
docker pull localhost:5000/myapp:latest`}
        </pre>

        <div style={note}>
          This setup is <strong>insecure</strong> because it uses HTTP. For production always use TLS and authentication.
        </div>
      </section>

      {/* SECTION 4 */}
      <section style={{ marginTop: 18 }}>
        <h2>4️⃣ Production-ready registry patterns</h2>

        <p>Production registries should include:</p>
        <ul>
          <li>HTTPS (trusted TLS certs)</li>
          <li>Authentication & authorization (OIDC/LDAP)</li>
          <li>Storage backend (S3/Google Cloud Storage/Filesystem)</li>
          <li>Garbage collection & retention policies</li>
          <li>Scanning & signing</li>
          <li>Replication / high-availability if needed</li>
        </ul>

        <h3>Example docker-compose for registry with S3 storage (condensed)</h3>
        <pre style={pre}>
{`version: "3.8"
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    environment:
      REGISTRY_STORAGE: s3
      REGISTRY_STORAGE_S3_REGION: us-east-1
      REGISTRY_STORAGE_S3_BUCKET: registry-bucket
      REGISTRY_STORAGE_S3_ROOTDIRECTORY: /registry
    volumes:
      - ./auth:/auth
      - ./config.yml:/etc/docker/registry/config.yml:ro`}
        </pre>

        <p>
          Use a config.yml to set auth, storage, and garbage-collection options.
        </p>
      </section>

      {/* SECTION 5 */}
      <section style={{ marginTop: 18 }}>
        <h2>5️⃣ TLS: securing your registry</h2>

        <p>
          Always terminate TLS in front of the registry. Options:
        </p>
        <ul>
          <li>Use a reverse-proxy (NGINX) with Let's Encrypt certs</li>
          <li>Use a cloud LB/ingress with TLS</li>
          <li>Use a certificate from internal CA + distribute CA cert to clients</li>
        </ul>

        <h3>NGINX reverse proxy (example snippet)</h3>
        <pre style={pre}>
{`server {
  listen 443 ssl;
  server_name registry.example.com;

  ssl_certificate /etc/letsencrypt/live/registry.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/registry.example.com/privkey.pem;

  location / {
    proxy_pass http://registry:5000;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}`}
        </pre>

        <div style={note}>
          If you use a private CA, add the CA cert to <code>/etc/docker/certs.d/registry.example.com/ca.crt</code> on each client host.
        </div>
      </section>

      {/* SECTION 6 */}
      <section style={{ marginTop: 18 }}>
        <h2>6️⃣ Authentication & authorization</h2>

        <p>
          Options for auth:
        </p>

        <ul>
          <li>Basic auth (htpasswd) — simple but limited</li>
          <li>Token-based auth — registry supports token auth using a separate auth server</li>
          <li>OIDC / SSO via Harbor or enterprise registry</li>
        </ul>

        <h3>Basic htpasswd example</h3>
        <pre style={pre}>
{`# create password file
mkdir auth && docker run --entrypoint htpasswd httpd:2 -Bbn myuser mypassword > auth/htpasswd

# configure registry to use htpasswd in config.yml`}
        </pre>
      </section>

      {/* SECTION 7 */}
      <section style={{ marginTop: 18 }}>
        <h2>7️⃣ Harbor — a full-featured open-source registry</h2>

        <p>
          Harbor is a CNCF graduated project that adds UI, projects, role-based access control (RBAC),
          replication, signing integration, vulnerability scanning, and more. It's commonly used in enterprises.
        </p>

        <pre style={pre}>
{`# Harbor is usually deployed via the provided installer (not shown here).
# After install you get:
# - Web UI
# - LDAP/OIDC integration
# - Vulnerability scanning (Trivy/Clair)
# - Replication rules
# - Notary / signing integration`}
        </pre>

        <div style={note}>
          Harbor covers many production needs without building custom glue — consider it if you need enterprise features.
        </div>
      </section>

      {/* SECTION 8 */}
      <section style={{ marginTop: 18 }}>
        <h2>8️⃣ Cloud registries: AWS ECR, Google Container Registry / Artifact Registry, Azure ACR</h2>

        <p>
          Cloud providers offer managed registries with regional storage, IAM integration, lifecycle policies, and fast pulls in the same cloud.
        </p>

        <h3>AWS ECR example (login & push)</h3>
        <pre style={pre}>
{`# Authenticate (use AWS CLI v2)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

# Tag & push
docker tag myapp:latest <account>.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0.0
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0.0`}
        </pre>

        <h3>GCR / Artifact Registry (gcloud)</h3>
        <pre style={pre}>
{`# Authenticate
gcloud auth configure-docker

# Tag & push
docker tag myapp:latest us.gcr.io/project-id/myapp:1.0.0
docker push us.gcr.io/project-id/myapp:1.0.0`}
        </pre>

        <div style={note}>
          Cloud registries are production-friendly: lifecycle rules, replication across regions, IAM-based access control.
        </div>
      </section>

      {/* SECTION 9 */}
      <section style={{ marginTop: 18 }}>
        <h2>9️⃣ Image signing & provenance (Notary, Cosign, Sigstore)</h2>

        <p>
          Signing images allows you to verify the builder and integrity of an image. Tools:
        </p>

        <ul>
          <li>Docker Content Trust (Notary v1)</li>
          <li><strong>cosign</strong> (sigstore) — modern, easier to use</li>
        </ul>

        <h3>Cosign quick example</h3>
        <pre style={pre}>
{`# generate key pair
cosign generate-key-pair

# sign
cosign sign --key cosign.key <registry>/myapp:1.0.0

# verify
cosign verify --key cosign.pub <registry>/myapp:1.0.0`}
        </pre>

        <div style={note}>
          Use signatures along with admission controllers (e.g., Kubernetes Gatekeeper) to enforce only signed images run in production.
        </div>
      </section>

      {/* SECTION 10 */}
      <section style={{ marginTop: 18 }}>
        <h2>🔟 Vulnerability scanning & policy (Trivy, Clair, Anchore)</h2>

        <p>
          Integrate image scanners to detect CVEs before deploy. Harbor integrates Trivy/Clair; cloud registries may offer scanning services.
        </p>

        <pre style={pre}>
{`# scan an image locally with Trivy
trivy image <registry>/myapp:1.0.0`}
        </pre>

        <div style={{ note }}>
          Automate scanning in CI and block pushes or deployments if critical vulnerabilities exist.
        </div>
      </section>

      {/* SECTION 11 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣1️⃣ Garbage collection, retention & storage</h2>

        <p>
          Registries accumulate blobs from image pushes and deletes. Garbage collection (GC) reclaims unreferenced blobs.
        </p>

        <ul>
          <li>Registry: `registry:2` supports offline GC via API/CLI and requires stopping writes during GC</li>
          <li>Harbor provides GC & retention policies through UI</li>
          <li>Cloud registries manage GC automatically (with lifecycle rules)</li>
        </ul>

        <h3>Basic offline GC with registry:2 (conceptual)</h3>
        <pre style={pre}>
{`# Stop registry or put into read-only mode
# Run garbage-collect
docker exec -it registry bin/registry garbage-collect /etc/docker/registry/config.yml`}
        </pre>

        <div style={note}>
          Always backup storage before running GC. Test GC in staging. GC may require downtime depending on setup.
        </div>
      </section>

      {/* SECTION 12 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣2️⃣ Replication & mirroring</h2>

        <p>
          Replication helps push images between registries (e.g., Docker Hub → internal Harbor) for caching and redundancy.
        </p>

        <ul>
          <li>Harbor supports push/pull replication rules and schedules</li>
          <li>Use `docker pull` + `docker tag` + `docker push` as a simple mirroring approach in scripts</li>
          <li>Cloud registries support cross-region replication</li>
        </ul>

        <pre style={pre}>
{`# simple script-style mirror
docker pull public/repo:tag
docker tag public/repo:tag private.registry/repo:tag
docker push private.registry/repo:tag`}
        </pre>
      </section>

      {/* SECTION 13 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣3️⃣ CI/CD integration — best practices</h2>

        <p>
          Integrate registry operations into CI/CD pipelines:
        </p>

        <ul>
          <li>Authenticate in CI (use short-lived tokens/assume-role patterns)</li>
          <li>Tag with semantic version and build metadata (git SHA, branch)</li>
          <li>Push ephemeral or nightly tags for testing</li>
          <li>Use `--cache-from` images to speed up builds by reusing layers from registry</li>
        </ul>

        <h3>Example GitHub Actions snippet (push to ECR)</h3>
        <pre style={pre}>
{`- name: Login to ECR
  run: |
    aws ecr get-login-password --region ${{ envAWS_REGION }} | \
    docker login --username AWS --password-stdin ${{ envECR_REGISTRY }}

- name: Build, tag, push
  run: |
    docker build -t ${{ env_ECR_REGISTRY }}/myapp:${{ githubsha }} .
    docker push ${{ envECR_REGISTRY }}/myapp:${{ githubsha }}`}
        </pre>
      </section>

      {/* SECTION 14 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣4️⃣ Quotas, policies & RBAC</h2>

        <p>
          Production registries should enforce:
        </p>
        <ul>
          <li>Per-project quotas (storage & number of images)</li>
          <li>Retention/cleanup policies</li>
          <li>RBAC for teams and service accounts</li>
          <li>Audit logs for pushes/pulls</li>
        </ul>

        <div style={note}>
          Harbor, cloud registries, and many enterprise offerings have these features built-in.
        </div>
      </section>

      {/* SECTION 15 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣5️⃣ Backup & restore strategies</h2>

        <p>
          Backup policies depend on storage backend:
        </p>
        <ul>
          <li>S3/GCS: rely on object storage versioning & lifecycle + registry metadata backups</li>
          <li>Filesystem: snapshot the volume and database</li>
          <li>Harbor: backup config, database (Postgres), and storage buckets</li>
        </ul>

        <pre style={pre}>
{`# Example (S3): ensure bucket replication & lifecycle; keep metadata DB backups (Postgres dump)`}
        </pre>
      </section>

      {/* SECTION 16 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣6️⃣ Observability & monitoring</h2>

        <p>
          Monitor:
        </p>
        <ul>
          <li>Request rates (push/pull)</li>
          <li>Storage consumption</li>
          <li>Auth failures</li>
          <li>Latency & errors</li>
        </ul>

        <p>Expose /metrics from registry if available and scrape with Prometheus. Use alerts for high storage usage or sudden pull failures.</p>
      </section>

      {/* SECTION 17 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣7️⃣ Practical operational checklist</h2>

        <ol>
          <li>Enable TLS and validate certs from clients</li>
          <li>Use IAM/SSO where possible for auth</li>
          <li>Enable image scanning and signing</li>
          <li>Implement retention & GC policy</li>
          <li>Back up metadata DB and storage bucket snapshots</li>
          <li>Set quotas and RBAC</li>
          <li>Integrate registry into CI/CD with short-lived credentials</li>
        </ol>
      </section>

      {/* SECTION 18 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣8️⃣ Troubleshooting common registry issues</h2>

        <h3>1) 401 Unauthorized on push/pull</h3>
        <pre style={pre}>
{`docker login registry.example.com
# Check token expiry or IAM permissions`}
        </pre>

        <h3>2) Large image uploads fail</h3>
        <pre style={pre}>
{`# Check storage backend limits and proxy timeouts (nginx client_max_body_size)
# Increase proxy timeouts and body size`}
        </pre>

        <h3>3) Garbage collection missing blobs</h3>
        <pre style={pre}>
{`# Ensure registry configured for GC and DB metadata consistent.
# Backup then run GC in read-only mode.`}
        </pre>
      </section>

      {/* SECTION 19 */}
      <section style={{ marginTop: 18 }}>
        <h2>1️⃣9️⃣ Mini exercises & practice tasks</h2>

        <ol>
          <li>Run a local registry: push/pull an image and inspect manifests with the Registry HTTP API.</li>
          <li>Set up a reverse-proxy (nginx) with Let's Encrypt in front of registry: enable TLS and push an image from remote host.</li>
          <li>Integrate image signing with cosign into your CI pipeline (sign after push, verify in deploy step).</li>
          <li>Use Trivy in CI to scan images and fail the build when critical CVEs are present.</li>
          <li>Configure Harbor in a test cluster and enable replication from Docker Hub to Harbor.</li>
        </ol>
      </section>

      {/* SECTION 20 */}
      <section style={{ marginTop: 18 }}>
        <h2>2️⃣0️⃣ Summary & next steps</h2>

        <p>
          Registries sit at the center of your container supply chain. Secure them with TLS, authentication, signing, and scanning.
          Use cloud registries for convenience and performance, or Harbor/self-hosted + S3 for complete control.
        </p>

        <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "5px solid #007bff", marginTop: 12 }}>
          👉 When you're ready, say: <strong>“Lesson 8 Start”</strong> — we'll cover <em>Docker Security & Hardening</em>.
        </div>
      </section>
    </div>
  );
}

// Styles
const pre = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
  marginTop: 12
};

const note = {
  background: "#fff7e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "5px solid #f4b400",
  marginTop: 12
};
