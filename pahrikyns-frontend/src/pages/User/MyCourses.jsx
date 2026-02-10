import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { getMyCourses } from "../../api/course";
import RazorpayButton from "../../components/common/RazorpayButton";
import { useAuth } from "../../contexts/AuthContext";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 26,
          fontWeight: 700,
          mb: 3,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        My Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((c, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,255,255,0.15)",
                }}
              >
                <Box
                  component="img"
                  src={c.course.thumbnail}
                  alt={c.course.title}
                  sx={{
                    width: "100%",
                    height: 160,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 18,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {c.course.title}
                </Typography>

                <Typography sx={{ color: "#cbd5e1", mt: 1, fontSize: 14 }}>
                  {c.course.shortDesc}
                </Typography>

                {/* ✅ PAID / FREE STATUS */}
                {c.isPaid ? (
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 800,
                      color: "#00ffb3",
                    }}
                  >
                    ✅ Purchased
                  </Typography>
                ) : (
                  <>
                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#00eaff",
                      }}
                    >
                      Price: ₹{c.course.price || 999}
                    </Typography>

                    {/* ✅ RAZORPAY BUTTON */}
                    <Box mt={2}>
                      <RazorpayButton
                        courseId={c.course.id}
                        courseTitle={c.course.title}
                        user={user}
                        onSuccess={load}   // ✅ Auto refresh after success
                      />
                    </Box>
                  </>
                )}

                {/* ✅ Progress (only after paid) */}
                {c.isPaid && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#00eaff",
                    }}
                  >
                    Progress: {c.progress || 0}%
                  </Typography>
                )}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
