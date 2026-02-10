import { Routes, Route } from "react-router-dom";
import ChatLayout from "../components/layout/ChatLayout";
import ChannelPage from "../pages/ChannelPage";
import DirectMessage from "../pages/DirectMessage";
import { ChatProvider } from "../context/ChatContext";

export default function ChatRoutes() {
  return (
    <ChatProvider>
      <Routes>
        <Route element={<ChatLayout />}>
          <Route index element={<div style={{padding:20}}>Select a chat</div>} />
          <Route path="channel/:channelId" element={<ChannelPage />} />
          <Route path="dm/:userId" element={<DirectMessage />} />
        </Route>
      </Routes>
    </ChatProvider>
  );
}
