import { Box, IconButton } from "@mui/material";

const EMOJIS = ["👍", "😄", "🔥", "❤️", "🎉"];

export default function EmojiPicker({ onSelect }) {
  return (
    <Box display="flex" gap={0.5}>
      {EMOJIS.map((e) => (
        <IconButton
          key={e}
          size="small"
          onClick={() => onSelect(e)}
        >
          {e}
        </IconButton>
      ))}
    </Box>
  );
}
