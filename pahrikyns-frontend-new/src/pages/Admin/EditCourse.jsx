import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { defaultCourse } from "../../utils/courseModel";

export default function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(defaultCourse);

  // In real backend, fetch course by ID
  useEffect(() => {
    // Simulated load:
    setCourse({
      title: "Sample EC2",
      category: "ec2",
      description: "AWS EC2 course",
      level: "beginner",
      image: "",
    });
  }, [courseId]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", course);
    alert("Course updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <h1>Edit Course</h1>

      <input
        name="title"
        value={course.title}
        onChange={handleChange}
      />

      <input
        name="category"
        value={course.category}
        onChange={handleChange}
      />

      <textarea
        name="description"
        value={course.description}
        onChange={handleChange}
      />

      <select name="level" value={course.level} onChange={handleChange}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <input
        name="image"
        value={course.image}
        onChange={handleChange}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
}
