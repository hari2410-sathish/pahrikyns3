import { Box } from "@mui/material";
import EmojiPicker from "../common/EmojiPicker";
import { toggleReaction } from "../../api/messageApi";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "../../context/ChatContext";

export default function MessageActions({ message }) {
  const { user } = useAuth();
  const { activeChannel } = useChat();

  const handleEmoji = async (emoji) => {
    await toggleReaction({
      channelId: activeChannel.id,
      messageId: message.id,
      emoji,
      userId: user.uid,
      currentReactions: message.reactions || {},
    });
  };

  return (
    <Box mt={0.5}>
      <EmojiPicker onSelect={handleEmoji} />
    </Box>
  );
}
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import { deleteMessage, pinMessage } from "../../api/moderationApi";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { isAdminOrMod } from "../../utils/permissions";

export default function MessageActions({ message, channel }) {
  const { activeChat } = useChat();
  const { user } = useAuth();

  if (!isAdminOrMod(channel, user.uid)) return null;

  return (
    <Box>
      <IconButton onClick={() => deleteMessage(activeChat, message.id)}>
        <DeleteIcon fontSize="small" />
      </IconButton>

      <IconButton onClick={() => pinMessage(activeChat, message.id)}>
        <PushPinIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
<Button onClick={() => openThread(message)}>
  Reply
</Button>
