import React, { useRef } from "react";
import { hapticLight } from "../../utils/haptics";

/** ========================================================
 * SWIPE HANDLER — PRO VERSION (v1)
 * Adds swipe left/right navigation for mobile builder
 * - Swipe Left → Preview
 * - Swipe Right → Form
 * Works inside MobileResumeBuilder
 * ======================================================== */

export default function SwipeHandler({ onSwipeLeft, onSwipeRight, children }) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const minSwipeDistance = 50; // px

  const onTouchStart = (e) => {
    touchEndX.current = 0; // reset
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < minSwipeDistance) return;

    // Swipe Left → go to Preview
    if (distance > 0) {
      onSwipeLeft && onSwipeLeft();
    }

    onSwipeLeft && (hapticLight(), onSwipeLeft());
onSwipeRight && (hapticLight(), onSwipeRight());

    // Swipe Right → go to Form
    if (distance < 0) {
      onSwipeRight && onSwipeRight();
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full h-full"
    >
      {children}
    </div>
  );
}
