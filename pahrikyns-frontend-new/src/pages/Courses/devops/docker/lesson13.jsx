export const meta = {
  title: "Docker Lesson 13",
  description: "Docker network modes and container-to-container communication.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['docker','network'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson13() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 13</h1>

      <h2>Network Modes</h2>
      <ul>
        <li><strong>bridge:</strong> Default. Best for most apps.</li>
        <li><strong>host:</strong> Uses host machine’s network.</li>
        <li><strong>none:</strong> No network.</li>
      </ul>

      <h2>Create Custom Network</h2>
      <pre>{`docker network create backend-net`}</pre>

      <h2>Run Containers in Same Network</h2>
      <pre>
{`docker run --network backend-net --name db mysql
docker run --network backend-net --name api node-app`}
      </pre>

      <p>Now <strong>api</strong> can reach <strong>db</strong> via hostname ‘db’.</p>
    </div>
  );
}

Lesson13.displayName = "DOCKER Lesson 13 – Full Content";
export default Lesson13;
