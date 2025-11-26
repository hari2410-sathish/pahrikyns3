export const meta = {
  title: "Kubernetes Lesson 6",
  description: "All service types — ClusterIP, NodePort, LoadBalancer with examples.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['kubernetes','service'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson6() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 6</h1>

      <h2>What is a Service?</h2>
      <p>
        A Kubernetes Service exposes Pods over a stable network identity.
        Pod IP changes → Service IP does not.
      </p>

      <h2>Service Types</h2>
      <ul>
        <li><strong>ClusterIP</strong> (default) – internal communication</li>
        <li><strong>NodePort</strong> – exposes service on node port</li>
        <li><strong>LoadBalancer</strong> – created in cloud providers</li>
      </ul>

      <h2>NodePort Example</h2>
      <pre>
{`apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80
      nodePort: 30080`}
      </pre>

      <h2>List Services</h2>
      <pre>{`kubectl get svc`}</pre>
    </div>
  );
}

Lesson6.displayName = "KUBERNETES Lesson 6 – Full Content";
export default Lesson6;
