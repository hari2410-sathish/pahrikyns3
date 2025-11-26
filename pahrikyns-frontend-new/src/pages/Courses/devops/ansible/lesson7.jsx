export const meta = {
  title: "Ansible Lesson 7",
  description: "Using variables, setting facts, Jinja2 templates.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['ansible','variables','templates'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson7() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 7</h1>

      <h2>Define Variables</h2>
      <pre>
{`vars:
  package_name: nginx`}
      </pre>

      <h2>Use Variables</h2>
      <pre>
{`- name: Install package
  apt:
    name: "{{ package_name }}"
    state: present`}
      </pre>

      <h2>Facts</h2>
      <pre>{`ansible all -m setup`}</pre>

      <h2>Templates (Jinja2)</h2>
      <pre>
{`Hello {{ ansible_hostname }} from Ansible!`}
      </pre>

      <p>Templates help generate dynamic configuration files.</p>
    </div>
  );
}

Lesson7.displayName = "ANSIBLE Lesson 7 – Full Content";
export default Lesson7;
