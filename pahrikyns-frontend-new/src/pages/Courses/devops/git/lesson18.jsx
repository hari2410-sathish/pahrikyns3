export const meta = {
  title: "Git Lesson 18",
  description: "Understanding Git internal architecture: objects, refs, commits, trees, blobs.",
  difficulty: "Advanced",
  duration: "18 min",
  tags: ['git','internals'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson18() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 18</h1>

      <h2>Git Object Types</h2>
      <ul>
        <li><strong>Blob:</strong> file content</li>
        <li><strong>Tree:</strong> folder structure</li>
        <li><strong>Commit:</strong> snapshot pointer + metadata</li>
        <li><strong>Tag:</strong> readable labels</li>
      </ul>

      <h2>Inspecting Objects</h2>
      <pre>
{`git cat-file -p <hash>`}
      </pre>

      <h2>Listing Current Tree</h2>
      <pre>
{`git ls-tree HEAD`}
      </pre>

      <h2>Where Git Stores Objects?</h2>
      <pre>
{`.git/objects`}</pre>

      <p>Understanding internals helps debugging and advanced Git operations.</p>
    </div>
  );
}

Lesson18.displayName = "GIT Lesson 18 – Full Content";
export default Lesson18;
