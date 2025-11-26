export const meta = {
  title: "Git Lesson 14",
  description: "Real world banking project, monorepo/polyrepo structure, branching model.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['git','project'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson14() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 14</h1>

      <h2>Online Banking Project Overview</h2>
      <p>
        A banking project typically contains multiple microservices: authentication,
        transactions, accounts, notifications, UI frontend.
      </p>

      <h2>Repository Structure</h2>
      <pre>
{`/auth-service
/account-service
/transaction-service
/notification-service
/ui-frontend
/infrastructure`}
      </pre>

      <h2>Branching Strategy</h2>
      <ul>
        <li><strong>main</strong> → production</li>
        <li><strong>develop</strong> → integration</li>
        <li><strong>feature/*</strong> → new features</li>
        <li><strong>release/*</strong> → release prep</li>
        <li><strong>hotfix/*</strong> → emergency fixes</li>
      </ul>

      <h2>Commit Style</h2>
      <pre>
{`feat(auth): add JWT login
fix(transaction): rollback failure`}
      </pre>
    </div>
  );
}

Lesson14.displayName = "GIT Lesson 14 – Full Content";
export default Lesson14;
