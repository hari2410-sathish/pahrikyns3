export const meta = {
  title: "Docker Lesson 11",
  description: "Building images, tagging, pushing to registry, saving & loading images.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['docker','build','push'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson11() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 11</h1>

      <h2>Build Image</h2>
      <pre>
{`docker build -t myapp:1.0 .`}
      </pre>

      <h2>Tag Image</h2>
      <pre>
{`docker tag myapp:1.0 myrepo/myapp:1.0`}
      </pre>

      <h2>Push Image to Docker Hub</h2>
      <pre>
{`docker login
docker push myrepo/myapp:1.0`}
      </pre>

      <h2>Save Image (Local Backup)</h2>
      <pre>
{`docker save -o backup.tar myapp:1.0`}
      </pre>

      <h2>Load Image</h2>
      <pre>
{`docker load -i backup.tar`}
      </pre>
    </div>
  );
}

Lesson11.displayName = "DOCKER Lesson 11 – Full Content";
export default Lesson11;
