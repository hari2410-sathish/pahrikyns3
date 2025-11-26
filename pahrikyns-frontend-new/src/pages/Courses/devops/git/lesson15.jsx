export const meta = {
  title: "Git Lesson 15",
  description: "CI/CD pipelines, GitHub Actions example, build/test workflow.",
  difficulty: "Intermediate",
  duration: "18 min",
  tags: ['git','ci-cd'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson15() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 15</h1>

      <h2>What is CI/CD?</h2>
      <p>
        CI/CD integrates Git with automated testing, building, and deployment pipelines.
      </p>

      <h2>GitHub Actions Example</h2>
      <pre>
{`# .github/workflows/node.yml
name: CI

on:
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test`}
      </pre>

      <h2>Why CI/CD?</h2>
      <ul>
        <li>Ensures code quality.</li>
        <li>Automated testing.</li>
        <li>Reduces human error.</li>
        <li>Makes releases faster.</li>
      </ul>
    </div>
  );
}

Lesson15.displayName = "GIT Lesson 15 – Full Content";
export default Lesson15;
