import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
  Chip,
  MenuItem,
  Select,
  Modal,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  const year = new Date().getFullYear();
  const [lang, setLang] = useState("EN");
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can we help you today?" },
  ]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setMsg("");

    // dummy bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Our support team will contact you shortly ✅" },
      ]);
    }, 800);
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 14,
        pt: 9,
        pb: 6,
        px: { xs: 2, md: 10 },
        background:
          "radial-gradient(circle at top, #0a0f24 0%, #020617 55%, #000510 100%)",
        borderTop: "1px solid rgba(0,234,255,0.3)",
        position: "relative",
      }}
    >
      {/* TOP LINE */}
      <Box
        sx={{
          height: 3,
          width: "100%",
          background: "linear-gradient(90deg,#00eaff,#7b3fe4,#00eaff)",
          boxShadow: "0 0 35px rgba(0,234,255,1)",
          mb: 6,
        }}
      />

      {/* CTA */}
      <Box
        sx={{
          mb: 7,
          p: { xs: 3, md: 4 },
          borderRadius: 5,
          background:
            "linear-gradient(135deg, rgba(0,234,255,0.20), rgba(123,63,228,0.22))",
          border: "1px solid rgba(0,234,255,0.45)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 0 35px rgba(0,234,255,0.45)",
          animation: "pulse 2.8s infinite",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box>
          <Typography fontSize={24} fontWeight={900}>
            Learn DevOps at Production Level
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Real servers • Real pipelines • Real deployments
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/register"
            sx={{
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "black",
              fontWeight: 900,
              boxShadow: "0 0 20px rgba(0,234,255,0.9)",
            }}
          >
            Get Started
          </Button>

          <Button
            component={Link}
            to="/courses"
            variant="outlined"
            sx={{
              borderColor: "#00eaff",
              color: "#00eaff",
            }}
          >
            View Courses
          </Button>
        </Stack>
      </Box>

      {/* MAIN GRID */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr 1fr 1fr",
          },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* BRAND */}
        <Box>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 1000,
              letterSpacing: 1,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            PAHRIKYNS Teaching
          </Typography>

          <Typography sx={{ opacity: 0.85, mt: 2 }}>
            Enterprise DevOps & Full-Stack training with real production
            workloads.
          </Typography>

          <Stack direction="row" spacing={1.2} mt={2} flexWrap="wrap">
            <Chip icon={<VerifiedIcon />} label="ISO Certified" size="small" />
            <Chip icon={<SecurityIcon />} label="Secure" size="small" />
            <Chip icon={<CloudDoneIcon />} label="Operational" size="small" />
          </Stack>

          <Box mt={2}>
            <Select
              size="small"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              sx={{
                minWidth: 120,
                color: "white",
                background: "rgba(255,255,255,0.07)",
              }}
            >
              <MenuItem value="EN">English</MenuItem>
              <MenuItem value="TA">தமிழ்</MenuItem>
              <MenuItem value="HI">Hindi</MenuItem>
            </Select>
          </Box>
        </Box>

        <FooterColumn title="Platform" links={["Home", "Courses", "Dashboard"]} />
        <FooterColumn title="DevOps" links={["Docker", "Kubernetes", "Jenkins"]} />
        <FooterColumn title="Company" links={["About", "Contact", "Careers"]} />
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* LOWER BAR */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Stack direction="row" spacing={3}>
          {["Privacy", "Terms", "Security", "Status"].map((item, i) => (
            <Typography
              key={i}
              component={Link}
              to={`/${item.toLowerCase()}`}
              sx={{ textDecoration: "none", opacity: 0.6, fontSize: 13 }}
            >
              {item}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Play Store</Button>
          <Button variant="outlined">App Store</Button>
        </Stack>
      </Box>

      {/* FLOATING CHAT */}
      <Stack
        direction="column"
        spacing={1.5}
        sx={{
          position: "fixed",
          bottom: 120,
          right: 18,
          zIndex: 999,
        }}
      >
        {[WhatsAppIcon, ChatIcon].map((Icon, i) => (
          <IconButton
            key={i}
            onClick={() => i === 1 && setChatOpen(true)}
            sx={{
              width: 46,
              height: 46,
              background: "linear-gradient(135deg,#00eaff,#7b3fe4)",
              color: "black",
            }}
          >
            <Icon />
          </IconButton>
        ))}
      </Stack>

      {/* SCROLL TOP */}
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          position: "absolute",
          right: 20,
          bottom: 30,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>

      <Typography textAlign="center" mt={6} opacity={0.6} fontSize={13}>
        © {year} PAHRIKYNS Teaching — Enterprise SaaS Platform
      </Typography>

      {/* CHAT MODAL */}
      <Modal open={chatOpen} onClose={() => setChatOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: { xs: "92%", md: 420 },
            bgcolor: "#020617",
            borderRadius: 4,
            p: 3,
            color: "white",
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography fontWeight={900}>Live Support</Typography>
            <IconButton onClick={() => setChatOpen(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Box sx={{ height: 220, overflowY: "auto", mb: 2 }}>
            {messages.map((m, i) => (
              <Typography
                key={i}
                sx={{
                  mb: 1,
                  textAlign: m.from === "user" ? "right" : "left",
                }}
              >
                {m.text}
              </Typography>
            ))}
          </Box>

          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type message..."
            />
            <IconButton onClick={sendMessage}>
              <SendIcon sx={{ color: "#00eaff" }} />
            </IconButton>
          </Stack>
        </Box>
      </Modal>

      {/* PULSE ANIMATION */}
      <style>
        {`
        @keyframes pulse {
          0% { box-shadow: 0 0 25px rgba(0,234,255,0.4); }
          50% { box-shadow: 0 0 45px rgba(0,234,255,0.9); }
          100% { box-shadow: 0 0 25px rgba(0,234,255,0.4); }
        }
        `}
      </style>
    </Box>
  );
}

function FooterColumn({ title, links }) {
  return (
    <Box>
      <Typography fontWeight={800} color="#00eaff" mb={2}>
        {title}
      </Typography>
      <Stack spacing={1.3}>
        {links.map((item, i) => (
          <Typography
            key={i}
            component={Link}
            to={`/${item.toLowerCase()}`}
            sx={{ textDecoration: "none", opacity: 0.75 }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
