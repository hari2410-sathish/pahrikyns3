import React from "react";
import { Box } from "@mui/material";
import ResumeForm from "../components/forms/ResumeForm";
import ResumePreview from "../components/preview/ResumePreview";
import FloatingButtons from "../components/mobile/FloatingButtons";
import SwipeHandler from "../components/mobile/SwipeHandler";
import MobileHeader from "../components/mobile/MobileHeader";
import PinchZoom from "../components/mobile/PinchZoom";
import AutoHideFAB from "../components/mobile/AutoHideFAB";
import SlideTransition from "../components/mobile/SlideTransition";

/** ========================================================
 * MOBILE RESUME BUILDER — FINAL PRO VERSION (CLEANED)
 * --------------------------------------------------------
 * - Sticky mobile header
 * - Swipe left/right navigation
 * - Slide animation on tab switch
 * - Pinch-to-zoom for preview
 * - Auto-hide floating action buttons
 * - Perfect mobile UX
 * ======================================================== */

export default function MobileResumeBuilder() {
  const [tab, setTab] = React.useState("form");

  return (
    <Box className="lg:hidden w-full min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      {/* MOBILE HEADER */}
      <MobileHeader tab={tab} setTab={setTab} />

      {/* MAIN CONTENT (Swipe + Slide Transition) */}
      <SwipeHandler
        onSwipeLeft={() => setTab("preview")}
        onSwipeRight={() => setTab("form")}
      >
        <Box className="pt-16 pb-20 flex-1 overflow-auto p-4">
          <SlideTransition tab={tab}>
            {tab === "form" ? (
              <ResumeForm />
            ) : (
              <PinchZoom>
                <ResumePreview />
              </PinchZoom>
            )}
          </SlideTransition>
        </Box>
      </SwipeHandler>

      {/* FLOATING BUTTONS (Auto-hide on scroll) */}
      <AutoHideFAB>
        <FloatingButtons />
      </AutoHideFAB>
    </Box>
  );
}
