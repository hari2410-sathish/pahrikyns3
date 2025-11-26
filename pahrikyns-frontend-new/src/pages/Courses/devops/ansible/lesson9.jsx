export const meta = {
  title: "Ansible Lesson 9",
  description: "Using loops, when conditions, iterative tasks.",
  difficulty: "Intermediate",
  duration: "13 min",
  tags: ['ansible','loops','conditionals'],
  updated: "2025-11-25",
  thumbnail: ""
};

function Lesson9() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ANSIBLE - Lesson 9</h1>

      <h2>Loops</h2>
      <pre>
{`tasks:
  - name: Install packages
    apt:
      name: "{{ item }}"
      state: present
    loop:
      - git
      - curl
      - tree`}
      </pre>

      <h2>Conditionals</h2>
      <pre>
{`- name: Install Apache on Ubuntu
  apt:
    name: apache2
    state: present
  when: ansible_os_family == "Debian"`}
      </pre>

      <p>Loops reduce repetitive tasks; conditionals make logic flexible.</p>
    </div>
  );
}

Lesson9.displayName = "ANSIBLE Lesson 9 – Full Content";
export default Lesson9;
