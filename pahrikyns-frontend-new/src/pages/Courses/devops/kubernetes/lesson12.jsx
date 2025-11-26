export const meta = {
  title: "Kubernetes Lesson 12",
  description: "Understanding container & pod lifecycle events, readiness/liveness probes.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['kubernetes','pod-lifecycle'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson12() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 12</h1>

      <h2>Pod Lifecycle Phases</h2>
      <ul>
        <li>Pending</li>
        <li>Running</li>
        <li>Succeeded</li>
        <li>Failed</li>
        <li>Unknown</li>
      </ul>

      <h2>Container Lifecycle Hooks</h2>
      <ul>
        <li><strong>postStart</strong></li>
        <li><strong>preStop</strong></li>
      </ul>

      <h2>Liveness Probe</h2>
      <pre>
{`livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 5`}
      </pre>

      <h2>Readiness Probe</h2>
      <pre>
{`readinessProbe:
  exec:
    command: ["cat", "/tmp/ready"]`}
      </pre>

      <p>Probes ensure apps start healthy & traffic is sent only when ready.</p>
    </div>
  );
}

Lesson12.displayName = "KUBERNETES Lesson 12 – Full Content";
export default Lesson12;
