// src/components/admin/CourseTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Switch,
  Checkbox,
  TextField,
  MenuItem,
  Tooltip,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function formatDate(d) {
  if (!d) return "-";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleString();
}

/**
 * Props:
 *  - courses: array
 *  - page, pageSize, total
 *  - onPageChange(newPage)
 *  - onPageSizeChange(newSize)
 *  - onSaveInline(id, patch)
 *  - onDeleteCourse(id)
 *  - onToggleStatus(course)
 *  - selectedIds: []
 *  - onSelectionChange(ids)
 *  - isMobile: bool
 */
export default function CourseTable({
  courses,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  onSaveInline,
  onDeleteCourse,
  onToggleStatus,
  selectedIds,
  onSelectionChange,
  isMobile,
}) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const handleStartEdit = (course) => {
    setEditingId(course.id);
    setDraft({
      title: course.title || "",
      category: course.category || "",
      level: course.level || "Beginner",
      status: course.status || "Draft",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraft({});
  };

  const handleSaveEdit = async (id) => {
    const patch = {
      title: draft.title,
      category: draft.category,
      level: draft.level,
      status: draft.status,
    };

    await onSaveInline(id, patch);
    setEditingId(null);
    setDraft({});
  };

  const allSelected =
    courses.length > 0 &&
    courses.every((c) => selectedIds.includes(c.id));

  const toggleSelectAll = (checked) => {
    if (checked) {
      const ids = courses.map((c) => c.id);
      onSelectionChange(ids);
    } else {
      onSelectionChange([]);
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const renderStatusChip = (status) => {
    const isPub = status === "Published";
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: isPub ? "rgba(34,197,94,0.16)" : "rgba(148,163,184,0.18)",
          color: isPub ? "#bbf7d0" : "#e5e7eb",
          borderRadius: "999px",
        }}
      />
    );
  };

  return (
    <Box>
      <TableContainer>
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  indeterminate={
                    selectedIds.length > 0 && !allSelected
                  }
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              {!isMobile && <TableCell>Level</TableCell>}
              <TableCell align="center">Lessons</TableCell>
              {!isMobile && (
                <TableCell align="center">Students</TableCell>
              )}
              <TableCell align="center">Status</TableCell>
              {!isMobile && (
                <TableCell>
                  Audit (Last updated)
                </TableCell>
              )}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => {
              const isEditing = editingId === course.id;

              return (
                <TableRow
                  key={course.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* SELECT */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(course.id)}
                      onChange={() => toggleSelectOne(course.id)}
                    />
                  </TableCell>

                  {/* TITLE */}
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        size="small"
                        value={draft.title}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            title: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                    ) : (
                      <Typography fontWeight={600}>
                        {course.title}
                      </Typography>
                    )}
                  </TableCell>

                  {/* CATEGORY */}
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        select
                        size="small"
                        value={draft.category}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            category: e.target.value,
                          }))
                        }
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="Cloud">Cloud</MenuItem>
                        <MenuItem value="DevOps">DevOps</MenuItem>
                        <MenuItem value="Linux">Linux</MenuItem>
                      </TextField>
                    ) : (
                      course.category || "-"
                    )}
                  </TableCell>

                  {/* LEVEL */}
                  {!isMobile && (
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          select
                          size="small"
                          value={draft.level}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              level: e.target.value,
                            }))
                          }
                          sx={{ minWidth: 130 }}
                        >
                          <MenuItem value="Beginner">Beginner</MenuItem>
                          <MenuItem value="Intermediate">
                            Intermediate
                          </MenuItem>
                          <MenuItem value="Advanced">Advanced</MenuItem>
                        </TextField>
                      ) : (
                        course.level || "-"
                      )}
                    </TableCell>
                  )}

                  {/* LESSONS */}
                  <TableCell align="center">
                    {course.lessons ?? 0}
                  </TableCell>

                  {/* STUDENTS */}
                  {!isMobile && (
                    <TableCell align="center">
                      {course.students ?? 0}
                    </TableCell>
                  )}

                  {/* STATUS + TOGGLE */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {renderStatusChip(
                        isEditing ? draft.status : course.status
                      )}

                      <Tooltip title="Publish / Unpublish">
                        <Switch
                          size="small"
                          checked={
                            (isEditing
                              ? draft.status
                              : course.status) === "Published"
                          }
                          onChange={(e) => {
                            if (isEditing) {
                              setDraft((d) => ({
                                ...d,
                                status: e.target.checked
                                  ? "Published"
                                  : "Draft",
                              }));
                            } else {
                              onToggleStatus(course);
                            }
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </TableCell>

                  {/* AUDIT INFO */}
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2">
                        {course.lastUpdatedBy || "System"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148,163,184,0.9)" }}
                      >
                        {formatDate(course.updatedAt || course.createdAt)}
                      </Typography>
                    </TableCell>
                  )}

                  {/* ACTIONS */}
                  <TableCell align="right">
                    {isEditing ? (
                      <>
                        <Tooltip title="Save">
                          <IconButton
                            size="small"
                            onClick={() => handleSaveEdit(course.id)}
                          >
                            <SaveIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton
                            size="small"
                            onClick={handleCancelEdit}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit inline">
                          <IconButton
                            size="small"
                            onClick={() => handleStartEdit(course)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDeleteCourse(course.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => onPageChange(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) =>
          onPageSizeChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Box>
  );
}
