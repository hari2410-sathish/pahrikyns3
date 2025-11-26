export const meta = {
  title: "Git Lesson 9",
  description: "How to create and push tags, semantic versioning.",
  difficulty: "Intermediate",
  duration: "8 min",
  tags: ['git','tags'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson9() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 9</h1>

      <h2>What Are Tags?</h2>
      <p>Tags mark specific points in Git history, often used for releases.</p>

      <h3>Create Tag</h3>
      <pre>
{`git tag v1.0.0`}
      </pre>

      <h3>Annotated Tag</h3>
      <pre>
{`git tag -a v1.0.0 -m "Release version 1.0.0"`}
      </pre>

      <h3>Push Tag</h3>
      <pre>
{`git push origin v1.0.0`}</pre>

      <h3>Push All Tags</h3>
      <pre>
{`git push --tags`}</pre>
    </div>
  );
}

Lesson9.displayName = "GIT Lesson 9 – Full Content";
export default Lesson9;
