export const meta = {
  title: "Ansible Lesson 2",
  description:
    "Pipeline, Pipeline Architecture, IT Infrastructure, Server, Storage, Security, Network, Database, Applications, Terraform Infrastructure, Master-Slave.",
  difficulty: "Beginner",
  duration: "45 min",
  tags: ["ansible", "architecture", "devops", "pipeline"],
  updated: "2025-11-25",
  thumbnail: "",
};

function Lesson2() {
  return (
    <div style={{ padding: 20, lineHeight: 1.8 }}>
      <h1>ANSIBLE – LESSON 2 (PIPELINE & INFRASTRUCTURE BASICS)</h1>

      {/* 1 */}
      <h2>1. What is Pipeline?</h2>
      <p>
        A pipeline is an automated process that takes your code from development
        stage to production automatically without manual work.
      </p>
      <p>
        <b>Simple Example:</b> Like a factory conveyor belt. One side raw
        material goes in, and finished product comes out on the other side.
      </p>
      <p>
        In DevOps, pipeline automatically:
      </p>
      <ul>
        <li>Builds the code</li>
        <li>Tests the code</li>
        <li>Deploys the application</li>
      </ul>

      {/* 2 */}
      <h2>2. What is Pipeline Architecture?</h2>
      <p>
        Pipeline architecture is the design or structure of how a pipeline is
        built and how stages are connected.
      </p>
      <h3>Typical CI/CD Pipeline Architecture</h3>
      <ul>
        <li>Source Code (Git)</li>
        <li>Build Stage (Maven / NPM)</li>
        <li>Test Stage (Automation Tests)</li>
        <li>Security Scan</li>
        <li>Deploy Stage (Ansible / Kubernetes)</li>
      </ul>
      <p>
        <b>Flow:</b> Developer → Git → Jenkins → Ansible → Production Server
      </p>

      {/* 3 */}
      <h2>3. Deep Explanation of a Pipeline Project</h2>
      <p>
        A pipeline project is a real-world setup where all software development
        processes are automated.
      </p>
      <h3>Example: Java Web Application Pipeline</h3>
      <ol>
        <li>Developer pushes code to GitHub</li>
        <li>Jenkins automatically detects the code</li>
        <li>Builds the project using Maven</li>
        <li>Runs test cases</li>
        <li>Creates a WAR or JAR file</li>
        <li>Ansible deploys it to servers</li>
        <li>Application goes live automatically</li>
      </ol>
      <p>
        <b>Result:</b> No manual deployment, no human error, faster delivery.
      </p>

      {/* 4 */}
      <h2>4. What is IT Infrastructure?</h2>
      <p>
        IT Infrastructure means all the hardware and software resources that
        are needed to run applications and store data in a company.
      </p>
      <ul>
        <li>Servers</li>
        <li>Network</li>
        <li>Storage</li>
        <li>Databases</li>
        <li>Security Systems</li>
        <li>Applications</li>
      </ul>

      {/* 5 */}
      <h2>5. What is a Server?</h2>
      <p>
        A server is a powerful computer that provides services to other
        computers (clients).
      </p>
      <p>
        <b>Example:</b> When you open a website, your computer is the client
        and the website computer is the server.
      </p>
      <ul>
        <li>Web Server – Hosts websites</li>
        <li>Database Server – Stores data</li>
        <li>Application Server – Runs backend logic</li>
      </ul>

      {/* 6 */}
      <h2>6. What is Storage?</h2>
      <p>
        Storage is a place where data is saved permanently.
      </p>
      <ul>
        <li>Hard Disk</li>
        <li>SSD</li>
        <li>Cloud Storage (AWS S3, Google Drive)</li>
      </ul>
      <p>
        <b>Example:</b> Your phone memory is also a type of storage.
      </p>

      {/* 7 */}
      <h2>7. What is Security?</h2>
      <p>
        Security means protecting systems, servers, and data from hackers and
        unauthorized users.
      </p>
      <ul>
        <li>Firewalls</li>
        <li>Antivirus</li>
        <li>Passwords</li>
        <li>Encryption</li>
        <li>Access Control</li>
      </ul>

      {/* 8 */}
      <h2>8. What is Network?</h2>
      <p>
        A network is a connection between computers or devices to share data.
      </p>
      <p>
        <b>Example:</b> Internet is the biggest network in the world.
      </p>
      <ul>
        <li>LAN – Local Area Network</li>
        <li>WAN – Wide Area Network</li>
        <li>Cloud Network (VPC)</li>
      </ul>

      {/* 9 */}
      <h2>9. What is a Database?</h2>
      <p>
        A database is a place where structured data is stored and managed.
      </p>
      <ul>
        <li>MySQL</li>
        <li>PostgreSQL</li>
        <li>MongoDB</li>
        <li>Oracle</li>
      </ul>
      <p>
        <b>Example:</b> Your login username and password are stored in a database.
      </p>

      {/* 10 */}
      <h2>10. What is an Application?</h2>
      <p>
        An application is a software program that users interact with.
      </p>
      <ul>
        <li>Mobile Apps (WhatsApp, Instagram)</li>
        <li>Web Apps (Gmail, Amazon)</li>
        <li>Desktop Apps (MS Word)</li>
      </ul>

      {/* 11 */}
      <h2>11. How to Write Infrastructure in Terraform?</h2>
      <p>
        Terraform is an Infrastructure as Code tool used to create cloud
        resources using simple text files.
      </p>

      <h3>Basic Example (Create EC2 Server)</h3>
      <pre>{`
provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "myserver" {
  ami           = "ami-0abcdef"
  instance_type = "t2.micro"
}
      `}</pre>

      <p>
        This code automatically creates a server in AWS.
      </p>

      {/* 12 */}
      <h2>12. What is Master and Slave Configuration?</h2>
      <p>
        Master and Slave is an architecture where one main system controls
        multiple secondary systems.
      </p>

      <ul>
        <li>
          <b>Master:</b> Main controlling system
        </li>
        <li>
          <b>Slave:</b> Systems that follow master
        </li>
      </ul>

      <p>
        <b>Examples:</b>
      </p>
      <ul>
        <li>Database Replication (Primary & Replica)</li>
        <li>Jenkins Master & Agent</li>
        <li>Ansible Control Node & Managed Nodes</li>
      </ul>

      <hr />

      <h2>✅ Lesson 2 Summary</h2>
      <ul>
        <li>Pipeline automates build, test, deploy</li>
        <li>Pipeline architecture defines stages</li>
        <li>IT infrastructure includes servers, storage, network</li>
        <li>Terraform creates infrastructure using code</li>
        <li>Master-Slave is a control architecture</li>
      </ul>

      <h2>🎯 End of Lesson 2</h2>
    </div>
  );
}

Lesson2.displayName = "ANSIBLE Lesson 2 – Full Content";
export default Lesson2;
