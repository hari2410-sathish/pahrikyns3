// src/components/global/MainNavbar.jsx
import React, { useState, useRef } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton, Popper, Paper, Typography,
  InputBase, ClickAwayListener, List, ListItemButton, ListItemIcon,
  ListItemText, Drawer, Divider, Badge, Avatar
} from "@mui/material";

import { Link } from "react-router-dom";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import AdbIcon from "@mui/icons-material/Adb";
import PrecisionIcon from "@mui/icons-material/PrecisionManufacturing";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";

const NAV_HEIGHT = 70;

// MENU STRUCTURE
const MENU = {
  devops: {
    title: "DevOps",
    desc: "CI/CD, containers & infra automation",
    items: [
      { name: "Git", link: "/courses/devops/git", icon: <GitHubIcon /> },
      { name: "Docker", link: "/courses/devops/docker", icon: <AdbIcon /> },
      { name: "Jenkins", link: "/courses/devops/jenkins", icon: <PrecisionIcon /> },
      { name: "Kubernetes", link: "/courses/devops/kubernetes", icon: <CloudQueueIcon /> },
      { name: "Terraform", link: "/courses/devops/terraform", icon: <ConstructionIcon /> },
      { name: "Prometheus", link: "/courses/devops/prometheus", icon: <StorageIcon /> },
      { name: "Grafana", link: "/courses/devops/grafana", icon: <LayersIcon /> },
      { name: "Ansible", link: "/courses/devops/ansible", icon: <BuildIcon /> },
    ],
  },

  aws: {
    title: "AWS",
    desc: "Core AWS services",
    items: [
      { name: "EC2", link: "/courses/aws/ec2", icon: <StorageIcon /> },
      { name: "S3", link: "/courses/aws/s3", icon: <StorageIcon /> },
      { name: "IAM", link: "/courses/aws/iam", icon: <CodeIcon /> },
      { name: "Lambda", link: "/courses/aws/lambda", icon: <CodeIcon /> },
      { name: "VPC", link: "/courses/aws/vpc", icon: <CloudIcon /> },
      { name: "RDS", link: "/courses/aws/rds", icon: <StorageIcon /> },
      { name: "Route53", link: "/courses/aws/route53", icon: <CloudIcon /> },
      { name: "Auto Scaling", link: "/courses/aws/auto-scaling", icon: <CloudIcon /> },
      { name: "SQS", link: "/courses/aws/sqs", icon: <StorageIcon /> },
      { name: "SNS", link: "/courses/aws/sns", icon: <CloudIcon /> },
    ],
  },

  os: {
    title: "OS",
    desc: "Operating systems & scripting",
    items: [
      { name: "Linux Basics", link: "/courses/os/linux-basics", icon: <CodeIcon /> },
      { name: "Ubuntu", link: "/courses/os/ubuntu", icon: <CodeIcon /> },
      { name: "CentOS", link: "/courses/os/centos", icon: <CodeIcon /> },
      { name: "Red Hat", link: "/courses/os/redhat", icon: <CodeIcon /> },
      { name: "Windows Shell", link: "/courses/os/windows-shell-script", icon: <CodeIcon /> },
      { name: "Ubuntu Shell", link: "/courses/os/ubuntu-shell-script", icon: <CodeIcon /> },
    ],
  },
};

export default function MainNavbar() {
  const coursesBtnRef = useRef(null);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Welcome — start with Git!" },
    { id: 2, text: "New: Kubernetes - Ingress lesson" },
  ];

  const closeMenu = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        sx={{
          height: NAV_HEIGHT,
          justifyContent: "center",
          background: "linear-gradient(180deg,#041026,#02101a)",
          borderBottom: "1px solid rgba(0,234,255,0.06)",
          zIndex: 2000,
        }}
      >
        <Toolbar sx={{ maxWidth: 1400, mx: "auto", width: "100%" }}>
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Avatar sx={{ bgcolor: "transparent", border: "2px solid #00eaff" }}>
                <Typography sx={{ color: "#00eaff", fontWeight: 900 }}>K</Typography>
              </Avatar>
              <Typography sx={{ ml: 1, color: "#00eaff", fontWeight: 800 }}>Pahrikyns</Typography>
            </Box>

            <Button component={Link} to="/" sx={navBtn}>Home</Button>

            <Button
              ref={coursesBtnRef}
              sx={navBtn}
              onMouseEnter={() => { setActive("devops"); setOpen(true); }}
            >
              Courses ▾
            </Button>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* SEARCH */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.03)",
              px: 1, py: 0.4,
              borderRadius: 1,
              minWidth: 240
            }}>
              <InputBase
                placeholder="search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ ml: 1, color: "#fff", flex: 1 }}
              />
              <SearchIcon sx={{ color: "#00eaff" }} />
            </Box>

            {/* NOTIFICATIONS */}
            <IconButton onClick={() => setNotifOpen(v => !v)} sx={{ color: "#dfefff" }}>
              <Badge color="primary" badgeContent={notifications.length}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* NOTIF PANEL */}
            {notifOpen && (
              <Paper sx={{
                position: "absolute", right: 18, top: NAV_HEIGHT + 8,
                width: 300, p: 1, background: "#041022",
                border: "1px solid rgba(0,234,255,0.06)"
              }}>
                <Typography sx={{ color: "#00eaff", fontWeight: 700, px: 1 }}>Notifications</Typography>
                <Divider sx={{ my: 1 }} />
                {notifications.map(n => (
                  <Typography key={n.id} sx={{ px: 1, py: 0.7, color: "#fff" }}>{n.text}</Typography>
                ))}
              </Paper>
            )}

            {/* 5 AVATARS */}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {["K","A","H","S","P"].map((c,i)=>(
                <Avatar key={i} sx={{
                  width: 30, height: 30,
                  bgcolor: "#002b36",
                  border: "2px solid rgba(0,234,255,0.15)",
                  color: "#00eaff", fontWeight: 800
                }}>{c}</Avatar>
              ))}
            </Box>

            <Button component={Link} to="/login" sx={{ color: "#fff" }}>LOGIN</Button>
            <Button component={Link} to="/register" sx={{ bgcolor: "#00eaff", color: "#001" }}>REGISTER</Button>

            <IconButton sx={{ display: { md: "none" } }} onClick={() => setDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* POPPER MENU */}
      <Popper
        open={open}
        anchorEl={coursesBtnRef.current}
        placement="bottom-start"
        modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
      >
        <ClickAwayListener onClickAway={closeMenu}>
          <Paper sx={{
            width: 820,
            display: "flex",
            borderRadius: 2,
            background: "linear-gradient(180deg,#041225,#021018)",
            border: "1px solid rgba(0,234,255,0.06)"
          }}>
            
            {/* MENU A */}
            <Box sx={{ width: 240, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <List>
                {Object.entries(MENU).map(([key, cat]) => (
                  <ListItemButton
                    key={key}
                    selected={active === key}
                    onMouseEnter={() => setActive(key)}
                    sx={{ py: 2 }}
                  >
                    <ListItemIcon sx={{ color: "#00eaff" }}>
                      {key === "devops" ? <BuildIcon /> : key === "aws" ? <CloudIcon /> : <ComputerIcon />}
                    </ListItemIcon>

                    <ListItemText
                      primary={<Typography sx={{ color: active === key ? "#00eaff" : "#fff", fontWeight: 800 }}>{cat.title}</Typography>}
                      secondary={<Typography sx={{ fontSize: 12, color: "#aaa" }}>{cat.desc}</Typography>}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>

            {/* MENU B */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, mb: 1 }}>
                {MENU[active]?.title}
              </Typography>

              {MENU[active]?.items.map((it,i)=>(
                <Box
                  key={i}
                  component={Link}
                  to={it.link}
                  onClick={closeMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    py: 0.6,
                    my: 0.3,
                    textDecoration: "none",
                    color: "#fff",
                    borderRadius: 1,
                    transition: "0.15s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.04)",
                      color: "#00eaff",
                      transform: "translateX(4px)"
                    }
                  }}
                >
                  <Box sx={{
                    width: 28, height: 28,
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,234,255,0.06)",
                    border: "1px solid rgba(0,234,255,0.10)",
                    color: "#00eaff",
                    fontSize: 17
                  }}>
                    {it.icon}
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{it.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 280, background: "#021018", color: "#fff", height: "100%", p: 2 }}>
          <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>Pahrikyns</Typography>
          <Divider sx={{ my: 1 }} />

          {Object.entries(MENU).map(([key, cat]) => (
            <Box key={key} sx={{ mt: 1 }}>
              <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>{cat.title}</Typography>
              {cat.items.map((it,i)=>(
                <ListItemButton
                  key={i}
                  component={Link}
                  to={it.link}
                  onClick={() => setDrawer(false)}
                >
                  <ListItemText primary={it.name} />
                </ListItemButton>
              ))}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

/* NAV BUTTON STYLE */
const navBtn = {
  textTransform: "none",
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  "&:hover": { color: "#00eaff", background: "transparent" }
};
