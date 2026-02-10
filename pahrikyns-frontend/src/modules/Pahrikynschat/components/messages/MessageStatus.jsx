import { Box, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

/**
 * =====================================================
 * SLACK-LEVEL MESSAGE STATUS
 * =====================================================
 *  ✓  sent
 *  ✓✓ delivered
 *  ✓✓ blue = seen
 */

export default function MessageStatus({ message, lastReadAt }) {
  if (!message) return null;

  // not sent yet
  if (!message.sentAt) {
    return <CheckIcon sx={{ fontSize: 14, color: "#64748b" }} />;
  }

  // delivered but not seen
  if (message.sentAt > lastReadAt) {
    return (
      <Tooltip title="Delivered">
        <DoneAllIcon sx={{ fontSize: 14, color: "#64748b" }} />
      </Tooltip>
    );
  }

  // seen
  return (
    <Tooltip title="Seen">
      <DoneAllIcon sx={{ fontSize: 14, color: "#38bdf8" }} />
    </Tooltip>
  );
}
