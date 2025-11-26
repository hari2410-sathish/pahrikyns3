export const meta = {
  title: "Ansible Lesson 11",
  description: "Managing files using copy, template, lineinfile, blockinfile modules.",
  difficulty: "Advanced",
  duration: "15 min",
  tags: ['ansible','file-management'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson11() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 11</h1>

      <h2>Copy Module</h2>
      <pre>
{`- name: Copy config file
  copy:
    src: config.txt
    dest: /etc/myapp/config.txt`}
      </pre>

      <h2>Template Module</h2>
      <pre>
{`- name: Apply template
  template:
    src: index.j2
    dest: /var/www/html/index.html`}
      </pre>

      <h2>Lineinfile Module</h2>
      <pre>
{`- name: Add a line
  lineinfile:
    path: /etc/app.conf
    line: "ENV=production"`}
      </pre>

      <h2>Blockinfile Module</h2>
      <pre>
{`- name: Add block
  blockinfile:
    path: /etc/app.conf
    block: |
      [database]
      user=root
      pass=1234`}
      </pre>

      <p>This lesson covers production-level config management.</p>
    </div>
  );
}

Lesson11.displayName = "ANSIBLE Lesson 11 – Full Content";
export default Lesson11;
