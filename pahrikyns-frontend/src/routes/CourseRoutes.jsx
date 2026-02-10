import React from "react";
import { Routes, Route } from "react-router-dom";

import AWSHome from "../pages/Courses/aws/AWSHome";
import AWSLesson from "../pages/Courses/aws/AWSLesson";
import DevOpsHome from "../pages/Courses/devops/DevOpsHome";
import DevOpsLesson from "../pages/Courses/devops/DevOpsLesson";
import OSHome from "../pages/Courses/os/OSHome";
import OSLesson from "../pages/Courses/os/OSLesson";

export default function CourseRoutes() {
  return (
    <Routes>
      <Route path="aws" element={<AWSHome />} />
      <Route path="aws/:tool" element={<AWSLesson />} />
      
      <Route path="devops" element={<DevOpsHome />} />
      <Route path="devops/:tool" element={<DevOpsLesson />} />
      
      <Route path="os" element={<OSHome />} />
      <Route path="os/:tool" element={<OSLesson />} />
    </Routes>
  );
}
