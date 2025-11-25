import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function CategoryPage() {
  const { category } = useParams();

  const toolMap = {
    devops: ["git", "docker", "jenkins", "kubernetes", "splunk", "terraform", "prometheus", "grafana", "ansible"],
    aws: ["ec2", "s3", "iam", "lambda", "sqs", "sns", "vpc", "rds", "load-balancer", "auto-scaling", "route53", "ci-cd"],
    os: ["linux-basics", "ubuntu", "centos", "redhat", "windows-shell-script", "ubuntu-shell-script"]
  };

  const tools = toolMap[category] || [];

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography sx={{ fontSize: 32, fontWeight: 800, mb: 3 }}>
        {category.toUpperCase()} Tools
      </Typography>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} md={4} key={tool}>
            <Paper
              component={Link}
              to={`/courses/${category}/${tool}`}
              sx={{
                p: 3,
                textDecoration: "none",
                background: "rgba(10,15,30,0.7)",
                border: "1px solid rgba(0,234,255,0.2)",
                borderRadius: "14px",
                color: "white",
                "&:hover": {
                  borderColor: "#00eaff",
                  transform: "translateY(-4px)",
                  transition: "0.2s"
                }
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                {tool.replace(/-/g, " ").toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
