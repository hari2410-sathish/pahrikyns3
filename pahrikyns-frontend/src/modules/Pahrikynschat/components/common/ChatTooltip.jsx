import { Tooltip, Zoom } from "@mui/material";

export default function ChatTooltip({ title, children, placement = "top", ...props }) {
    return (
        <Tooltip
            title={title}
            placement={placement}
            TransitionComponent={Zoom}
            arrow
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: "black",
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                        py: 0.5,
                        px: 1,
                        borderRadius: "4px",
                    }
                },
                arrow: {
                    sx: {
                        color: "black",
                    }
                }
            }}
            {...props}
        >
            {children}
        </Tooltip>
    );
}
