export const meta = {
  title: "Git Lesson 19",
  description: "Top interview questions with answers, practical tasks.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['git','interview'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson19() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 19</h1>

      <h2>Important Interview Questions</h2>
      <ol>
        <li>
          <strong>Difference between git fetch & git pull?</strong><br/>
          fetch = download only, pull = download + merge.
        </li>
        <li>
          <strong>How to undo a pushed commit?</strong><br/>
          <code>git revert &lt;commit&gt;</code>
        </li>
        <li>
          <strong>How to solve merge conflict?</strong><br/>
          Edit file → remove markers → git add → git commit.
        </li>
        <li>
          <strong>What is cherry-pick?</strong><br/>
          Apply specific commit to another branch.
        </li>
        <li>
          <strong>What is rebase?</strong><br/>
          Replay commits on top of another branch.
        </li>
      </ol>

      <h2>Practical Tasks</h2>
      <pre>
{`1. Create feature branch
2. Add file, commit
3. Rebase it on main
4. Fix conflict
5. Push branch
6. Open PR`}
      </pre>
    </div>
  );
}

Lesson19.displayName = "GIT Lesson 19 – Full Content";
export default Lesson19;
