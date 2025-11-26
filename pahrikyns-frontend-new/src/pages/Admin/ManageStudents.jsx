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

import StudentCard from "../../components/admin/StudentCard";
import StudentTable from "../../components/admin/StudentTable";
import AddStudentModal from "../../components/admin/AddStudentModal";
import CSVImportModal from "../../components/admin/CSVImportModal"; // ✅ Added CSV modal

const initialStudents = [
  { id: 1, name: "Sathish Kumar", email: "sathish@example.com", enrolled: 5, status: "Active" },
  { id: 2, name: "Hari Prasath", email: "hari@example.com", enrolled: 3, status: "Pending" },
  { id: 3, name: "Vignesh R", email: "vig@example.com", enrolled: 7, status: "Active" },
];

export default function ManageStudents() {
  const [tab, setTab] = useState(0);
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [minCourses, setMinCourses] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false); // ✅ CSV Import State

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredStudents = useMemo(() => {
    let list = [...students];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (status !== "All") list = list.filter((s) => s.status === status);

    // Min enrolled filter
    if (minCourses !== "") {
      const n = Number(minCourses) || 0;
      list = list.filter((s) => s.enrolled >= n);
    }

    return list;
  }, [students, search, status, minCourses]);

  const handleRemove = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Box sx={{ color: "white", p: 3, position: "relative", zIndex: 1 }}>
      
      {/* ================== TOP CONTROLS ================== */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        mb={3}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        
        {/* Search + filters */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          flex={1}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            placeholder="Search students..."
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
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>

          <TextField
            size="small"
            label="Min Courses"
            value={minCourses}
            onChange={(e) => setMinCourses(e.target.value)}
            sx={{ minWidth: 120 }}
          />
        </Stack>

        {/* Right Buttons */}
        <Stack direction="row" spacing={2}>
          
          {/* IMPORT CSV BUTTON */}
          <Button
            onClick={() => setOpenImport(true)}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: "999px",
              fontWeight: 700,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(0,255,255,0.3)",
              color: "#00eaff",
              "&:hover": { background: "rgba(0,255,255,0.15)" },
            }}
          >
            Import CSV
          </Button>

          {/* ADD STUDENT BUTTON */}
          <Button
            onClick={() => setOpenAdd(true)}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: "999px",
              fontWeight: 700,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              boxShadow: "0 0 20px rgba(0,234,255,0.4)",
            }}
          >
            + Add Student
          </Button>
        </Stack>
      </Stack>

      {/* ================== VIEW SWITCH ================== */}
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

      {/* ================== CARDS VIEW ================== */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <StudentCard
                student={student}
                onRemove={() => handleRemove(student.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ================== TABLE VIEW ================== */}
      {tab === 1 && (
        <StudentTable
          students={filteredStudents}
          onRemove={handleRemove}
          isMobile={isMobile}
        />
      )}

      {/* ================== ADD STUDENT MODAL ================== */}
      <AddStudentModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={(student) =>
          setStudents((prev) => [
            ...prev,
            { id: Date.now(), ...student }
          ])
        }
      />

      {/* ================== CSV IMPORT MODAL ================== */}
      <CSVImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        type="Students"
        onImport={(rows) => {
          const formatted = rows.map((r) => ({
            id: Date.now() + Math.random(),
            name: r.name,
            email: r.email,
            enrolled: Number(r.enrolled || 0),
            status: r.status || "Active",
          }));
          
          setStudents((prev) => [...prev, ...formatted]);
        }}
      />

    </Box>
  );
}
