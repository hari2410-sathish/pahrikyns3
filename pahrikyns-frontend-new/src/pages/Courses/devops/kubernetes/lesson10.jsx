export const meta = {
  title: "Kubernetes Lesson 10",
  description: "Create IAM user, install AWS CLI, configure credentials.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['kubernetes','aws','kops'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson10() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 10</h1>

      <h2>Create IAM User (Programmatic)</h2>
      <p>AWS → IAM → Users → Create User → Access Key Enabled.</p>

      <h2>Install AWS CLI</h2>
      <pre>
{`curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install`}
      </pre>

      <h2>Configure AWS CLI</h2>
      <pre>{`aws configure`}</pre>

      <h2>Install Kops</h2>
      <pre>
{`curl -LO https://github.com/kubernetes/kops/releases/latest/download/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/local/bin/kops`}
      </pre>

      <p>Now your AWS environment is ready for cluster creation.</p>
    </div>
  );
}

Lesson10.displayName = "KUBERNETES Lesson 10 – Full Content";
export default Lesson10;
