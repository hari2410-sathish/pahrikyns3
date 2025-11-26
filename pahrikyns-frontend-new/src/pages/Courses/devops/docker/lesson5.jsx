export const meta = {
  title: "Docker Lesson 5",
  description: "Basic Docker commands to manage images and containers.",
  difficulty: "Beginner",
  duration: "12 min",
  tags: ['docker','commands'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson5() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 5</h1>

      <h2>Basic Commands</h2>
      <pre>
{`docker pull nginx
docker images
docker run nginx
docker ps
docker stop <id>
docker rm <id>`}
      </pre>

      <h2>Run Container with Port Mapping</h2>
      <pre>
{`docker run -p 8080:80 nginx`}
      </pre>

      <h2>Enter Container Shell</h2>
      <pre>
{`docker exec -it <id> bash`}
      </pre>
    </div>
  );
}

Lesson5.displayName = "DOCKER Lesson 5 – Full Content";
export default Lesson5;
