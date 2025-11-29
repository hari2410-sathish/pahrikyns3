import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Avatar,
  useTheme,
  Collapse,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// Motion
import { motion, AnimatePresence } from "framer-motion";

/**
 * PRO Neon Admin Sidebar
 * - Hover expand
 * - Multi-level menu
 * - Bottom panel
 * - Motion animations (framer-motion)
 *
 * Paste to: src/components/admin/AdminSidebar.jsx
 * Make sure: `framer-motion` is installed (`npm i framer-motion`)
 */

const menuStructure = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: "courses",
    title: "Courses",
    path: "/admin/courses",
    icon: <BookIcon />,
    children: [
      { title: "All Courses", path: "/admin/courses" },
      { title: "Add Course", path: "/admin/courses/add" },
      { title: "Categories", path: "/admin/courses/categories" },
      { title: "Lessons", path: "/admin/courses/lessons" },
      { title: "Course Pricing", path: "/admin/courses/pricing" },
    ],
  },
  {
    id: "students",
    title: "Students",
    path: "/admin/students",
    icon: <PeopleIcon />,
    children: [
      { title: "All Students", path: "/admin/students" },
      { title: "Active", path: "/admin/students/active" },
      { title: "Suspended", path: "/admin/students/suspended" },
      { title: "Student Payments", path: "/admin/students/payments" },
      { title: "Progress", path: "/admin/students/progress" },
      { title: "Certificates", path: "/admin/students/certificates" },
      { title: "Graduated", path: "/admin/students/graduated" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    path: "/admin/analytics",
    icon: <BarChartIcon />,
    children: [
      { title: "Overview", path: "/admin/analytics/overview" },
      { title: "Revenue", path: "/admin/analytics/revenue" },
      { title: "Activity", path: "/admin/analytics/activity" },
      { title: "Course Analytics", path: "/admin/analytics/courses" },
      { title: "System Logs", path: "/admin/analytics/logs" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    path: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

const sidebarVariants = {
  collapsed: { width: 72, transition: { type: "spring", stiffness: 260, damping: 24 } },
  expanded: { width: 260, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

export default function AdminSidebar({ onLogout = () => {}, admin = null }) {
  const theme = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const hoverTimer = useRef(null);
  const [openMenus, setOpenMenus] = useState({});
  const [isProResume, setIsProResume] = useState("simple");

  useEffect(() => {
    // open parent menu if current route is inside it
    const m = {};
    menuStructure.forEach((ms) => {
      if (ms.children && location.pathname.startsWith(ms.path)) m[ms.id] = true;
    });
    setOpenMenus((s) => ({ ...s, ...m }));
  }, [location.pathname]);

  const toggleMenu = (id) => setOpenMenus((s) => ({ ...s, [id]: !s[id] }));

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setCollapsed(false);
  };
  const handleMouseLeave = () => {
    // small delay to avoid jitter
    hoverTimer.current = setTimeout(() => setCollapsed(true), 260);
  };

  return (
    <motion.nav
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: "100%",
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(2,6,12,0.6), rgba(2,6,12,0.5))",
        borderRight: "1px solid rgba(255,255,255,0.03)",
        color: "white",
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 1.25 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44 }}>{admin?.email?.[0]?.toUpperCase() || "A"}</Avatar>

          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    Admin Panel
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                    {admin?.email || "admin@you.com"}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <IconButton
            size="small"
            onClick={() => setCollapsed((s) => !s)}
            sx={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.04)", bgcolor: "rgba(255,255,255,0.02)" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.03)", my: 1 }} />

        {/* Menu List */}
        <List sx={{ p: 0 }}>
          {menuStructure.map((m) => {
            const active = isActive(m.path);
            return (
              <Box key={m.id} sx={{ position: "relative" }}>
                <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                  <ListItemButton
                    component={m.children ? "div" : NavLink}
                    to={!m.children ? m.path : undefined}
                    onClick={() => m.children && toggleMenu(m.id)}
                    sx={{
                      mb: 1,
                      borderRadius: 1.5,
                      px: 1.25,
                      py: 1.25,
                      textDecoration: "none",
                      color: active ? "primary.main" : "rgba(255,255,255,0.92)",
                      background: active ? "linear-gradient(180deg, rgba(0,30,40,0.24), rgba(0,10,12,0.08))" : "transparent",
                      transition: "all 160ms ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: active ? "primary.main" : "rgba(255,255,255,0.85)" }}>{m.icon}</ListItemIcon>

                    <AnimatePresence>
                      {!collapsed && (
                        <motion.div
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          <ListItemText
                            primary={m.title}
                            primaryTypographyProps={{ fontWeight: active ? 800 : 700 }}
                          />

                          {m.children && (openMenus[m.id] ? <ExpandLess /> : <ExpandMore />)}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* small active dot when collapsed */}
                    {active && collapsed && (
                      <Box sx={{ position: "absolute", right: 8, width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 6px 18px rgba(0,200,255,0.18)" }} />
                    )}
                  </ListItemButton>
                </motion.div>

                {/* children */}
                {m.children && (
                  <Collapse in={!!openMenus[m.id]} timeout="auto" unmountOnExit>
                    <List sx={{ pl: collapsed ? 2.5 : 4, py: 0 }}>
                      {m.children.map((c) => {
                        const cActive = isActive(c.path);
                        return (
                          <ListItemButton
                            key={c.path}
                            component={NavLink}
                            to={c.path}
                            sx={{
                              borderRadius: 1,
                              px: 1,
                              py: 0.9,
                              mb: 0.5,
                              color: cActive ? "primary.main" : "rgba(255,255,255,0.82)",
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <LocalOfferIcon sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={c.title} primaryTypographyProps={{ fontSize: 13 }} />}
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        <Box sx={{ flex: 1 }} />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.03)" }} />

        {/* Bottom Panel */}
        <Box sx={{ p: 1.25, display: "flex", flexDirection: "column", gap: 1.25 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!collapsed && (
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Theme
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Neon Dark
                </Typography>
              </Box>
            )}

            <Switch checked={isProResume === "pro"} onChange={(e) => setIsProResume(e.target.checked ? "pro" : "simple")} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {!collapsed && (
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                v1.2.3 — {isProResume}
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" onClick={() => window.open("/support", "_blank")}>?</IconButton>
              <ListItemButton
                onClick={() => {
                  try {
                    onLogout();
                  } catch (e) {
                    console.error(e);
                  }
                }}
                sx={{ px: 1, py: 0.6, borderRadius: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <LogoutIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 800 }} />}
              </ListItemButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.nav>
  );
}
