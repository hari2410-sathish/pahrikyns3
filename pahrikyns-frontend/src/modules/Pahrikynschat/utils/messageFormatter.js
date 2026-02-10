import { Typography } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";

export default function MessageStatus({ message }) {
  const { user } = useAuth();

  if (message.userId !== user.uid) return null;

  if (message.seenBy?.length > 1) {
    return <Typography fontSize={11}>Seen</Typography>;
  }
  if (message.deliveredTo?.length > 1) {
    return <Typography fontSize={11}>Delivered</Typography>;
  }
  return null;
}
