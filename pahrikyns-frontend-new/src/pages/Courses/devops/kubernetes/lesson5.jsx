export const meta = {
  title: "Kubernetes Lesson 5",
  description: "Deployments, updates, rollbacks, and real-time rollout management.",
  difficulty: "Beginner",
  duration: "12 min",
  tags: ['kubernetes','deployment'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson5() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 5</h1>

      <h2>What is a Deployment?</h2>
      <p>Deployment manages ReplicaSets and provides rolling updates.</p>

      <h2>Deployment Example</h2>
      <pre>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
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

      <h2>Rolling Update</h2>
      <pre>{`kubectl set image deployment/web nginx=nginx:latest`}</pre>

      <h2>Rollback</h2>
      <pre>{`kubectl rollout undo deployment/web`}</pre>
    </div>
  );
}

Lesson5.displayName = "KUBERNETES Lesson 5 – Full Content";
export default Lesson5;
