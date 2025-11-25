import { useState } from "react";
import { defaultCourse, defaultLesson } from "../../utils/courseModel";

export default function AddCourse() {
  const [course, setCourse] = useState(defaultCourse);
  const [lesson, setLesson] = useState(defaultLesson);

  const addLesson = () => {
    setCourse({
      ...course,
      lessons: [...course.lessons, lesson],
    });
    setLesson(defaultLesson); // reset fields
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    console.log("Course Added:", course);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Add New Course</h1>

      {/* COURSE BASIC INFO */}
      <form onSubmit={handleCourseSubmit}>
        <input name="title" placeholder="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        {/* LESSON SECTION */}
        <h2 style={{ marginTop: "40px" }}>Add Lessons</h2>

        <input 
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
        />

        <select 
          value={lesson.type}
          onChange={(e) => setLesson({ ...lesson, type: e.target.value })}
        >
          <option value="video">Video</option>
          <option value="text">Text</option>
          <option value="quiz">Quiz</option>
        </select>

        <input
          placeholder="Video URL"
          value={lesson.videoUrl}
          onChange={(e) => setLesson({ ...lesson, videoUrl: e.target.value })}
        />

        <textarea
          placeholder="Content (if text lesson)"
          value={lesson.content}
          onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
        />

        <button type="button" onClick={addLesson}>Add Lesson</button>

        {/* Display Added Lessons */}
        <ul>
          {course.lessons.map((l, index) => (
            <li key={index}>{l.title} ({l.type})</li>
          ))}
        </ul>

        <button type="submit">Save Course</button>
      </form>
    </div>
  );
}
