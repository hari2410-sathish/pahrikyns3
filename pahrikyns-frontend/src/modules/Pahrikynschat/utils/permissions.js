import { Box, Typography, Link } from "@mui/material";

export default function MessageItem({ message }) {
  return (
    <Box mb={1}>
      <Typography fontSize={13} color="gray">
        {message.userName}
      </Typography>

      {message.text && <Typography>{message.text}</Typography>}

      {message.file && (
        <Box mt={0.5}>
          {message.file.type.startsWith("image") ? (
            <img
              src={message.file.url}
              alt={message.file.name}
              style={{ maxWidth: 200, borderRadius: 6 }}
            />
          ) : (
            <Link href={message.file.url} target="_blank">
              📄 {message.file.name}
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
}
await sendMessage(activeChat, {
  text,
  userId: user.uid,
  userName: user.displayName || "User",
});
