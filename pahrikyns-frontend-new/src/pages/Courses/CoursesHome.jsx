import React from "react";
import { Link } from "react-router-dom";

export default function CoursesHome() {
  const categories = [
    { name: "AWS", path: "/courses/aws" },
    { name: "DevOps", path: "/courses/devops" },
    { name: "Linux", path: "/courses/linux" },
  ];

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>All Courses</h1>
      <p>Choose a domain to start learning</p>

      <ul style={{ marginTop: 20 }}>
        {categories.map((c) => (
          <li key={c.name} style={{ margin: "10px 0" }}>
            <Link style={{ color: "#00E5FF", fontSize: 18 }} to={c.path}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
