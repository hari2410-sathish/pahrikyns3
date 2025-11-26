export const meta = {
  title: "Kubernetes Lesson 9",
  description: "All installation methods: Kops, Minikube, Kubeadm explained.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['kubernetes','installation'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson9() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 9</h1>

      <h2>Popular Installation Methods</h2>
      <ul>
        <li><strong>Minikube:</strong> Single-node cluster (local development)</li>
        <li><strong>Kubeadm:</strong> Production cluster manual setup</li>
        <li><strong>Kops:</strong> Creates AWS Kubernetes clusters</li>
      </ul>

      <h2>Install kubectl</h2>
      <pre>
{`curl -LO "https://dl.k8s.io/release/v1.25.0/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/`}
      </pre>

      <h2>Install Minikube</h2>
      <pre>
{`curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube`}
      </pre>

      <h2>Start Minikube</h2>
      <pre>{`minikube start`}</pre>
    </div>
  );
}

Lesson9.displayName = "KUBERNETES Lesson 9 – Full Content";
export default Lesson9;
