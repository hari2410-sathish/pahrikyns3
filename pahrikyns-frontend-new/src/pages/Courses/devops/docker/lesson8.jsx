export const meta = {
  title: "Docker Lesson 8",
  description: "Understanding ports, container communication, network modes.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['docker','network','ports'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson8() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 8</h1>

      <h2>Why Ports?</h2>
      <p>Containers expose ports to communicate with outside world.</p>

      <h2>Run with Port Mapping</h2>
      <pre>
{`docker run -p 3000:3000 node-app`}
      </pre>

      <h2>Types of Networks</h2>
      <ul>
        <li><strong>bridge</strong> (default)</li>
        <li><strong>host</strong> (use host network)</li>
        <li><strong>none</strong> (no network)</li>
      </ul>

      <h2>Container to Container Communication</h2>
      <pre>
{`docker network create app-net
docker run --network app-net backend
docker run --network app-net frontend`}
      </pre>
    </div>
  );
}

Lesson8.displayName = "DOCKER Lesson 8 – Full Content";
export default Lesson8;
