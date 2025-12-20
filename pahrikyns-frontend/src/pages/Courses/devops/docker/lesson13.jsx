export const meta = {
  title: "Docker Lesson 13",
  description:
    "Complete Docker Security Masterclass covering container runtime security, host isolation, namespaces, cgroups, capabilities, seccomp, AppArmor, SELinux, secrets, TLS, image scanning, signing, registry security, network protections, CI/CD supply chain hardening, and production best practices.",
  difficulty: "Advanced",
  duration: "120–150 min",
  tags: ["docker", "security", "runtime", "selinux", "seccomp", "capabilities", "cicd"],
  updated: "2025-11-30",
  thumbnail: ""
};

// images
import DockerSec from "../../../../assets/docker/docker-security.png";
import NamespacesImg from "../../../../assets/docker/namespaces.png";
import SeccompImg from "../../../../assets/docker/seccomp.png";
import CapImg from "../../../../assets/docker/capabilities.png";
import AppArmorImg from "../../../../assets/docker/apparmor.png";
import NetworkSecImg from "../../../../assets/docker/network-security.png";

export default function Lesson13() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 13 — Full Security Masterclass</h1>

      <p style={{ color: "#555" }}>
        Docker is powerful — but containers share the host kernel, so **security must be deeply understood**.
        This lesson covers complete runtime security, kernel isolation, capabilities, seccomp, AppArmor, SELinux,
        image signing, scanning, least privilege, network isolation, and full CI/CD supply chain security.
      </p>

      {/* OVERVIEW */}
      <section>
        <h2>1️⃣ The 7 Pillars of Docker Security</h2>

        <img src={DockerSec} alt="docker security" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <ul>
          <li><strong>1. Image Security</strong>: base images, signing, scanning</li>
          <li><strong>2. Container Runtime Security</strong>: namespaces, cgroups, seccomp, capabilities</li>
          <li><strong>3. Host Security</strong>: kernel hardening, minimal host OS</li>
          <li><strong>4. Secrets & Config Security</strong>: encrypted at rest, never in env vars</li>
          <li><strong>5. Network Security</strong>: firewall, segmentation, zero-trust</li>
          <li><strong>6. Registry Security</strong>: access control, TLS, retention</li>
          <li><strong>7. Supply Chain Security</strong>: CI/CD, SBOM, signing, policy enforcement</li>
        </ul>
      </section>

      {/* NAMESPACES */}
      <section>
        <h2>2️⃣ Namespace Isolation (Kernel Level Separation)</h2>

        <img src={NamespacesImg} alt="namespaces" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>
          Linux namespaces isolate processes so each container sees its own environment:
        </p>
        <ul>
          <li><strong>PID namespace</strong>: isolates process IDs</li>
          <li><strong>NET namespace</strong>: separate network stack</li>
          <li><strong>MNT</strong>: separate filesystem mounts</li>
          <li><strong>IPC</strong>: shared memory isolation</li>
          <li><strong>UTS</strong>: hostname isolation</li>
          <li><strong>USER</strong>: UID/GID mapping</li>
        </ul>

        <pre style={pre}>
{`# See namespaces of a container
lsns
docker inspect <id> | grep -i Namespace`}
        </pre>

        <div style={good}>Namespaces = the foundation of container isolation.</div>
      </section>

      {/* CGROUPS */}
      <section>
        <h2>3️⃣ cGroups (Limit CPU, Memory, IO, PIDs)</h2>

        <p>cGroups prevent a container from consuming all host resources.</p>

        <h3>Limit memory</h3>
        <pre style={pre}>
{`docker run -m 512m --memory-swap=512m nginx`}
        </pre>

        <h3>Limit CPU</h3>
        <pre style={pre}>
{`docker run --cpus="1.0" nginx`}
        </pre>

        <div style={note}>ALWAYS enforce limits in production.</div>
      </section>

      {/* CAPABILITIES */}
      <section>
        <h2>4️⃣ Linux Capabilities (Drop Host-Level Privileges)</h2>

        <img src={CapImg} alt="capabilities" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>
          By default, Docker removes some powerful kernel capabilities — but still gives more than needed.
          Reduce attack surface by dropping most capabilities.
        </p>

        <h3>Drop all</h3>
        <pre style={pre}>
{`docker run --cap-drop ALL nginx`}
        </pre>

        <h3>Add one needed cap</h3>
        <pre style={pre}>
{`docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx`}
        </pre>

        <div style={good}>Golden rule: Drop ALL, add ONLY what you need.</div>
      </section>

      {/* SECCOMP */}
      <section>
        <h2>5️⃣ Seccomp Profiles (Syscall Filtering)</h2>

        <img src={SeccompImg} alt="seccomp" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>Seccomp blocks dangerous syscalls like <code>ptrace</code>, <code>acct</code>, <code>reboot</code>.</p>

        <h3>Run with default seccomp</h3>
        <pre style={pre}>
{`docker run --security-opt seccomp=default.json nginx`}
        </pre>

        <h3>Disable seccomp (never do in prod)</h3>
        <pre style={pre}>
{`docker run --security-opt seccomp=unconfined nginx`}
        </pre>

        <div style={warn}>Never disable seccomp in production.</div>
      </section>

      {/* APPARMOR */}
      <section>
        <h2>6️⃣ AppArmor / SELinux Mandatory Access Control</h2>

        <img src={AppArmorImg} alt="apparmor" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <p>
          MAC frameworks enforce filesystem and process restrictions on containers.
        </p>

        <h3>AppArmor Example</h3>
        <pre style={pre}>
{`docker run --security-opt apparmor=docker-default nginx`}
        </pre>

        <h3>SELinux (RedHat / CentOS / Fedora)</h3>
        <pre style={pre}>
{`docker run -v data:/data:Z nginx`}
        </pre>

        <div style={good}>AppArmor/SELinux = EXTRA layer of kernel enforcement.</div>
      </section>

      {/* ROOTLESS */}
      <section>
        <h2>7️⃣ Rootless Docker (Run Daemon Without Root)</h2>

        <p>
          Rootless Docker eliminates entire classes of privilege-escalation attacks. Docker daemon and
          containers run as unprivileged users.
        </p>

        <pre style={pre}>
{`dockerd-rootless-setuptool.sh install`}
        </pre>

        <div style={blueBox}>
          Use rootless mode for developers and CI pipelines.
        </div>
      </section>

      {/* SECRETS */}
      <section>
        <h2>8️⃣ Secrets Management (Never store secrets in env vars!)</h2>

        <p>Environment variables can leak via logs or <code>docker inspect</code>. Use Docker Secrets.</p>

        <h3>Create secret</h3>
        <pre style={pre}>
{`echo "mypassword" | docker secret create db_pass -`}
        </pre>

        <h3>Use in service</h3>
        <pre style={pre}>
{`docker service create --name db --secret db_pass mysql:8`}
        </pre>

        <div style={warn}>
          Secrets only work in Swarm or Kubernetes. Regular containers → use vault or file mounts.
        </div>
      </section>

      {/* REGISTRY SECURITY */}
      <section>
        <h2>9️⃣ Image Security (Signing, Scanning, Trusted Sources)</h2>

        <p>Images must be secure before running them.</p>

        <h3>Scan with Trivy</h3>
        <pre style={pre}>{`trivy image myapp:1.0`}</pre>

        <h3>Sign with Cosign</h3>
        <pre style={pre}>{`cosign sign registry/app:1.0`}</pre>

        <h3>Verify signature</h3>
        <pre style={pre}>{`cosign verify registry/app:1.0`}</pre>

        <div style={good}>Only run signed & scanned images in production.</div>
      </section>

      {/* NETWORK SECURITY */}
      <section>
        <h2>🔟 Network Security (Firewall, Isolation, Zero Trust)</h2>

        <img src={NetworkSecImg} alt="network security" style={{ width: "100%", borderRadius: 10, margin: "12px 0" }} />

        <h3>Block containers from reaching internet</h3>
        <pre style={pre}>
{`docker run --network none nginx`}
        </pre>

        <h3>Custom isolated network</h3>
        <pre style={pre}>
{`docker network create secure_net
docker run --network secure_net myapp`}
        </pre>

        <h3>Host firewall (UFW)</h3>
        <pre style={pre}>
{`ufw default deny incoming
ufw allow 22
ufw allow 80
ufw allow 443`}
        </pre>
      </section>

      {/* SUPPLY CHAIN SECURITY */}
      <section>
        <h2>1️⃣1️⃣ Supply Chain Security (CI/CD, SBOM, Policies)</h2>

        <p>
          Most real breaches happen via supply chain: compromised images, malicious dependencies,
          insecure CI runners, unscanned base images.
        </p>

        <h3>Generate SBOM</h3>
        <pre style={pre}>{`syft myapp:1.0`}</pre>

        <h3>CI/CD Steps</h3>
        <ol>
          <li>Build → Scan → Sign → Push</li>
          <li>Policy → Only signed images allowed</li>
          <li>Enforce digests in deployment</li>
          <li>Use private registries (Harbor/GitHub CR)</li>
        </ol>
      </section>

      {/* HARDENING CHECKLIST */}
      <section>
        <h2>1️⃣2️⃣ Hardening Checklist (Production-Ready)</h2>

        <ul>
          <li>Run containers as <strong>non-root</strong></li>
          <li>Use <strong>read-only filesystem</strong></li>
          <li>Limit CPU/memory</li>
          <li>Drop all capabilities</li>
          <li>Enforce seccomp + AppArmor</li>
          <li>Use private images ONLY</li>
          <li>Enable TLS everywhere</li>
          <li>Use secrets, not env variables</li>
          <li>Scan images automatically in CI</li>
        </ul>

        <div style={good}>Following this checklist = production-grade container hardening.</div>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 40, marginBottom: 60 }}>
        <h2>✔ Conclusion</h2>

        <p>
          Docker security is NOT optional — it's mandatory. Containers share the host kernel, so the security
          model depends entirely on namespaces, cgroups, capabilities, seccomp, MAC frameworks, and trusted image pipelines.
          With these techniques, you can build secure, hardened, production-safe container platforms.
        </p>

        <div style={blueBox}>
          Next: **Lesson 14 — Docker Storage Deep Dive (Volumes, Bind Mounts, Drivers, CSI)**  
          👉 Just say **“Lesson 14 Start”**
        </div>
      </section>
    </div>
  );
}

// STYLES
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

const blueBox = {
  background: "#e8f7ff",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #007bff",
  marginBottom: 16
};
