export const meta = {
  title: "Git Lesson 17",
  description: "Git hooks (pre-commit, pre-push) and GPG signed commits.",
  difficulty: "Advanced",
  duration: "16 min",
  tags: ['git','hooks','security'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson17() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 17</h1>

      <h2>What Are Git Hooks?</h2>
      <p>
        Hooks are scripts Git runs on certain events like commit, push, merge.
        Located in <code>.git/hooks</code>.
      </p>

      <h2>Common Hooks</h2>
      <ul>
        <li><strong>pre-commit:</strong> run lint/tests before committing</li>
        <li><strong>commit-msg:</strong> validate commit message format</li>
        <li><strong>pre-push:</strong> test before pushing</li>
      </ul>

      <h2>Example: pre-commit Hook</h2>
      <pre>
{`#!/bin/sh
npm test`}
      </pre>

      <h2>Signed Commits</h2>
      <p>Used for security and verifying author identity.</p>

      <pre>
{`git commit -S -m "secure commit message"`}
      </pre>
    </div>
  );
}

Lesson17.displayName = "GIT Lesson 17 – Full Content";
export default Lesson17;
