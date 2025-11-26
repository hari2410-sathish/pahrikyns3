export const meta = {
  title: "Kubernetes Lesson 20",
  description: "Final exam rules, 75 questions, pass mark (67), fail rules.",
  difficulty: "Intermediate",
  duration: "20 min",
  tags: ['kubernetes','exam'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson20() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 20</h1>

      <h2>Exam Details</h2>
      <ul>
        <li>Total Questions: <strong>75</strong></li>
        <li>Pass Mark: <strong>67</strong></li>
        <li>Fail → Repeat module</li>
        <li>Exam covers Lesson 1 → Lesson 19</li>
      </ul>

      <h2>Student Checklist</h2>
      <ul>
        <li>Understood Pods, Services, Ingress</li>
        <li>Knows Deployments & Rollbacks</li>
        <li>Understands CNI & Networking</li>
        <li>Knows how to create clusters</li>
        <li>Hands-on kubectl commands</li>
      </ul>

      <h2>Exam JSON File</h2>
      <p>
        Save <code>kubernetes_exam.json</code> in this folder for auto-loading in UI.
      </p>
    </div>
  );
}

Lesson20.displayName = "KUBERNETES Lesson 20 – Full Content";
export default Lesson20;
