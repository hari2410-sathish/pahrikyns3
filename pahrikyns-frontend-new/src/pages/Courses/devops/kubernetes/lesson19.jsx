export const meta = {
  title: "Kubernetes Lesson 19",
  description: "Most important Kubernetes interview questions with answers.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['kubernetes','interview'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson19() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 19</h1>

      <h2>Top Interview Questions</h2>
      <ol>
        <li>
          <strong>What is a Pod?</strong> Smallest deployable object in K8s.
        </li>

        <li>
          <strong>Difference between Deployment & StatefulSet?</strong><br />
          Deployment = stateless, StatefulSet = persistent identity.
        </li>

        <li>
          <strong>What is ETCD?</strong> Cluster database storing all K8s data.
        </li>

        <li>
          <strong>What is Kubelet?</strong> Node agent that runs containers.
        </li>

        <li>
          <strong>What is CNI?</strong> Provides pod networking.
        </li>

        <li>
          <strong>What is Ingress?</strong> HTTP routing controller.
        </li>

        <li>
          <strong>How to debug CrashLoopBackOff?</strong><br />
          Check logs → describe pod → verify image → fix app crash.
        </li>
      </ol>

      <h2>Hands-On Task</h2>
      <pre>
{`1. Create deployment
2. Expose service
3. Scale pods
4. Check logs
5. Delete resources`}
      </pre>
    </div>
  );
}

Lesson19.displayName = "KUBERNETES Lesson 19 – Full Content";
export default Lesson19;
