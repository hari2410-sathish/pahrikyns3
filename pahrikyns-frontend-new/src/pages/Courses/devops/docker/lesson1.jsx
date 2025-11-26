export const meta = {
  title: "Docker Lesson 1",
  description: "What is Docker, why use Docker, container vs VM.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['docker'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson1() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 1</h1>

      <h2>What is Docker?</h2>
      <p>
        Docker is a platform that allows you to build, run, and manage applications inside
        lightweight, isolated environments called <strong>containers</strong>.
      </p>

      <h2>Why Use Docker?</h2>
      <ul>
        <li>Removes “works on my machine” issues.</li>
        <li>Runs the same on all OS (Windows/Mac/Linux).</li>
        <li>Faster than Virtual Machines.</li>
        <li>Reusable images → easy deployment.</li>
      </ul>

      <h2>Container vs Virtual Machine</h2>
      <ul>
        <li>VM → Full OS + heavy + slow.</li>
        <li>Container → No full OS, light, fast.</li>
      </ul>

      <pre>
{`docker --version
docker info`}
      </pre>
    </div>
  );
}

Lesson1.displayName = "DOCKER Lesson 1 – Full Content";
export default Lesson1;
