export const meta = {
  title: "Kubernetes Lesson 13",
  description: "Kubernetes networking fundamentals including CNI, Pod IPs, Services routing.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['kubernetes','networking'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson13() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 13</h1>

      <h2>Container Network Interface (CNI)</h2>
      <p>CNI plugins provide networking to Pods.</p>

      <h3>Popular CNI Plugins</h3>
      <ul>
        <li>Calico</li>
        <li>Flannel</li>
        <li>Weave</li>
        <li>Cilium</li>
      </ul>

      <h2>Pod-to-Pod Communication</h2>
      <p>
        Every Pod gets its own IP. Kubernetes ensures all Pods can reach  
        each other across nodes.
      </p>

      <h2>Node to Pod Communication</h2>
      <p>Handled by kube-proxy + iptables rules.</p>

      <h2>Check Network</h2>
      <pre>{`kubectl get pods -o wide`}</pre>
    </div>
  );
}

Lesson13.displayName = "KUBERNETES Lesson 13 – Full Content";
export default Lesson13;
