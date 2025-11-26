export const meta = {
  title: "Git Lesson 3",
  description: "Basic Git commands: init, clone, status, add, commit.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['git','basic'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson3() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 3</h1>

      <h2>Basic Commands</h2>
      <pre>
{`git init
git clone <url>
git status
git add .
git commit -m "message"`}
      </pre>

      <h3>What They Mean</h3>
      <ul>
        <li><code>init</code> → create new repo</li>
        <li><code>clone</code> → copy remote repo</li>
        <li><code>status</code> → see changes</li>
        <li><code>add</code> → stage files</li>
        <li><code>commit</code> → save snapshot</li>
      </ul>
    </div>
  );
}

Lesson3.displayName = "GIT Lesson 3 – Full Content";
export default Lesson3;
