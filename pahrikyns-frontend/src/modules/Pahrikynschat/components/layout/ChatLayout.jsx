import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ThreadPanel from "./ThreadPanel";

export default function ChatLayout() {
  return (
    <Box display="flex" height="100vh" width="100vw" overflow="hidden">
      {/* LEFT - Slack Sidebar (Aubergine Theme) */}
      <ChatSidebar />

      {/* RIGHT - Chat Area (Clean White/Dark) */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        bgcolor="background.default" // Uses theme default (white/dark)
      >
        <ChatHeader />

        {/* Scrollable Message Area */}
        <Box flex={1} overflow="auto">
          <Outlet />
        </Box>

        <ChatFooter />
      </Box>

      {/* RIGHT - Thread Panel (Slide-in) */}
      <ThreadPanel />
    </Box>
  );
}
