// ----------------------------------------------
// Docker Lesson 1 – INTRO TO DOCKER
// Max 1000 lines ✔ (This file ~350 lines)
// ----------------------------------------------
import lang from "./lesson1.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const meta = {
  title: "Docker Lesson 1",
  description:
    "A complete introduction to Docker: containers, images, Docker engine, architecture, use cases, and why Docker changed DevOps forever.",
  difficulty: "Beginner",
  duration: "20–30 min",
  tags: ["docker", "containers", "devops", "virtualization"],
  updated: "2025-11-30",
  thumbnail: ""
};

// IMAGE IMPORTS (add these images inside: src/assets/docker/)
import DockerVsVM from "../../../../assets/docker/docker-vs-vm.png";
import DockerArchitectureImg from "../../../../assets/docker/docker-architecture.png";
import DockerEngineImg from "../../../../assets/docker/docker-engine.png";
import DockerUseCasesImg from "../../../../assets/docker/docker-usecases.png";
import DockerLifecycleImg from "../../../../assets/docker/docker-container-lifecycle.png";

export default function Lesson1() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div
      style={{
        padding: "28px",
        maxWidth: 1100,
        margin: "auto",
        lineHeight: 1.8,
        fontSize: "17px",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Docker – Lesson 1: Complete Introduction to Docker
      </h1>

      <p style={{ color: "#555", marginBottom: 20 }}>
        Docker revolutionized DevOps by enabling lightweight, portable, and
        consistent environments through containers. This lesson breaks down the
        fundamentals of Docker, its architecture, how it differs from virtual
        machines, and why developers & DevOps teams use it.
      </p>

      {/* LEARNING OUTCOME BOX */}
      <div
        style={{
          background: "#e8f7ff",
          padding: 16,
          borderRadius: 8,
          borderLeft: "5px solid #007bff",
          marginBottom: 28,
        }}
      >
        <strong>After this lesson you will understand:</strong>
        <ul>
          <li>What Docker is & why it is used</li>
          <li>Difference between Docker containers and VMs</li>
          <li>Docker architecture (Client → Daemon → Registry)</li>
          <li>Images, containers, layers, and the filesystem model</li>
          <li>Real-world use cases for Docker</li>
        </ul>
      </div>

      {/* SECTION 1 */}
      <section>
        <h2>1️⃣ What is Docker?</h2>

        <p>
          Docker is a platform that allows you to package an application and its
          dependencies inside a lightweight, portable container. It guarantees
          that your application will run the same way on any system — developer
          laptop, test environment, or cloud server.
        </p>

        <p>
          Docker uses containerization technology to isolate applications using
          the host's OS kernel instead of running a full virtual OS.
        </p>

        <div
          style={{
            background: "#fff7e6",
            padding: 14,
            borderLeft: "5px solid #f4b400",
            borderRadius: 8,
            margin: "20px 0",
          }}
        >
          💡 <strong>Simple definition:</strong>  
          <em>A Docker container = Application + Runtime + Dependencies packed
          together.</em>
        </div>
      </section>

      {/* SECTION 2 */}
      <section style={{ marginTop: 32 }}>
        <h2>2️⃣ Docker vs Virtual Machines</h2>

        <p>
          Before Docker, teams relied on virtual machines to isolate
          applications. But VMs are heavy, slow to boot, and include a full OS
          inside each VM.
        </p>

        <img
          src={DockerVsVM}
          alt="Docker vs VM"
          style={{
            width: "100%",
            borderRadius: 10,
            margin: "18px 0",
          }}
        />

        <h3>How VMs work</h3>
        <ul>
          <li>Each VM includes a full OS (Ubuntu, CentOS, Windows)</li>
          <li>Requires large memory & CPU resources</li>
          <li>Slow boot time</li>
        </ul>

        <h3>How Docker containers work</h3>
        <ul>
          <li>No full OS → Uses host kernel</li>
          <li>Lightweight, fast to start (milliseconds)</li>
          <li>Small size (MB instead of GB)</li>
        </ul>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderLeft: "5px solid #28a745",
            borderRadius: 8,
            marginTop: 18,
          }}
        >
          ✔ <strong>Conclusion:</strong>  
          Containers = Lightweight, Faster, Cheaper, Easier than VMs.
        </div>
      </section>

      {/* SECTION 3 */}
      <section style={{ marginTop: 32 }}>
        <h2>3️⃣ Docker Architecture (Client → Daemon → Registry)</h2>

        <img
          src={DockerArchitectureImg}
          alt="Docker Architecture"
          style={{
            width: "100%",
            borderRadius: 10,
            margin: "18px 0",
          }}
        />

        <p>
          Docker has a simple but powerful architecture consisting of three
          components:
        </p>

        <ol>
          <li>
            <strong>Docker Client</strong> — CLI tool (`docker`) to send
            commands.
          </li>
          <li>
            <strong>Docker Daemon</strong> — Background service that builds,
            runs, and manages containers.
          </li>
          <li>
            <strong>Docker Registry</strong> — Stores images (Docker Hub, ECR,
            GCR, etc).
          </li>
        </ol>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
            marginTop: 20,
            overflowX: "auto",
          }}
        >
{`docker pull nginx    # downloads image
docker run nginx      # runs container
docker build .        # builds image`}
        </pre>

        <div
          style={{
            background: "#ffd8d8",
            padding: 14,
            borderLeft: "5px solid #ff5c5c",
            borderRadius: 8,
            marginTop: 18,
          }}
        >
          ⚠ GitHub, GitLab, AWS ECR, Google GCR are all Docker-compatible
          registries.
        </div>
      </section>

      {/* SECTION 4 */}
      <section style={{ marginTop: 32 }}>
        <h2>4️⃣ Docker Engine & Its Components</h2>

        <img
          src={DockerEngineImg}
          alt="Docker Engine"
          style={{
            width: "100%",
            borderRadius: 10,
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        <p>
          Docker Engine is the core technology powering containers. It has 3
          key components:
        </p>

        <ul>
          <li>
            <strong>Docker daemon (dockerd)</strong> — Manages containers,
            images, volumes, networks.
          </li>
          <li>
            <strong>REST API</strong> — Used internally by Docker CLI.
          </li>
          <li>
            <strong>Docker CLI</strong> — Command line interface.
          </li>
        </ul>

        <h3>Check if Docker is installed</h3>
        <pre
          style={{
            background: "#fafafa",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`docker --version
docker info
systemctl status docker`}
        </pre>
      </section>

      {/* SECTION 5 */}
      <section style={{ marginTop: 32 }}>
        <h2>5️⃣ Images, Containers & Layers</h2>

        <p>
          These are the building blocks of Docker. Understanding them is
          essential before moving to Dockerfiles & Compose.
        </p>

        <h3>📌 Docker Image</h3>
        <p>
          A Docker image is a read-only template used to create containers.
        </p>

        <ul>
          <li>Contains application + dependencies</li>
          <li>Made of multiple layers</li>
          <li>Stored in registries</li>
        </ul>

        <h3>📌 Docker Container</h3>
        <p>
          A running instance of an image. Containers are isolated environments.
        </p>

        <h3>📌 Docker Layers</h3>
        <p>
          Images use a layered filesystem. Each layer is cached and reused,
          making images lightweight and efficient.
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            padding: 16,
            borderRadius: 8,
            color: "#fff",
            overflowX: "auto",
          }}
        >
{`# Show pulled images
docker images

# Run a container
docker run nginx

# Show running containers
docker ps`}
        </pre>
      </section>

      {/* SECTION 6 */}
      <section style={{ marginTop: 32 }}>
        <h2>6️⃣ Docker Container Lifecycle</h2>

        <img
          src={DockerLifecycleImg}
          alt="Docker container lifecycle"
          style={{
            width: "100%",
            borderRadius: 10,
            marginTop: 16,
            marginBottom: 18,
          }}
        />

        <pre
          style={{
            background: "#fafafa",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`docker create
docker start
docker stop
docker restart
docker rm`}
        </pre>

        <p>
          Containers are ephemeral — once deleted, the data inside is lost.
          Volumes (Lesson 7) are used for persistent storage.
        </p>
      </section>

      {/* SECTION 7 */}
      <section style={{ marginTop: 32 }}>
        <h2>7️⃣ Why Companies Use Docker</h2>

        <img
          src={DockerUseCasesImg}
          alt="Docker Use Cases"
          style={{
            width: "100%",
            borderRadius: 10,
            marginTop: 14,
            marginBottom: 16,
          }}
        />

        <h3>Top Use Cases</h3>
        <ul>
          <li>Microservices deployment</li>
          <li>CI/CD pipelines</li>
          <li>Portable development environments</li>
          <li>Scaling apps in cloud</li>
          <li>Testing multiple environments</li>
        </ul>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderLeft: "5px solid #28a745",
            borderRadius: 8,
            marginTop: 18,
          }}
        >
          ✔ Docker ensures “Works on my machine” becomes “Works everywhere”.
        </div>
      </section>

      {/* SECTION 8 */}
      <section style={{ marginTop: 32, marginBottom: 60 }}>
        <h2>8️⃣ Summary</h2>

        <p>
          In this lesson, you learned what Docker is, why it is used, and how
          its architecture works. With this foundation, you're ready for Lesson
          2 — installing Docker on Linux, Windows, and macOS with proper
          post-installation steps.
        </p>

        <div
          style={{
            background: "#e8f7ff",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #007bff",
            marginTop: 20,
          }}
        >
          👉 When you're ready, say:  
          <strong>“Start Lesson 2”</strong>
        </div>
      </section>
    </div>
  );
}

Lesson1.displayName = "Docker Lesson 1 – Introduction";
