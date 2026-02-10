// src/pages/Courses/aws/cloud-basics/lesson2.jsx

export const meta = {
  title: "Cloud Basics – Lesson 2: Cloud Deployment Models",
  description:
    "Learn Public Cloud, Private Cloud, Hybrid Cloud and Multi-Cloud with real AWS examples, enterprise architectures, and job-ready understanding.",
  difficulty: "Beginner",
  duration: "60 min",
  tags: [["aws"], ["cloud-basics"], ["deployment-models"]],
  updated: "2026-01-06",
  thumbnail: "/assets/aws/cloud-basics/lesson2.png",
};

function Lesson2() {
  return (
    <div className="lesson-container">

      <h1>Cloud Deployment Models</h1>
      <p>
        Cloud Deployment Models describe how cloud infrastructure is deployed
        and who has access to it. These models decide whether your servers are
        public, private, or shared between both.
      </p>

      <h2>1. What is a Deployment Model?</h2>
      <p>
        A deployment model defines where your cloud infrastructure runs and who
        controls it. Companies choose different deployment models based on
        security, cost, and compliance needs.
      </p>

      <h2>2. Types of Cloud Deployment Models</h2>
      <ul>
        <li>Public Cloud</li>
        <li>Private Cloud</li>
        <li>Hybrid Cloud</li>
        <li>Multi Cloud</li>
      </ul>

      <h2>3. Public Cloud</h2>
      <p>
        Public cloud means infrastructure owned by a cloud provider like AWS
        and shared by many customers securely.
      </p>

      <p>
        When you create an EC2 instance in AWS, it is part of the public cloud.
      </p>

      <h3>Public Cloud Example</h3>
      <p>
        Netflix runs on AWS public cloud. Millions of users watch movies every
        day using AWS servers.
      </p>

      <h2>4. Private Cloud</h2>
      <p>
        A private cloud is a cloud environment dedicated to a single
        organization.
      </p>

      <p>
        Banks and governments use private clouds for security.
      </p>

      <h3>Private Cloud Example</h3>
      <p>
        A bank may use AWS Outposts or its own data center to build a private
        cloud.
      </p>

      <h2>5. Hybrid Cloud</h2>
      <p>
        Hybrid cloud means using both private cloud and public cloud together.
      </p>

      <p>
        Example: Customer data stays in private cloud, website runs on AWS.
      </p>

      <h2>6. Multi Cloud</h2>
      <p>
        Multi-cloud means using multiple cloud providers such as AWS + Azure +
        Google Cloud.
      </p>

      <h3>Why Multi Cloud?</h3>
      <ul>
        <li>Avoid vendor lock-in</li>
        <li>Better reliability</li>
        <li>Use best services from each provider</li>
      </ul>

      <h2>7. Comparison Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Model</th>
            <th>Ownership</th>
            <th>Security</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Public Cloud</td>
            <td>AWS</td>
            <td>High</td>
            <td>Low</td>
          </tr>
          <tr>
            <td>Private Cloud</td>
            <td>Company</td>
            <td>Very High</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Hybrid Cloud</td>
            <td>Both</td>
            <td>Very High</td>
            <td>Medium</td>
          </tr>
        </tbody>
      </table>

      <h2>8. Real Company Example</h2>
      <p>
        An online shopping company stores payments in private cloud but runs
        website on AWS public cloud.
      </p>

      <h2>9. Interview Questions</h2>
      <ul>
        <li>What is public cloud?</li>
        <li>What is hybrid cloud?</li>
        <li>Why companies use multi cloud?</li>
      </ul>

      <h2>10. Summary</h2>
      <p>
        Cloud deployment models help companies choose how to run their
        infrastructure. AWS supports all deployment models.
      </p>

    </div>
  );
}

export default Lesson2;
