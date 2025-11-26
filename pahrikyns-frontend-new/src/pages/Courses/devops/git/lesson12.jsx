export const meta = {
  title: "Git Lesson 12",
  description: "Recover deleted branches, restore lost commits using reflog.",
  difficulty: "Advanced",
  duration: "12 min",
  tags: ['git','reflog','recovery'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson12() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 12</h1>

      <h2>What is Reflog?</h2>
      <p>
        Git reflog tracks every move of HEAD, even deleted commits and resets.
        You can recover almost anything using reflog.
      </p>

      <h2>Commands</h2>
      <pre>
{`git reflog
git checkout -b recover-branch <commit-id>`}
      </pre>

      <h3>Use Case</h3>
      <ul>
        <li>Deleted branch accidentally.</li>
        <li>Used <code>git reset --hard</code> and lost commits.</li>
        <li>Want to recover previous HEAD state.</li>
      </ul>
    </div>
  );
}

Lesson12.displayName = "GIT Lesson 12 – Full Content";
export default Lesson12;
