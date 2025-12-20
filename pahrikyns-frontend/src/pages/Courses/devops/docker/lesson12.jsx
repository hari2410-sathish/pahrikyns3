export const meta = {
  title: "Docker Lesson 12",
  description:
    "Docker Registries in depth: Docker Hub, private registries, Harbor, authentication, image distribution flows, caching registries, promotion pipelines, multi-stage pushes, content trust, image signing, vulnerability scanning, retention strategies, best practices.",
  difficulty: "Advanced",
  duration: "90–120 min",
  tags: ["docker", "registry", "harbor", "oci", "security", "signing", "distribution"],
  updated: "2025-11-30",
  thumbnail: ""
};

// optional images
import RegImg from "../../../../assets/docker/registry-architecture.png";
import HarborImg from "../../../../assets/docker/harbor.png";
import NotaryImg from "../../../../assets/docker/notary.png";

export default function Lesson12() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 12 — Docker Registry & Image Distribution Masterclass</h1>

      <p style={{ color: "#555" }}>
        In this lesson we go DEEP into Docker registries: how images are pushed/pulled internally,
        how layers are stored, how to operate private registries securely, authentication, RBAC,
        Harbor enterprise registry, caching registries for CI/CD, air-gapped deployments, image
        retention, garbage collection, and secure image promotion pipelines.
      </p>

      <section>
        <h2>1️⃣ What is a Docker Registry?</h2>

        <p>A registry stores container images. A registry contains:</p>
        <ul>
          <li><strong>Repositories</strong> → collections of images</li>
          <li><strong>Tags</strong> → versions (latest, v1, v2.3.4)</li>
          <li><strong>Layers</strong> → shared filesystem layers</li>
        </ul>

        <p>
          Example: <code>nginx:1.25</code> is stored inside registry → repo <code>nginx</code> → tag
          <code>1.25</code>.
        </p>

        <div style={blueBox}>
          Public registries: Docker Hub, GitHub Container Registry, GitLab Registry, Quay.io  
          Private registries: Harbor, JFrog Artifactory, self-hosted Docker Registry.
        </div>
      </section>

      <section>
        <h2>2️⃣ How Push & Pull Actually Works (OCI Distribution Spec)</h2>

        <p>
          Docker images follow the OCI (Open Container Initiative) Distribution spec. A push consists of:
        </p>

        <ol>
          <li>Client sends manifest (JSON of layers + config)</li>
          <li>Client uploads all missing layers (blobs)</li>
          <li>Registry stores metadata</li>
          <li>The image becomes available for pull</li>
        </ol>

        <h3>Push example</h3>
        <pre style={pre}>
{`docker tag myapp:1.0 registry.example.com/app/myapp:1.0
docker push registry.example.com/app/myapp:1.0`}
        </pre>

        <h3>Pull example</h3>
        <pre style={pre}>
{`docker pull registry.example.com/app/myapp:1.0`}
        </pre>

        <p>
          Layers are referenced by sha256 digest → registries detect duplicate layers and skip reupload.
        </p>
      </section>

      <section>
        <h2>3️⃣ Self-Hosted Registry (Docker official registry)</h2>

        <img src={RegImg} alt="registry arch" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <h3>Run a local registry</h3>
        <pre style={pre}>
{`docker run -d -p 5000:5000 --name registry registry:2`}
        </pre>

        <h3>Push your own image to local registry</h3>
        <pre style={pre}>
{`docker tag alpine localhost:5000/alpine
docker push localhost:5000/alpine`}
        </pre>

        <h3>Pull again</h3>
        <pre style={pre}>
{`docker pull localhost:5000/alpine`}
        </pre>

        <div style={note}>
          Local registry does not support UI, RBAC, scanning, replication. For production → use Harbor.
        </div>
      </section>

      <section>
        <h2>4️⃣ Private Registry With Authentication (htpasswd)</h2>

        <h3>Create password file</h3>
        <pre style={pre}>
{`sudo apt install apache2-utils
htpasswd -Bbn admin StrongPass123 > auth/htpasswd`}
        </pre>

        <h3>Run registry with auth</h3>
        <pre style={pre}>
{`docker run -d -p 5000:5000 --restart=always --name registry \
  -v $(pwd)/auth:/auth \
  -e REGISTRY_AUTH=htpasswd \
  -e REGISTRY_AUTH_HTPASSWD_REALM="Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  registry:2`}
        </pre>

        <h3>Login</h3>
        <pre style={pre}>
{`docker login localhost:5000`}
        </pre>
      </section>

      <section>
        <h2>5️⃣ Harbor — Enterprise Registry</h2>

        <img src={HarborImg} alt="harbor" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Harbor is the **best open-source enterprise registry** with:
        </p>
        <ul>
          <li>RBAC</li>
          <li>LDAP/AD integration</li>
          <li>Project isolation</li>
          <li>Vulnerability scanning (Trivy/Clair)</li>
          <li>Replication (push to multiple registries)</li>
          <li>Tag retention policies</li>
          <li>Content trust</li>
        </ul>

        <h3>Deploy Harbor via Docker Compose</h3>
        <pre style={pre}>
{`git clone https://github.com/goharbor/harbor
cd harbor
./install.sh`}
        </pre>
      </section>

      <section>
        <h2>6️⃣ Tagging & Versioning Strategy (Enterprise Standard)</h2>

        <div style={good}>
          NEVER use only <code>:latest</code> in production.
        </div>

        <p>Recommended tag formats:</p>

        <ul>
          <li><code>app:1.0.0</code> (semantic version)</li>
          <li><code>app:1.0.0-commitsha</code></li>
          <li><code>app:2025.11.30</code> (date-based)</li>
          <li><code>app:prod</code>, <code>app:staging</code> (promotion tags)</li>
        </ul>

        <h3>CI/CD tag pattern</h3>
        <pre style={pre}>
{`IMAGE=myapp:$(git rev-parse --short HEAD)
docker build -t registry/app:$IMAGE .
docker push registry/app:$IMAGE`}
        </pre>
      </section>

      <section>
        <h2>7️⃣ Promotion Pipeline (Dev → Staging → Prod)</h2>

        <p>Promote by retagging, NOT rebuilding.</p>

        <pre style={pre}>
{`docker pull registry/app:abc123
docker tag registry/app:abc123 registry/app:staging
docker push registry/app:staging`}
        </pre>

        <div style={good}>
          Ensures binary purity → staging and production run the EXACT same bits.
        </div>
      </section>

      <section>
        <h2>8️⃣ Immutable Images & Digests</h2>

        <p>
          Tags can change. Digests cannot. Use digest-pinning for 100% immutability:
        </p>

        <h3>Example</h3>
        <pre style={pre}>
{`docker pull nginx:1.25
docker inspect ngnix:1.25 | grep -i sha256`}
        </pre>

        <pre style={pre}>
{`nginx@sha256:9c1f9b...`}
        </pre>

        <p>
          Use digest in production deployments:
        </p>

        <pre style={pre}>
{`image: "nginx@sha256:9c1f9b..."`}
        </pre>
      </section>

      <section>
        <h2>9️⃣ Content Trust & Image Signing (Docker Notary v1 & v2)</h2>

        <img src={NotaryImg} alt="notary" style={{ width: "100%", borderRadius: 8, margin: "12px 0" }} />

        <p>
          Signing ensures image integrity, preventing tampering. Modern approach:
        </p>

        <ul>
          <li><strong>cosign (Sigstore)</strong> — recommended</li>
          <li>Notary v2</li>
        </ul>

        <h3>Sign image with Cosign</h3>
        <pre style={pre}>
{`cosign sign registry/app:1.0.0`}
        </pre>

        <h3>Verify signature</h3>
        <pre style={pre}>
{`cosign verify registry/app:1.0.0`}
        </pre>
      </section>

      <section>
        <h2>🔟 Vulnerability Scanning (Trivy)</h2>

        <p>Scan local image:</p>
        <pre style={pre}>
{`trivy image registry/app:1.0.0`}
        </pre>

        <p>Scan filesystem:</p>
        <pre style={pre}>
{`trivy fs .`}
        </pre>

        <p>Harbor automatically scans pushed images using Trivy.</p>
      </section>

      <section>
        <h2>1️⃣1️⃣ Registry Garbage Collection</h2>

        <p>
          Registries keep untagged layers until garbage collection runs. On Docker Registry:
        </p>

        <pre style={pre}>
{`docker exec registry registry garbage-collect /etc/registry/config.yml`}
        </pre>

        <div style={warn}>
          Must stop push operations during GC to avoid corruption.
        </div>
      </section>

      <section>
        <h2>1️⃣2️⃣ Private Registry Mirror (CI Speed Booster)</h2>

        <p>Use registry as local cache for Docker Hub images.</p>

        <h3>Daemon json config</h3>
        <pre style={pre}>
{`{
  "registry-mirrors": ["https://mirror.example.com"]
}`}
        </pre>

        <p>Speeds up CI/CD pipelines significantly.</p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>✔ CONCLUSION</h2>

        <p>
          Registries are the backbone of container delivery pipelines. Mastery of tagging, storing,
          signing, scanning, promoting, and distributing images ensures your Docker workflow is
          stable, secure, reproducible, and production-ready.
        </p>

        <div style={blueBox}>
          Ready for <strong>Lesson 13 (Docker Security Deep Dive)?</strong>  
          — Say **“Lesson 13 Start”**
        </div>
      </section>
    </div>
  );
}

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

const good = {
  background: "#e8ffe6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #28a745",
  marginBottom: 16
};

const warn = {
  background: "#ffe6e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #ff4a4a",
  marginBottom: 16
};

const blueBox = {
  background: "#e8f7ff",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #007bff",
  marginBottom: 16
};
