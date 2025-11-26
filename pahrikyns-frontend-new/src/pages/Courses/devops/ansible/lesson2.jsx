export const meta = {
  title: "Ansible Lesson 2",
  description: "Understanding Ansible architecture: control node, managed node, SSH, modules.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['ansible','architecture'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson2() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 2</h1>

      <h2>Ansible Architecture</h2>
      <ul>
        <li><strong>Control Node:</strong> Where Ansible is installed</li>
        <li><strong>Managed Nodes:</strong> Remote servers</li>
        <li><strong>Inventory File:</strong> List of servers</li>
        <li><strong>Playbook:</strong> YAML automation file</li>
        <li><strong>Modules:</strong> Prebuilt commands to perform tasks</li>
        <li><strong>SSH:</strong> Communication layer</li>
      </ul>

      <h2>Basic Execution Flow</h2>
      <pre>
{`Control Node → SSH → Managed Node → Run Modules → Get Results`}
      </pre>
    </div>
  );
}

Lesson2.displayName = "ANSIBLE Lesson 2 – Full Content";
export default Lesson2;
