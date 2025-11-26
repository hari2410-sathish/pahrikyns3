export const meta = {
  title: "Docker Lesson 17",
  description: "What is Docker Swarm, nodes, manager, worker, services, scaling.",
  difficulty: "Advanced",
  duration: "18 min",
  tags: ['docker','swarm'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson17() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 17</h1>

      <h2>What is Docker Swarm?</h2>
      <p>
        Docker Swarm is Docker's built-in orchestration tool 
        used to manage a cluster of Docker nodes.
      </p>

      <h2>Initialize Swarm</h2>
      <pre>{`docker swarm init`}</pre>

      <h2>Add Worker Nodes</h2>
      <pre>{`docker swarm join-token worker`}</pre>

      <h2>Create a Service</h2>
      <pre>{`docker service create --name web -p 8080:80 nginx`}</pre>

      <h2>Scale Service</h2>
      <pre>{`docker service scale web=5`}</pre>

      <p>Swarm provides scaling, self-healing, and load balancing.</p>
    </div>
  );
}

Lesson17.displayName = "DOCKER Lesson 17 – Full Content";
export default Lesson17;
