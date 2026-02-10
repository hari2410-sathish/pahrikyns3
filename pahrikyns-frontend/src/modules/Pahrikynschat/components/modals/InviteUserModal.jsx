import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

/**
 * =====================================================
 * SLACK-LEVEL INVITE USER MODAL
 * =====================================================
 */

export default function InviteUserModal({ open, onClose }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;

    getDocs(collection(db, "users")).then((snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [open]);

  const invite = async (userId) => {
    const workspaceRef = doc(db, "workspace", "main");

    await updateDoc(workspaceRef, {
      members: arrayUnion(userId),
    });

    onClose();
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Invite people</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        <List>
          {filtered.map((u) => (
            <ListItem
              key={u.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                borderRadius: 2,
                "&:hover": { background: "#f1f5f9" },
              }}
            >
              <Box>
                <Typography>{u.name}</Typography>
                <Typography fontSize={12} color="gray">
                  {u.email}
                </Typography>
              </Box>

              <Button size="small" onClick={() => invite(u.id)}>
                Invite
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
