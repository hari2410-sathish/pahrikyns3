# generate_all_lessons.ps1
# Ultra-Pro: generates lesson1.jsx .. lesson20.jsx for multiple tools (DevOps, AWS, OS)
# Run from project root (where 'src' folder is)

$base = "src/pages/Courses"

# Packs & tools (edit lists if you want different sets)
$devops = @("git","docker","jenkins","kubernetes","ansible","terraform","grafana","prometheus","splunk")
$aws = @("ec2","load-balancer","auto-scaling","iam","lambda","route53","rds","s3","sns","sqs","vpc","ci-cd","cloud-basics")
$oss = @("linux-basics","ubuntu","centos","redhat","ubuntu-shell-script","windows-shell-script")

# helper to choose difficulty progression (A: Beginner->Intermediate->Advanced)
function Get-Difficulty($index) {
  if ($index -le 6) { return "Beginner" }
  elseif ($index -le 13) { return "Intermediate" }
  else { return "Advanced" }
}

# helper to compute duration (simple formula)
function Get-Duration($index) {
  # base 8 minutes + index
  return (8 + $index)
}

# create lessons for a given category & tool
function Create-Lessons($category, $tool) {
  $dir = Join-Path $base "$category\$tool"
  Write-Host "Creating folder -> $dir"
  New-Item -ItemType Directory -Path $dir -Force | Out-Null

  # optionally create a simple index.jsx if missing (keeps navigation working)
  $indexPath = Join-Path $dir "index.jsx"
  if (-not (Test-Path $indexPath)) {
    $indexContent = @"
import { Link } from 'react-router-dom';
export default function ${($tool -replace '[^a-zA-Z0-9\-]','')}_Home() {
  const lessons = Array.from({length:20}, (_,i) => ({ id: i+1, title: `Lesson ${i+1}` }));
  return (
    <div style={{ padding: 24, color: 'white' }}>
      <h1 style={{ color: '#00eaff' }}>{'${($tool.ToUpper())}'}</h1>
      {lessons.map(l => (
        <Link key={l.id} to={`/courses/${category}/${tool}/lesson${l.id}`} style={{ display: 'block', padding: 12, marginTop: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8, textDecoration: 'none', color: 'white' }}>
          {l.id}. {l.title}
        </Link>
      ))}
    </div>
  );
}
"@
    $indexContent | Out-File -FilePath $indexPath -Encoding utf8 -Force
  }

  # create lesson files 1..20
  1..20 | ForEach-Object {
    $i = $_
    $difficulty = Get-Difficulty $i
    $duration = Get-Duration $i
    $title = ("{0} Lesson {1}" -f ($tool -replace '-', ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }), $i)
    $updated = (Get-Date).ToString("yyyy-MM-dd")
    $tags = "['$tool']"

    $filePath = Join-Path $dir ("lesson{0}.jsx" -f $i)

    # Here-string uses double-quote form so variables interpolate
    $content = @"
export const meta = {
  title: "$title",
  description: "Auto-generated placeholder for $tool lesson $i. Replace this with real lesson content.",
  difficulty: "$difficulty",
  duration: "$duration min",
  tags: [$tags],
  updated: "$updated",
  thumbnail: ""
};

function Lesson$i() {
  return (
    <div style={{ padding: 20 }}>
      <h1>$($tool.ToUpper()) - Lesson $i</h1>
      <p>Auto-generated placeholder content for lesson $i of $tool. Replace with real lesson material.</p>
    </div>
  );
}

Lesson$i.displayName = "$($tool.ToUpper()) Lesson $i – Placeholder";
export default Lesson$i;
"@

    # write file (UTF8)
    $content | Out-File -FilePath $filePath -Encoding utf8 -Force
  }

  Write-Host "  -> Created 20 lessons for $tool"
}

# Create all packs based on user's request: DEVOPS + AWS + OS
$allPacks = @{
  "devops" = $devops
  "aws"    = $aws
  "os"     = $oss
}

foreach ($category in $allPacks.Keys) {
  foreach ($tool in $allPacks[$category]) {
    Create-Lessons -category $category -tool $tool
  }
}

Write-Host ""
Write-Host "✔ Generation complete. All lessons created under $base"
Write-Host "✔ If you want fewer files, edit the $devops/$aws/$oss lists at top of the script and re-run."
