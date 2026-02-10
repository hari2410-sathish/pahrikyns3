// src/pages/courses/devops/DevOpsHome.jsx
import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const devopsTools = [
  "DevOps Intro", "Linux For DevOps", "Git", "Jenkins",
  "Docker", "K8s Architecture", "K8s Administration",
  "Helm Charts", "Ansible", "Terraform", "Prometheus",
  "Grafana", "Splunk", "Nagios", "Maven", "Gradle",
  "SonarQube", "Azure DevOps", "DevSecOps", "SRE"
];

export default function DevOpsHome() {
  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 3,
          color: "#00eaff",
          textShadow: "0 0 10px #00eaff"
        }}
      >
        DevOps Courses
      </Typography>

      <Grid container spacing={3}>
        {devopsTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool}>
            <Paper
              component={Link}
              to={`/courses/devops/${tool.toLowerCase().replace(/\s/g, "-")}`}
              sx={{
                p: 3,
                textDecoration: "none",
                color: "white",
                background: "rgba(5,10,25,0.85)",
                border: "1px solid rgba(0,234,255,0.3)",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  borderColor: "#00eaff",
                  transform: "scale(1.05)",
                  boxShadow: "0 0 20px #00eaff",
                },
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                {tool}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
