$ROOT = "pahrikyns-frontend"

Write-Host "Creating project structure..." -ForegroundColor Cyan

# BASE ROOT FOLDERS
New-Item -ItemType Directory -Force -Path "$ROOT/src"
New-Item -ItemType Directory -Force -Path "$ROOT/src/api"
New-Item -ItemType Directory -Force -Path "$ROOT/src/assets"
New-Item -ItemType Directory -Force -Path "$ROOT/src/components"
New-Item -ItemType Directory -Force -Path "$ROOT/src/contexts"
New-Item -ItemType Directory -Force -Path "$ROOT/src/layouts"
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages"
New-Item -ItemType Directory -Force -Path "$ROOT/src/courses"
New-Item -ItemType Directory -Force -Path "$ROOT/src/utils"

# ====================================
# COMPONENTS → GLOBAL
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/components/global"

$globalFiles = @(
    "MainNavbar.jsx",
    "SearchBar.jsx",
    "NotificationPanel.jsx",
    "Footer.jsx",
    "ProgressBar.jsx",
    "ThemeToggle.jsx",
    "Sidebar.jsx"
)

foreach ($file in $globalFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/components/global/$file"
}

# ====================================
# COMPONENTS → ADMIN
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/components/admin"

$adminFiles = @(
    "AdminSidebar.jsx",
    "AdminTopbar.jsx",
    "StatCard.jsx",
    "PieMini.jsx",
    "BarChart.jsx",
    "LineChart.jsx"
)

foreach ($file in $adminFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/components/admin/$file"
}

# ====================================
# COMPONENTS → DASHBOARD
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/components/dashboard"

$dashFiles = @(
    "DashboardSidebar.jsx",
    "DashboardTopBar.jsx",
    "CourseProgressList.jsx",
    "ResumeBuild.jsx"
)

foreach ($file in $dashFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/components/dashboard/$file"
}

# ====================================
# COMPONENTS → COMMON
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/components/common"

$commonFiles = @(
    "Loader.jsx",
    "Notification.jsx"
)

foreach ($file in $commonFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/components/common/$file"
}

# ====================================
# CONTEXTS
# ====================================
$contextFiles = @(
    "AuthContext.jsx",
    "AdminAuthContext.jsx"
)

foreach ($file in $contextFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/contexts/$file"
}

# ====================================
# LAYOUTS
# ====================================
$layoutFiles = @(
    "AdminLayout.jsx",
    "UserLayout.jsx",
    "UserDashboard.jsx"
)

foreach ($file in $layoutFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/layouts/$file"
}

# ====================================
# PAGES → HOME
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages/Home"
New-Item -ItemType File -Force -Path "$ROOT/src/pages/Home/HomePage.jsx"

# ====================================
# PAGES → ADMIN
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages/Admin"

$adminPages = @(
    "AdminDashboard.jsx",
    "ManageCourses.jsx",
    "ManageStudents.jsx",
    "StudentDetails.jsx",
    "AdminSettings.jsx",
    "AdminSidebar.jsx",
    "Dashboard.jsx",
    "AddCourse.jsx",
    "AddLesson.jsx",
    "EditCourse.jsx",
    "AdminTopbar.jsx",
    "SearchBox.jsx",
    "Notification.jsx",
    "Setting.jsx"
)

foreach ($file in $adminPages) {
    New-Item -ItemType File -Force -Path "$ROOT/src/pages/Admin/$file"
}

# ====================================
# PAGES → AUTH
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages/Auth"

$authPages = @(
    "Login.jsx",
    "LoginForgetPassword.jsx",
    "Register.jsx"
)

foreach ($file in $authPages) {
    New-Item -ItemType File -Force -Path "$ROOT/src/pages/Auth/$file"
}

# ====================================
# PAGES → USER DASHBOARD
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages/Dashboard"

$userDashboardFiles = @(
    "UserDashboard.jsx",
    "LeftSidebar.jsx",
    "LoginDetails.jsx",
    "RightSidebar.jsx",
    "UserDetails.jsx",
    "TopBar.jsx"
)

foreach ($file in $userDashboardFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/pages/Dashboard/$file"
}

# ====================================
# PAGES → COURSES PAGES
# ====================================
New-Item -ItemType Directory -Force -Path "$ROOT/src/pages/Courses"

$coursesPages = @(
    "CoursesHome.jsx",
    "CategoryPage.jsx",
    "ToolPage.jsx",
    "LessonPage.jsx"
)

foreach ($file in $coursesPages) {
    New-Item -ItemType File -Force -Path "$ROOT/src/pages/Courses/$file"
}

# ====================================
# FILES → BASE PROJECT FILES
# ====================================
$baseFiles = @(
    "App.jsx",
    "main.jsx",
    "index.css",
    "theme.js",
    "ThemeContext.jsx"
)

foreach ($file in $baseFiles) {
    New-Item -ItemType File -Force -Path "$ROOT/src/$file"
}

# API FILES
New-Item -ItemType File -Force -Path "$ROOT/src/api/admin.js"
New-Item -ItemType File -Force -Path "$ROOT/src/api/auth.js"
New-Item -ItemType File -Force -Path "$ROOT/src/api/course.js"

# UTILS
New-Item -ItemType File -Force -Path "$ROOT/src/utils/auth.js"
New-Item -ItemType File -Force -Path "$ROOT/src/utils/adminAuth.js"
New-Item -ItemType File -Force -Path "$ROOT/src/utils/helpers.js"

# ROOT FILES
New-Item -ItemType File -Force -Path "$ROOT/index.html"
New-Item -ItemType File -Force -Path "$ROOT/package.json"
New-Item -ItemType File -Force -Path "$ROOT/vite.config.js"
New-Item -ItemType File -Force -Path "$ROOT/course-structure-generator.js"

# ====================================
# COURSE FOLDERS
# ====================================

$devopsTools = "git","docker","jenkins","ansible","terraform","prometheus","grafana","splunk","kubernetes"
$awsTools     = "ec2","s3","iam","lambda","sqs","sns","rds","vpc","route53","autoscaling","elb","cicd"
$osTools      = "linux","centos","ubuntu","redhat"

function Create-ToolFolders {
    param($category, $tool)

    $path = "$ROOT/src/courses/$category/$tool"
    New-Item -ItemType Directory -Force -Path "$path/lessons"
    New-Item -ItemType Directory -Force -Path "$path/projects"
    New-Item -ItemType Directory -Force -Path "$path/advanced"
    New-Item -ItemType Directory -Force -Path "$path/interview"
    New-Item -ItemType Directory -Force -Path "$path/mcq"
}

foreach ($tool in $devopsTools) { Create-ToolFolders "devops" $tool }
foreach ($tool in $awsTools)     { Create-ToolFolders "aws" $tool }
foreach ($tool in $osTools)      { Create-ToolFolders "os" $tool }

Write-Host "DONE! Full structure created." -ForegroundColor Green
