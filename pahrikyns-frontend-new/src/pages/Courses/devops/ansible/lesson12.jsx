export const meta = {
  title: "Ansible Lesson 12",
  description: "Install packages, manage services, create/delete users.",
  difficulty: "Advanced",
  duration: "14 min",
  tags: ['ansible','services','users'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson12() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 12</h1>

      <h2>Installing Packages</h2>
      <pre>
{`- name: Install NGINX
  apt:
    name: nginx
    state: present`}
      </pre>

      <h2>Managing Services</h2>
      <pre>
{`- name: Start NGINX
  service:
    name: nginx
    state: started`}
      </pre>

      <h2>Creating Users</h2>
      <pre>
{`- name: Create user
  user:
    name: devuser
    shell: /bin/bash`}
      </pre>

      <h2>Removing Users</h2>
      <pre>
{`- name: Delete user
  user:
    name: testuser
    state: absent`}
      </pre>

      <p>Ideal for provisioning servers automatically.</p>
    </div>
  );
}

Lesson12.displayName = "ANSIBLE Lesson 12 – Full Content";
export default Lesson12;
