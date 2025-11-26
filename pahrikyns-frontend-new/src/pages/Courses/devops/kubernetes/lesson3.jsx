export const meta = {
  title: "Kubernetes Lesson 3",
  description: "Kubernetes master and worker components explained.",
  difficulty: "Beginner",
  duration: "11 min",
  tags: ['kubernetes','architecture'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson3() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 3</h1>

      <h2>Main Components</h2>
      <ul>
        <li><strong>Control Plane</strong></li>
        <li><strong>Worker Nodes</strong></li>
      </ul>

      <h2>Control Plane Components</h2>
      <ul>
        <li><strong>API Server:</strong> Entry point for all commands</li>
        <li><strong>Scheduler:</strong> Decides where pods run</li>
        <li><strong>Controller Manager:</strong> Ensures desired state</li>
        <li><strong>ETCD:</strong> Key-value database</li>
      </ul>

      <h2>Worker Node Components</h2>
      <ul>
        <li><strong>Kubelet:</strong> Runs pods</li>
        <li><strong>Kube-proxy:</strong> Network routing</li>
        <li><strong>Container Runtime:</strong> Docker/Containerd</li>
      </ul>
    </div>
  );
}

Lesson3.displayName = "KUBERNETES Lesson 3 – Full Content";
export default Lesson3;
