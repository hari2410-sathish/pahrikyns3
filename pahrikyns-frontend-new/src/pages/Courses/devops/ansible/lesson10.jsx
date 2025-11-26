export const meta = {
  title: "Ansible Lesson 10",
  description: "Role structure: tasks, handlers, templates, vars, files.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['ansible','roles'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson10() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 10</h1>

      <h2>Why Roles?</h2>
      <p>Roles organize playbooks into reusable components.</p>

      <h2>Role Structure</h2>
      <pre>
{`roles/
  web/
    tasks/
    handlers/
    templates/
    vars/
    files/`}
      </pre>

      <h2>Use Role in Playbook</h2>
      <pre>
{`---
- hosts: web
  roles:
    - web`}
      </pre>

      <p>Roles are used in real DevOps companies for modular automation.</p>
    </div>
  );
}

Lesson10.displayName = "ANSIBLE Lesson 10 – Full Content";
export default Lesson10;
