export const meta = {
  title: "Docker Lesson 20",
  description: "Final exam instructions, 75 questions, pass mark details.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['docker','exam'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson20() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 20</h1>

      <h2>Final Exam Structure</h2>
      <ul>
        <li>75 Questions total</li>
        <li><strong>Pass mark = 67</strong></li>
        <li>If fail → repeat module</li>
        <li>Exam covers Lesson 1 → Lesson 19</li>
      </ul>

      <h2>Checklist Before Exam</h2>
      <ul>
        <li>Understand Dockerfile</li>
        <li>Know how to build/push images</li>
        <li>Clear about containers, volumes, networks</li>
        <li>Know basic security & CI/CD flow</li>
      </ul>

      <h2>Exam JSON</h2>
      <p>Place <code>docker_exam.json</code> in this folder. UI auto-loads.</p>
    </div>
  );
}

Lesson20.displayName = "DOCKER Lesson 20 – Full Content";
export default Lesson20;
