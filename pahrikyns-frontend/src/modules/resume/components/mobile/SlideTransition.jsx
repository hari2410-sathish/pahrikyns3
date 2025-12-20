import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./slide.css";

/** ========================================================
 * SLIDE TRANSITION — PRO VERSION (v1)
 * Smooth animated slide effect for switching Form ↔ Preview
 * Mobile-only transition
 * ======================================================== */

export default function SlideTransition({ tab, children }) {
  return (
    <SwitchTransition>
      <CSSTransition
        key={tab}
        timeout={250}
        classNames="slide"
      >
        <div className="w-full h-full">{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
}
