# PowerShell Script to auto-create all course folders + lesson files

$BASE = "src/pages/Courses"

# DevOps tools (20 lessons each)
$DEVOPS_TOOLS = @(
    "git", "docker", "jenkins", "kubernetes",
    "splunk", "terraform", "prometheus",
    "grafana", "ansible"
)

# AWS tools (13 lessons each)
$AWS_TOOLS = @(
    "ec2", "s3", "iam", "lambda", "sqs", "sns",
    "vpc", "rds", "load-balancer", "auto-scaling",
    "route53", "ci-cd"
)

# OS tools (20 lessons each)
$OS_TOOLS = @(
    "linux-basics", "ubuntu", "centos",
    "redhat", "windows-shell-script",
    "ubuntu-shell-script"
)

Write-Host "⚡ Creating Full Course Folder Structure…" -ForegroundColor Cyan

function Create-Lessons {
    param(
        [string]$Tool,
        [string]$BasePath,
        [int]$Count
    )

    $ToolPath = Join-Path $BasePath $Tool
    New-Item -ItemType Directory -Force -Path $ToolPath | Out-Null

    for ($i = 1; $i -le $Count; $i++) {

        $File = Join-Path $ToolPath "lesson$i.jsx"

$content = @"
import React from "react";

export default function Lesson$i() {
  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>$($Tool.ToUpper()) – Lesson $i</h1>
      <p>Lesson $i content will be added later.</p>
    </div>
  );
}
"@

        Set-Content -Path $File -Value $content -Encoding UTF8
        Write-Host "Created: $File" -ForegroundColor Green
    }
}

# ---------- DevOps (20 lessons) ----------
foreach ($Tool in $DEVOPS_TOOLS) {
    Create-Lessons -Tool $Tool -BasePath "$BASE/devops" -Count 20
}

# ---------- AWS (13 lessons) ----------
foreach ($Tool in $AWS_TOOLS) {
    Create-Lessons -Tool $Tool -BasePath "$BASE/aws" -Count 13
}

# ---------- OS (20 lessons) ----------
foreach ($Tool in $OS_TOOLS) {
    Create-Lessons -Tool $Tool -BasePath "$BASE/os" -Count 20
}

Write-Host "✅ ALL course folders + lesson files created successfully!" -ForegroundColor Yellow
