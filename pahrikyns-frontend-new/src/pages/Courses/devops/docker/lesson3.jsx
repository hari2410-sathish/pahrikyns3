export const meta = {
  title: "Docker Lesson 3",
  description: "Difference between monolithic and microservices architecture.",
  difficulty: "Beginner",
  duration: "8 min",
  tags: ['docker','architecture'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson3() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 3</h1>

      <h2>Monolithic Architecture</h2>
      <p>Single large application (all modules tightly coupled).</p>

      <h2>Microservices Architecture</h2>
      <p>Application split into small independent services (Docker friendly).</p>

      <h3>Difference</h3>
      <ul>
        <li>Monolithic → Single codebase, hard to scale.</li>
        <li>Microservices → Separate services, very scalable.</li>
      </ul>

      <h3>Why Docker for Microservices?</h3>
      <ul>
        <li>Each service runs in its own container.</li>
        <li>Easy to deploy/update individual modules.</li>
      </ul>
    </div>
  );
}

Lesson3.displayName = "DOCKER Lesson 3 – Full Content";
export default Lesson3;
