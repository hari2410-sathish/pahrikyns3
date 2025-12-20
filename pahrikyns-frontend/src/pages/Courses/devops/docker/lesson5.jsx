export const meta = {
  title: "Docker Lesson 5",
  description:
    "Docker Networking Ultra Masterclass: Bridge networking, veth pairs, iptables/NAT, host mode, macvlan, ipvlan, overlay networks, swarm routing mesh, DNS, service discovery, debugging, packet flow, routing, tcpdump, performance tuning, and real-world architectures.",
  difficulty: "Advanced",
  duration: "120–150 min",
  tags: ["docker", "networking", "bridge", "macvlan", "overlay", "iptables", "namespace"],
  updated: "2025-11-30",
  thumbnail: ""
};

export default function Lesson5() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 30, maxWidth: 1100, margin: "auto", lineHeight: 1.75, fontSize: 17 }}>

      <h1 style={{ fontSize: 38, fontWeight: 800 }}>Docker – Lesson 5: Networking Ultra Masterclass</h1>

      <p>
        This is the deepest Docker networking lesson on the internet: covering Linux network namespaces, veth pairs,
        bridge mode internals, iptables NAT, routing tables, host mode, macvlan, ipvlan, overlay networks,
        Docker DNS, service discovery, port mapping, routing mesh, network debugging with tcpdump/nsenter,
        and enterprise-grade architectures.
      </p>

      {/* ------------------------------------------------------------
        1. NETWORK NAMESPACE FUNDAMENTALS
      ------------------------------------------------------------ */}
      <h2>1️⃣ Network Namespaces — Where the magic starts</h2>

      <p>
        Every container gets its own <strong>network namespace</strong>:
      </p>

      <ul>
        <li>own IP stack</li>
        <li>own routing table</li>
        <li>own firewall rules</li>
        <li>own interfaces (eth0 inside container)</li>
      </ul>

      <pre style={pre}>
{`# enter a container's network namespace
nsenter --target $(docker inspect -f '{{.State.Pid}}' web) --net bash
ip addr
ip route`}
      </pre>

      <p>
        Inside the container, <code>eth0</code> is actually part of a <strong>veth pair</strong>.
      </p>

      {/* ------------------------------------------------------------
        2. VETH PAIRS — HOW PACKETS TRAVEL
      ------------------------------------------------------------ */}
      <h2>2️⃣ Veth Pairs — The container “network cable”</h2>

      <pre style={ascii}>
{`
[container eth0] <---> [vethXYZ] ---- attached to ---- docker0 bridge ----> host network
`}
      </pre>

      <p>
        Docker creates:
      </p>

      <ul>
        <li><code>vethABC</code> inside container → shows as <code>eth0</code></li>
        <li><code>vethXYZ</code> on host → attached to bridge</li>
      </ul>

      <h3>Check veth interfaces:</h3>
      <pre style={pre}>
{`ip link
brctl show
docker network inspect bridge`}
      </pre>

      {/* ------------------------------------------------------------
        3. BRIDGE MODE — MOST IMPORTANT MODE
      ------------------------------------------------------------ */}
      <h2>3️⃣ Bridge Mode Internals (Default Networking)</h2>

      <p>
        Default Docker network = <strong>bridge</strong> (docker0).  
        This uses:
      </p>

      <ul>
        <li><strong>veth pairs</strong> for connectivity</li>
        <li><strong>iptables</strong> for NAT (MASQUERADE)</li>
        <li><strong>docker-proxy</strong> or <strong>iptables DNAT</strong> for port mapping</li>
      </ul>

      <h3>Inspect bridge:</h3>
      <pre style={pre}>
{`docker network inspect bridge`}
      </pre>

      <h3>Bridge Example</h3>
      <pre style={ascii}>
{`
Container ─── eth0 ─── vethX ── docker0 bridge ── host eth0 ── Internet
`}
      </pre>

      <h3>iptables NAT for outgoing traffic</h3>
      <pre style={pre}>
{`iptables -t nat -L -n | grep MASQUERADE`}
      </pre>

      {/* ------------------------------------------------------------
        4. PORT MAPPING
      ------------------------------------------------------------ */}
      <h2>4️⃣ Port Mapping in Docker (DNAT Explained)</h2>

      <pre style={pre}>
{`docker run -p 8080:80 nginx`}
      </pre>

      <p>
        This creates:
      </p>

      <ul>
        <li>iptables <strong>DNAT</strong> rule: host:8080 → container:80</li>
        <li>or docker-proxy (old method)</li>
      </ul>

      <pre style={pre}>
{`iptables -t nat -L -n | grep 8080`}
      </pre>

      <h3>Packet flow diagram</h3>
      <pre style={ascii}>
{`
client -> host:8080 -> DNAT -> containerIP:80 -> response -> SNAT -> client
`}
      </pre>

      {/* ------------------------------------------------------------
        5. HOST NETWORK MODE
      ------------------------------------------------------------ */}
      <h2>5️⃣ Host Network Mode — No Isolation</h2>

      <pre style={pre}>
{`docker run --network host nginx`}
      </pre>

      <p>
        Container shares:
      </p>

      <ul>
        <li>host network stack</li>
        <li>host routing table</li>
        <li>host firewall</li>
        <li>no port mapping required</li>
      </ul>

      <p>
        Use cases:
      </p>
      <ul>
        <li>High-performance networking</li>
        <li>Prometheus node exporters</li>
        <li>Load balancers (HAProxy, Traefik)</li>
      </ul>

      {/* ------------------------------------------------------------
        6. MACVLAN — REAL LAN IP
      ------------------------------------------------------------ */}
      <h2>6️⃣ Macvlan — Give Containers a Real LAN IP</h2>

      <p>
        Macvlan bypasses docker0 bridge and gives containers their own IP on your LAN.
      </p>

      <h3>Create macvlan network:</h3>

      <pre style={pre}>
{`docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 pubnet`}
      </pre>

      <h3>Run container on LAN:</h3>
      <pre style={pre}>
{`docker run --network pubnet --ip 192.168.1.50 nginx`}
      </pre>

      <h3>Diagram</h3>
      <pre style={ascii}>
{`
Container (192.168.1.50)
   |
   |-- macvlan virtual NIC
   |
Host eth0 (192.168.1.x)
`}
      </pre>

      <p>
        Limitation: container cannot reach host unless using macvlan + another interface.
      </p>

      {/* ------------------------------------------------------------
        7. IPVLAN — More Efficient Sibling of Macvlan
      ------------------------------------------------------------ */}
      <h2>7️⃣ IPVLAN Mode (L2 & L3)</h2>

      <p>IPVLAN advantages:</p>

      <ul>
        <li>No MAC flooding</li>
        <li>Better for enterprise switches</li>
        <li>L3 mode allows routing-style connectivity</li>
      </ul>

      <pre style={pre}>
{`docker network create -d ipvlan \
  --subnet=10.0.0.0/24 \
  -o parent=eth0 l3net`}
      </pre>

      <p>Works better in cloud or VPS networks.</p>

      {/* ------------------------------------------------------------
        8. OVERLAY NETWORK — MULTI-HOST (Swarm)
      ------------------------------------------------------------ */}
      <h2>8️⃣ Overlay Networks (Multi-host Clustering)</h2>

      <p>
        Used by Docker Swarm & multi-host networking. Containers communicate across different machines.
      </p>

      <pre style={pre}>
{`docker network create -d overlay projnet`}
      </pre>

      <h3>Features:</h3>

      <ul>
        <li>VXLAN encapsulation</li>
        <li>Distributed key-value store</li>
        <li>Service-to-service encryption optional</li>
      </ul>

      <h3>Traffic flow diagram</h3>
      <pre style={ascii}>
{`
container A (node1) --- Overlay/VXLAN ---> container B (node2)
`}
      </pre>

      {/* ------------------------------------------------------------
        9. ROUTING MESH (Swarm Service Load Balancing)
      ------------------------------------------------------------ */}
      <h2>9️⃣ Swarm Routing Mesh</h2>

      <p>
        Any node receives traffic → forwards to correct node running container.
      </p>

      <pre style={ascii}>
{`
client -> node1:80 -> swarm routing -> node3 container
`}
      </pre>

      {/* ------------------------------------------------------------
        10. DOCKER DNS
      ------------------------------------------------------------ */}
      <h2>🔟 Docker DNS & Service Discovery</h2>

      <p>
        Docker runs an internal DNS server (127.0.0.11).
      </p>

      <pre style={pre}>
{`docker exec -it web cat /etc/resolv.conf`}
      </pre>

      <p>
        Containers can resolve each other by name:
      </p>

      <pre style={pre}>
{`ping web2`}
      </pre>

      {/* ------------------------------------------------------------
        11. ROUTING TABLES INSIDE CONTAINERS
      ------------------------------------------------------------ */}
      <h2>1️⃣1️⃣ Routing Tables</h2>

      <pre style={pre}>
{`docker exec -it c ip route`}
      </pre>

      <pre style={ascii}>
{`
default via 172.17.0.1
172.17.0.0/16 dev eth0
`}
      </pre>

      <p>172.17.0.1 = docker0 gateway.</p>

      {/* ------------------------------------------------------------
        12. FULL PACKET FLOW
      ------------------------------------------------------------ */}
      <h2>1️⃣2️⃣ Full Packet Flow (EXTREMELY IMPORTANT)</h2>

      <pre style={ascii}>
{`
client
  ↓
host:8080
  ↓ DNAT
containerIP:80
  ↓ Response
SNAT (MASQUERADE)
  ↓
client
`}
      </pre>

      <p>SNAT ensures response goes back correct path.</p>

      {/* ------------------------------------------------------------
        13. FIREWALL & SECURITY
      ------------------------------------------------------------ */}
      <h2>1️⃣3️⃣ Firewall, Security, Isolation</h2>

      <p>
        Docker modifies:
      </p>

      <ul>
        <li>iptables (filter, nat tables)</li>
        <li>conntrack</li>
        <li>kernel netfilter modules</li>
      </ul>

      <h3>Block outgoing traffic from container:</h3>
      <pre style={pre}>
{`iptables -A FORWARD -s 172.17.0.2 -j DROP`}
      </pre>

      {/* ------------------------------------------------------------
        14. DEBUGGING NETWORKS
      ------------------------------------------------------------ */}
      <h2>1️⃣4️⃣ Network Debugging Tools</h2>

      <h3>1) tcpdump</h3>
      <pre style={pre}>
{`docker exec -it c tcpdump -i eth0`}
      </pre>

      <h3>2) nsenter</h3>
      <pre style={pre}>
{`nsenter --target $(docker inspect -f '{{.State.Pid}}' c) --net bash`}
      </pre>

      <h3>3) View connections</h3>
      <pre style={pre}>
{`netstat -tulpn
ss -tulpn`}
      </pre>

      <h3>4) Trace packets</h3>
      <pre style={pre}>
{`traceroute google.com`}
      </pre>

      {/* ------------------------------------------------------------
        15. PRACTICAL ENTERPRISE ARCHITECTURES
      ------------------------------------------------------------ */}
      <h2>1️⃣5️⃣ Real-World Production Architectures</h2>

      <h3>Pattern A: High-performance host network</h3>
      <pre style={ascii}>
{`
Traefik/HAProxy (host-mode)
    |
 app-container (bridge-mode)
    |
database (bridge or host)
`}
      </pre>

      <h3>Pattern B: Macvlan IoT cluster</h3>
      <pre style={ascii}>
{`
Containers → LAN IPs → Talk directly to routers/sensors
`}
      </pre>

      <h3>Pattern C: Multi-host overlay microservices</h3>
      <pre style={ascii}>
{`
serviceA (node1) --- overlay ---> serviceB (node5)
`}
      </pre>

      {/* ------------------------------------------------------------
        16. HANDS-ON LABS
      ------------------------------------------------------------ */}
      <h2>1️⃣6️⃣ Hands-On Labs</h2>

      <ol>
        <li>Create custom bridge with static subnet & attach containers</li>
        <li>Use tcpdump to capture HTTP packets inside a container</li>
        <li>Create macvlan network; give container real LAN IP</li>
        <li>Create overlay network across 2 nodes (with swarm init)</li>
      </ol>

      {/* ------------------------------------------------------------
        17. CHEATSHEET
      ------------------------------------------------------------ */}
      <h2>1️⃣7️⃣ Networking Cheatsheet</h2>

      <pre style={pre}>
{`# list networks
docker network ls

# inspect network
docker network inspect net

# connect container to network
docker network connect net c

# disconnect
docker network disconnect net c

# create networks
docker network create -d bridge mynet
docker network create -d macvlan pubnet
docker network create -d overlay sw
`}
      </pre>

      {/* ------------------------------------------------------------
        18. CONCLUSION
      ------------------------------------------------------------ */}
      <h2>✔ Conclusion</h2>

      <p>
        You now understand Docker networking at a level most DevOps engineers never reach.  
        This lesson covered bridge, host, macvlan, ipvlan, overlay, routing, iptables, DNS, debugging,
        performance, packet flow, and real distributed systems.
      </p>

      <p>Next: **Lesson 6 – Docker Compose Mastery**?</p>

    </div>
  );
}

const pre = {
  background: "#1f1f1f",
  color: "#fff",
  padding: 14,
  borderRadius: 8,
  overflowX: "auto",
};

const ascii = {
  background: "#fafafa",
  padding: 14,
  whiteSpace: "pre-wrap",
  fontFamily: "monospace",
  borderRadius: 8,
};
