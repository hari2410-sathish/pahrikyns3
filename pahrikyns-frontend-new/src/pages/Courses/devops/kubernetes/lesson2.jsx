export const meta = {
  title: "Kubernetes Lesson 2",
  description: "Virtual machines vs containers, why orchestration is needed.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['kubernetes','virtualization'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson2() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 2</h1>

      <h2>Virtual Machines (VM)</h2>
      <p>Full OS, heavy, slow to start, consumes more resources.</p>

      <h2>Containers</h2>
      <p>Share host kernel, lightweight, fast to start, ideal for microservices.</p>

      <h2>Why Need Kubernetes?</h2>
      <ul>
        <li>Manages multiple containers</li>
        <li>Handles failures</li>
        <li>Auto-scaling</li>
        <li>Service discovery</li>
        <li>Rolling updates</li>
      </ul>
    </div>
  );
}

Lesson2.displayName = "KUBERNETES Lesson 2 – Full Content";
export default Lesson2;
