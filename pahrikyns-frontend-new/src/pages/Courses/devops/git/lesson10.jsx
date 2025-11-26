export const meta = {
  title: "Git Lesson 10",
  description: "reset, restore, revert, undo staging, undo commits.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['git','undo'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson10() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 10</h1>

      <h2>Undo Uncommitted Changes</h2>
      <pre>
{`git restore file.txt`}
      </pre>

      <h2>Undo Staged File</h2>
      <pre>
{`git restore --staged file.txt`}
      </pre>

      <h2>Undo Commit (Keep Changes)</h2>
      <pre>
{`git reset --soft HEAD~1`}
      </pre>

      <h2>Undo Commit (Remove Changes)</h2>
      <pre>
{`git reset --hard HEAD~1`}
      </pre>

      <h2>Undo Pushed Commit Safely</h2>
      <pre>
{`git revert <commit-id>`}
      </pre>

      <p><strong>revert</strong> is the safest way to undo public commits.</p>
    </div>
  );
}

Lesson10.displayName = "GIT Lesson 10 – Full Content";
export default Lesson10;
