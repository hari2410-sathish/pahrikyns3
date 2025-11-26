export const meta = {
  title: "Kubernetes Lesson 15",
  description: "kubectl logs, exec, describe, events, troubleshooting tips.",
  difficulty: "Intermediate",
  duration: "16 min",
  tags: ['kubernetes','logs','troubleshooting'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson15() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 15</h1>

      <h2>Check Logs</h2>
      <pre>{`kubectl logs <pod-name>`}</pre>

      <h2>Enter Pod Shell</h2>
      <pre>{`kubectl exec -it <pod-name> -- bash`}</pre>

      <h2>Describe Pod</h2>
      <pre>{`kubectl describe pod <pod-name>`}</pre>

      <h2>List Events</h2>
      <pre>{`kubectl get events`}</pre>

      <h2>Common Issues</h2>
      <ul>
        <li>ImagePullBackOff → wrong image name</li>
        <li>CrashLoopBackOff → app crash inside container</li>
        <li>Pending → no nodes available / resource issue</li>
        <li>Pod Evicted → low disk or memory</li>
      </ul>
    </div>
  );
}

Lesson15.displayName = "KUBERNETES Lesson 15 – Full Content";
export default Lesson15;
