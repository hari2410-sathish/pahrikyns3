export const meta = {
  title: "Kubernetes Lesson 7",
  description: "Ingress controller, ingress rules, host/path routing.",
  difficulty: "Intermediate",
  duration: "13 min",
  tags: ['kubernetes','ingress'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson7() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 7</h1>

      <h2>What is Ingress?</h2>
      <p>
        Ingress exposes HTTP/HTTPS routes to services using rules.
        Used for domain-based routing.
      </p>

      <h2>Ingress Controller Examples</h2>
      <ul>
        <li>NGINX Ingress</li>
        <li>Traefik</li>
        <li>HAProxy</li>
      </ul>

      <h2>Ingress Example</h2>
      <pre>
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80`}
      </pre>

      <p>Ingress = external traffic routing layer for Kubernetes.</p>
    </div>
  );
}

Lesson7.displayName = "KUBERNETES Lesson 7 – Full Content";
export default Lesson7;
