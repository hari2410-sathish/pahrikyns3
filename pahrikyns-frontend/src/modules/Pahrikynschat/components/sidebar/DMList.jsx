import {
  List,
  ListItem,
  Box,
  Typography,
  Avatar,
  Badge
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { usePresence } from "../../hooks/usePresence";

/**
 * =====================================================
 * SLACK-LEVEL DM LIST
 * =====================================================
 */

export default function DMList({ users = [] }) {
  const { setActiveChat, activeChat } = useChat();
  const navigate = useNavigate();

  const openDM = (user) => {
    setActiveChat({
      type: "dm",
      id: user.id,
      name: user.name,
    });

    navigate(`/chat/dm/${user.id}`);
  };

  return (
    <List>
      {users.map((user) => {
        const { isOnline } = usePresence(user.id);
        const isActive = activeChat?.id === user.id;

        return (
          <ListItem
            key={user.id}
            onClick={() => openDM(user)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              px: 1.5,
              py: 1,
              bgcolor: isActive ? "#1e293b" : "transparent",
              "&:hover": { bgcolor: "#1e293b" },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Badge
                overlap="circular"
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: isOnline ? "#22c55e" : "#64748b",
                    boxShadow: isOnline ? "0 0 6px #22c55e" : "none",
                  },
                }}
              >
                <Avatar sx={{ width: 28, height: 28 }}>
                  {user.name?.charAt(0)}
                </Avatar>
              </Badge>

              <Typography
                fontSize={14}
                color="white"
                fontWeight={isActive ? "bold" : "normal"}
              >
                {user.name}
              </Typography>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
}
