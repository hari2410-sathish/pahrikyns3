export const meta = {
  title: "Docker Lesson 14",
  description: "Deploy a real banking or web application using Docker.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['docker','project'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson14() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 14</h1>

      <h2>Real World Example (Online Banking)</h2>
      <p>Banking app contains:</p>
      <ul>
        <li>Auth service</li>
        <li>Account service</li>
        <li>Transaction service</li>
        <li>Notification service</li>
        <li>Frontend UI</li>
      </ul>

      <h2>Folder Structure</h2>
      <pre>
{`/auth
/account
/transaction
/ui
/docker-compose.yml`}
      </pre>

      <h2>docker-compose.yml Example</h2>
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

      <p>This setup launches web + database in one command.</p>
    </div>
  );
}

Lesson14.displayName = "DOCKER Lesson 14 – Full Content";
export default Lesson14;
