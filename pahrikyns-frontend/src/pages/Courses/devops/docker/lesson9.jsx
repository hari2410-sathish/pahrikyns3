export const meta = {
  title: "Docker Lesson 9",
  description:
    "Deep dive into Docker storage: overlay2 internals, layers, CoW, volumes, bind mounts, tmpfs, copy-on-write, performance tuning, storage drivers and real production patterns.",
  difficulty: "Advanced",
  duration: "90–120 min",
  tags: ["docker", "storage", "overlay2", "volumes"],
  updated: "2025-11-30",
  thumbnail: ""
};

// Image imports (optional)
import Overlay2Img from "../../../../assets/docker/overlay2.png";
import VolumesImg from "../../../../assets/docker/volumes.png";

export default function Lesson9() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 28, maxWidth: 1100, margin: "auto", lineHeight: 1.8, fontSize: 17 }}>

      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 9 — Storage Deep Dive</h1>

      <p>
        Docker storage is a combination of union filesystems, layered images, copy-on-write (CoW), writable
        container layers, and persistent volumes. Understanding this is critical for performance, debugging,
        data persistence, backups, and secure production setups.
      </p>

      <div style={info}>
        You will learn <strong>overlay2 internals, volumes, bind mounts, tmpfs, performance tuning, layer caching,
        disk cleanup, GC, and real-world data storage architecture</strong>.
      </div>

      {/* ------------------------------------------------------------
         1. What storage driver does Docker use?
      ------------------------------------------------------------ */}
      <h2>1️⃣ Docker Storage Drivers (overlay2 by default)</h2>

      <p>
        Docker supports multiple storage drivers but on modern Linux systems the default and recommended one is:
      </p>

      <div style={highlight}>✔ overlay2 (fastest, stable, production-ready)</div>

      <pre style={pre}>
{`docker info | grep Storage`}
      </pre>

      <p>Other drivers (rarely used now): aufs, btrfs, zfs, devicemapper.</p>

      {/* ------------------------------------------------------------
         2. How Docker Images Work (Layers)
      ------------------------------------------------------------ */}
      <h2>2️⃣ Docker Image Layers — The Foundation</h2>

      <p>
        Docker images are built with <strong>immutable read-only layers</strong>.  
        Each Dockerfile instruction creates one layer:
      </p>

      <ul>
        <li>FROM → base layer</li>
        <li>COPY / ADD → filesystem layers</li>
        <li>RUN → commands become layers</li>
        <li>CMD / ENTRYPOINT → metadata only</li>
      </ul>

      <pre style={pre}>
{`docker history nginx`}
      </pre>

      <h3>Key rule:</h3>
      <div style={note}>
        Layers are <strong>shared</strong> across containers → saves space & improves speed.
      </div>

      {/* ------------------------------------------------------------
         3. Container Writable Layer (COW)
      ------------------------------------------------------------ */}
      <h2>3️⃣ Container Writable Layer (Copy-on-Write)</h2>

      <p>
        When a container modifies a file from the image, the storage driver creates a <strong>copy</strong> in the
        writable layer. This is the Copy-on-Write (CoW) mechanism.
      </p>

      <pre style={ascii}>
{`
Read-only Image Layers
        ↓
Container Writable Layer (CoW)
`}
      </pre>

      <p>
        If the container deletes a file, it's "masked" in writable layer, not removed from the image.
      </p>

      <div style={warn}>
        ⚠ Writable layer should NOT store persistent data → it disappears when container is deleted.
      </div>

      {/* ------------------------------------------------------------
         4. overlay2 Deep Internals
      ------------------------------------------------------------ */}
      <h2>4️⃣ overlay2 Filesystem Internals</h2>

      <p>
        overlay2 uses three key directories:
      </p>

      <ul>
        <li><strong>lowerdir</strong> — image layers (read-only)</li>
        <li><strong>upperdir</strong> — container writable layer</li>
        <li><strong>workdir</strong> — internal workspace</li>
      </ul>

      <pre style={pre}>
{`/var/lib/docker/overlay2/<id>/lower
/var/lib/docker/overlay2/<id>/upper
/var/lib/docker/overlay2/<id>/merged`}
      </pre>

      <h3>merged = lower + upper overlayed together</h3>

      <pre style={ascii}>
{`
LOWER (image layers)
 + UPPER (container writes)
 = MERGED (actual view inside container)
`}
      </pre>

      <div style={note}>
        overlay2 is fast for reads but slow for heavy write workloads → use volumes for databases.
      </div>

      {/* ------------------------------------------------------------
         5. Volumes — Recommended for persistent data
      ------------------------------------------------------------ */}
      <h2>5️⃣ Volumes (Docker-managed persistent data)</h2>

      <p>
        Volumes live under:
      </p>

      <pre style={pre}>{`/var/lib/docker/volumes/<name>/_data`}</pre>

      <p>
        Volumes bypass the writable layer → optimal for performance & persistence.
      </p>

      <h3>Create a volume</h3>
      <pre style={pre}>{`docker volume create data_volume`}</pre>

      <h3>Use in a container</h3>
      <pre style={pre}>
{`docker run -v data_volume:/var/lib/mysql mysql`}
      </pre>

      <p>Volumes survive container deletion.</p>

      <div style={good}>
        ✔ Always use volumes for databases: MySQL, MongoDB, PostgreSQL, Redis, etc.
      </div>

      {/* ------------------------------------------------------------
         6. Bind Mounts — Mount local machine paths
      ------------------------------------------------------------ */}
      <h2>6️⃣ Bind Mounts — Host Path → Container Path</h2>

      <p>Used for development, exposing host files inside containers.</p>

      <pre style={pre}>
{`docker run -v $(pwd)/src:/app/src node:18`}
      </pre>

      <h3>Pros:</h3>
      <ul>
        <li>Live reload during development</li>
        <li>Full host filesystem access</li>
      </ul>

      <h3>Cons:</h3>
      <div style={warn}>
        ⚠ Security risk (container can modify host files)  
        ⚠ Not portable  
        ⚠ Slower on Mac/Windows due to virtualization
      </div>

      {/* ------------------------------------------------------------
         7. tmpfs Mounts — Fast in-memory storage
      ------------------------------------------------------------ */}
      <h2>7️⃣ tmpfs — RAM-based ephemeral filesystem</h2>

      <pre style={pre}>
{`docker run --tmpfs /run:rw,size=64m nginx`}
      </pre>

      <p>Used for:</p>

      <ul>
        <li>Secrets</li>
        <li>Caches</li>
        <li>Speed-critical temp files</li>
      </ul>

      <div style={good}>✔ tmpfs = fastest storage option</div>

      {/* ------------------------------------------------------------
         8. Where does Docker store EVERYTHING?
      ------------------------------------------------------------ */}
      <h2>8️⃣ Important Docker Directories</h2>

      <pre style={pre}>
{`/var/lib/docker/overlay2  → images & container layers
/var/lib/docker/volumes    → volumes
/var/lib/docker/containers → logs, configs
/var/lib/docker/buildkit   → build cache`}
      </pre>

      <div style={warn}>NEVER manually delete files inside /var/lib/docker — use docker CLI.</div>

      {/* ------------------------------------------------------------
         9. Backups (Volumes + Images)
      ------------------------------------------------------------ */}
      <h2>9️⃣ Backups & Restore Strategies</h2>

      <h3>Backup a volume</h3>
      <pre style={pre}>
{`docker run --rm -v data_volume:/data -v $(pwd):/backup \
  ubuntu tar cvf /backup/data_backup.tar /data`}
      </pre>

      <h3>Restore volume</h3>
      <pre style={pre}>
{`docker run --rm -v data_volume:/data -v $(pwd):/backup \
  ubuntu tar xvf /backup/data_backup.tar -C /`}
      </pre>

      {/* ------------------------------------------------------------
         10. Performance Tuning
      ------------------------------------------------------------ */}
      <h2>🔟 Storage Performance Tuning</h2>

      <h3>DO NOT use container writable layer for heavy writes.</h3>

      <ul>
        <li>Use volumes for DBs</li>
        <li>Use tmpfs for caching</li>
        <li>Limit logging (JSON logs are slow)</li>
        <li>Use SSD for /var/lib/docker</li>
      </ul>

      <h3>Optimize image builds:</h3>

      <ul>
        <li>Use multi-stage builds</li>
        <li>Minimize layers</li>
        <li>Keep image size small</li>
        <li>Use <code>--cache-from</code> in CI pipelines</li>
      </ul>

      {/* ------------------------------------------------------------
         11. Cleanup & Disk Management
      ------------------------------------------------------------ */}
      <h2>1️⃣1️⃣ Cleanup & Docker Disk Management</h2>

      <pre style={pre}>
{`docker system df     # Show disk usage
docker system prune   # Remove unused containers/networks
docker image prune    # Remove unused images
docker volume prune   # Remove unused volumes`}
      </pre>

      <div style={warn}>⚠ Always inspect before prune on production servers.</div>

      {/* ------------------------------------------------------------
         12. Real-world Storage Architecture Patterns
      ------------------------------------------------------------ */}
      <h2>1️⃣2️⃣ Real-World Production Patterns</h2>

      <h3>Pattern A: Database + Named Volume</h3>
      <pre style={ascii}>
{`
MySQL
  └── volume: mysql_data (stored in /var/lib/docker/volumes)
`}
      </pre>

      <h3>Pattern B: App + Bind Mount (DEV only)</h3>
      <pre style={ascii}>
{`
/src (host) ─────→ /app/src (container)
`}
      </pre>

      <h3>Pattern C: Read-Only Root FS</h3>
      <pre style={pre}>
{`docker run --read-only --tmpfs /tmp myapp`}
      </pre>

      <div style={good}>✔ Enhances security & stability.</div>

      {/* ------------------------------------------------------------
         13. Mini Project
      ------------------------------------------------------------ */}
      <h2>1️⃣3️⃣ Mini Project — Storage Optimized App</h2>

      <ol>
        <li>Use multi-stage build to create a tiny production image</li>
        <li>Mount DB on external named volume</li>
        <li>Mount logs on tmpfs</li>
        <li>Make root filesystem read-only</li>
        <li>Benchmark performance vs baseline</li>
      </ol>

      {/* ------------------------------------------------------------
         Conclusion
      ------------------------------------------------------------ */}
      <h2>✔ Conclusion</h2>

      <p>
        You now understand Docker storage at expert level: overlay2 internals, volumes, bind mounts, tmpfs,  
        caching, performance tuning, and disk management.
      </p>

      <div style={info}>
        Ready for **Lesson 10 (Docker Swarm Deep Dive)**?  
        Say: <strong>“Lesson 10 Start”</strong>.
      </div>

    </div>
  );
}

// Styles
const pre = {
  background: "#1f1f1f",
  color: "white",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
  marginBottom: 20
};

const ascii = {
  background: "#fafafa",
  padding: 14,
  borderRadius: 8,
  whiteSpace: "pre-wrap",
  fontFamily: "monospace",
  marginBottom: 20
};

const info = {
  background: "#e8f7ff",
  padding: 14,
  borderRadius: 8,
  borderLeft: "6px solid #007bff",
  margin: "20px 0"
};

const note = {
  background: "#fff7e6",
  padding: 14,
  borderRadius: 8,
  borderLeft: "6px solid #f4b400",
  margin: "20px 0"
};

const warn = {
  background: "#ffe6e6",
  padding: 14,
  borderRadius: 8,
  borderLeft: "6px solid #ff4a4a",
  margin: "20px 0"
};

const good = {
  background: "#e6ffe6",
  padding: 14,
  borderRadius: 8,
  borderLeft: "6px solid #37c837",
  margin: "20px 0"
};
