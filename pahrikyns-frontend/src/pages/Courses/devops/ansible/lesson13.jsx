// ----------------------------------------------
// ANSIBLE – LESSON 13 : REAL WORLD PROJECT – 1
// Single Server Automation (Beginner → Real Zone)
// ----------------------------------------------

export const meta = {
  title: "Ansible Lesson 13 – Real World Project 1 (Single Server Automation)",
  description:
    "Real-time Ansible project: Automate a single Linux server to install Nginx, Docker, start services, and verify using ad-hoc + playbook.",
  difficulty: "Intermediate",
  duration: "60–90 min",
  tags: ["ansible", "project", "real-world", "automation", "devops"],
  updated: "2025-12-06",
  thumbnail: "",
};

export default function Lesson13() {
  return (
    <div style={{ padding: 20, lineHeight: 1.9 }}>

      <h1>ANSIBLE – LESSON 13</h1>
      <h2>✅ REAL WORLD PROJECT – 1 (Single Server Automation)</h2>

      <hr />

      {/* PROJECT OVERVIEW */}
      <h2>🔷 Project Overview</h2>
      <p>
        In this project, we will use Ansible to fully automate a single Linux
        server. This is exactly how beginners enter the real DevOps production
        world.
      </p>

      <p><b>We will automate:</b></p>
      <ul>
        <li>Install Nginx Web Server</li>
        <li>Install Docker</li>
        <li>Start & enable services</li>
        <li>Verify installation using ad-hoc commands</li>
      </ul>

      <p>
        This project is very important for:
        <b> Entry level DevOps Engineer, Cloud Engineer, Automation Engineer.</b>
      </p>

      <hr />

      {/* ARCHITECTURE */}
      <h2>🔷 Architecture of This Project</h2>
      <pre>
Control Node (Ansible Installed)
        |
        |
        SSH
        |
        |
Managed Node (Linux Server)
(Nginx + Docker will be installed)
      </pre>

      <ul>
        <li><b>Control Node:</b> Your laptop / EC2 / VM where Ansible is installed</li>
        <li><b>Managed Node:</b> One Linux server (Ubuntu / CentOS)</li>
        <li><b>Connection:</b> SSH only</li>
      </ul>

      <hr />

      {/* STEP 1 */}
      <h2>✅ Step 1: Setup Inventory File</h2>
      <p>Create a file called <b>inventory</b></p>

      <pre>
[web]
192.168.1.10 ansible_user=ubuntu
      </pre>

      <p>
        ✅ This means:  
        One server is grouped under <b>web</b> group  
      </p>

      <hr />

      {/* STEP 2 */}
      <h2>✅ Step 2: Verify Connection (Ad-hoc)</h2>

      <pre>
ansible web -i inventory -m ping
      </pre>

      <p>
        If successful, you will get:
      </p>

      <pre>
SUCCESS => ping: pong
      </pre>

      <p>
        ✅ This confirms SSH + Ansible communication is working.
      </p>

      <hr />

      {/* STEP 3 */}
      <h2>✅ Step 3: Create Playbook</h2>
      <p>Create a file: <b>project1.yml</b></p>

      <pre>
---
- name: Real World Project 1 - Single Server Automation
  hosts: web
  become: yes

  tasks:

    - name: Update package cache
      apt:
        update_cache: yes

    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Install Docker
      apt:
        name: docker.io
        state: present

    - name: Start Nginx service
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Start Docker service
      service:
        name: docker
        state: started
        enabled: yes
      </pre>

      <p>
        ✅ This playbook will:
      </p>
      <ul>
        <li>Update OS</li>
        <li>Install Nginx</li>
        <li>Install Docker</li>
        <li>Start both services</li>
        <li>Enable auto-start on boot</li>
      </ul>

      <hr />

      {/* STEP 4 */}
      <h2>✅ Step 4: Run the Playbook</h2>

      <pre>
ansible-playbook -i inventory project1.yml
      </pre>

      <p>
        ✅ After success, your server will have:
        <b> Nginx + Docker installed and running.</b>
      </p>

      <hr />

      {/* STEP 5 */}
      <h2>✅ Step 5: Verify Using Ad-hoc Commands</h2>

      <pre>
ansible web -i inventory -a "nginx -v"
ansible web -i inventory -a "docker --version"
ansible web -i inventory -a "systemctl status nginx"
ansible web -i inventory -a "systemctl status docker"
      </pre>

      <p>
        ✅ This confirms real production validation.
      </p>

      <hr />

      {/* REAL TIME USAGE */}
      <h2>🔷 Where This Project Is Used in Real Companies?</h2>
      <ul>
        <li>Initial server provisioning</li>
        <li>Automated web server setup</li>
        <li>Docker installation for DevOps pipelines</li>
        <li>AWS EC2 bootstrap automation</li>
      </ul>

      <hr />

      {/* COMMON ERRORS */}
      <h2>⚠️ Common Errors & Fixes</h2>
      <ul>
        <li><b>SSH unreachable:</b> Check security group & port 22</li>
        <li><b>Permission denied:</b> Use correct ansible_user</li>
        <li><b>Docker not starting:</b> Use <code>become: yes</code></li>
      </ul>

      <hr />

      {/* INTERVIEW QUESTIONS */}
      <h2>🎯 Interview Questions from This Project</h2>
      <ul>
        <li>How do you automate server setup using Ansible?</li>
        <li>Difference between ad-hoc and playbook?</li>
        <li>Why become: yes is required?</li>
        <li>How do you verify services remotely?</li>
        <li>How Ansible uses SSH in projects?</li>
      </ul>

      <hr />

      {/* SUMMARY */}
      <h2>✅ Lesson 13 Summary</h2>
      <ul>
        <li>You automated a complete Linux server</li>
        <li>You installed Nginx + Docker using playbook</li>
        <li>You verified using ad-hoc</li>
        <li>You entered real DevOps automation zone ❗</li>
      </ul>

      <h2 style={{ marginTop: 30 }}>🔥 End of Project 1</h2>

      <div style={{
        background: "#e8f7ff",
        padding: 16,
        borderLeft: "5px solid #007bff",
        marginTop: 20
      }}>
        👉 When ready say: <b>“Lesson 14 project kudu da”</b>
      </div>

    </div>
  );
}

Lesson13.displayName = "ANSIBLE Lesson 13 – Real World Project 1";
