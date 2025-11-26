export const meta = {
  title: "Git Lesson 16",
  description: "Releases, semantic versioning, annotated tags, pushing tags.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['git','release','tags'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson16() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 16</h1>

      <h2>Semantic Versioning</h2>
      <pre>
{`MAJOR.MINOR.PATCH
1.0.0  -> Initial stable release
1.2.0  -> New feature
1.2.5  -> Bug fixes`}
      </pre>

      <h2>Create Tag</h2>
      <pre>
{`git tag v2.0.0`}
      </pre>

      <h2>Annotated Tag (Recommended)</h2>
      <pre>
{`git tag -a v2.0.0 -m "Major update release"`}</pre>

      <h2>Push Tags</h2>
      <pre>
{`git push origin v2.0.0
git push --tags`}</pre>

      <p>Tags mark release points used in CI/CD pipeline deployments.</p>
    </div>
  );
}

Lesson16.displayName = "GIT Lesson 16 – Full Content";
export default Lesson16;
