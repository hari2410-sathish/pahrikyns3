import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatAvatar from "../common/ChatAvatar";
import { useChat } from "../../context/ChatContext";
import { usePresence } from "../../hooks/usePresence";

export default function NewMessageModal({ open, onClose }) {
    const { setActiveChat, getDmRoomId } = useChat();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchUsers();
        }
    }, [open]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    const startDm = (user) => {
        const roomId = getDmRoomId(user.id);

        setActiveChat({
            type: "dm",
            id: roomId,
            name: user.name,
            avatar: user.avatar,
            userId: user.id // Store target user ID for reference
        });

        onClose();
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box p={2} pb={0} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold" fontSize={18}>New Message</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </Box>

            <DialogContent>
                <TextField
                    fullWidth
                    placeholder="Search by name or email"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Suggested
                </Typography>

                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                    {loading ? (
                        <Typography p={2} align="center">Loading...</Typography>
                    ) : filteredUsers.length === 0 ? (
                        <Typography p={2} align="center" color="text.secondary">No users found</Typography>
                    ) : (
                        filteredUsers.map((user) => (
                            <UserListItem key={user.id} user={user} onClick={() => startDm(user)} />
                        ))
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}

function UserListItem({ user, onClick }) {
    const { isOnline } = usePresence(user.id);

    return (
        <ListItem
            button
            onClick={onClick}
            sx={{ borderRadius: 2, "&:hover": { bgcolor: "#f1f5f9" } }}
        >
            <ListItemAvatar>
                <ChatAvatar src={user.avatar} name={user.name} size={40} showStatus={true} isOnline={isOnline} />
            </ListItemAvatar>
            <ListItemText
                primary={<Typography fontWeight="bold">{user.name}</Typography>}
                secondary={user.email}
            />
        </ListItem>
    )
}

