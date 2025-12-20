import React, { useRef, useState } from "react";

/** ========================================================
 * PINCH ZOOM — PRO VERSION (v1)
 * Enables pinch-to-zoom for mobile preview
 * - Touch gesture support
 * - Smooth scaling
 * - Limits min/max zoom
 * ======================================================== */

export default function PinchZoom({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);

  const minZoom = 0.7;
  const maxZoom = 2.2;

  const getDistance = (touches) => {
    if (touches.length < 2) return 0;
    const [t1, t2] = touches;
    return Math.sqrt(
      Math.pow(t1.clientX - t2.clientX, 2) +
        Math.pow(t1.clientY - t2.clientY, 2)
    );
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      setInitialDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const newDistance = getDistance(e.touches);
      const newScale = Math.min(
        maxZoom,
        Math.max(minZoom, (newDistance / initialDistance) * scale)
      );

      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  return (
    <div
      ref={containerRef}
      style={{ transform: `scale(${scale})`, transformOrigin: "center top" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full"
    >
      {children}
    </div>
  );
}
