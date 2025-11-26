export const meta = {
  title: "Git Lesson 7",
  description: "Remote repositories: add, push, fetch, pull, origin.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ['git','remote'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson7() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 7</h1>

      <h2>Remote Commands</h2>
      <pre>
{`git remote -v
git remote add origin <url>
git push -u origin main
git fetch origin
git pull origin main`}
      </pre>

      <h2>What is Origin?</h2>
      <p>
        <strong>origin</strong> is the default name for the remote repository when you clone or add a remote.
      </p>

      <h3>Push Example</h3>
      <pre>
{`git push origin feature-login`}
      </pre>
    </div>
  );
}

Lesson7.displayName = "GIT Lesson 7 – Full Content";
export default Lesson7;
