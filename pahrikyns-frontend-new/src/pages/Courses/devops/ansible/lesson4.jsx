export const meta = {
  title: "Ansible Lesson 4",
  description: "Inventory file structure, groups, SSH setup, host connection.",
  difficulty: "Beginner",
  duration: "11 min",
  tags: ['ansible','inventory'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson4() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 4</h1>

      <h2>Inventory File</h2>
      <pre>
{`/etc/ansible/hosts`}
      </pre>

      <h2>Example Inventory</h2>
      <pre>
{`[web]
192.168.1.10
192.168.1.11

[db]
192.168.1.20`}
      </pre>

      <h2>Test SSH Connectivity</h2>
      <pre>{`ssh user@192.168.1.10`}</pre>

      <h2>Ping All Hosts Using Ansible</h2>
      <pre>{`ansible all -m ping`}</pre>
    </div>
  );
}

Lesson4.displayName = "ANSIBLE Lesson 4 – Full Content";
export default Lesson4;
