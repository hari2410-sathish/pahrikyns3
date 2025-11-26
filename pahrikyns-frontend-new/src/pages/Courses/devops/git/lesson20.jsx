export const meta = {
  title: "Git Lesson 20",
  description: "Final exam instructions, pass criteria, 75 questions external file.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['git','exam'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson20() {
  return (
    <div style={{ padding: 20 }}>
      <h1>GIT - Lesson 20</h1>

      <h2>Final Exam Structure</h2>
      <ul>
        <li>Total Questions: <strong>75</strong></li>
        <li>Pass Mark: <strong>67</strong></li>
        <li>Fail = Must repeat module</li>
        <li>Exam covers: Lesson 1–19</li>
      </ul>

      <h2>Checklist Before Exam</h2>
      <ul>
        <li>Completed all Git tasks</li>
        <li>Understanding of rebase, merge, conflict solving</li>
        <li>Know how to undo changes safely</li>
        <li>Cloning, branching, pushing</li>
      </ul>

      <h2>Exam JSON Location</h2>
      <p>Place <code>git_exam.json</code> inside this folder for auto-load in UI.</p>
    </div>
  );
}

Lesson20.displayName = "GIT Lesson 20 – Full Content";
export default Lesson20;
