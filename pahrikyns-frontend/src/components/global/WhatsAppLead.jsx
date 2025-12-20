import React, { useEffect, useState } from "react";
import "./WhatsAppLead.css";

export default function WhatsAppLead() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ Auto popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendToWhatsApp = () => {
    const phone = "919000000000"; // ✅ replace with your WhatsApp number
    const text = `Hi, I am ${name || "Student"}.\n${msg}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <div className="wa-float-btn" onClick={() => setOpen(true)}>
        💬
      </div>

      {/* POPUP */}
      {open && (
        <div className="wa-overlay">
          <div className="wa-popup">

            <div className="wa-header">
              <h3>Chat with Us on WhatsApp</h3>
              <span onClick={() => setOpen(false)}>✖</span>
            </div>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <button onClick={sendToWhatsApp}>
              Start WhatsApp Chat
            </button>

          </div>
        </div>
      )}
    </>
  );
}
