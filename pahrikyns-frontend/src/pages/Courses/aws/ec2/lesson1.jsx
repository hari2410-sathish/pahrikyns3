// src/pages/Courses/aws/cloud-basics/lesson1.jsx

export const meta = {
  title: "Cloud Basics – Lesson 1: What is Cloud Computing?",
  description:
    "Learn what cloud computing is, how it works, and why AWS is the most popular cloud platform. This beginner-friendly lesson explains cloud concepts with real-world examples.",
  difficulty: "Beginner",
  duration: "50 min",
  tags: [["aws"], ["cloud-basics"], ["cloud-computing"]],
  updated: "2026-01-06",
  thumbnail: "/assets/aws/cloud-basics/lesson1.png",
};

function Lesson1() {
  return (
    <div className="lesson-container">
      {/* ========================= */}
      {/* LESSON TITLE */}
      {/* ========================= */}
      <h1>What is Cloud Computing?</h1>

      <p>
        Cloud computing is the foundation of modern IT infrastructure. Instead
        of buying and maintaining physical servers, cloud computing allows you
        to access computing resources such as servers, storage, databases, and
        networking over the internet.
      </p>

      {/* ========================= */}
      {/* SECTION 1 */}
      {/* ========================= */}
      <h2>1. Understanding Cloud Computing</h2>
      <p>
        Cloud computing means renting computing power instead of owning it. You
        can create servers, store data, and run applications without purchasing
        hardware or building data centers.
      </p>

      <p>
        Cloud services are delivered on-demand, meaning you can start and stop
        resources whenever you want and pay only for what you use.
      </p>

      {/* ========================= */}
      {/* SECTION 2 */}
      {/* ========================= */}
      <h2>2. Real-World Example</h2>
      <p>
        Imagine launching an online shopping website. Without cloud computing,
        you must buy servers, install operating systems, and manage networking.
        With AWS cloud, you can launch a server within minutes using just a few
        clicks.
      </p>

      {/* ========================= */}
      {/* SECTION 3 */}
      {/* ========================= */}
      <h2>3. Traditional IT vs Cloud Computing</h2>
      <ul>
        <li>Traditional IT requires heavy upfront investment</li>
        <li>Cloud uses a pay-as-you-go pricing model</li>
        <li>Cloud allows instant scalability</li>
        <li>Cloud reduces maintenance overhead</li>
      </ul>

      {/* ========================= */}
      {/* SECTION 4 */}
      {/* ========================= */}
      <h2>4. Types of Cloud Services</h2>

      <h3>IaaS (Infrastructure as a Service)</h3>
      <p>
        Infrastructure as a Service provides virtual servers, storage, and
        networking. Example: Amazon EC2.
      </p>

      <h3>PaaS (Platform as a Service)</h3>
      <p>
        Platform as a Service allows developers to deploy applications without
        managing infrastructure. Example: AWS Elastic Beanstalk.
      </p>

      <h3>SaaS (Software as a Service)</h3>
      <p>
        Software as a Service provides ready-to-use applications over the
        internet. Example: Gmail, Zoom.
      </p>

      {/* ========================= */}
      {/* SECTION 5 */}
      {/* ========================= */}
      <h2>5. What is AWS?</h2>
      <p>
        AWS stands for Amazon Web Services. It is the world’s largest cloud
        computing platform offering more than 200 services including computing,
        storage, networking, security, and analytics.
      </p>

      {/* ========================= */}
      {/* SECTION 6 */}
      {/* ========================= */}
      <h2>6. AWS Global Infrastructure</h2>
      <p>
        AWS operates globally using Regions and Availability Zones. Each region
        contains multiple data centers to ensure high availability and fault
        tolerance.
      </p>

      {/* ========================= */}
      {/* SECTION 7 */}
      {/* ========================= */}
      <h2>7. Benefits of Cloud Computing</h2>
      <ul>
        <li>Scalability</li>
        <li>High availability</li>
        <li>Security</li>
        <li>Cost efficiency</li>
        <li>Global reach</li>
      </ul>

      {/* ========================= */}
      {/* SECTION 8 */}
      {/* ========================= */}
      <h2>8. Cloud Computing in Daily Life</h2>
      <p>
        Services like WhatsApp, Google Drive, Netflix, and YouTube run entirely
        on cloud infrastructure.
      </p>

      {/* ========================= */}
      {/* SECTION 9 */}
      {/* ========================= */}
      <h2>9. Cloud Careers</h2>
      <p>
        Learning AWS opens doors to careers such as Cloud Engineer, DevOps
        Engineer, and Solutions Architect with high salary potential.
      </p>

      {/* ========================= */}
      {/* SECTION 10 */}
      {/* ========================= */}
      <h2>10. Summary</h2>
      <p>
        Cloud computing allows businesses and individuals to use powerful IT
        resources without owning hardware. AWS is the leading cloud provider and
        mastering it is a valuable career skill.
      </p>
    </div>
  );
}

export default Lesson1;
