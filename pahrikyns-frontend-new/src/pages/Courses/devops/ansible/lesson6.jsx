export const meta = {
  title: "Ansible Lesson 6",
  description: "Playbook basics, YAML syntax, tasks, handlers, running playbooks.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['ansible','playbook'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson6() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 6</h1>

      <h2>Sample Playbook</h2>
      <pre>
{`---
- name: Install Apache Web Server
  hosts: web
  become: yes

  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present`}
      </pre>

      <h2>Run Playbook</h2>
      <pre>{`ansible-playbook apache.yml`}</pre>

      <p>Playbook is a collection of tasks written in YAML.</p>
    </div>
  );
}

Lesson6.displayName = "ANSIBLE Lesson 6 – Full Content";
export default Lesson6;
