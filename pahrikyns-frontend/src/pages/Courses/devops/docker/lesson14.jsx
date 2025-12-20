export const meta = {
  title: "Docker Lesson 14",
  description:
    "Docker Storage Masterclass — deep dive into volumes, bind mounts, tmpfs, overlay2, storage drivers, performance tuning, data persistence, migration, backups, multi-host volumes, NFS, cloud storage, and CSI drivers.",
  difficulty: "Advanced",
  duration: "90–120 min",
  tags: ["docker", "storage", "volumes", "overlay2", "csi", "nfs"],
  updated: "2025-11-30",
  thumbnail: ""
};

// Optional images (place in assets/docker/)
import Overlay2Img from "../../../../assets/docker/overlay2.png";
import VolumesImg from "../../../../assets/docker/volumes.png";
import NFSImg from "../../../../assets/docker/nfs-storage.png";
import CSIImg from "../../../../assets/docker/csi-architecture.png";

export default function Lesson14() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>
      <h1 style={{ fontSize: 38, fontWeight: 800 }}>
        Docker Lesson 14 — Storage & Volumes Deep Dive
      </h1>

      <p style={{ color: "#444" }}>
        Docker storage is critical when building stateful applications. In this masterclass you will
        learn everything about Docker volumes, bind mounts, tmpfs, overlay2, multi-host volumes,
        performance tuning, backups, cloud storage, and CSI-like volume drivers.
      </p>

      {/* INTRO */}
      <section>
        <h2>1️⃣ Understanding Docker Storage</h2>

        <p>
          Docker containers are ephemeral — meaning the internal filesystem is deleted when the container
          is removed. To store persistent data, Docker provides multiple storage mechanisms:
        </p>

        <ul>
          <li><strong>Volumes</strong> (managed by Docker)</li>
          <li><strong>Bind Mounts</strong> (mount host folders)</li>
          <li><strong>tmpfs</strong> (memory-based, temporary)</li>
          <li><strong>Storage drivers</strong> (overlay2, btrfs, zfs)</li>
        </ul>
      </section>

      {/* DOCKER VOLUMES */}
      <section>
        <h2>2️⃣ Docker Volumes (Recommended for Most Use Cases)</h2>

        <img
          src={VolumesImg}
          alt="volumes"
          style={{ width: "100%", borderRadius: 10, margin: "14px 0" }}
        />

        <p>Volumes are managed by Docker and stored under <code>/var/lib/docker/volumes</code>.</p>

        <h3>Create a volume</h3>
        <pre style={pre}>
{`docker volume create mydata`}
        </pre>

        <h3>Use in container</h3>
        <pre style={pre}>
{`docker run -d -v mydata:/var/lib/mysql mysql:8`}
        </pre>

        <div style={good}>
          Volumes → best choice for databases, logs, uploaded files, persistent service data.
        </div>
      </section>

      {/* BIND MOUNTS */}
      <section>
        <h2>3️⃣ Bind Mounts (Direct Host Folder Access)</h2>

        <p>Bind mounts give containers access to host filesystem paths:</p>

        <pre style={pre}>
{`docker run -v /host/path:/container/path nginx`}
        </pre>

        <div style={warn}>
          Bind mounts bypass Docker's management → risky, must control permissions carefully.
        </div>

        <ul>
          <li>Useful for development (live code editing)</li>
          <li>Not recommended for production unless controlled strictly</li>
          <li>Security-sensitive (host path exposure)</li>
        </ul>
      </section>

      {/* TMPFS */}
      <section>
        <h2>4️⃣ tmpfs (In-Memory Storage)</h2>

        <p>
          tmpfs stores data in RAM, not disk. Great for temporary data or sensitive info (no disk persistence).
        </p>

        <pre style={pre}>
{`docker run --tmpfs /run --tmpfs /tmp ubuntu`}
        </pre>

        <div style={good}>Fastest storage option → RAM only → auto wiped.</div>
      </section>

      {/* STORAGE DRIVERS */}
      <section>
        <h2>5️⃣ Storage Drivers (overlay2, devicemapper, btrfs, zfs)</h2>

        <img
          src={Overlay2Img}
          alt="overlay2"
          style={{ width: "100%", borderRadius: 10, margin: "14px 0" }}
        />

        <p>
          Docker uses storage drivers to create container filesystems. Modern Linux uses
          <strong>overlay2</strong>.
        </p>

        <h3>Check storage driver</h3>
        <pre style={pre}>{`docker info | grep Storage`}</pre>

        <h3>How overlay2 works</h3>
        <ul>
          <li><code>lowerdir</code> → image layers (read-only)</li>
          <li><code>upperdir</code> → writable layer</li>
          <li><code>merged</code> → final merged view</li>
        </ul>

        <div style={note}>Overlay2 is simplest + fastest + stable → default for Docker.</div>
      </section>

      {/* VOLUME INSPECTION */}
      <section>
        <h2>6️⃣ Inspecting Volumes</h2>

        <h3>Show all volumes</h3>
        <pre style={pre}>{`docker volume ls`}</pre>

        <h3>Inspect volume</h3>
        <pre style={pre}>{`docker volume inspect mydata`}</pre>

        <h3>Remove unused volumes</h3>
        <pre style={pre}>{`docker volume prune`}</pre>
      </section>

      {/* NAMED VOLUMES IN COMPOSE */}
      <section>
        <h2>7️⃣ Volumes in Docker Compose</h2>

        <h3>Example compose file</h3>
        <pre style={pre}>
{`version: "3.9"
services:
  db:
    image: mysql:8
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:`}
        </pre>

        <p>Compose automatically manages the volume lifecycle.</p>
      </section>

      {/* MULTI-HOST STORAGE */}
      <section>
        <h2>8️⃣ Multi-Host Storage (NFS, GlusterFS, CephFS)</h2>

        <img
          src={NFSImg}
          alt="nfs storage"
          style={{ width: "100%", borderRadius: 10, margin: "14px 0" }}
        />

        <p>
          In Swarm or distributed environments, containers may run on different hosts. Therefore,
          multi-host volumes are needed.
        </p>

        <h3>📍 NFS Example</h3>
        <pre style={pre}>
{`docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=10.0.0.5,rw \
  --opt device=:/exports/db \
  nfs_data`}
        </pre>

        <div style={good}>NFS = simplest cross-node volume solution.</div>

        <h3>Other options</h3>
        <ul>
          <li>GlusterFS (distributed storage)</li>
          <li>CephFS (powerful, scalable)</li>
          <li>EFS / Azure Files / GCP Filestore (managed cloud solutions)</li>
        </ul>
      </section>

      {/* CSI DRIVERS */}
      <section>
        <h2>9️⃣ CSI-Style Volume Drivers</h2>

        <img src={CSIImg} alt="csi drivers" style={{ width: "100%", borderRadius: 10, margin: "14px 0" }} />

        <p>
          Docker supports 3rd-party storage plugins similar to Kubernetes CSI drivers. Examples:
        </p>

        <ul>
          <li>RexRay (EBS, EFS, S3)</li>
          <li>Flocker</li>
          <li>Azure Docker Volume Plugin</li>
          <li>Portworx</li>
        </ul>

        <h3>Example (RexRay EBS)</h3>
        <pre style={pre}>
{`docker volume create --driver rexray/ebs --name db_ebs --opt size=20`}
        </pre>
      </section>

      {/* BACKUPS */}
      <section>
        <h2>🔟 Backups & Restore (Volumes)</h2>

        <h3>Backup</h3>
        <pre style={pre}>
{`docker run --rm -v mydata:/data -v $(pwd):/backup busybox \
  tar czf /backup/mydata.tar.gz -C /data .`}
        </pre>

        <h3>Restore</h3>
        <pre style={pre}>
{`docker run --rm -v mydata:/data -v $(pwd):/backup busybox \
  tar xzf /backup/mydata.tar.gz -C /data`}
        </pre>

        <div style={note}>For databases, ALWAYS stop container or use DB-specific backup tools.</div>
      </section>

      {/* VOLUME PERFORMANCE */}
      <section>
        <h2>1️⃣1️⃣ Volume Performance Optimization</h2>

        <ul>
          <li>Prefer volumes over bind mounts for database files</li>
          <li>Use SSD disks for write-heavy workloads</li>
          <li>Avoid overlay2 for DB data → use direct volumes</li>
          <li>Limit container logging to avoid filling disks</li>
          <li>Use tmpfs for sensitive, temporary data</li>
        </ul>
      </section>

      {/* STORAGE CLEANUP */}
      <section>
        <h2>1️⃣2️⃣ Cleaning Up Storage (Safe GC)</h2>

        <h3>Remove stopped containers</h3>
        <pre style={pre}>{`docker container prune`}</pre>

        <h3>Remove dangling images</h3>
        <pre style={pre}>{`docker image prune -a`}</pre>

        <h3>Remove unused volumes</h3>
        <pre style={pre}>{`docker volume prune`}</pre>

        <div style={warn}>Do NOT delete volumes linked to running databases.</div>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 40, marginBottom: 60 }}>
        <h2>✔ Conclusion</h2>

        <p>
          Docker storage is a massive topic. After this lesson, you understand volumes, bind mounts,
          tmpfs, overlay2, distributed volumes, backups, tuning, and storage drivers — everything needed
          to build reliable stateful containerized apps.
        </p>

        <div style={blueBox}>
          Next: **Lesson 15 — Docker Logging System Masterclass**  
          Say: <strong>“Lesson 15 Start”</strong>
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

const note = {
  background: "#fff7e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #f4b400",
  marginBottom: 16
};

const blueBox = {
  background: "#e8f7ff",
  padding: 12,
  borderRadius: 8,
  borderLeft: "6px solid #007bff",
  marginBottom: 16
};
