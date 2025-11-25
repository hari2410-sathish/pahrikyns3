# course-structure-generator.ps1
# Run from project root (where src/ is present):
#   powershell -ExecutionPolicy Bypass -File .\course-structure-generator.ps1

$ROOT = Join-Path $PSScriptRoot "src/courses"

# --------- CONFIG ---------
$categories = @{
  devops = @{
    tools        = @('git','docker','jenkins','ansible','terraform','prometheus','grafana','splunk','kubernetes')
    theoryCount  = 13
    projectCount = 3
    advancedCount= 2
    hasMCQ       = $true
  }
  aws = @{
    tools        = @('ec2','s3','iam','lambda','sqs','sns','rds','vpc','route53','autoscaling','elb','cicd')
    theoryCount  = 7
    projectCount = 3
    advancedCount= 2
    hasMCQ       = $true
  }
  os = @{
    tools        = @('linux','centos','ubuntu','redhat')
    theoryCount  = 13
    projectCount = 3
    advancedCount= 2
    hasMCQ       = $true
  }
}

# --------- HELPERS ---------
function Ensure-Dir {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

function Write-IfNotExists {
  param(
    [string]$FilePath,
    [string[]]$Content
  )
  if (-not (Test-Path $FilePath)) {
    Set-Content -Path $FilePath -Value $Content -Encoding utf8
  }
}

function Capitalize {
  param([string]$s)
  if ([string]::IsNullOrEmpty($s)) { return $s }
  return $s.Substring(0,1).ToUpper() + $s.Substring(1)
}

function Get-ComponentTemplate {
  param(
    [string]$name,
    [string]$text
  )
@"
import React from 'react';

export default function $name() {
  return (
    <div style={{padding:20}}>
      <h3>$text</h3>
      <p>Content coming soon - fill this file with lesson content.</p>
    </div>
  );
}

"@
}

# --------- MAIN TOOL CREATOR ---------
function New-Tool {
  param(
    [string]$category,
    [string]$tool,
    [int]$theoryCount,
    [int]$projectCount,
    [int]$advancedCount,
    [bool]$hasMCQ
  )

  $base = Join-Path $ROOT "$category/$tool"
  Ensure-Dir $base
  Ensure-Dir "$base/lessons"
  Ensure-Dir "$base/projects"
  Ensure-Dir "$base/advanced"
  Ensure-Dir "$base/interview"
  Ensure-Dir "$base/mcq"

  $toolPascal = Capitalize $tool

  # ------- Tool.jsx page -------
  $toolPage =
    'import React from ''react'';' + "`n" +
    'import { Link } from ''react-router-dom'';' + "`n`n" +
    "export default function $toolPascal() {" + "`n" +
    "  return (" + "`n" +
    "    <div style={{padding:24}}>" + "`n" +
    "      <h2>$toolPascal - Course</h2>" + "`n" +
    "      <p>Lessons list is loaded dynamically from $tool" + "Lessons.js</p>" + "`n" +
    '      <Link to={`/courses/' + $category + '/' + $tool + '`}>Open course</Link>' + "`n" +
    "    </div>" + "`n" +
    "  );" + "`n" +
    "}" + "`n"

  $toolFile = Join-Path $base "$toolPascal.jsx"
  Write-IfNotExists $toolFile $toolPage

  # ------- Build lessons array meta ------
  $lessonsArr = @()

  # Theory
  for ($i = 1; $i -le $theoryCount; $i++) {
    $id       = "t$($i)"
    $file     = "T$($i).jsx"
    $compName = "$toolPascal" + "T$($i)"
    $rel      = "./lessons/$file"
    $lessonsArr += [PSCustomObject]@{
      id        = $id
      title     = "Theory $i"
      type      = "theory"
      component = $rel
    }
    $content = Get-ComponentTemplate $compName "$toolPascal - Theory $i"
    Write-IfNotExists "$base/lessons/$file" $content
  }

  # Projects
  for ($p = 1; $p -le $projectCount; $p++) {
    $id       = "p$($p)"
    $file     = "P$($p).jsx"
    $compName = "$toolPascal" + "P$($p)"
    $rel      = "./projects/$file"
    $lessonsArr += [PSCustomObject]@{
      id        = $id
      title     = "Project $p"
      type      = "project"
      component = $rel
    }
    $content = Get-ComponentTemplate $compName "$toolPascal - Project $p"
    Write-IfNotExists "$base/projects/$file" $content
  }

  # Advanced
  for ($a = 1; $a -le $advancedCount; $a++) {
    $id       = "a$($a)"
    $file     = "A$($a).jsx"
    $compName = "$toolPascal" + "A$($a)"
    $rel      = "./advanced/$file"
    $lessonsArr += [PSCustomObject]@{
      id        = $id
      title     = "Advanced $a"
      type      = "advanced"
      component = $rel
    }
    $content = Get-ComponentTemplate $compName "$toolPascal - Advanced $a"
    Write-IfNotExists "$base/advanced/$file" $content
  }

  # Interview
  $lessonsArr += [PSCustomObject]@{
    id        = "interview"
    title     = "Interview Preparation"
    type      = "interview"
    component = "./interview/Interview.jsx"
  }
  $interviewComp = Get-ComponentTemplate ("$toolPascal" + "Interview") "$toolPascal - Interview Preparation"
  Write-IfNotExists "$base/interview/Interview.jsx" $interviewComp

  # MCQ
  if ($hasMCQ) {
    $lessonsArr += [PSCustomObject]@{
      id        = "mcq"
      title     = "50 MCQ Questions"
      type      = "mcq"
      component = "./mcq/Mcq.jsx"
    }
    $mcqComp = Get-ComponentTemplate ("$toolPascal" + "Mcq") "$toolPascal - 50 MCQ"
    Write-IfNotExists "$base/mcq/Mcq.jsx" $mcqComp
  }

  # ------- Write *Lessons.js -------
  $lessonsFile = Join-Path $base "$toolPascal`Lessons.js"
  if (-not (Test-Path $lessonsFile)) {
    $lines = @()
    $lines += "// $toolPascal`Lessons.js - auto-generated"
    $lines += "export const ${tool}Lessons = ["
    foreach ($l in $lessonsArr) {
      $id        = $l.id
      $titleEsc  = $l.title.Replace('"','\"')
      $type      = $l.type
      $compPath  = $l.component
      $lines += "  { id: `"$id`", title: `"$titleEsc`", type: `"$type`", component: () => import(`"$compPath`") },"
    }
    $lines += "];"
    Set-Content -Path $lessonsFile -Value $lines -Encoding utf8
  }
}

# --------- RUN MAIN ---------
Ensure-Dir $ROOT

foreach ($categoryName in $categories.Keys) {
  $cfg = $categories[$categoryName]
  foreach ($tool in $cfg.tools) {
    New-Tool -category $categoryName `
             -tool $tool `
             -theoryCount $cfg.theoryCount `
             -projectCount $cfg.projectCount `
             -advancedCount $cfg.advancedCount `
             -hasMCQ $cfg.hasMCQ
  }
}

# --------- courses/index.js ---------
$indexPath = Join-Path $ROOT "index.js"

if (-not (Test-Path $indexPath)) {

  $lines = @()
  $lines += "// courses index - auto-generated"
  $lines += "export const courseMap = {"

  foreach ($categoryName in $categories.Keys) {
    
    $cat = $categoryName
    $lines += "  ${cat}: {"
    
    $cfg = $categories[$categoryName]

    foreach ($tool in $cfg.tools) {

      $toolPascal = Capitalize $tool

      $lines += "    ${tool}: () => import('./${cat}/${tool}/${toolPascal}Lessons.js'),"
    }

    $lines += "  },"
  }

  $lines += "};"

  Set-Content -Path $indexPath -Value $lines -Encoding utf8
}

Write-Host "Course skeleton generation complete. Check src/courses/ for files." -ForegroundColor Green
