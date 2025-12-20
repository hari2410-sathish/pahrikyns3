// ----------------------------------------------
// Docker Lesson 2 – INSTALL DOCKER (Ubuntu / CentOS / Windows / macOS)
// Max 1000 lines ✔ (This file ~470 lines)
// ----------------------------------------------

export const meta = {
  title: "Docker Lesson 2",
  description:
    "Install Docker on Ubuntu, CentOS/RHEL, Windows (Docker Desktop + WSL2), and macOS. Post-install steps: add user, enable service, test, install docker-compose (v2), and common troubleshooting.",
  difficulty: "Beginner",
  duration: "30–45 min",
  tags: ["docker", "install", "ubuntu", "centos", "windows", "macos", "docker-compose"],
  updated: "2025-11-30",
  thumbnail: ""
};

// IMAGE IMPORTS (add these images inside: src/assets/docker/)
import DockerInstallUbuntu from "../../../../assets/docker/docker-install-ubuntu.png";
import DockerInstallWindows from "../../../../assets/docker/docker-install-windows.png";
import DockerPostInstall from "../../../../assets/docker/docker-post-install.png";

export default function Lesson2() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div
      style={{
        padding: "28px",
        maxWidth: 1100,
        margin: "auto",
        lineHeight: 1.8,
        fontSize: "17px"
      }}
    >
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Docker – Lesson 2: Installing Docker (Ubuntu, CentOS/RHEL, Windows, macOS) & Post-install
      </h1>

      <p style={{ color: "#555", marginBottom: 18 }}>
        This lesson walks through the official, production-friendly installation steps for Docker
        Engine and Docker Compose (v2) on popular platforms. Follow the section for your OS
        exactly — copy commands and adapt only where noted.
      </p>

      <div
        style={{
          background: "#e8f7ff",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #007bff",
          marginBottom: 20
        }}
      >
        <strong>What you'll install:</strong>
        <ul>
          <li>Docker Engine (dockerd) & Docker CLI</li>
          <li>docker-compose (v2) plugin or Docker Desktop bundled compose</li>
          <li>Optional: Docker Credential helpers, git, and tools for convenience</li>
        </ul>
      </div>

      {/* SECTION: Ubuntu */}
      <section style={{ marginTop: 24 }}>
        <h2>1️⃣ Ubuntu / Debian (official recommended steps)</h2>

        <img
          src={DockerInstallUbuntu}
          alt="Install Docker on Ubuntu"
          style={{ width: "100%", borderRadius: 8, margin: "12px 0" }}
        />

        <p>Use the official Docker repository to get the latest stable Docker Engine.</p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 14, borderRadius: 8 }}>
{`# 1. Update and install prerequisites
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# 2. Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 3. Set up the stable repository (replace $(lsb_release -cs) with your distro codename)
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Start & enable Docker
sudo systemctl enable --now docker

# 6. Test
sudo docker run --rm hello-world`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderLeft: "5px solid #f4b400", borderRadius: 8, marginTop: 12 }}>
          Tip: If your distro is Debian, replace <code>ubuntu</code> repo URL with Debian appropriate path; use <code>lsb_release -cs</code> to confirm codename.
        </div>

        <h3 style={{ marginTop: 12 }}>Post-install (run Docker as non-root)</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Add current user to docker group (logout/login or newgrp needed)
sudo usermod -aG docker $USER

# Apply group change immediately (temporary)
newgrp docker

# Test without sudo
docker run --rm hello-world`}
        </pre>

        <div style={{ background: "#ffd8d8", padding: 12, borderLeft: "5px solid #ff5c5c", borderRadius: 8, marginTop: 12 }}>
          Warning: Adding user to <code>docker</code> gives effective root access via Docker. For sensitive multi-user systems, consider policies or use rootless Docker.
        </div>
      </section>

      {/* SECTION: CentOS / RHEL / Rocky / Alma */}
      <section style={{ marginTop: 32 }}>
        <h2>2️⃣ CentOS / RHEL / Rocky / AlmaLinux (dnf / yum)</h2>

        <p>
          On RHEL derivatives, use the official Docker repository, or use the platform's packaged Docker
          if required by enterprise policy.
        </p>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 14, borderRadius: 8 }}>
{`# Remove old docker versions
sudo dnf remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# Install prerequisites
sudo dnf -y install yum-utils

# Add Docker repo
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start & enable
sudo systemctl enable --now docker

# Verify
sudo docker run --rm hello-world`}
        </pre>

        <p style={{ marginTop: 10 }}>
          For RHEL with subscription-manager, ensure system is registered and repositories allowed per your licensing.
        </p>

        <div style={{ background: "#fff7e6", padding: 12, borderLeft: "5px solid #f4b400", borderRadius: 8, marginTop: 12 }}>
          Tip: If <code>containerd.io</code> version conflicts occur, check available package versions with <code>dnf list docker-ce --showduplicates</code>.
        </div>
      </section>

      {/* SECTION: Windows */}
      <section style={{ marginTop: 32 }}>
        <h2>3️⃣ Windows — Docker Desktop (Windows 10/11) & WSL2</h2>

        <img
          src={DockerInstallWindows}
          alt="Install Docker Desktop on Windows"
          style={{ width: "100%", borderRadius: 8, marginTop: 12, marginBottom: 12 }}
        />

        <p>
          Docker Desktop is the official recommended method on Windows. It bundles Docker Engine, Docker CLI, and Compose (v2).
        </p>

        <ol>
          <li>Download Docker Desktop from <code>https://www.docker.com/products/docker-desktop</code></li>
          <li>Run the installer and follow prompts</li>
          <li>Enable <strong>WSL 2</strong> integration when prompted (recommended)</li>
          <li>Restart your machine if required</li>
          <li>Open Docker Desktop app & confirm it is running</li>
        </ol>

        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Test in PowerShell or WSL
docker --version
docker run --rm hello-world`}
        </pre>

        <h3 style={{ marginTop: 10 }}>WSL2 (recommended)</h3>
        <p>
          Enable WSL2 and install a Linux distro (Ubuntu) from Microsoft Store for best Linux compatibility.
        </p>

        <pre style={{ background: "#f5f5f7", padding: 12, borderRadius: 8 }}>
{`# In an elevated PowerShell (Admin):
wsl --install   # installs WSL2 + default distro (Windows 11)
# or enable manually:
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Set WSL2 as default
wsl --set-default-version 2`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderLeft: "5px solid #f4b400", borderRadius: 8, marginTop: 12 }}>
          Note: Older Windows 10 versions might not support WSL2 or require KB updates. Use Docker Desktop release notes for compatibility.
        </div>
      </section>

      {/* SECTION: macOS */}
      <section style={{ marginTop: 32 }}>
        <h2>4️⃣ macOS — Docker Desktop for Mac</h2>

        <p>
          Docker Desktop for Mac supports Apple Silicon (M1/M2) and Intel chips. Download the matching installer.
        </p>

        <ol>
          <li>Download Docker Desktop for Mac from Docker website</li>
          <li>Install the .dmg and move Docker.app to Applications</li>
          <li>Open Docker.app and complete initial setup</li>
          <li>Run <code>docker --version</code> to verify</li>
        </ol>

        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Test
docker --version
docker run --rm hello-world`}
        </pre>

        <div style={{ background: "#e8fff0", padding: 12, borderLeft: "5px solid #28a745", borderRadius: 8, marginTop: 12 }}>
          Tip: On Apple Silicon, use multi-arch images or build with <code>--platform linux/amd64</code> when needed.
        </div>
      </section>

      {/* SECTION: Docker Compose */}
      <section style={{ marginTop: 32 }}>
        <h2>5️⃣ Docker Compose (v2) — installation & usage</h2>

        <p>
          Docker Compose v2 is now distributed as a Docker CLI plugin (<code>docker compose</code>). On
          modern installs (Ubuntu/CentOS via official packages, Docker Desktop), the plugin is already installed.
        </p>

        <h3>Check if compose plugin exists</h3>
        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 12, borderRadius: 8 }}>
{`docker compose version
# or
docker compose ls`}
        </pre>

        <h3>If plugin missing — install manually (Linux)</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Example install (Linux x86_64) — check latest version at GitHub releases
COMPOSE_VERSION="v2.20.2"
mkdir -p ~/.docker/cli-plugins
curl -SL "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

# Test
docker compose version`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderLeft: "5px solid #f4b400", borderRadius: 8, marginTop: 12 }}>
          Note: Legacy <code>docker-compose</code> (Python binary) still exists but prefer the new plugin (<code>docker compose</code>) for future compatibility.
        </div>
      </section>

      {/* SECTION: Rootless Docker */}
      <section style={{ marginTop: 32 }}>
        <h2>6️⃣ Rootless Docker (optional, safer for multi-user systems)</h2>

        <p>
          Rootless Docker allows running the daemon and containers without root privileges. It's great for developer machines where granting docker group privileges is undesired.
        </p>

        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Install rootless (example)
dockerd-rootless-install.sh

# start rootless daemon for current user
systemctl --user start docker
systemctl --user enable docker`}
        </pre>

        <div style={{ background: "#e8fff0", padding: 12, borderLeft: "5px solid #28a745", borderRadius: 8, marginTop: 12 }}>
          Caveat: Rootless mode has limitations (networking differences, privileged container limitations). Read the docs before using in production.
        </div>
      </section>

      {/* SECTION: Post-install checks & common commands */}
      <section style={{ marginTop: 32 }}>
        <h2>7️⃣ Post-install commands & verification</h2>

        <pre style={{ background: "#1f1f1f", color: "#fff", padding: 14, borderRadius: 8 }}>
{`# Basic checks
docker --version
docker info

# Run sample containers
docker run --rm hello-world
docker run --rm -it alpine sh

# List containers & images
docker ps -a
docker images

# Clean up
docker system df
docker system prune -af`}
        </pre>

        <div style={{ background: "#fff7e6", padding: 12, borderLeft: "5px solid #f4b400", borderRadius: 8, marginTop: 12 }}>
          Tip: Use <code>docker system prune</code> carefully — it removes stopped containers, unused networks, and dangling images.
        </div>
      </section>

      {/* SECTION: Troubleshooting */}
      <section style={{ marginTop: 32 }}>
        <h2>8️⃣ Common installation issues & fixes</h2>

        <h3>1) Docker service not starting</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# Inspect journal logs
sudo journalctl -u docker --no-pager

# Start manually and view output
sudo systemctl start docker
sudo systemctl status docker`}
        </pre>

        <h3>2) Permission denied (socket)</h3>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
{`# If you see permission errors:
sudo usermod -aG docker $USER
# Then logout/login or run ` + "`newgrp docker`" + ` to apply group changes`}
        </pre>

        <h3>3) WSL2 & Windows issues</h3>
        <ul>
          <li>Ensure WSL2 kernel is installed and enabled</li>
          <li>Enable Virtual Machine Platform in Windows features</li>
          <li>Restart Docker Desktop after Windows updates</li>
        </ul>

        <h3>4) cgroup v2 issues on modern distros</h3>
        <p>
          Newer distros use cgroup v2 by default. Some Docker versions require special config. If you see warnings related to cgroups, consult distro docs or Docker release notes.
        </p>

        <h3>5) Docker Desktop crashes</h3>
        <p>Check Docker Desktop logs (UI → Troubleshoot → Get support diagnostics) and WSL distro logs.</p>
      </section>

      {/* SECTION: Extra tips */}
      <section style={{ marginTop: 32 }}>
        <h2>9️⃣ Extra tips</h2>

        <ul>
          <li>Prefer official Docker instructions at <code>docs.docker.com</code> for version-specific commands.</li>
          <li>Use the packaged plugin <code>docker-compose-plugin</code> when available—no Python dependency.</li>
          <li>Keep Docker Engine and Compose versions reasonably matched with your CI/CD environment.</li>
          <li>On CI agents, use Docker's official action/runner images or install via packages for reproducibility.</li>
        </ul>
      </section>

      {/* SUMMARY */}
      <section style={{ marginTop: 32, marginBottom: 60 }}>
        <h2>🔚 Summary & Next</h2>

        <p>
          You installed Docker Engine and Compose (or verified Docker Desktop) for your OS. You learned
          how to run a test container, enable the service, and perform basic post-install steps.
        </p>

        <div style={{ background: "#e8f7ff", padding: 14, borderRadius: 8, borderLeft: "5px solid #007bff", marginTop: 12 }}>
          👉 When you're ready, say: <strong>“Start Lesson 3”</strong> — we'll cover <em>Docker Images Deep Dive</em> (layers, caching, Dockerfile best practices).
        </div>
      </section>
    </div>
  );
}

Lesson2.displayName = "Docker Lesson 2 – Install Docker";
