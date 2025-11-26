export const meta = {
  title: "Docker Lesson 16",
  description: "What is Docker Compose, how to run multiple containers using one file.",
  difficulty: "Intermediate",
  duration: "16 min",
  tags: ['docker','compose'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson16() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 16</h1>

      <h2>What is Docker Compose?</h2>
      <p>
        Docker Compose allows you to run multiple containers together
        using a single YAML file (<code>docker-compose.yml</code>).
      </p>

      <h2>Sample docker-compose.yml</h2>
      <pre>
{`version: "3"
services:
  web:
    image: nginx
    ports:
      - "8080:80"

  db:
    image: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=pass`}
      </pre>

      <h2>Commands</h2>
      <pre>
{`docker compose up -d
docker compose down
docker compose ps`}
      </pre>

      <p>Compose is essential for real-world multi-service apps.</p>
    </div>
  );
}

Lesson16.displayName = "DOCKER Lesson 16 – Full Content";
export default Lesson16;
