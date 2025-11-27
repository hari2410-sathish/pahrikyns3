import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";

export default function AdminTopbar() {
  const { logout } = useContext(AdminAuthContext);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #eaeaea" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Admin Panel
        </Typography>
        <Button onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
