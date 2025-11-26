export const meta = {
  title: "Git Lesson 8",
  description: "Stash, apply, pop, drop, when to use stashing.",
  difficulty: "Intermediate",
  duration: "9 min",
  tags: ['git','stash'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson8() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 8</h1>

      <h2>What is Git Stash?</h2>
      <p>
        Stash temporarily saves uncommitted changes so you can switch branches without committing them.
      </p>

      <h2>Stash Commands</h2>
      <pre>
{`git stash
git stash list
git stash apply
git stash pop
git stash drop`}
      </pre>

      <h3>Example</h3>
      <pre>
{`git stash save "WIP: homepage UI"
git checkout main`}
      </pre>

      <p>Use stash when you want to pause your work.</p>
    </div>
  );
}

Lesson8.displayName = "GIT Lesson 8 – Full Content";
export default Lesson8;
