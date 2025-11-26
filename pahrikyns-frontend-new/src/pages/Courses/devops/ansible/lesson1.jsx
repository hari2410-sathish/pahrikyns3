export const meta = {
  title: "Ansible Lesson 1",
  description: "What is Ansible, why use Ansible, agentless configuration management.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['ansible'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson1() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 1</h1>

      <h2>What is Ansible?</h2>
      <p>
        Ansible is an open-source automation tool used for configuration 
        management, application deployment, and IT orchestration.
      </p>

      <h2>Why Use Ansible?</h2>
      <ul>
        <li>No agent — uses SSH</li>
        <li>Lightweight & fast</li>
        <li>Easy YAML syntax</li>
        <li>Idempotent (runs same result every time)</li>
        <li>Used in DevOps pipelines</li>
      </ul>

      <h2>Who Uses Ansible?</h2>
      <p>Amazon, Netflix, Adobe, NASA, RedHat.</p>
    </div>
  );
}

Lesson1.displayName = "ANSIBLE Lesson 1 – Full Content";
export default Lesson1;
