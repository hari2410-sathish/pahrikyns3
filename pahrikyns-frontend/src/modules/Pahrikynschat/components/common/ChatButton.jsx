import { Button } from "@mui/material";

export default function ChatButton({ children, variant = "primary", sx = {}, ...props }) {
    const isPrimary = variant === "primary";

    return (
        <Button
            variant={isPrimary ? "contained" : "outlined"}
            disableElevation
            sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "4px",
                fontSize: "15px",
                height: "36px",
                bgcolor: isPrimary ? "#007a5a" : "transparent", // Slack Green
                color: isPrimary ? "white" : "#1d1c1d",
                borderColor: isPrimary ? "#007a5a" : "#dddddd",
                "&:hover": {
                    bgcolor: isPrimary ? "#148567" : "#f8f8f8",
                    borderColor: isPrimary ? "#148567" : "#999",
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
