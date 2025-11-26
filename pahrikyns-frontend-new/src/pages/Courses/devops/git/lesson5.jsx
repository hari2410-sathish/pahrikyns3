export const meta = {
  title: "Git Lesson 4",
  description: "How to create, delete and switch branches.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['git','branch'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson4() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 4</h1>

      <h2>Branching Commands</h2>
      <pre>
{`git branch
git branch feature-1
git checkout feature-1
git switch -c feature-2`}
      </pre>

      <h3>Why Branch?</h3>
      <ul>
        <li>Work on features safely.</li>
        <li>Avoid breaking main code.</li>
        <li>Team can work parallel.</li>
      </ul>
    </div>
  );
}

Lesson4.displayName = "GIT Lesson 4 – Full Content";
export default Lesson4;
