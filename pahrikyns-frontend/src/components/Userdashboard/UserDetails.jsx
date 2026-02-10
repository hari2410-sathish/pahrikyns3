import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";

export default function UserDetails({ user }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,255,255,0.15)",
          color: "#e2e8f0",
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 2 }}>
          Profile Details
        </Typography>

        <Typography>Name: {user.name}</Typography>
        <Typography>Email: {user.email}</Typography>

        <Typography sx={{ mt: 1 }}>
          Verified:
          <Chip
            label={user.isVerified ? "Verified" : "Not Verified"}
            color={user.isVerified ? "success" : "warning"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </motion.div>
  );
}
