export const meta = {
  title: "Docker Lesson 4",
  description:
    "Containers Masterclass: lifecycle, deep internals (namespaces, cgroups, runc, containerd), processes, signals, entrypoint vs CMD, debugging, networking (bridge, host, macvlan, overlay), volumes, logs, exec, healthchecks, troubleshooting.",
  difficulty: "Advanced",
  duration: "120 min",
  tags: ["docker", "containers", "namespaces", "cgroups", "networking", "debugging"],
  updated: "2025-11-30",
  thumbnail: ""
};
export default function Lesson4() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 30, lineHeight: 1.75, fontSize: 17, maxWidth: 1100, margin: "auto" }}>

      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Docker Lesson 4 – Containers Ultra Masterclass</h1>

      <p>
        This is the deepest, production-grade container lesson you will ever read. We go inside how containers 
        ACTUALLY work at OS-level using namespaces, cgroups, runc, containerd, how Docker spawns & manages them,
        how signals work, how entrypoint & CMD differ, debugging with nsenter / strace, container networking (bridge,
        host, macvlan, overlay), healthchecks, logs, volumes, zombie processes, PID 1, tini, and real-world troubleshooting.
      </p>

      {/* ===========================================================
          1. WHAT IS A CONTAINER? (REAL DEFINITION)
      ============================================================ */}
      <h2>1️⃣ What actually *is* a container?</h2>

      <p>
        A container = <strong>a normal Linux process</strong> running with:
      </p>

      <ul>
        <li><strong>Namespaces</strong> → isolation (PID, NET, MNT, IPC, UTS, USER)</li>
        <li><strong>Cgroups</strong> → resource limits (CPU, memory, I/O)</li>
        <li><strong>Union filesystem</strong> → read-only image + writable layer</li>
      </ul>

      <p>
        Docker ≠ virtualization. It's process isolation. A container does NOT have a kernel. It uses 
        **host kernel**.
      </p>

      <pre style={pre}>
{`# Show container processes on host
ps aux | grep container

# Show container namespaces
ls -l /proc/<PID>/ns`}
      </pre>

      {/* ===========================================================
          2. CONTAINER LIFECYCLE
      ============================================================ */}
      <h2>2️⃣ Container Lifecycle (create → start → stop → kill → rm)</h2>

      <pre style={pre}>
{`docker create    # create container from image but do NOT run
docker start      # start a stopped container
docker restart    # stop + start
docker stop       # send SIGTERM → graceful shutdown
docker kill       # SIGKILL force kill
docker rm         # remove container`}
      </pre>

      <p>
        <strong>Stop vs Kill:</strong>
      </p>

      <ul>
        <li><code>stop</code> → sends SIGTERM → app gets chance to close gracefully</li>
        <li><code>kill</code> → sends SIGKILL → immediate termination</li>
      </ul>

      <pre style={pre}>
{`docker run -d --name web nginx
docker stop web     # graceful
docker kill web     # force`}
      </pre>

      {/* ===========================================================
          3. ENTRYPOINT VS CMD — BIBLE EXPLANATION
      ============================================================ */}
      <h2>3️⃣ ENTRYPOINT vs CMD — REAL TRUTH</h2>

      <p>
        Dockerfile:
      </p>

      <ul>
        <li><strong>ENTRYPOINT</strong> → **always executed**, fixed command</li>
        <li><strong>CMD</strong> → default arguments to entrypoint</li>
      </ul>

      <p>Best pattern: ENTRYPOINT + CMD combo:</p>

      <pre style={pre}>
{`ENTRYPOINT ["python3"]
CMD ["app.py"]`}
      </pre>

      <p>
        Running:
      </p>
      <pre style={pre}>
{`docker run app            # runs: python3 app.py
docker run app test.py     # runs: python3 test.py`}
      </pre>

      <div style={note}>
        ENTRYPOINT = fixed  
        CMD = overridable
      </div>

      {/* ===========================================================
          4. PID 1, ZOMBIE REAPING, TINI
      ============================================================ */}
      <h2>4️⃣ PID 1 Problem, Zombies & Tini</h2>

      <p>
        In containers, your main app becomes **PID 1**, meaning:
      </p>

      <ul>
        <li>It must reap zombie child processes</li>
        <li>It must handle signals like SIGTERM</li>
        <li>Bad PID 1 = memory leaks + zombie accumulation</li>
      </ul>

      <p>Fix: use tini or dumb-init</p>

      <pre style={pre}>
{`docker run --init myapp`}
      </pre>

      <p>
        OR Dockerfile:
      </p>
      <pre style={pre}>
{`ENTRYPOINT ["/usr/bin/tini", "--"]`}
      </pre>

      {/* ===========================================================
          5. NAMESPACES EXPLAINED (DEEP)
      ============================================================ */}
      <h2>5️⃣ Namespaces — REAL Isolation</h2>

      <h3>Linux namespaces used by containers:</h3>

      <ol>
        <li><strong>PID namespace</strong> → process isolation</li>
        <li><strong>NET namespace</strong> → network stack separation</li>
        <li><strong>MNT namespace</strong> → mount points</li>
        <li><strong>IPC namespace</strong> → System V & POSIX IPC</li>
        <li><strong>UTS namespace</strong> → hostname isolation</li>
        <li><strong>USER namespace</strong> → UID/GID mapping</li>
      </ol>

      <pre style={pre}>
{`# Inspect namespace symlinks
ls -l /proc/<PID>/ns`}
      </pre>

      <h3>Enter container namespace manually:</h3>
      <pre style={pre}>
{`nsenter --target <PID> --pid --uts --ipc --net --mount bash`}
      </pre>

      {/* ===========================================================
          6. CGROUPS — LIMIT RESOURCES
      ============================================================ */}
      <h2>6️⃣ cgroups: CPU, RAM, I/O limits</h2>

      <pre style={pre}>
{`docker run -m 512m --cpus=1 busybox`}
      </pre>

      <p>
        Memory restrictions:
      </p>

      <pre style={pre}>
{`--memory=512m
--memory-swap=1g`}
      </pre>

      <p>
        CPU restrictions:
      </p>
      <pre style={pre}>
{`--cpus=0.5     # 50% CPU
--cpuset-cpus="0,1"`}
      </pre>

      {/* ===========================================================
          7. CONTAINER PROCESS MODEL
      ============================================================ */}
      <h2>7️⃣ Containers run only one process? NO.</h2>

      <p>
        Best practice: **1 main process per container**, but technically you can run more.
      </p>

      <p>
        But if main process dies → entire container stops.
      </p>

      {/* ===========================================================
          8. DOCKER INSPECT, EXEC, STATS
      ============================================================ */}
      <h2>8️⃣ Inspect, Exec, Top, Stats</h2>

      <pre style={pre}>
{`docker inspect container
docker exec -it container bash
docker top container
docker stats`}
      </pre>

      <p>
        Inspect returns JSON containing environment variables, mounts, networks, IPs, image layers, restart policy, etc.
      </p>

      {/* ===========================================================
          9. LOGS
      ============================================================ */}
      <h2>9️⃣ Logs system</h2>

      <pre style={pre}>
{`docker logs -f container`}
      </pre>

      <p>
        Docker uses log drivers:
      </p>

      <ul>
        <li>json-file (default)</li>
        <li>syslog</li>
        <li>fluentd</li>
        <li>journald</li>
        <li>awslogs</li>
      </ul>

      {/* ===========================================================
          🔥 10. HEALTHCHECKS
      ============================================================ */}
      <h2>🔟 Healthchecks</h2>

      <pre style={pre}>
{`HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl -f http://localhost/health || exit 1`}
      </pre>

      <pre style={pre}>
{`docker inspect container | grep Health`}
      </pre>

      {/* ===========================================================
          11. DEBUGGING — nsenter, strace, top
      ============================================================ */}
      <h2>1️⃣1️⃣ Debugging containers like a PRO</h2>

      <h3>Enter container namespaces:</h3>
      <pre style={pre}>
{`nsenter --target $(docker inspect -f '{{.State.Pid}}' c) --all bash`}
      </pre>

      <h3>Trace syscalls:</h3>
      <pre style={pre}>
{`strace -p <PID>`}
      </pre>

      <h3>Monitor live resource usage:</h3>
      <pre style={pre}>
{`docker stats
docker top container`}
      </pre>

      {/* ===========================================================
          12. DOCKER INTERNALS — containerd & runc
      ============================================================ */}
      <h2>1️⃣2️⃣ Docker Internals: containerd, runc, shim</h2>

      <p>
        Docker Engine architecture:
      </p>

      <ol>
        <li><strong>Docker CLI</strong></li>
        <li><strong>dockerd</strong></li>
        <li><strong>containerd</strong> (manages container lifecycle)</li>
        <li><strong>containerd-shim</strong> (keeps container running even if dockerd restarts)</li>
        <li><strong>runc</strong> (low-level OCI runtime; creates namespaces/cgroups)</li>
      </ol>

      <h3>Check runc binary:</h3>
      <pre style={pre}>
{`which runc`}
      </pre>

      {/* ===========================================================
          13. STORAGE — volumes, bind mounts
      ============================================================ */}
      <h2>1️⃣3️⃣ Storage Fundamentals</h2>

      <h3>Bind mount:</h3>
      <pre style={pre}>
{`docker run -v /host/path:/container/path app`}
      </pre>

      <h3>Named volume:</h3>
      <pre style={pre}>
{`docker volume create data
docker run -v data:/var/lib/mysql mysql`}
      </pre>

      {/* ===========================================================
          14. NETWORKING (BRIDGE / HOST / MACVLAN / OVERLAY)
      ============================================================ */}
      <h2>1️⃣4️⃣ Container Networking — REAL Mastery</h2>

      <h3>Bridge (default):</h3>
      <pre style={pre}>
{`docker network inspect bridge`}
      </pre>

      <h3>Host network:</h3>
      <pre style={pre}>
{`docker run --network host nginx`}
      </pre>

      <h3>Macvlan (assign real LAN IP):</h3>
      <pre style={pre}>
{`docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 pubnet`}
      </pre>

      <h3>Overlay (Swarm, multi-host):</h3>
      <pre style={pre}>
{`docker network create -d overlay mynet`}
      </pre>

      {/* ===========================================================
          15. PORT MAPPING
      ============================================================ */}
      <h2>1️⃣5️⃣ Port Mapping</h2>

      <pre style={pre}>
{`docker run -p 8080:80 nginx
(host:container)`}
      </pre>

      {/* ===========================================================
          16. DNS / SERVICE DISCOVERY
      ============================================================ */}
      <h2>1️⃣6️⃣ DNS inside container networks</h2>

      <p>Docker provides an internal DNS server (127.0.0.11)</p>

      <pre style={pre}>
{`docker exec -it c cat /etc/resolv.conf`}
      </pre>

      {/* ===========================================================
          17. TROUBLESHOOTING (REAL CASES)
      ============================================================ */}
      <h2>1️⃣7️⃣ Troubleshooting Containers</h2>

      <h3>1) Container exits instantly</h3>
      <pre style={pre}>
{`docker logs container`}
      </pre>

      <h3>2) Permission errors on mounts</h3>
      <pre style={pre}>
{`chmod 777 /host/path`}
      </pre>

      <h3>3) Container can't reach internet</h3>
      <pre style={pre}>
{`systemctl restart docker`}
      </pre>

      <h3>4) High CPU usage</h3>
      <pre style={pre}>
{`docker top container`}
      </pre>

      {/* ===========================================================
          18. REAL-WORLD PATTERNS
      ============================================================ */}
      <h2>1️⃣8️⃣ Real-world container patterns</h2>

      <ul>
        <li>Sidecar containers</li>
        <li>Init containers</li>
        <li>Healthcheck-based restarts</li>
        <li>Log-forwarder containers</li>
      </ul>

      {/* ===========================================================
          19. PRACTICE LABS
      ============================================================ */}
      <h2>1️⃣9️⃣ Hands-on Labs</h2>

      <ol>
        <li>Create your own pause/unpause containers</li>
        <li>Debug using nsenter</li>
        <li>Create macvlan and assign real LAN IP</li>
        <li>Limit CPU & RAM using cgroups flags</li>
      </ol>

      {/* ===========================================================
          20. CONCLUSION
      ============================================================ */}
      <h2>✔ Conclusion</h2>

      <p>
        You now know EXACTLY how containers work at OS-level.  
        Next lesson will be Docker Networking MAX (Lesson 5) or Docker Compose.
      </p>

    </div>
  );
}

const pre = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 14,
  overflowX: "auto",
  borderRadius: 8
};

const note = {
  background: "#fff7e6",
  padding: 12,
  borderRadius: 8,
  borderLeft: "5px solid #f4b400",
  marginTop: 12
};
