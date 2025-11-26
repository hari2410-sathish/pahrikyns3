export const meta = {
  title: "Docker Lesson 4",
  description: "Docker engine, daemon, CLI, registry, images, containers.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['docker','architecture'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson4() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 4</h1>

      <h2>Docker Components</h2>
      <ul>
        <li><strong>Docker Engine:</strong> Main service.</li>
        <li><strong>Docker Daemon:</strong> Runs containers.</li>
        <li><strong>Docker CLI:</strong> Commands.</li>
        <li><strong>Docker Image:</strong> Blueprint/template.</li>
        <li><strong>Docker Container:</strong> Running instance of image.</li>
        <li><strong>Docker Registry:</strong> Image storage (DockerHub/Private).</li>
      </ul>

      <h2>Flow</h2>
      <pre>
{`docker pull → download image
docker run → create + start container`}
      </pre>
    </div>
  );
}

Lesson4.displayName = "DOCKER Lesson 4 – Full Content";
export default Lesson4;
