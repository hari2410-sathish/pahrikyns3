import { Box, Typography, IconButton, Avatar } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

/**
 * =====================================================
 * SLACK-LEVEL WORKSPACE HEADER
 * =====================================================
 */

export default function WorkspaceInfo({ onInvite }) {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#020617",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar>P</Avatar>
        <Box>
          <Typography fontWeight="bold">Pahrikyns</Typography>
          <Typography fontSize={11} color="#94a3b8">
            Team Workspace
          </Typography>
        </Box>
      </Box>

      <IconButton onClick={onInvite}>
        <GroupAddIcon sx={{ color: "#94a3b8" }} />
      </IconButton>
    </Box>
  );
}
