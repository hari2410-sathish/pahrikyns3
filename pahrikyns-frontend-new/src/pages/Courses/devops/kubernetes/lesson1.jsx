export const meta = {
  title: "Kubernetes Lesson 1",
  description: "What is Kubernetes, why use it, container orchestration basics.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['kubernetes'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson1() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 1</h1>

      <h2>What is Kubernetes?</h2>
      <p>
        Kubernetes (K8s) is an open-source container orchestration platform used
        to automate deployment, scaling, and management of containerized applications.
      </p>

      <h2>Why Use Kubernetes?</h2>
      <ul>
        <li>Automatic scaling</li>
        <li>Self-healing (auto restart containers)</li>
        <li>Load balancing</li>
        <li>Zero downtime deployments</li>
        <li>Manages 1000s of containers easily</li>
      </ul>

      <h2>Who Uses Kubernetes?</h2>
      <p>Netflix, Google, Amazon, Uber, etc.</p>
    </div>
  );
}

Lesson1.displayName = "KUBERNETES Lesson 1 – Full Content";
export default Lesson1;
