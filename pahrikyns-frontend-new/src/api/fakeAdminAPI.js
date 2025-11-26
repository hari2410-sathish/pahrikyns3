/* =======================================================
   FAKE ADMIN BACKEND API (Dashboard + Courses + Students)
   Data stored in localStorage (persistent)
   ======================================================= */

// ---------- STORAGE HELPERS ----------
const LS_COURSES = "admin_courses";
const LS_STUDENTS = "admin_students";

function load(key, fallback) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


// ---------- DEFAULT DATA ----------
const defaultCourses = [
  {
    id: 1,
    title: "AWS Solutions Architect",
    category: "Cloud",
    level: "Intermediate",
    lessons: 45,
    students: 1200,
    status: "Published",
  },
  {
    id: 2,
    title: "Docker + Kubernetes in Practice",
    category: "DevOps",
    level: "Advanced",
    lessons: 32,
    students: 890,
    status: "Published",
  },
  {
    id: 3,
    title: "Linux Fundamentals",
    category: "Linux",
    level: "Beginner",
    lessons: 22,
    students: 640,
    status: "Draft",
  }
];

const defaultStudents = [
  { id: 1, name: "Sathish Kumar", email: "sathish@example.com", enrolled: 5, status: "Active" },
  { id: 2, name: "Hari Prasath", email: "hari@example.com", enrolled: 3, status: "Pending" },
  { id: 3, name: "Vignesh R", email: "vignesh@example.com", enrolled: 7, status: "Active" },
];


// ---------- INITIAL LOAD ----------
let courses = load(LS_COURSES, defaultCourses);
let students = load(LS_STUDENTS, defaultStudents);


// ======================================================
// ================ DASHBOARD API =======================
// ======================================================

export function getSummary() {
  return Promise.resolve({
    totalStudents: students.length,
    totalCourses: courses.length,
    revenue: (20000 + Math.random() * 20000).toFixed(0),
  });
}

export function getEnrollments() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return Promise.resolve(
    months.map((month) => ({
      month,
      value: Math.floor(100 + Math.random() * 400),
    }))
  );
}

export function getActivity() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return Promise.resolve(
    days.map((day) => ({
      day,
      value: Math.floor(Math.random() * 60),
    }))
  );
}

export function getCompletion() {
  return Promise.resolve({
    percentage: 60 + Math.floor(Math.random() * 30),
  });
}


// ======================================================
// ================ COURSE MANAGEMENT ===================
// ======================================================

export function getCourses() {
  return Promise.resolve([...courses]);
}

export function getCourseById(id) {
  return Promise.resolve(courses.find((c) => c.id === Number(id)));
}

export function addCourse(course) {
  const newCourse = {
    id: Date.now(),
    status: "Draft",
    ...course,
  };

  courses.push(newCourse);
  save(LS_COURSES, courses);

  return Promise.resolve(newCourse);
}

export function updateCourse(id, newData) {
  courses = courses.map((c) =>
    c.id === Number(id) ? { ...c, ...newData } : c
  );

  save(LS_COURSES, courses);
  return Promise.resolve(true);
}

export function deleteCourse(id) {
  courses = courses.filter((c) => c.id !== Number(id));
  save(LS_COURSES, courses);
  return Promise.resolve(true);
}


// ======================================================
// ================ STUDENT MANAGEMENT ==================
// ======================================================

export function getStudents() {
  return Promise.resolve([...students]);
}

export function getStudentById(id) {
  return Promise.resolve(students.find((s) => s.id === Number(id)));
}

export function addStudent(student) {
  const newStudent = {
    id: Date.now(),
    ...student,
  };

  students.push(newStudent);
  save(LS_STUDENTS, students);

  return Promise.resolve(newStudent);
}

export function updateStudent(id, newData) {
  students = students.map((s) =>
    s.id === Number(id) ? { ...s, ...newData } : s
  );

  save(LS_STUDENTS, students);
  return Promise.resolve(true);
}

export function deleteStudent(id) {
  students = students.filter((s) => s.id !== Number(id));
  save(LS_STUDENTS, students);
  return Promise.resolve(true);
}
