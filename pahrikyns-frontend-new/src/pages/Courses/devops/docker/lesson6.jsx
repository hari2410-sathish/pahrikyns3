export const meta = {
  title: "Docker Lesson 6",
  description: "Understanding Docker images, containers, volumes, and networks.",
  difficulty: "Beginner",
  duration: "11 min",
  tags: ['docker','images','containers'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson6() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 6</h1>

      <h2>Docker Image</h2>
      <p>
        Image is a blueprint/template that contains OS + runtime + app code.
      </p>

      <pre>{`docker images`}</pre>

      <h2>Docker Container</h2>
      <p>
        Container is a running instance created from an image.
      </p>

      <pre>{`docker run nginx`}</pre>

      <h2>Docker Volume</h2>
      <p>Stores data outside the container. Persistent.</p>

      <pre>{`docker volume create data-vol`}</pre>

      <h2>Docker Network</h2>
      <p>Allows containers to talk to each other.</p>

      <pre>{`docker network ls`}</pre>
    </div>
  );
}

Lesson6.displayName = "DOCKER Lesson 6 – Full Content";
export default Lesson6;
