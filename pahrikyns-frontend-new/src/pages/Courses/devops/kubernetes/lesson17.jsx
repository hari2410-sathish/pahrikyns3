export const meta = {
  title: "Kubernetes Lesson 17",
  description: "kubectl apply, get, delete, namespace usage & resource understanding.",
  difficulty: "Advanced",
  duration: "16 min",
  tags: ['kubernetes','kubectl'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson17() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 17</h1>

      <h2>Apply Resources</h2>
      <pre>{`kubectl apply -f deployment.yaml`}</pre>

      <h2>Get Resources</h2>
      <pre>{`kubectl get pods`}</pre>
      <pre>{`kubectl get svc`}</pre>
      <pre>{`kubectl get ns`}</pre>

      <h2>Delete Resources</h2>
      <pre>{`kubectl delete pod <pod-name>`}</pre>

      <h2>Create Namespace</h2>
      <pre>{`kubectl create namespace myspace`}</pre>

      <h2>Use Namespace</h2>
      <pre>{`kubectl get pods -n myspace`}</pre>
    </div>
  );
}

Lesson17.displayName = "KUBERNETES Lesson 17 – Full Content";
export default Lesson17;
