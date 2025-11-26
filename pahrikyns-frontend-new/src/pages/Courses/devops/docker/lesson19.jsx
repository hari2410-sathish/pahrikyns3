export const meta = {
  title: "Docker Lesson 19",
  description: "Common Docker interview questions and short answers.",
  difficulty: "Intermediate",
  duration: "18 min",
  tags: ['docker','interview'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson19() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 19</h1>

      <h2>Important Interview Questions</h2>
      <ol>
        <li>
          <strong>What is a Docker container?</strong><br/>
          Lightweight isolated environment for running apps.
        </li>
        <li>
          <strong>Difference: Image vs Container?</strong><br/>
          Image = blueprint, Container = instance.
        </li>
        <li>
          <strong>What is Dockerfile?</strong><br/>
          Script to build images.
        </li>
        <li>
          <strong>What is Docker Compose?</strong><br/>
          Run multi-container apps.
        </li>
        <li>
          <strong>What is registry?</strong><br/>
          Storage for Docker images (DockerHub/ECR/GCR).
        </li>
      </ol>

      <h2>Hands-On Task</h2>
      <pre>
{`1. Write Dockerfile for node app
2. Build image
3. Push to Docker Hub
4. Run container with port 3000`}
      </pre>
    </div>
  );
}

Lesson19.displayName = "DOCKER Lesson 19 – Full Content";
export default Lesson19;
