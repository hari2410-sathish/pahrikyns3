export const meta = {
  title: "Ansible Lesson 8",
  description: "Handlers, notify trigger, idempotent execution.",
  difficulty: "Intermediate",
  duration: "13 min",
  tags: ['ansible','handlers'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson8() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 8</h1>

      <h2>Handlers</h2>
      <pre>
{`handlers:
  - name: restart apache
    service:
      name: apache2
      state: restarted`}
      </pre>

      <h2>Notify</h2>
      <pre>
{`tasks:
  - name: Update config
    copy:
      src: conf
      dest: /etc/apache2/apache.conf
    notify: restart apache`}
      </pre>

      <h2>Idempotent Execution</h2>
      <p>Ansible only makes changes when required (no repeated actions).</p>
    </div>
  );
}

Lesson8.displayName = "ANSIBLE Lesson 8 – Full Content";
export default Lesson8;
