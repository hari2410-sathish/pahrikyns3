export const meta = {
  title: "Kubernetes Lesson 16",
  description: "Hands-on creation of pods, nodes, deployments, and applying YAML files.",
  difficulty: "Advanced",
  duration: "18 min",
  tags: ['kubernetes','hands-on','deployments'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson16() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 16</h1>

      <h2>Create Pod (YAML)</h2>
      <pre>
{`apiVersion: v1
kind: Pod
metadata:
  name: demo-pod
spec:
  containers:
    - name: web
      image: nginx`}
      </pre>

      <h2>Apply Configuration</h2>
      <pre>{`kubectl apply -f pod.yaml`}</pre>

      <h2>Create Deployment</h2>
      <pre>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx`}
      </pre>

      <h2>Check Nodes</h2>
      <pre>{`kubectl get nodes`}</pre>

      <p>This lesson is complete hands-on practice.</p>
    </div>
  );
}

Lesson16.displayName = "KUBERNETES Lesson 16 – Full Content";
export default Lesson16;
