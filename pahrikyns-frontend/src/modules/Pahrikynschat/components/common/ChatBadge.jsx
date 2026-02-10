import { Box, Typography } from "@mui/material";

export default function ChatBadge({ count }) {
    if (!count || count <= 0) return null;

    return (
        <Box
            sx={{
                bgcolor: "#CD2553", // Slack Mention Red
                borderRadius: "12px",
                height: 18,
                minWidth: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.6,
            }}
        >
            <Typography
                sx={{
                    color: "white",
                    fontSize: 11,
                    fontWeight: "bold",
                    lineHeight: 1,
                }}
            >
                {count > 99 ? "99+" : count}
            </Typography>
        </Box>
    );
}
