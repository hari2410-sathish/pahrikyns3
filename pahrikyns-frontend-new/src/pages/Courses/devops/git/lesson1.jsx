export const meta = {
  title: "Git Lesson 1",
  description: "What is Git, why use Git, Git architecture, working directory, staging, repository.",
  difficulty: "Beginner",
  duration: "9 min",
  tags: ['git'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson1() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 1</h1>

      <h2>What is Git?</h2>
      <p>
        Git is a <strong>Distributed Version Control System (DVCS)</strong> used to track changes in files
        and coordinate work among multiple people. Every developer has a full copy of the repository.
      </p>

      <h2>Why Use Git?</h2>
      <ul>
        <li>Track every change made to the code.</li>
        <li>Recover older versions easily.</li>
        <li>Create branches for features.</li>
        <li>Merge code safely.</li>
        <li>Work offline.</li>
      </ul>

      <h2>Git Architecture</h2>
      <ul>
        <li><strong>Working Directory:</strong> Your project files.</li>
        <li><strong>Staging Area:</strong> Files prepared for commit.</li>
        <li><strong>Local Repository:</strong> Your commits stored inside <code>.git</code>.</li>
        <li><strong>Remote Repository:</strong> GitHub, GitLab, Bitbucket.</li>
      </ul>

      <h2>Example</h2>
      <pre>
{`git init
echo "hello" > a.txt
git add a.txt
git commit -m "first commit"`}
      </pre>
    </div>
  );
}

Lesson1.displayName = "GIT Lesson 1 – Full Content";
export default Lesson1;
