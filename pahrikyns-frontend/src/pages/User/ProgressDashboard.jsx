import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../api/axios";

export default function ProgressDashboard() {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading || !user) return;

    const loadProgress = async () => {
      try {
        // ✅ fetch all user courses
        const res = await API.get("/auth/user/my-courses");
        setData(res.data || []);
      } catch (err) {
        console.error("❌ Progress load error:", err);
        setError("Failed to load course progress");
      }
    };

    loadProgress();
  }, [user, loading]);

  if (loading) {
    return <p style={{ color: "white" }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ color: "white" }}>
      <h2>📊 My Course Progress</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length === 0 && <p>No courses enrolled yet.</p>}

      {data.map((course) => (
        <div
          key={course.id}
          style={{
            background: "#0f172a",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <h3>{course.title}</h3>
          <p>Progress: {course.progress || 0}%</p>
        </div>
      ))}
    </div>
  );
}
