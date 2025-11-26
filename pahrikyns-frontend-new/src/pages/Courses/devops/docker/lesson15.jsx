export const meta = {
  title: "Docker Lesson 15",
  description: "Integrating Docker into CI/CD pipelines such as GitHub Actions, GitLab, Jenkins.",
  difficulty: "Intermediate",
  duration: "18 min",
  tags: ['docker','ci-cd'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson15() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DOCKER - Lesson 15</h1>

      <h2>CI/CD Flow</h2>
      <pre>
{`1. Developer pushes code
2. CI builds Docker Image
3. Runs tests
4. Pushes image to registry
5. CD deploys image to server/Kubernetes`}
      </pre>

      <h2>GitHub Actions Example</h2>
      <pre>
{`name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: docker build -t myapp .
      - run: docker run myapp npm test
      - run: docker push myrepo/myapp`}
      </pre>

      <p>Docker + CI/CD = fully automated deployment.</p>
    </div>
  );
}

Lesson15.displayName = "DOCKER Lesson 15 – Full Content";
export default Lesson15;
