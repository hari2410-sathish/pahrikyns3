<#
generate_ultra_lessons.ps1
Ultra-Mega Lesson Generator (PowerShell) - CLEAN ASCII TITLES
Usage: run from project root that contains 'src/pages/Courses' or script will create it.
Generates 20 lessons per tool with meta, definitions, commands, SVG diagrams and exam JSON (75 questions).
This cleaned version avoids Unicode em-dashes and ampersands.
#>

param(
  [string]$Base = "src/pages/Courses"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Tools lists (confirmed)
$devops = @("git","docker","jenkins","kubernetes","ansible","terraform","grafana","prometheus","splunk")
$aws = @("ec2","load-balancer","auto-scaling","iam","lambda","route53","rds","s3","sns","sqs","vpc","ci-cd","cloud-basics")
$oss = @("linux-basics","ubuntu","centos","redhat","ubuntu-shell-script","windows-shell-script")

$allPacks = @{
  "devops" = $devops
  "aws"    = $aws
  "os"     = $oss
}

function Ensure-Dir([string]$p) {
  if (-not (Test-Path $p)) {
    New-Item -ItemType Directory -Path $p -Force | Out-Null
  }
}

function Get-LessonType($n) {
  if ($n -le 13) { return "theory" }
  if ($n -le 16) { return "project" }
  if ($n -le 18) { return "advanced" }
  if ($n -eq 19) { return "interview" }
  if ($n -eq 20) { return "exam" }
  return "theory"
}

function Get-Difficulty($n) {
  if ($n -le 6) { return "Beginner" }
  if ($n -le 13) { return "Intermediate" }
  return "Advanced"
}

# --- Content generators (clean ASCII titles and safe text) ---

function Get-Git-LessonContent($lessonNum, $tool) {
  $title = switch ($lessonNum) {
    1 { "What is Git - Version Control Basics" }
    2 { "Why use Git - Benefits and Use Cases" }
    3 { "Types of Version Control - LVCS CVCS DVCS" }
    4 { "Git Architecture - Repos Index Objects" }
    5 { "Working Directory vs Staging vs Local Repository" }
    6 { "Branches and Merging - Concepts" }
    7 { "Install Git - Ubuntu" }
    8 { "Install Git - CentOS / RHEL" }
    9 { "Install Git - Windows (Git Bash)" }
    10 { "Common Git Commands - add commit status log" }
    11 { "Remote Repositories - clone fetch pull push" }
    12 { "Handling Merge Conflicts and Tools" }
    13 { "Git Workflows - Gitflow Trunk GitHub Flow" }
    14 { "Project Part 1 - Online Banking - Repo and Branching" }
    15 { "Project Part 2 - Online Banking - CI and Hooks" }
    16 { "Project Part 3 - Online Banking - Deploy and Rollback" }
    17 { "Advanced Git - Rebase Stash Cherry-pick" }
    18 { "Git Internals - Objects and Packfiles" }
    19 { "Interview Q and A - Git" }
    20 { "Git Final Test - 75 Questions" }
    Default { "Git Lesson $lessonNum" }
  }

  $definition = switch ($lessonNum) {
    1 { @'
Git is a distributed version control system (DVCS) that tracks changes to files and coordinates work between multiple developers.
It stores snapshots of the repository content using an object model (blobs, trees, commits, tags).
'@ }
    2 { @'
Git provides fast branching and merging, local history, offline work, and a robust model for collaboration (pull requests, code review).
It reduces the risk of data loss and makes it easy to revert or inspect history.
'@ }
    3 { @'
LVCS: Local Version Control Systems (single user, local only).
CVCS: Centralized Version Control Systems (single central server, e.g., SVN).
DVCS: Distributed Version Control Systems (full repo cloned locally, e.g., Git).
DVCS supports offline commits and easy branching; CVCS depends on central server availability.
'@ }
    4 { @'
Git stores data as snapshots. A commit points to a tree representing the project state. The index (staging area) is an intermediate area where you compose commits.
'@ }
    5 { @'
Working Directory: your editable files.
Staging Area (index): files prepared to be committed (git add).
Local Repository: commits and history stored in .git.
Remote Repository: shared copy (GitHub, GitLab).
'@ }
    6 { @'
A branch is a movable pointer to a commit. Merging combines histories. Fast-forward and three-way merges exist. Conflicts occur when the same region was modified.
'@ }
    7 { @'
Ubuntu install:
sudo apt update
sudo apt install -y git

Configure:
git config --global user.name "Your Name"
git config --global user.email you@example.com
'@ }
    8 { @'
CentOS / RHEL install:
sudo yum install -y git
or with EPEL:
sudo yum install -y epel-release
sudo yum install -y git
'@ }
    9 { @'
Windows:
Install "Git for Windows" from https://git-scm.com.
Use Git Bash or PowerShell after install.
Set credential helper and user.name, user.email similarly.
'@ }
    10 { @'
Basic commands:
git status
git add file.txt
git commit -m "message"
git log --oneline
git diff
'@ }
    11 { @'
Remote commands:
git clone git@github.com:user/repo.git
git remote -v
git push origin main
git fetch origin
git pull origin main
'@ }
    12 { @'
Resolve conflicts:
1) git status to find conflicted files
2) Open file and resolve conflict markers <<<<<<< ======= >>>>>>>
3) git add resolved-file
4) git commit

Tools: git mergetool, VSCode merge editor, kdiff3, meld
'@ }
    13 { @'
Workflows:
Gitflow: feature, hotfix, release branching.
Trunk-based: short-lived branches or feature toggles.
GitHub Flow: branch per PR, deploy from main frequently.
'@ }
    14 { @'
Project part 1:
Set up repository structure for Online Banking (frontend, backend, infra).
Create initial repo, define branch strategy and seed README and LICENSE.
'@ }
    15 { @'
Project part 2:
Add CI (GitHub Actions or Jenkins pipeline):
- Run tests
- Build artifacts
- Publish containers
'@ }
    16 { @'
Project part 3:
Deploy to staging and production; demonstrate rollback using tags and revert.
'@ }
    17 { @'
Advanced commands:
git rebase -i HEAD~3
git stash push "WIP"
git cherry-pick <commit>
'@ }
    18 { @'
Internals: objects: blob, tree, commit, tag; HEAD and refs; packfiles used for transfer.
Understanding internals helps debug and improve performance.
'@ }
    19 { @'
Interview sample Q and A:
Q: How do you resolve merge conflicts on a PR?
A: Fetch remote, checkout branch, rebase or merge, resolve conflicts locally, run tests, push.

Q: Explain difference between merge and rebase.
A: Merge preserves branch history. Rebase rewrites commits to create a linear history.
'@ }
    20 { @'
Exam:
This lesson includes a 75-question JSON exam file located next to the lesson file.
'@ }
    Default { "Definition placeholder for Git lesson $lessonNum." }
  }

  $commands = switch ($lessonNum) {
    {$_ -in 1..13} { @'
# General commands (Ubuntu/CentOS/Windows)
# Ubuntu
sudo apt update
sudo apt install -y git

# Create repo
git init
git add .
git commit -m "initial commit"

# Branching
git checkout -b feature/awesome

# Push to remote
git remote add origin git@github.com:your/repo.git
git push -u origin feature/awesome
'@ }
    14 { @'
# Project init
mkdir online-banking
cd online-banking
git init
git remote add origin git@github.com:your/online-banking.git
'@ }
    15 { @'
# Sample GitHub Actions workflow (ci.yml)
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
'@ }
    16 { @'
# Deployment approach example
# Tag a release
git tag -a v1.0.0 -m "Release 1.0"
git push origin v1.0.0

# Rollback example: git revert or checkout previous tag
'@ }
    17 { @'
# Rebase example
git fetch origin
git checkout feature/awesome
git rebase origin/main
# If conflict, resolve then:
git rebase --continue
'@ }
    18 { @'
# Inspect objects
git cat-file -p <sha1>
git fsck --full
'@ }
    19 { @'
# Interview tasks (examples)
# 1) Resolve conflict between main and feature branch
# 2) Squash last 5 commits
'@ }
    20 { @'
# Exam content is saved as JSON next to the lesson20 file.
'@ }
  }

  $svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='900' height='220' viewBox='0 0 900 220'>
  <rect width='100%' height='100%' fill='#021018'/>
  <text x='50%' y='24' text-anchor='middle' fill='#00eaff' font-size='18' font-family='sans-serif'>Git - Lesson $lessonNum Diagram</text>
  <g transform='translate(40,40)'>
    <rect x='0' y='0' width='120' height='40' rx='6' fill='#002b36'/>
    <text x='60' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Working Dir</text>
    <rect x='160' y='0' width='120' height='40' rx='6' fill='#002b36'/>
    <text x='220' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Staging</text>
    <rect x='320' y='0' width='160' height='40' rx='6' fill='#002b36'/>
    <text x='400' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Local Repo (.git)</text>
    <line x1='120' y1='20' x2='160' y2='20' stroke='#00eaff' stroke-width='1.5'/>
    <line x1='280' y1='20' x2='320' y2='20' stroke='#00eaff' stroke-width='1.5'/>
    <g transform='translate(520,0)'>
      <rect x='0' y='0' width='200' height='40' rx='6' fill='#002b36'/>
      <text x='100' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Remote (GitHub)</text>
      <line x1='160' y1='20' x2='0' y2='20' stroke='#00eaff' stroke-width='1.2' stroke-dasharray='6 4'/>
    </g>
  </g>
</svg>
"@

  return @{
    title = $title
    definition = $definition
    commands = $commands
    svg = $svg
  }
}

# Docker and Kubernetes generators - simplified but safe ASCII (same pattern)
function Get-Docker-LessonContent($lessonNum, $tool) {
  $title = "Docker Lesson $lessonNum"
  $definition = @'
Docker is a platform to build, ship and run containers. Containers package application code and dependencies into a single lightweight image
that runs consistently across environments. Use Docker for reproducible development and CI/CD workflows.
'@
  $commands = @'
docker pull nginx:latest
docker run -d --name web -p 8080:80 nginx
docker ps
docker logs -f web
docker exec -it web /bin/bash
'@'
  # Note: previous block has been carefully closed; ensure no stray quotes
  $svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='900' height='220' viewBox='0 0 900 220'>
  <rect width='100%' height='100%' fill='#021018'/>
  <text x='50%' y='24' text-anchor='middle' fill='#00eaff' font-size='18'>Docker - Lesson $lessonNum Diagram</text>
  <g transform='translate(40,40)'>
    <rect x='0' y='0' width='160' height='40' rx='6' fill='#002b36'/>
    <text x='80' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Docker Client</text>
    <rect x='220' y='0' width='140' height='40' rx='6' fill='#002b36'/>
    <text x='290' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Docker Daemon</text>
    <rect x='420' y='0' width='160' height='40' rx='6' fill='#002b36'/>
    <text x='500' y='26' text-anchor='middle' fill='#cfe' font-size='12'>Registry</text>
  </g>
</svg>
"@
  return @{ title=$title; definition=$definition; commands=$commands; svg=$svg }
}

function Get-K8s-LessonContent($lessonNum, $tool) {
  $title = "Kubernetes Lesson $lessonNum"
  $definition = @'
Kubernetes is an open-source container orchestration system for automating deployment, scaling, and management of containerized applications.
It provides service discovery, load balancing, storage orchestration, automated rollouts and self-healing.
'@ 
  $commands = @'
kubectl version --client
kubectl get nodes
kubectl get pods -A
kubectl apply -f deployment.yaml
kubectl logs -f pod/mypod
'@ 
  $svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='900' height='220' viewBox='0 0 900 220'>
  <rect width='100%' height='100%' fill='#021018'/>
  <text x='50%' y='24' text-anchor='middle' fill='#00eaff' font-size='18'>Kubernetes - Lesson $lessonNum Diagram</text>
  <g transform='translate(40,40)'>
    <rect x='0' y='0' width='140' height='36' rx='6' fill='#002b36'/><text x='70' y='22' fill='#cfe' text-anchor='middle'>API Server</text>
    <rect x='180' y='0' width='140' height='36' rx='6' fill='#002b36'/><text x='250' y='22' fill='#cfe' text-anchor='middle'>Scheduler</text>
    <rect x='360' y='0' width='140' height='36' rx='6' fill='#002b36'/><text x='430' y='22' fill='#cfe' text-anchor='middle'>Controller Manager</text>
  </g>
</svg>
"@
  return @{ title=$title; definition=$definition; commands=$commands; svg=$svg }
}

function Get-Generic-LessonContent($lessonNum, $tool, $category) {
  $type = Get-LessonType $lessonNum
  $difficulty = Get-Difficulty $lessonNum
  $title = "$tool Lesson $lessonNum - $type"
  $definition = @"
This is an auto-generated lesson for $tool (category: $category).
Lesson type: $type - Difficulty: $difficulty
Replace this text with subject specific content.
"@
  $commands = @"
# Add real commands here for $tool
"@
  $svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='900' height='220'>
  <rect width='100%' height='100%' fill='#021018'/>
  <text x='50%' y='50%' text-anchor='middle' fill='#00eaff' font-size='18'>$tool - Lesson $lessonNum</text>
</svg>
"@
  return @{ title=$title; definition=$definition; commands=$commands; svg=$svg }
}

# Write lesson file function
function Write-LessonFile($dir, $tool, $category, $n, $content) {
  $file = Join-Path $dir "lesson${n}.jsx"
  $metaTitle = $content.title -replace '"','\"'
  # Normalize description for meta
  $metaDesc = ($content.definition -replace "`r`n","`n") -replace '"','\"'
  $difficulty = Get-Difficulty $n
  $duration = ($n + 8)
  $tags = @("'$tool'","'$category'") -join ", "
  $type = Get-LessonType $n
  $updated = (Get-Date).ToString("yyyy-MM-dd")

  # Write diagram SVG
  $svgPath = Join-Path $dir "diagram-lesson${n}.svg"
  $content.svg | Out-File -FilePath $svgPath -Encoding utf8

  # For exam lesson, create JSON
  if ($type -eq "exam") {
    $examJsonPath = Join-Path $dir "exam-lesson${n}.json"
    $questions = @()
    for ($q=1; $q -le 75; $q++) {
      $questions += @{
        id = $q
        question = "Auto Q$q for $tool - replace with a real question."
        choices = @("A placeholder","B placeholder","C placeholder","D placeholder")
        answer = "A"
      }
    }
    $questions | ConvertTo-Json -Depth 5 | Out-File -FilePath $examJsonPath -Encoding utf8
  }

  # Build the JSX file (safe interpolation)
  $escapedDefinition = $content.definition -replace "`n","</p><p>"
  $jsx = @"
export const meta = {
  title: ""$metaTitle"",
  description: ""$metaDesc"",
  difficulty: ""$difficulty"",
  duration: ""${duration} min"",
  tags: [ $tags ],
  type: ""$type"",
  updated: ""$updated"",
  thumbnail: ""./diagram-lesson${n}.svg""
};

function Lesson${n}() {
  return (
    <div style={{ padding: 20, color: '#e9fbff', background: 'transparent' }}>
      <h1 style={{ color: '#00eaff' }}>$($metaTitle)</h1>

      <section>
        <h3>Definition</h3>
        <p>
          $escapedDefinition
        </p>
      </section>

      <section>
        <h3>Commands and Examples</h3>
        <pre style={{ background: 'rgba(0,0,0,0.45)', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
$($content.commands)
        </pre>
      </section>

      <section>
        <h3>Diagram</h3>
        <img src={""./diagram-lesson${n}.svg""} alt=""diagram"" style={{ maxWidth: '100%', borderRadius: 8 }} />
      </section>

      <section>
        <h3>Practical Task</h3>
        <p>
          Describe the hands-on activity for this lesson. Replace with real steps for learners.
        </p>
      </section>
    </div>
  );
}

Lesson${n}.displayName = ""$($metaTitle)"";
export default Lesson${n};
"@

  $jsx | Out-File -FilePath $file -Encoding utf8
  Write-Host "  -> wrote lesson${n}.jsx ($tool / $category / type=$type)"
}

# MAIN
Write-Host "Generating lessons under $Base ..."
foreach ($category in $allPacks.Keys) {
  foreach ($tool in $allPacks[$category]) {
    $dir = Join-Path $Base "$category\$tool"
    Ensure-Dir $dir
    Write-Host "Creating files for: $category / $tool"

    # create index.jsx (tool home) if missing
    $indexPath = Join-Path $dir "index.jsx"
    if (-not (Test-Path $indexPath)) {
      $arr = @"
import { Link } from 'react-router-dom';

export default function ${($tool -replace '[^A-Za-z0-9_]','_')}_Home() {
  const lessons = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: \`Lesson \${i+1}\` }));
  return (
    <div style={{ padding: 24, color: 'white' }}>
      <h1 style={{ color: '#00eaff' }}>${($tool.ToUpper())}</h1>
      {lessons.map(l => (
        <Link key={l.id} to={\`/courses/${category}/${tool}/lesson\${l.id}\`} style={{ display: 'block', padding: 12, marginTop: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8, textDecoration: 'none', color: 'white' }}>
          {l.id}. {l.title}
        </Link>
      ))}
    </div>
  );
}
"@
      $arr | Out-File -FilePath $indexPath -Encoding utf8
      Write-Host "  -> wrote index.jsx"
    }

    # generate 20 lessons
    for ($n=1; $n -le 20; $n++) {
      switch ($tool) {
        "git" { $content = Get-Git-LessonContent -lessonNum $n -tool $tool }
        "docker" { $content = Get-Docker-LessonContent -lessonNum $n -tool $tool }
        "kubernetes" { $content = Get-K8s-LessonContent -lessonNum $n -tool $tool }
        "ubuntu" {
          $content = Get-Generic-LessonContent -lessonNum $n -tool $tool -category $category
          $content.commands = @"
# Ubuntu-specific tips
sudo apt update
sudo apt install -y <package>
"@
        }
        "centos" {
          $content = Get-Generic-LessonContent -lessonNum $n -tool $tool -category $category
          $content.commands = @"
# CentOS / RHEL-specific tips
sudo yum install -y <package>
"@
        }
        "redhat" {
          $content = Get-Generic-LessonContent -lessonNum $n -tool $tool -category $category
          $content.commands = @"
# Red Hat specifics
"@
        }
        "windows-shell-script" {
          $content = Get-Generic-LessonContent -lessonNum $n -tool $tool -category $category
          $content.commands = @"
# PowerShell examples
Get-ChildItem
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
"@
        }
        default {
          $content = Get-Generic-LessonContent -lessonNum $n -tool $tool -category $category
        }
      }

      if (-not $content.svg) {
        $content.svg = @"
<svg xmlns='http://www.w3.org/2000/svg' width='900' height='220'>
  <rect width='100%' height='100%' fill='#021018'/>
  <text x='50%' y='50%' text-anchor='middle' fill='#00eaff' font-size='18'>$tool - Lesson $n</text>
</svg>
"@
      }

      Write-LessonFile -dir $dir -tool $tool -category $category -n $n -content $content
    }
  }
}

Write-Host ""
Write-Host "✔ Ultra generation complete!"
Write-Host "Files created under: $Base"
Write-Host "Exam JSONs located next to each lesson20 for your review."
