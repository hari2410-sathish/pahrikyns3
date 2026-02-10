import { IconButton, Popover, Typography } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import ChatTooltip from "./ChatTooltip";

export default function EmojiPickerButton({ onEmojiClick }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onEmojiSelect = (emojiData) => {
        onEmojiClick(emojiData.emoji);
        // Optional: Keep open or close. Slack keeps it open potentially, but let's close for simplicity first.
        // Actually slack keeps it open. Let's keep it open? No, standard behavior usually closes. 
        // Let's close it to be safe, or user can click out.
        // setAnchorEl(null); 
        // Let's keep it open for multiple emoji insertion, user clicks away to close.
    };

    const open = Boolean(anchorEl);
    const id = open ? "emoji-popover" : undefined;

    return (
        <>
            <ChatTooltip title="Add emoji">
                <IconButton size="small" onClick={handleClick}>
                    <Typography fontSize={16} component="span">☺</Typography>
                </IconButton>
            </ChatTooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                sx={{
                    "& .MuiPaper-root": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        borderRadius: 2
                    }
                }}
            >
                <EmojiPicker
                    onEmojiClick={onEmojiSelect}
                    lazyLoadEmojis={true}
                    searchDisabled={false}
                    skinTonesDisabled={true} // Simplify for now
                    previewConfig={{ showPreview: false }}
                    height={400}
                    width={320}
                />
            </Popover>
        </>
    );
}


