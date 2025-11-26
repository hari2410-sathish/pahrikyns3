export const meta = {
  title: "Kubernetes Lesson 8",
  description: "ConfigMap and Secret for environment variables and sensitive data.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['kubernetes','configmap','secret'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson8() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 8</h1>

      <h2>ConfigMap</h2>
      <p>Stores non-sensitive configuration (env variables, config files).</p>

      <pre>
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: mysql
  DB_PORT: "3306"`}
      </pre>

      <h2>Secret</h2>
      <p>Stores sensitive data (passwords, tokens). Base64 encoded.</p>

      <pre>
{`apiVersion: v1
kind: Secret
metadata:
  name: app-secret
data:
  password: cGFzc3dvcmQ=`}
      </pre>

      <h2>Use in Pods</h2>
      <pre>
{`env:
  - name: DB_HOST
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: DB_HOST`}
      </pre>
    </div>
  );
}

Lesson8.displayName = "KUBERNETES Lesson 8 – Full Content";
export default Lesson8;
