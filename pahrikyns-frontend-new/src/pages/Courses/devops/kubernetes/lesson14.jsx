export const meta = {
  title: "Kubernetes Lesson 14",
  description: "DaemonSet for node-level pods, StatefulSet for ordered/persistent apps.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['kubernetes','daemonset','statefulset'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson14() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 14</h1>

      <h2>DaemonSet</h2>
      <p>
        Ensures one Pod runs on every node.  
        Used for logging agents, monitoring agents, etc.
      </p>

      <h2>DaemonSet Example</h2>
      <pre>
{`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-agent
spec:
  selector:
    matchLabels:
      app: log-agent
  template:
    metadata:
      labels:
        app: log-agent
    spec:
      containers:
        - name: agent
          image: fluentd`}
      </pre>

      <h2>StatefulSet</h2>
      <p>
        Used for apps that need stable identity and storage.  
        Example: MySQL, MongoDB, Kafka.
      </p>

      <h2>StatefulSet Example</h2>
      <pre>
{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: "mysql"
  replicas: 3
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql`}
      </pre>
    </div>
  );
}

Lesson14.displayName = "KUBERNETES Lesson 14 – Full Content";
export default Lesson14;
