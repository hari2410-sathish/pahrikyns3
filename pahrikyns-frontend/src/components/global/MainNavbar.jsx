// src/components/global/MainNavbar.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Popper,
  Paper,
  Typography,
  InputBase,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Badge,
  Avatar,
} from "@mui/material";

import { Link } from "react-router-dom";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getNotifications, markAllRead } from "../../utils/notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppThemeContext } from "../../ThemeContext";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import GitHubIcon from "@mui/icons-material/GitHub";
import AdbIcon from "@mui/icons-material/Adb";
import PrecisionIcon from "@mui/icons-material/PrecisionManufacturing";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";

import { useAuth } from "../../contexts/AuthContext";

// ❌ ThemeToggle component remove pannirukken –
// nested <button> → <button> warning avoid panradhu.
const NAV_HEIGHT = 60;

/* MENU STRUCTURE */
const MENU = {
  devops: {
    title: "DevOps",
    desc: "CI/CD, containers & infra automation",
    items: [
      { name: "Git", link: "/courses/devops/git", icon: <GitHubIcon /> },
      { name: "Docker", link: "/courses/devops/docker", icon: <AdbIcon /> },
      {
        name: "Jenkins",
        link: "/courses/devops/jenkins",
        icon: <PrecisionIcon />,
      },
      {
        name: "Kubernetes",
        link: "/courses/devops/kubernetes",
        icon: <CloudQueueIcon />,
      },
      {
        name: "Terraform",
        link: "/courses/devops/terraform",
        icon: <ConstructionIcon />,
      },
      {
        name: "Prometheus",
        link: "/courses/devops/prometheus",
        icon: <StorageIcon />,
      },
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
      {
        name: "Auto Scaling",
        link: "/courses/aws/auto-scaling",
        icon: <CloudIcon />,
      },
      { name: "SQS", link: "/courses/aws/sqs", icon: <StorageIcon /> },
      { name: "SNS", link: "/courses/aws/sns", icon: <CloudIcon /> },
    ],
  },

  Script: {
    title: "SCRIPT",
    desc: "Core Script services",
    items: [
      {
        name: "DOCKERFILE",
        link: "/courses/script/dockerfile",
        icon: <StorageIcon />,
      },
      { name: "YAML", link: "/courses/script/yaml", icon: <StorageIcon /> },
      { name: "GROOVE", link: "/courses/script/groove", icon: <CodeIcon /> },
    ],
  },

  os: {
    title: "OS",
    desc: "Operating systems & scripting",
    items: [
      {
        name: "Linux Basics",
        link: "/courses/os/linux-basics",
        icon: <CodeIcon />,
      },
      { name: "Ubuntu", link: "/courses/os/ubuntu", icon: <CodeIcon /> },
      { name: "CentOS", link: "/courses/os/centos", icon: <CodeIcon /> },
      { name: "Red Hat", link: "/courses/os/redhat", icon: <CodeIcon /> },
      {
        name: "Windows Shell",
        link: "/courses/os/windows-shell-script",
        icon: <CodeIcon />,
      },
      {
        name: "Ubuntu Shell",
        link: "/courses/os/ubuntu-shell-script",
        icon: <CodeIcon />,
      },
    ],
  },
};
// ✅ RESUME MENU (ONLY RESUME)
const RESUME_MENU = {
  title: "Resume",
  desc: "Build your professional resume",
  items: [
    { name: "Templates", link: "/resume/templates" },
    { name: "Build Resume", link: "/resume/builder" },
    { name: "My Resumes", link: "/resume" },
  ],
};

export default function MainNavbar() {
  const { user, logout } = useAuth();
  const coursesBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);

  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useContext(AppThemeContext);

  // notifications (localStorage-backed)
  const [notifications, setNotifications] = useState(() => getNotifications());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "notifications") {
        setNotifications(getNotifications());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setActive(null);
  };

  const toggleProfile = () => setProfileOpen((p) => !p);
  const closeProfile = () => setProfileOpen(false);

  const navBtn = {
    textTransform: "none",
    color: "#e3dcf0ff",
    fontWeight: 700,
    fontSize: 17,
    position: "relative",
    px: 2,
    py: 1,
    "&:hover": {
      color: "#0f0f0fff",
      background: "rgba(6, 250, 6, 0.93)",
      boxShadow: "0 0 10px rgba(245, 249, 250, 0.15)",
      transition: "0.18s",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -6,
      width: "0%",
      height: "2px",
      background: "#ff00f2ff",
      transition: "0.28s ease",
      borderRadius: "2px",
    },
    "&:hover::after": {
      width: "100%",
    },
  };

  const profileItemStyle = {
    px: 2,
    py: 1,
    fontSize: "14px",
    borderRadius: 1,
    color: "#3c16c7ff",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      background: "rgba(0,234,255,0.08)",
      color: "#00eaff",
      boxShadow: "0 0 10px rgba(0,234,255,0.12)",
      transition: "0.18s",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAVBAR */}
      <AppBar
        sx={{
          width: "100%",
          left: 0,
          right: 0,
          top: 0,
          height: NAV_HEIGHT,
          justifyContent: "center",
          background: "rgba(68, 58, 92, 0.62)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,234,255,0.12)",
          boxShadow: "0 6px 30px rgba(0, 234, 255, 0.06)",
          zIndex: 2000,
          position: "sticky",
          transition: "0.25s ease",
        }}
      >
        <Toolbar sx={{ maxWidth: 1400, mx: "auto", width: "100%" }}>
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  border: "2px solid #ff00eaff",
                }}
              >
                <Typography sx={{ color: "#e6f705ff", fontWeight: 900 }}>
                  KH
                </Typography>
              </Avatar>
              <Typography sx={{ ml: 1, color: "#eeff00ff", fontWeight: 800 }}>
                PAHRIKYNS
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button component={Link} to="/" sx={navBtn}>
              Home
            </Button>
            <Button
              ref={coursesBtnRef}
              sx={navBtn}
              onMouseEnter={() => {
                setActive("devops");
                setOpen(true);
              }}
              onClick={() => {
                setActive("devops");
                setOpen((v) => !v);
              }}
            >
              Courses ▾
            </Button>
          </Box>
<Button
  ref={resumeBtnRef}   // ✅ THIS LINE IMPORTANT
  sx={navBtn}
  onMouseEnter={() => {
    setActive("resume");
    setOpen(true);
  }}
  onClick={() => {
    setActive("resume");
    setOpen(true);
  }}
>
  Resume ▾
</Button>


          <Box sx={{ flex: 1 }} />

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* SEARCH */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "rgba(68, 31, 201, 0.03)",
                px: 1,
                py: 0.45,
                borderRadius: 1,
                minWidth: 300,
                transition: "0.25s",
                "&:focus-within": {
                  boxShadow: "0 0 12px rgba(243, 238, 239, 0.28)",
                  border: "1px solid rgba(252, 253, 253, 0.28)",
                },
              }}
            >
              
              <InputBase
                placeholder="search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ ml: 1, color: "#f1ebebff", flex: 1 }}
              />
              <SearchIcon sx={{ color: "#00eaff" }} />
            </Box>

            {/* NOTIFICATIONS */}
            <IconButton
              onClick={() => {
                setNotifOpen((v) => !v);
                if (!notifOpen) {
                  markAllRead();
                  setNotifications(getNotifications());
                }
              }}
              sx={{ color: "#daee22ff" }}
            >
              <Badge
                color="primary"
                badgeContent={notifications.filter((n) => !n.read).length}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* THEME TOGGLE – pure IconButton (NO inner button) */}
            <IconButton onClick={toggleTheme} sx={{ color: "#042929ff" }}>
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* NOTIF PANEL */}
            {notifOpen && (
              <Paper
                sx={{
                  position: "absolute",
                  right: 18,
                  top: NAV_HEIGHT + 8,
                  width: 320,
                  p: 1,
                  background: "rgba(4,16,38,0.95)",
                  border: "1px solid rgba(0,234,255,0.12)",
                  backdropFilter: "blur(8px)",
                  animation: "fadeSlide 0.22s ease",
                  zIndex: 2200,
                }}
              >
                <Typography
                  sx={{ color: "#00eaff", fontWeight: 700, px: 1 }}
                >
                  Notifications
                </Typography>
                <Divider sx={{ my: 1 }} />
                {notifications.length === 0 && (
                  <Typography
                    sx={{ px: 1, py: 0.7, color: "#9fbfdc" }}
                  >
                    No notifications
                  </Typography>
                )}
                {notifications.map((n) => (
                  <Box
                    key={n.id}
                    sx={{
                      px: 1,
                      py: 0.8,
                      color: n.read ? "#8fa9bf" : "#fff",
                      bgcolor: n.read
                        ? "transparent"
                        : "rgba(0,234,255,0.03)",
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                      {n.text}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, opacity: 0.6 }}
                    >
                      {new Date(n.id).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            )}

            {/* LOGIN / REGISTER */}
            {!user ? (
  <>
    <Button
      component={Link}
      to="/login"
      sx={{ bgcolor: "#1ed86cff", color: "#fff" }}
    >
      LOGIN
    </Button>
    <Button
      component={Link}
      to="/register"
      sx={{ bgcolor: "#03bd50ff", color: "#001" }}
    >
      REGISTER
    </Button>
  </>
) : (
  <ClickAwayListener onClickAway={closeProfile}>
    <Box sx={{ position: "relative" }}>
      <Avatar
        ref={profileRef}
        onClick={toggleProfile}
        sx={{
          width: 34,
          height: 34,
          bgcolor: "#002b36",
          border: "2px solid rgba(0,234,255,0.35)",
          cursor: "pointer",
        }}
      >
        {user?.name?.[0]?.toUpperCase() || "U"}
      </Avatar>

      {profileOpen && (
        <Paper sx={{ position: "absolute", right: 0, top: "46px", p: 1 }}>
          <Box component={Link} to="/dashboard" sx={profileItemStyle}>
            Dashboard
          </Box>
          <Box
            onClick={() => {
              logout();
              closeProfile();
            }}
            sx={profileItemStyle}
          >
            Logout
          </Box>
        </Paper>
      )}
    </Box>
  </ClickAwayListener>
)}

            <IconButton
              sx={{ display: { md: "none" } }}
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* POPPER MEGA MENU */}
      <Popper
  open={open}
  anchorEl={
    active === "resume"
      ? resumeBtnRef.current
      : coursesBtnRef.current
  }
  placement="bottom-start"
  modifiers={[{ name: "offset", options: { offset: [0, 15] } }]}
  onMouseLeave={closeMenu}
>

        <ClickAwayListener onClickAway={closeMenu}>
          <Paper
            sx={{
              width: 530,
              display: "inline-flex",
              borderRadius: 2,
              background: "linear-gradient(180deg,#041225,#021018)",
              border: "1px solid rgba(0,234,255,0.06)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              animation: "fadeSlide 0.22s ease",
              transformOrigin: "top left",
              overflow: "hidden",
            }}
          >
            {/* MENU A */}
            <Box
              sx={{
                width: 240,
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <List>
                {Object.entries(MENU).map(([key, cat]) => (
                  <ListItemButton
                    key={key}
                    selected={active === key}
                    onMouseEnter={() => setActive(key)}
                    sx={{ py: 2 }}
                  >
                    <ListItemIcon sx={{ color: "#00eaff" }}>
                      {key === "devops" ? (
                        <BuildIcon />
                      ) : key === "aws" ? (
                        <CloudIcon />
                      ) : (
                        <ComputerIcon />
                      )}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: active === key ? "#00eaff" : "#fff",
                            fontWeight: 800,
                          }}
                        >
                          {cat.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{ fontSize: 12, color: "#aaa" }}
                        >
                          {cat.desc}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>

            {/* MENU B */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography
                sx={{ color: "#00eaff", fontWeight: 900, mb: 1 }}
              >
                {MENU[active]?.title}
              </Typography>

              {(active === "resume"
  ? RESUME_MENU.items
  : MENU[active]?.items
)?.map((it, i) => (

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
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,234,255,0.06)",
                      border: "1px solid rgba(0,234,255,0.10)",
                      color: "#00eaff",
                      fontSize: 17,
                    }}
                  >
                    {it.icon}
                  </Box>

                  <Typography
                    sx={{ fontWeight: 700, fontSize: 14 }}
                  >
                    {it.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box
          sx={{
            width: 280,
            background: "#021018",
            color: "#fff",
            height: "100%",
            p: 2,
          }}
        >
          <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>
            Pahrikyns
          </Typography>
          <Divider sx={{ my: 1 }} />

          {Object.entries(MENU).map(([key, cat]) => (
            <Box key={key} sx={{ mt: 1 }}>
              <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>
                {cat.title}
              </Typography>
              {cat.items.map((it, i) => (
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
