export const meta = {
  title: "Ansible Lesson 15",
  description: "Integrate Ansible with CI/CD pipelines for automated deployment.",
  difficulty: "Advanced",
  duration: "18 min",
  tags: ['ansible','ci-cd','jenkins'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson15() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 15</h1>

      <h2>What CI/CD + Ansible Gives?</h2>
      <ul>
        <li>Automatic server provisioning</li>
        <li>No manual login to servers</li>
        <li>Infrastructure-as-Code workflow</li>
      </ul>

      <h2>Jenkins Pipeline Example</h2>
      <pre>
{`pipeline {
  stages {
    stage('Deploy') {
      steps {
        sh 'ansible-playbook site.yml'
      }
    }
  }
}`}
      </pre>

      <h2>GitHub Actions Example</h2>
      <pre>
{`name: Deploy App
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: ansible-playbook site.yml`}
      </pre>

      <p>This is how DevOps teams deploy apps daily.</p>
    </div>
  );
}

Lesson15.displayName = "ANSIBLE Lesson 15 – Full Content";
export default Lesson15;
