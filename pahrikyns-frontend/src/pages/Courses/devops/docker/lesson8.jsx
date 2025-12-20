export const meta = {
  title: "Docker Lesson 8",
  description:
    "Docker Security & Hardening Masterclass: namespaces, cgroups, capabilities, seccomp, AppArmor, SELinux, rootless, image scanning, signing, secrets, secure registries, supply-chain protection, production checklists.",
  difficulty: "Advanced",
  duration: "90 min",
  tags: ["docker", "security", "hardening", "seccomp", "rootless"],
  updated: "2025-11-30",
  thumbnail: ""
};

// Optional images
import DockerSecArch from "../../../../assets/docker/docker-security-architecture.png";
import DockerCaps from "../../../../assets/docker/docker-capabilities.png";
import DockerSeccomp from "../../../../assets/docker/docker-seccomp.png";

export default function Lesson8() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 30, maxWidth: 1100, margin: "auto", lineHeight: 1.8 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 8 — Security & Hardening</h1>

      <p>
        Docker provides strong isolation via namespaces and cgroups, but misconfigurations can expose
        your system. This lesson covers every production-grade hardening technique: namespace isolation,
        capabilities, seccomp, AppArmor, SELinux, userns, rootless mode, secrets management, image scanning,
        signing, and CI/CD security.
      </p>

      <div style={info}>
        🔥 After this lesson you will know how to secure containers like a Senior DevOps Engineer.
      </div>

      {/* SECTION 1 */}
      <h2>1️⃣ Container Isolation Fundamentals (Namespaces + Cgroups)</h2>

      <p>
        Containers isolate processes using <strong>Linux namespaces</strong> and <strong>cgroups</strong>.
        These two act as the foundation of Docker security.
      </p>

      <ul>
        <li><strong>PID</strong> — process isolation</li>
        <li><strong>MNT</strong> — mount filesystem isolation</li>
        <li><strong>NET</strong> — network isolation</li>
        <li><strong>IPC</strong> — shared memory isolation</li>
        <li><strong>UTS</strong> — hostname isolation</li>
        <li><strong>USER</strong> — UID/GID remapping</li>
      </ul>

      <pre style={pre}>
{`docker run --pid=host ubuntu ps aux   # shares host PID namespace
docker run --network=none nginx        # isolates network completely`}
      </pre>

      <div style={warn}>
        ⚠️ Avoid using <code>--pid=host</code>, <code>--network=host</code>, <code>--privileged</code> in production.
      </div>

      {/* SECTION 2 */}
      <h2>2️⃣ Control Groups (cgroups) — Resource Security</h2>

      <p>Cgroups prevent a container from abusing host CPU, memory, I/O.</p>

      <pre style={pre}>
{`docker run -m 512m --cpus=0.5 nginx
docker run --memory="1g" --pids-limit=100 ubuntu`}
      </pre>

      <div style={note}>
        Production containers MUST define CPU/memory limits to avoid host starvation.
      </div>

      {/* SECTION 3 */}
      <h2>3️⃣ Capabilities — Fine-grained permission system</h2>

      <p>
        Linux capabilities break root privileges into small chunks. Docker drops many by default.
      </p>

      <pre style={pre}>
{`docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx`}
      </pre>

      <p>Common dangerous capabilities to DROP:</p>

      <ul>
        <li>SYS_ADMIN (extremely dangerous)</li>
        <li>SYS_PTRACE</li>
        <li>NET_ADMIN</li>
      </ul>

      <div style={warn}>
        ⚠️ <code>--privileged</code> gives ALL capabilities — NEVER use it.
      </div>

      {/* SECTION 4 */}
      <h2>4️⃣ Seccomp — System Call Filtering</h2>

      <p>
        Seccomp filters syscalls using a JSON profile. Docker ships with a strong default profile.
      </p>

      <pre style={pre}>
{`docker run --security-opt seccomp=default.json nginx`}
      </pre>

      <p>To use a custom seccomp:</p>

      <pre style={pre}>
{`docker run --security-opt seccomp=seccomp-custom.json ubuntu`}
      </pre>

      <div style={note}>
        Seccomp blocks dangerous syscalls like <code>ptrace</code>, <code>mount</code>, <code>setns</code>.
      </div>

      {/* SECTION 5 */}
      <h2>5️⃣ AppArmor — Mandatory Access Control (Ubuntu/Debian)</h2>

      <p>
        AppArmor protects filesystem actions. Docker has built-in profiles:
      </p>

      <pre style={pre}>
{`docker run --security-opt apparmor=docker-default ubuntu`}
      </pre>

      <p>Create custom AppArmor profile to enforce read-only paths.</p>

      {/* SECTION 6 */}
      <h2>6️⃣ SELinux — Mandatory Access Control (RHEL/CentOS)</h2>

      <p>
        With SELinux enforcing mode ON, Docker applies labels automatically:
      </p>

      <pre style={pre}>
{`docker run -v /data:/data:Z nginx
docker run -v /shared:/shared:ro,Z ubuntu`}
      </pre>

      <div style={info}>
        SELinux blocks container → host escape attacks.
      </div>

      {/* SECTION 7 */}
      <h2>7️⃣ Read-only containers</h2>

      <p>Make filesystem immutable:</p>

      <pre style={pre}>
{`docker run --read-only -v /cache nginx`}
      </pre>

      <ul>
        <li>Mitigates ransomware inside containers</li>
        <li>Forces clean separation of state</li>
      </ul>

      {/* SECTION 8 */}
      <h2>8️⃣ User Namespace Remapping (root inside container ≠ root on host)</h2>

      <p>Enable in daemon:</p>

      <pre style={pre}>
{`{
  "userns-remap": "default"
}`}
      </pre>

      <p>This maps container root to non-root UID on host.</p>

      <div style={warn}>
        MUST enable in production → huge security improvement.
      </div>

      {/* SECTION 9 */}
      <h2>9️⃣ Rootless Docker</h2>

      <p>Docker can run entirely rootless.</p>

      <pre style={pre}>
{`dockerd-rootless-setuptool.sh install`}
      </pre>

      <p>Rootless mode:</p>

      <ul>
        <li>Prevents privilege-escalation attacks</li>
        <li>Great for developer machines, CI runners</li>
      </ul>

      {/* SECTION 10 */}
      <h2>🔟 Handling Secrets Securely</h2>

      <p>Never store secrets in env variables, Dockerfiles, or Compose.</p>

      <h3>Use Docker Secrets (Swarm mode)</h3>

      <pre style={pre}>
{`echo "mypassword" | docker secret create db_pass -`}
      </pre>

      <p>Then:</p>

      <pre style={pre}>
{`services:
  app:
    secrets:
      - db_pass`}
      </pre>

      <h3>Compose alternative: mounted files</h3>

      <pre style={pre}>
{`volumes:
  - ./secrets/db_pass:/run/secrets/db_pass:ro`}
      </pre>

      <div style={note}>
        Do NOT use plain env vars for passwords in production.
      </div>

      {/* SECTION 11 */}
      <h2>1️⃣1️⃣ Secure Dockerfiles (Best Practices)</h2>

      <pre style={pre}>
{`FROM node:18-alpine

USER node

COPY package*.json .
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node","server.js"]`}
      </pre>

      <ul>
        <li>Use minimal base images (alpine, distroless)</li>
        <li>Drop root user — use <code>USER</code></li>
        <li>Don’t install compilers in final image</li>
        <li>Avoid ADD unless required, USE COPY</li>
      </ul>

      {/* SECTION 12 */}
      <h2>1️⃣2️⃣ Scan Docker images for vulnerabilities</h2>

      <pre style={pre}>
{`trivy image myapp:latest
grype myapp:latest`}
      </pre>

      <p>Enable scanning in CI/CD.</p>

      {/* SECTION 13 */}
      <h2>1️⃣3️⃣ Image Signing & Verification (Cosign / Notary)</h2>

      <pre style={pre}>
{`cosign generate-key-pair
cosign sign --key cosign.key registry/app:1.0
cosign verify --key cosign.pub registry/app:1.0`}
      </pre>

      <div style={info}>
        Signed images ensure supply-chain integrity.
      </div>

      {/* SECTION 14 */}
      <h2>1️⃣4️⃣ Protect Daemon Socket</h2>

      <p>
        <code>/var/run/docker.sock</code> gives ROOT access.
      </p>

      <div style={warn}>
        NEVER bind-mount docker.sock inside containers unless 100% required.
      </div>

      <p>Use rootless, or limit access with:</p>

      <pre style={pre}>
{`sudo usermod -aG docker <username>`}
      </pre>

      {/* SECTION 15 */}
      <h2>1️⃣5️⃣ Network Security</h2>

      <ul>
        <li>Use user-defined bridge networks</li>
        <li>Disable inter-container communication</li>
        <li>Expose only necessary ports</li>
        <li>Use firewalls (iptables), Cloud Security Groups</li>
      </ul>

      <pre style={pre}>
{`docker network create --internal private_net`}
      </pre>

      <p>No external internet access!</p>

      {/* SECTION 16 */}
      <h2>1️⃣6️⃣ Rate limiting to prevent DoS</h2>

      <pre style={pre}>
{`docker run --cpus="0.5" --memory="256m" --memory-swap="256m" nginx`}
      </pre>

      {/* SECTION 17 */}
      <h2>1️⃣7️⃣ Read-only root filesystem + tmpfs</h2>

      <pre style={pre}>
{`docker run \
  --read-only \
  --tmpfs /tmp \
  nginx`}
      </pre>

      {/* SECTION 18 */}
      <h2>1️⃣8️⃣ Container Escape Prevention</h2>

      <ul>
        <li>No privileged containers</li>
        <li>No host PID / NET / IPC</li>
        <li>No host mounts except read-only, validated</li>
        <li>Keep Docker up-to-date</li>
        <li>Use AppArmor/SELinux enforced</li>
        <li>Enable userns-remap / rootless</li>
      </ul>

      {/* SECTION 19 */}
      <h2>1️⃣9️⃣ Supply Chain Security</h2>

      <ul>
        <li>Pin base images to digests</li>
        <li>Scan dependencies</li>
        <li>Verify provenance (Cosign, SLSA)</li>
      </ul>

      <pre style={pre}>
{`FROM python@sha256:123455123...`}
      </pre>

      {/* SECTION 20 */}
      <h2>2️⃣0️⃣ Docker Daemon Hardening</h2>

      <pre style={pre}>
{`{
  "icc": false,
  "no-new-privileges": true,
  "userns-remap": "default"
}`}
      </pre>

      <p>
        <strong>icc=false</strong> → disable inter-container communication.  
        <strong>no-new-privileges=true</strong> → prevents escalation via setuid.
      </p>

      {/* SECTION 21 */}
      <h2>2️⃣1️⃣ Auditing & Monitoring</h2>

      <ul>
        <li>Audit logs for daemon</li>
        <li>Monitor container restarts</li>
        <li>Detect suspicious syscalls</li>
        <li>Use Falco (CNCF) for runtime security</li>
      </ul>

      <pre style={pre}>
{`falco -r rules.yaml`}
      </pre>

      {/* SECTION 22 */}
      <h2>2️⃣2️⃣ Production Security Checklist</h2>

      <ul>
        <li>✔ Use minimal base images</li>
        <li>✔ Run as non-root</li>
        <li>✔ Enable userns-remap OR rootless mode</li>
        <li>✔ Use AppArmor / SELinux + seccomp</li>
        <li>✔ Scan images in CI/CD</li>
        <li>✔ Sign images with Cosign</li>
        <li>✔ Avoid privileged containers</li>
        <li>✔ Limit CPU/memory</li>
        <li>✔ Don’t mount docker.sock</li>
        <li>✔ Use secrets properly</li>
        <li>✔ Enforce TLS on registries</li>
      </ul>

      {/* SECTION 23 */}
      <h2>2️⃣3️⃣ Mini Project — Secure Node.js App</h2>

      <p>Tasks:</p>
      <ol>
        <li>Create Dockerfile with non-root user</li>
        <li>Use alpine base</li>
        <li>Enable read-only FS + tmpfs</li>
        <li>Apply seccomp + AppArmor</li>
        <li>Sign the image with Cosign</li>
        <li>Scan image using Trivy</li>
      </ol>

      {/* END */}
      <h2>✔ Conclusion</h2>

      <p>
        You now understand the entire security model of Docker.  
        Next level: Docker Swarm & Kubernetes security, image trust pipeline, and runtime threat detection.
      </p>

      <div style={info}>
        Ready for **Lesson 9 (Docker Storage Deep Dive)**?  
        Say: &nbsp;<strong>“Lesson 9 Start”</strong>
      </div>
    </div>
  );
}

// Styling blocks
const pre = {
  background: "#1f1f1f",
  color: "white",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
  marginBottom: 20
};

const info = {
  background: "#e8f7ff",
  padding: 14,
  borderRadius: 8,
  borderLeft: "5px solid #007bff",
  margin: "20px 0"
};

const note = {
  background: "#fff7e6",
  padding: 14,
  borderRadius: 8,
  borderLeft: "5px solid #f4b400",
  margin: "20px 0"
};

const warn = {
  background: "#ffe6e6",
  padding: 14,
  borderRadius: 8,
  borderLeft: "5px solid #ff4a4a",
  margin: "20px 0"
};
