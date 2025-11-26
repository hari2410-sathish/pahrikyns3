export const meta = {
  title: "Docker Lesson 12",
  description: "Difference between volume, bind mount, and how to persist data.",
  difficulty: "Intermediate",
  duration: "13 min",
  tags: ['docker','volume','mount'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson12() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 12</h1>

      <h2>Docker Volume</h2>
      <p>Managed by Docker. Most common for databases.</p>

      <pre>{`docker volume create data-vol`}</pre>

      <h2>Bind Mount</h2>
      <p>Links a host folder to a container folder.</p>

      <pre>{`docker run -v /host/path:/container/path nginx`}</pre>

      <h2>Which is Best?</h2>
      <ul>
        <li>Volume → Recommended for apps.</li>
        <li>Bind mount → Development work.</li>
      </ul>
    </div>
  );
}

Lesson12.displayName = "DOCKER Lesson 12 – Full Content";
export default Lesson12;
