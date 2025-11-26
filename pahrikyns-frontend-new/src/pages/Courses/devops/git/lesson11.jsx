export const meta = {
  title: "Git Lesson 11",
  description: "What is merge conflict, how to detect, how to solve using manual edit or tools.",
  difficulty: "Intermediate",
  duration: "14 min",
  tags: ['git','conflict'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson11() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 11</h1>

      <h2>What is a Merge Conflict?</h2>
      <p>
        A merge conflict happens when Git cannot automatically merge changes because 
        two branches modified the same part of the same file.
      </p>

      <h2>Conflict Example</h2>
      <pre>
{`<<<<<<< HEAD
console.log("User A version");
=======
console.log("User B version");
>>>>>>> feature-branch`}
      </pre>

      <h2>How to Solve</h2>
      <ul>
        <li>Open the conflicted file.</li>
        <li>Decide which version to keep (or combine both).</li>
        <li>Delete conflict markers (&lt;&lt;&lt;&lt;&lt;&lt;&lt; , ===== , &gt;&gt;&gt;&gt;&gt;&gt;&gt;)</li>
        <li><code>git add file</code></li>
        <li><code>git commit</code></li>
      </ul>

      <h3>Using VSCode</h3>
      <p>Click “Accept Current / Incoming / Both” options.</p>
    </div>
  );
}

Lesson11.displayName = "GIT Lesson 11 – Full Content";
export default Lesson11;
