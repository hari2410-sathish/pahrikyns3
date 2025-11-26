export const meta = {
  title: "Docker Lesson 9",
  description: "docker logs, inspect, stats, troubleshooting container issues.",
  difficulty: "Intermediate",
  duration: "10 min",
  tags: ['docker','logs','troubleshoot'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson9() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 9</h1>

      <h2>Check Logs</h2>
      <pre>
{`docker logs <container-id>`}
      </pre>

      <h2>Inspect Container</h2>
      <pre>
{`docker inspect <container-id>`}
      </pre>

      <h2>Monitor Containers</h2>
      <pre>
{`docker stats`}
      </pre>

      <h2>Common Issues</h2>
      <ul>
        <li>Port conflict → change -p value</li>
        <li>Container keeps restarting → app crash</li>
        <li>Permission denied → use sudo</li>
      </ul>
    </div>
  );
}

Lesson9.displayName = "DOCKER Lesson 9 – Full Content";
export default Lesson9;
