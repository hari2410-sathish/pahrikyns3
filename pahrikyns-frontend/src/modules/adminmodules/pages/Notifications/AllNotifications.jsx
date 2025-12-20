import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllNotifications, deleteNotification } from "../../../api/adminNotifications";

export default function AllNotifications() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await fetchAllNotifications();
    setList(res.data.notifications || []);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await deleteNotification(id);
    load();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>All Notifications</Typography>

      <List>
        {list.map((n) => (
          <ListItem
            key={n.id}
            secondaryAction={
              <IconButton onClick={() => remove(n.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Box>
              <b>{n.title}</b>
              <p>{n.message}</p>
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
