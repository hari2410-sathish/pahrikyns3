export const meta = {
  title: "Ansible Lesson 14",
  description: "Complete real-world project: deploy a production web server.",
  difficulty: "Advanced",
  duration: "20 min",
  tags: ['ansible','project','deployment'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson14() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 14</h1>

      <h2>Objective</h2>
      <p>Deploy a production-ready Apache+PHP application.</p>

      <h2>Folder Structure</h2>
      <pre>
{`project/
  roles/
    web/
      tasks/
      templates/
      files/
  inventory
  site.yml`}
      </pre>

      <h2>site.yml</h2>
      <pre>
{`---
- hosts: web
  become: yes
  roles:
    - web`}
      </pre>

      <h2>web/tasks/main.yml</h2>
      <pre>
{`- name: Install packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - apache2
    - php

- name: Deploy index file
  template:
    src: index.php.j2
    dest: /var/www/html/index.php`}
      </pre>

      <p>This mirrors real DevOps company workflows.</p>
    </div>
  );
}

Lesson14.displayName = "ANSIBLE Lesson 14 – Full Content";
export default Lesson14;
