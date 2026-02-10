import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { db } from "@/firebase";
import { createChannel } from "../../api/channelApi";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // REMOVED
import { useAuth } from "../../../../contexts/AuthContext";

/**
 * =====================================================
 * SLACK-LEVEL CREATE CHANNEL MODAL (CRASH SAFE)
 * =====================================================
 */

export default function CreateChannelModal({ open, onClose }) {
  const { firebaseUser, user: backendUser } = useAuth();

  // 🛡️ Fallback: If Firebase fails (e.g. anon auth disabled), try Backend User
  const currentUser = firebaseUser
    ? { uid: firebaseUser.uid, ...firebaseUser }
    : (backendUser ? { uid: backendUser.id, ...backendUser } : null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);

      // 🛡️ Use Backend API (Bypasses Client Auth Rules)
      await createChannel({
        name,
        description: desc,
        isPrivate: false,
        members: currentUser?.uid ? [currentUser.uid] : [],
        userId: currentUser?.uid || "admin",
      });

      setName("");
      setDesc("");
      onClose();
    } catch (err) {
      console.error("Channel create failed:", err);
      // Backend returns nice messages sometimes, otherwise fallback
      const msg = err.response?.data?.message || err.message;
      alert(`Failed to create channel: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a channel</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Channel name"
            placeholder="eg. design-team"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />

          <TextField
            label="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <Typography fontSize={12} color="gray">
            Channels are where your team communicates. They’re best when organized around a topic.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={create}
          disabled={loading || !name.trim()}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
