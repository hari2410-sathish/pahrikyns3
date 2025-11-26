export const meta = {
  title: "Git Lesson 13",
  description: "Submodules, subtrees, differences, setup and workflow.",
  difficulty: "Advanced",
  duration: "15 min",
  tags: ['git','submodule','subtree'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson13() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 13</h1>

      <h2>Git Submodules</h2>
      <p>
        Submodule lets you include another git repository as a folder inside your repo.
      </p>

      <h3>Add Submodule</h3>
      <pre>
{`git submodule add https://github.com/user/library.git libs/library`}
      </pre>

      <h3>Update Submodule</h3>
      <pre>
{`git submodule update --init --recursive`}
      </pre>

      <h2>Git Subtree</h2>
      <p>Subtree copies the code directly; easier to manage.</p>

      <h3>Add Subtree</h3>
      <pre>
{`git subtree add --prefix=libs/library https://github.com/user/library.git main --squash`}
      </pre>

      <h3>Submodule vs Subtree</h3>
      <ul>
        <li>Submodule: connects as dependency.</li>
        <li>Subtree: copies code fully.</li>
      </ul>
    </div>
  );
}

Lesson13.displayName = "GIT Lesson 13 – Full Content";
export default Lesson13;
