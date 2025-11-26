export const meta = {
  title: "Git Lesson 2",
  description: "Install Git on Ubuntu, Linux, CentOS, RedHat, macOS & Windows.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['git','install'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson2() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 2</h1>

      <h2>Install Git</h2>

      <h3>Ubuntu / Debian</h3>
      <pre>
{`sudo apt update
sudo apt install git -y
git --version`}
      </pre>

      <h3>CentOS / RHEL</h3>
      <pre>
{`sudo yum install git -y
git --version`}
      </pre>

      <h3>macOS</h3>
      <pre>
{`brew install git`}
      </pre>

      <h3>Windows</h3>
      <p>Download from <a href="https://git-scm.com">git-scm.com</a> and install Git Bash.</p>
    </div>
  );
}

Lesson2.displayName = "GIT Lesson 2 – Full Content";
export default Lesson2;
