import { Avatar, Badge, Box } from "@mui/material";

export default function ChatAvatar({ src, name, size = 36, isOnline = false, showStatus = true }) {
    // Styles for the online dot
    const statusStyles = {
        "& .MuiBadge-badge": {
            backgroundColor: "#2BAC76", // Slack Green
            color: "#2BAC76",
            boxShadow: `0 0 0 2px white`, // White border effect
            width: 10,
            height: 10,
            borderRadius: "50%",
            minWidth: "unset",
            padding: 0,
            bottom: 2,
            right: 2,
        }
    };

    const avatar = (
        <Avatar
            src={src}
            alt={name}
            sx={{
                width: size,
                height: size,
                bgcolor: "#1d1c1d", // Slack Dark fallback
                fontSize: size * 0.5,
                borderRadius: "4px", // Slack squares with slight rounding
            }}
        >
            {name?.charAt(0)?.toUpperCase()}
        </Avatar>
    );

    if (!showStatus) return avatar;

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            invisible={!isOnline}
            sx={statusStyles}
        >
            {avatar}
        </Badge>
    );
}
