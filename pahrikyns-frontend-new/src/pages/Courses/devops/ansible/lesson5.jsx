export const meta = {
  title: "Ansible Lesson 5",
  description: "Core Ansible modules with real examples (copy, file, yum, service).",
  difficulty: "Beginner",
  duration: "12 min",
  tags: ['ansible','modules'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson5() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 5</h1>

      <h2>1. Shell Module</h2>
      <pre>{`ansible all -m shell -a "uptime"`}</pre>

      <h2>2. Copy Module</h2>
      <pre>
{`ansible all -m copy -a "src=/tmp/file dest=/home/user/"`}
      </pre>

      <h2>3. File Module</h2>
      <pre>
{`ansible all -m file -a "path=/tmp/test state=directory"`}
      </pre>

      <h2>4. Service Module</h2>
      <pre>
{`ansible all -m service -a "name=httpd state=started"`}</pre>

      <p>Modules are the real power of Ansible automation.</p>
    </div>
  );
}

Lesson5.displayName = "ANSIBLE Lesson 5 – Full Content";
export default Lesson5;
