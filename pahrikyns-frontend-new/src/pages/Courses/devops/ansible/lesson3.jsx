export const meta = {
  title: "Ansible Lesson 3",
  description: "Install Ansible on Ubuntu, CentOS, Linux & verify installation.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['ansible','install'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson3() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 3</h1>

      <h2>Install on Ubuntu</h2>
      <pre>
{`sudo apt update
sudo apt install ansible -y`}
      </pre>

      <h2>Install on CentOS / RHEL</h2>
      <pre>
{`sudo yum install epel-release -y
sudo yum install ansible -y`}
      </pre>

      <h2>Check Version</h2>
      <pre>{`ansible --version`}</pre>

      <p>Your control node is now ready.</p>
    </div>
  );
}

Lesson3.displayName = "ANSIBLE Lesson 3 – Full Content";
export default Lesson3;
