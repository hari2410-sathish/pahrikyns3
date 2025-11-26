export const meta = {
  title: "Docker Lesson 7",
  description: "Install Docker on Ubuntu, Linux, CentOS, Windows.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['docker','install'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson7() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 7</h1>

      <h2>Install Docker on Ubuntu</h2>
      <pre>
{`sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker`}
      </pre>

      <h2>Install Docker on CentOS</h2>
      <pre>
{`sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker`}
      </pre>

      <h2>Install Docker on Windows</h2>
      <p>Download Docker Desktop → install → enable WSL2.</p>

      <h2>Verify Docker</h2>
      <pre>{`docker --version`}</pre>
    </div>
  );
}

Lesson7.displayName = "DOCKER Lesson 7 – Full Content";
export default Lesson7;
