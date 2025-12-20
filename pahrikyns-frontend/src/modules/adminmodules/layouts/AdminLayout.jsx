import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

export default function AdminLayout() {
  const [notifyCount, setNotifyCount] = useState(3);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1200,
          bgcolor: "#020617",
          borderRight: "1px solid #1e293b",
        }}
      >
        <AdminSidebar notifyCount={notifyCount} />
      </Box>

      {/* MAIN AREA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* TOP BAR */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            bgcolor: "#020617",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <AdminTopbar
            notifyCount={notifyCount}
            onToggleSidebar={() => {
              document.body.classList.toggle("sidebar-collapsed");
            }}
          />
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
            background:
              "radial-gradient(1200px 400px at 50% -5%, #0f172a, #020617 60%)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
