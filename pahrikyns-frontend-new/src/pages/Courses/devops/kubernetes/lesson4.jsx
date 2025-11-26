export const meta = {
  title: "Kubernetes Lesson 4",
  description: "Pods, containers inside pods, ReplicaSet scaling.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['kubernetes','pods','replicaset'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson4() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 4</h1>

      <h2>What is a Pod?</h2>
      <p>
        Pod is the smallest deployable unit in Kubernetes.  
        1 Pod can have 1 or more containers.
      </p>

      <h2>Pod Example YAML</h2>
      <pre>
{`apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: web
      image: nginx`}
      </pre>

      <h2>ReplicaSet</h2>
      <p>Ensures the correct number of pods are always running.</p>

      <pre>
{`kubectl scale rs myapp --replicas=5`}
      </pre>
    </div>
  );
}

Lesson4.displayName = "KUBERNETES Lesson 4 – Full Content";
export default Lesson4;
