import React, { useEffect, useState } from "react";

/** ========================================================
 * AUTO HIDE FAB — PRO VERSION (v1)
 * Hides Floating Buttons when user scrolls down
 * Shows FAB when scrolling up
 * Smooth mobile UX like Instagram / YouTube
 * ======================================================== */

export default function AutoHideFAB({ children }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY + 10) {
        // User scrolling down → hide FAB
        setVisible(false);
      } else if (currentY < lastScrollY - 10) {
        // User scrolling up → show FAB
        setVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
