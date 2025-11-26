export const meta = {
  title: "Docker Lesson 18",
  description: "Security best practices, least privilege, image scanning, secrets.",
  difficulty: "Advanced",
  duration: "16 min",
  tags: ['docker','security'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson18() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 18</h1>

      <h2>Security Best Practices</h2>
      <ul>
        <li>Use official images.</li>
        <li>Scan images for vulnerabilities.</li>
        <li>Do not run containers as root.</li>
        <li>Use .dockerignore to remove sensitive files.</li>
        <li>Keep Docker updated.</li>
      </ul>

      <h2>Scan Image</h2>
      <pre>{`docker scan nginx`}</pre>

      <h2>Use Secrets</h2>
      <pre>{`docker secret create db_pass password.txt`}</pre>

      <p>Security is critical for production deployments.</p>
    </div>
  );
}

Lesson18.displayName = "DOCKER Lesson 18 – Full Content";
export default Lesson18;
