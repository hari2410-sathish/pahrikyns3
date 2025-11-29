// ==========================
// PRO AdminTopbar.jsx
// ==========================
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";


export function AdminTopbar() {
const { logout, admin } = useContext(AdminAuthContext);


return (
<AppBar
position="sticky"
color="transparent"
elevation={0}
sx={{
backdropFilter: "blur(8px)",
background: "rgba(0,0,0,0.35)",
borderBottom: "1px solid rgba(255,255,255,0.06)",
px: 2,
}}
>
<Toolbar sx={{ display: "flex", alignItems: "center" }}>
<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
<IconButton edge="start" color="inherit">
<MenuIcon />
</IconButton>
<Typography variant="h6" sx={{ fontWeight: 800 }}>
Admin Panel
</Typography>
</Box>


<Box sx={{ flex: 1 }} />


{/* Notifications */}
<IconButton color="inherit" sx={{ mr: 2 }}>
<NotificationsNoneIcon />
</IconButton>


{/* Profile */}
<Avatar
sx={{ bgcolor: "primary.main", cursor: "pointer" }}
onClick={logout}
>
{admin?.email?.[0]?.toUpperCase() || "A"}
</Avatar>
</Toolbar>
</AppBar>
);
}