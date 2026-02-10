// TopBar.jsx
import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { userMenu } from "../../data/userMenu";
import NotificationDrawer from "./NotificationDrawer";

export default function TopBar() {
  const { user } = useAuth();
  const location = useLocation();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const firstName = user?.name?.split(" ")[0] || "User";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const activePage =
    userMenu.find((m) => m.path === location.pathname)?.label || "Home";

  return (
    <>
      <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Box sx={{ px: 2, py: 1.8, mb: 3 }}>
          <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>
            {activePage}
          </Typography>

          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            {greeting}, {firstName} 👋
          </Typography>
        </Box>
      </motion.div>
    </>
  );
}
