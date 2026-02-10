import { Box, Typography, Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../../contexts/AuthContext";


/**
 * =====================================================
 * SLACK-LEVEL USER STATUS BAR
 * =====================================================
 */

export default function UserStatus() {
  const { user, logout } = useAuth();



  if (!user) return null;

  return (
    <Box
      sx={{
        p: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #1e293b",
        bgcolor: "#020617",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {user.displayName?.charAt(0) || user.email?.charAt(0)}
        </Avatar>

        <Box>
          <Typography fontSize={13}>{user.displayName}</Typography>
          <Typography fontSize={11} color="#22c55e">
            Online
          </Typography>
        </Box>
      </Box>

      <IconButton onClick={logout}>
        <LogoutIcon sx={{ color: "#94a3b8" }} />
      </IconButton>
    </Box>
  );
}
