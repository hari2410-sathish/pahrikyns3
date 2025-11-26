export const meta = {
  title: "Kubernetes Lesson 11",
  description: "Create a production-grade Kubernetes cluster using Kops on AWS.",
  difficulty: "Intermediate",
  duration: "15 min",
  tags: ['kubernetes','kops','aws'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson11() {
  return (
    <div style={{ padding: 20 }}>
      <h1>KUBERNETES - Lesson 11</h1>

      <h2>Prerequisites</h2>
      <ul>
        <li>AWS CLI configured</li>
        <li>IAM User with admin permissions</li>
        <li>Kops installed</li>
        <li>Route53 Hosted Zone</li>
      </ul>

      <h2>Create S3 Bucket for Kops State</h2>
      <pre>{`aws s3api create-bucket --bucket kops-state-bucket`}</pre>

      <h2>Export Environment Variables</h2>
      <pre>
{`export KOPS_STATE_STORE=s3://kops-state-bucket
export NAME=mycluster.k8s.local`}
      </pre>

      <h2>Create Cluster</h2>
      <pre>
{`kops create cluster --zones=ap-south-1a ${'$'}NAME`}
      </pre>

      <h2>Apply Configuration</h2>
      <pre>{`kops update cluster ${'$'}NAME --yes`}</pre>

      <p>Your cluster will be created inside AWS automatically.</p>
    </div>
  );
}

Lesson11.displayName = "KUBERNETES Lesson 11 – Full Content";
export default Lesson11;
