export const meta = {
  title: "Git Lesson 6",
  description: "Understanding rebase, merge, linear history, when to use rebasing.",
  difficulty: "Intermediate",
  duration: "12 min",
  tags: ['git','rebase'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson6() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 6</h1>

      <h2>What is Rebase?</h2>
      <p>
        Git rebase takes your commits and replays them on top of another branch,
        creating a clean, linear history.
      </p>

      <h2>Rebase Command</h2>
      <pre>
{`git checkout feature-1
git rebase main`}
      </pre>

      <h3>When to Use Rebase?</h3>
      <ul>
        <li>To keep history clean.</li>
        <li>Before merging feature branch into main.</li>
        <li>To avoid unnecessary merge commits.</li>
      </ul>

      <h3>Warning</h3>
      <p>Never rebase a branch that is already pushed & shared with team.</p>
    </div>
  );
}

Lesson6.displayName = "GIT Lesson 6 – Full Content";
export default Lesson6;
