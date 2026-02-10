// LeftSidebar.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Tooltip,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { userMenu } from "../../data/userMenu";

/* ICONS */
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = (
    <motion.div
      animate={{ width: expanded ? 248 : 82 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      style={{
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255,255,255,0.12)",
        paddingBottom: 12,
      }}
    >
      {/* PROFILE */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ bgcolor: "#6366f1", width: 42, height: 42 }}>
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>

        {expanded && (
          <Box>
            <Typography sx={{ color: "#e5f6ff", fontWeight: 600 }}>
              {user?.name || "User"}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>
              {user?.email}
            </Typography>
          </Box>
        )}
      </Box>

      {/* COLLAPSE */}
      <Box sx={{ px: 1, mb: 1, textAlign: expanded ? "right" : "center" }}>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#7dd3fc",
            borderRadius: 2,
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.1, mb: 1 }} />

      {/* MENU */}
      {userMenu.map((item, i) => {
        const active = location.pathname === item.path;

        return (
          <Tooltip title={!expanded ? item.label : ""} placement="right" key={i}>
            <motion.div whileHover={{ x: 6 }}>
              <Box
                onClick={() => navigate(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 1.8,
                  py: 1.2,
                  mx: 1,
                  mb: 0.6,
                  borderRadius: 2,
                  cursor: "pointer",
                  color: active ? "#e0f2fe" : "#cbd5e1",
                  background: active
                    ? "linear-gradient(90deg, rgba(99,102,241,0.35), rgba(14,165,233,0.25))"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(125,211,252,0.35)"
                    : "1px solid transparent",
                }}
              >
                <item.icon />
                {expanded && (
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            </motion.div>
          </Tooltip>
        );
      })}

      {/* LOGOUT */}
      <Divider sx={{ opacity: 0.1, my: 1 }} />
      <Box
        onClick={logout}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.2,
          mx: 1,
          borderRadius: 2,
          cursor: "pointer",
          color: "#f87171",
        }}
      >
        <LogoutIcon />
        {expanded && <Typography>Logout</Typography>}
      </Box>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: "fixed", top: 14, left: 14, zIndex: 9999 }}
        >
          <MenuIcon sx={{ color: "#7dd3fc" }} />
        </IconButton>

        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          {SidebarContent}
        </Drawer>
      </>
    );
  }

  return <Box sx={{ height: "100vh" }}>{SidebarContent}</Box>;
}
