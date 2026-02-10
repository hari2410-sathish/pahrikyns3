export const devopsData = {
  "devops-intro": {
    title: "DevOps Introduction & Culture",
    description: "Understand the philosophy, practices, and tools that help organizations deliver applications at high velocity.",
    longDescription: `
      DevOps is the combination of cultural philosophies, practices, and tools that increases an organization’s ability to deliver applications and services at high velocity.
      
      ### Key Practices:
      - **Continuous Integration**: Merging code changes into a central repository where automated builds and tests run.
      - **Continuous Delivery**: Automatically deploying all code changes to a testing and/or production environment after the build stage.
      - **Microservices**: The architecture of designing a single application as a suite of small services.
      - **Infrastructure as Code**: Managing and provisioning infrastructure through code and software development techniques.
    `,
    image: "https://www.atlassian.com/dam/jcr:b2829141-92bc-4545-a4b0-96b6b5502575/DevOps-Diagram-01.png",
    videoUrl: "https://www.youtube.com/embed/9pZ2xmsSDdo", // Valid DevOps Intro Video
    codeExample: {
      language: "yaml",
      title: "DevOps Pipeline Definition (GitLab CI)",
      content: `
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2

build_frontend:
  stage: build
  image: node:18
  script:
    - echo "Building Frontend..."
    - cd frontend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - frontend/dist

test_frontend:
  stage: test
  image: node:18
  script:
    - cd frontend
    - npm test

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to Staging Server..."
    - scp -r frontend/dist user@staging:/var/www/html
  only:
    - develop

# ... (Imagine hundreds more lines of complex pipeline logic)
      `
    }
  },
  "linux-for-devops": {
    title: "Linux for DevOps",
    description: "Essential Linux skills for every DevOps engineer. Process management, file systems, and networking.",
    codeExample: { language: "bash", title: "Server Hardening Script", content: "#!/bin/bash\n# Disabling root login\nsed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config\nservice sshd restart" }
  },
  "git": {
    title: "Git & Version Control: Master Class",
    description: "The definitive guide to distributed version control. From 'git init' to advanced rebasing strategies.",
    longDescription: `
      Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.
      
      ### Core Concepts (Lesson 1 Basics):
      - **Repository (Repo)**: A directory which contains your project work, as well as a few files (inside .git) which are used to communicate with Git.
      - **Commit**: A snapshot of your repo at a specific point in time.
      - **Branch**: A lightweight movable pointer to one of these commits.
      - **Staging Area**: A file, generally contained in your Git directory, that stores information about what will go into your next commit.
      
      ### The Three States:
      1.  **Modified**: You have changed the file but have not committed it to your database yet.
      2.  **Staged**: You have marked a modified file in its current version to go into your next commit snapshot.
      3.  **Committed**: The data is safely stored in your local database.
    `,
    image: "https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png",
    videoUrl: "https://www.youtube.com/embed/8JJ101D3knE", // Git Tutorial for Beginners Video
    table: {
      headers: ["Command", "Action", "Context"],
      rows: [
        ["git init", "Initialize a local Git repository", "Start a new project"],
        ["git clone [url]", "Download a project and its entire history", "Join existing project"],
        ["git add [file]", "Add a file to the staging area", "Prepare for commit"],
        ["git commit -m '[msg]'", "Record changes to the repository", "Save history"],
        ["git status", "List the files you've changed and those you still need to add or commit", "Check state"],
        ["git push", "Upload local repository content to a remote repository", "Share work"],
        ["git pull", "Fetch from and integrate with another repository or a local branch", "Update local"],
      ]
    },
    codeExample: {
      language: "bash",
      title: "Complete Git Workflow & Configuration",
      content: `
# ==========================================
# 1. Global Configuration (One Time Setup)
# ==========================================
# Set your identity
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

# Set default branch name to main
git config --global init.defaultBranch main

# Enable colorful output
git config --global color.ui auto

# Configure default editor (Vim/Nano/VSCode)
git config --global core.editor "code --wait"

# Check configuration
git config --list


# ==========================================
# 2. Starting a New Project
# ==========================================
mkdir my-awesome-project
cd my-awesome-project
git init
# Output: Initialized empty Git repository in /path/to/my-awesome-project/.git/


# ==========================================
# 3. Basic Workflow
# ==========================================
# Create a file
echo "# My Awesome Project" > README.md

# Check status (Untracked)
git status

# Add to staging
git add README.md

# Check status (Staged)
git status

# Commit
git commit -m "Initial commit: Add README"
# Output: [main (root-commit) 1234567] Initial commit: Add README


# ==========================================
# 4. Branching & Merging
# ==========================================
# Create and switch to a new feature branch
git checkout -b feature/login-page

# Make changes
echo "Login Logic Here" > login.js
git add login.js
git commit -m "Add login functionality"

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/login-page
# (Fast-forward merge if no divergence)


# ==========================================
# 5. Remote Repositories
# ==========================================
# Add a remote (e.g., GitHub)
git remote add origin https://github.com/johndoe/my-awesome-project.git

# Push changes
git push -u origin main


# ==========================================
# 6. Advanced: Interactive Rebase
# ==========================================
# Clean up commit history before pushing
git rebase -i HEAD~3
# Opens editor to squash/fixup commits:
# pick 1234567 Fix typo
# squash 890abcd Update styles
# pxck 4567890 Add comments


# ==========================================
# 7. \`.gitignore\` Example
# ==========================================
# Create a .gitignore file to exclude patterns
cat <<EOF > .gitignore
folder/
*.log
node_modules/
.env
EOF
      `
    }
  },
  "jenkins": {
    title: "Jenkins CI/CD",
    description: "The leading open source automation server. Build, deploy, and automate any project.",
    codeExample: { language: "groovy", title: "Complex Jenkinsfile", content: "pipeline { agent any\n options { timeout(time: 1, unit: 'HOURS') } ... }" }
  },
  "docker": {
    title: "Docker Containerization",
    description: "Build, ship, and run any app anywhere. Dockerfiles, Compose, and Swarm.",
    codeExample: { language: "dockerfile", title: "Multi-Stage Dockerfile", content: "FROM golang:1.16 AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o main ." }
  },
  "k8s-architecture": {
    title: "Kubernetes Architecture",
    description: "Understand the Control Plane, Nodes, Pods, and the API Server.",
    codeExample: { language: "yaml", title: "Cluster Component Diagram (Text)", content: "# Control Plane: API Server, etcd, Scheduler, Controller Manager..." }
  },
  "k8s-administration": {
    title: "Kubernetes Administration",
    description: "Managing clusters, RBAC, upgradation, and backup strategies.",
    codeExample: { language: "bash", title: "Kubectl Admin Commands", content: "kubectl get nodes\nkubectl drain node-1 --ignore-daemonsets" }
  },
  "helm-charts": {
    title: "Helm Charts",
    description: "The package manager for Kubernetes. Define, install, and upgrade applications.",
    codeExample: { language: "yaml", title: "Chart.yaml & Values.yaml", content: "apiVersion: v2\nname: mychart\nversion: 0.1.0" }
  },
  "ansible": {
    title: "Ansible",
    description: "Simple, agentless IT automation. Playbooks, Roles, and Inventory.",
    codeExample: { language: "yaml", title: "Web Server Playbook", content: "- hosts: all\n  tasks:\n  - name: Install Apache\n    apt: name=apache2 state=present" }
  },
  "terraform": {
    title: "Terraform",
    description: "Infrastructure as Code. Plan, Apply, and Destroy cloud resources.",
    codeExample: { language: "hcl", title: "Multi-Cloud Provisoning", content: "resource \"aws_instance\" \"x\" {}\nresource \"azurerm_virtual_machine\" \"y\" {}" }
  },
  "prometheus": {
    title: "Prometheus Monitoring",
    description: "Power your metrics and alerting with a leading open-source monitoring solution.",
    codeExample: { language: "yaml", title: "Prometheus Config", content: "scrape_configs:\n  - job_name: 'node_exporter'\n    static_configs: ..." }
  },
  "grafana": {
    title: "Grafana Visualization",
    description: "The open observability platform. Dashboards for your metrics, logs, and traces.",
    codeExample: { language: "json", title: "Dashboard JSON Model", content: "{ \"title\": \"System Overview\", \"panels\": [ ... ] }" }
  },
  "splunk": {
    title: "Splunk",
    description: "The Data-to-Everything Platform. Search, monitor, and analyze machine-generated data.",
    codeExample: { language: "bash", title: "Splunk Query Language (SPL)", content: "sourcetype=access_combined | timechart spans=1h count by status" }
  },
  "nagios": {
    title: "Nagios",
    description: "The industry standard in IT infrastructure monitoring.",
    codeExample: { language: "bash", title: "Plugin Configuration", content: "define service {\n use generic-service\n host_name localhost\n service_description Disk Space\n check_command check_local_disk!20%!10% ... }" }
  },
  "maven": {
    title: "Apache Maven",
    description: "Build automation tool used primarily for Java projects.",
    codeExample: { language: "xml", title: "pom.xml dependency management", content: "<dependency>\n  <groupId>org.springframework</groupId>\n  <artifactId>spring-core</artifactId>...</dependency>" }
  },
  "gradle": {
    title: "Gradle",
    description: "Build automation evolved. Fast, flexible, and polyglot build system.",
    codeExample: { language: "groovy", title: "build.gradle", content: "apply plugin: 'java'\nrepositories { mavenCentral() }\ndependencies { implementation 'com.google.guava:guava:30.1.1-jre' }" }
  },
  "sonarqube": {
    title: "SonarQube",
    description: "Code Quality and Security. Clean Code for all developers.",
    codeExample: { language: "bash", title: "Sonar Scanner Command", content: "sonar-scanner -Dsonar.projectKey=myproject -Dsonar.sources=." }
  },
  "azure-devops": {
    title: "Azure DevOps",
    description: "Plan smarter, collaborate better, and ship faster with a set of modern dev services.",
    codeExample: { language: "yaml", title: "Azure Pipelines YAML", content: "pool:\n  vmImage: 'ubuntu-latest'\nsteps:\n- script: echo Hello, world!" }
  },
  "devsecops": {
    title: "DevSecOps",
    description: "Integrating security best practices into your DevOps pipeline.",
    codeExample: { language: "yaml", title: "Security Scan Stage", content: "trivy image --severity HIGH,CRITICAL my-app:latest" }
  },
  "sre": {
    title: "Site Reliability Engineering (SRE)",
    description: "Applies software engineering to infrastructure and operations problems.",
    codeExample: { language: "python", title: "Error Budget Calculator", content: "availability = (success_requests / total_requests) * 100" }
  }
};
