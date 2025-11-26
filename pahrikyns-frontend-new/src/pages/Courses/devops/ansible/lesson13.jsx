export const meta = {
  title: "Ansible Lesson 13",
  description: "Using tags, ignore_errors, failed_when & debug module.",
  difficulty: "Advanced",
  duration: "15 min",
  tags: ['ansible','debug','tags'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson13() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 13</h1>

      <h2>Using Tags</h2>
      <pre>
{`tasks:
  - name: Install Apache
    apt:
      name: apache2
      state: present
    tags: install`}
      </pre>

      <h2>Run Only Tagged Tasks</h2>
      <pre>{`ansible-playbook app.yml --tags install`}</pre>

      <h2>Ignore Errors</h2>
      <pre>
{`ignore_errors: yes`}
      </pre>

      <h2>Custom Error Handling</h2>
      <pre>
{`failed_when: "'ERROR' in result.stdout"`}
      </pre>

      <h2>Debug Module</h2>
      <pre>
{`- name: Print variable
  debug:
    msg: "{{ ansible_hostname }}"`}
      </pre>

      <p>This helps you debug large enterprise playbooks.</p>
    </div>
  );
}

Lesson13.displayName = "ANSIBLE Lesson 13 – Full Content";
export default Lesson13;
