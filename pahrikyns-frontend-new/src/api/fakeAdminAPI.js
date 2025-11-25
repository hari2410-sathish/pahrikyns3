export function getSummary() {
  return Promise.resolve({
    totalStudents: 4000 + Math.floor(Math.random() * 800),
    totalCourses: 20 + Math.floor(Math.random() * 15),
    revenue: (20000 + Math.random() * 20000).toFixed(0)
  });
}

export function getEnrollments() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return Promise.resolve(
    months.map((month) => ({
      month,
      value: Math.floor(100 + Math.random() * 400)
    }))
  );
}

export function getActivity() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return Promise.resolve(
    days.map((day) => ({
      day,
      value: Math.floor(Math.random() * 60)
    }))
  );
}

export function getCompletion() {
  return Promise.resolve({
    percentage: 60 + Math.floor(Math.random() * 30)
  });
}
