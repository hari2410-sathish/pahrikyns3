import React, { useState, useMemo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CourseCard from "../../components/admin/CourseCard";
import CourseTable from "../../components/admin/CourseTable";
import AddCourseModal from "../../components/admin/AddCourseModal";

const initialCourses = [
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
  },
];

export default function ManageCourses() {
  const [tab, setTab] = useState(0);
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("students_desc");
  const [openAdd, setOpenAdd] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredCourses = useMemo(() => {
    let list = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (category !== "All") list = list.filter((c) => c.category === category);
    if (status !== "All") list = list.filter((c) => c.status === status);
    if (level !== "All") list = list.filter((c) => c.level === level);

    if (sort === "students_desc") {
      list.sort((a, b) => b.students - a.students);
    } else if (sort === "students_asc") {
      list.sort((a, b) => a.students - b.students);
    } else if (sort === "lessons_desc") {
      list.sort((a, b) => b.lessons - a.lessons);
    } else if (sort === "lessons_asc") {
      list.sort((a, b) => a.lessons - b.lessons);
    }

    return list;
  }, [courses, search, category, status, level, sort]);

  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [
      ...prev,
      { id: prev.length + 1, status: "Draft", ...newCourse },
    ]);
    setOpenAdd(false);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Box sx={{ color: "white", p: 3, position: "relative", zIndex: 1 }}>
      {/* TOP: Controls */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        mb={3}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        {/* Search + filters row */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          flex={1}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            placeholder="Search courses..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              minWidth: { xs: "100%", md: 220 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                background: "rgba(15,23,42,0.7)",
                color: "white",
                "& fieldset": { borderColor: "rgba(148,163,184,0.5)" },
              },
            }}
          />

          <TextField
            select
            size="small"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Cloud">Cloud</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
            <MenuItem value="Linux">Linux</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="students_desc">Students ↓</MenuItem>
            <MenuItem value="students_asc">Students ↑</MenuItem>
            <MenuItem value="lessons_desc">Lessons ↓</MenuItem>
            <MenuItem value="lessons_asc">Lessons ↑</MenuItem>
          </TextField>
        </Stack>

        {/* Add Course button */}
        <Button
          onClick={() => setOpenAdd(true)}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: "999px",
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            textTransform: "none",
            boxShadow: "0 0 20px rgba(0,234,255,0.4)",
            "&:hover": {
              boxShadow: "0 0 30px rgba(123,63,228,0.6)",
            },
          }}
        >
          + Add Course
        </Button>
      </Stack>

      {/* Tabs for view mode (but hybrid) */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { color: "rgba(248,250,252,0.7)", fontWeight: 700 },
          "& .Mui-selected": { color: "#00eaff" },
          "& .MuiTabs-indicator": {
            background: "#00eaff",
            height: 3,
            borderRadius: "999px",
          },
        }}
      >
        <Tab label="Cards View" />
        <Tab label="Table View" />
      </Tabs>

      {/* VIEW AREA */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                onDelete={() => handleDeleteCourse(course.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <CourseTable
          courses={filteredCourses}
          onDeleteCourse={handleDeleteCourse}
          // hybrid: on mobile, table component can show cards instead
          isMobile={isMobile}
        />
      )}

      {/* ADD COURSE MODAL */}
      <AddCourseModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddCourse}
      />
    </Box>
  );
}
