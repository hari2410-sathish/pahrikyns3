export const meta = {
  title: "Docker Lesson 2",
  description: "Traditional deploy vs VM vs Docker vs Kubernetes explanation.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['docker','deployment'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson2() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 2</h1>

      <h2>1. Traditional Deployment</h2>
      <p>Install OS → install dependencies → install software manually.</p>

      <h2>2. Virtual Machine Deployment</h2>
      <p>Runs full OS inside another OS. Heavy, slow but isolated.</p>

      <h2>3. Docker Deployment</h2>
      <p>Runs application in isolated containers using shared host kernel.</p>

      <h2>4. Kubernetes Deployment</h2>
      <p>Manages 1000s of containers automatically (scaling, load balancing).</p>

      <h3>Quick Compare</h3>
      <pre>
{`Traditional → Slow
VM → Heavy
Docker → Fast & Lightweight
Kubernetes → Large-scale orchestration`}
      </pre>
    </div>
  );
}

Lesson2.displayName = "DOCKER Lesson 2 – Full Content";
export default Lesson2;
