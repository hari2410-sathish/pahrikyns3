/** ========================================================
 * HAPTICS — PRO VERSION (v1)
 * Mobile vibration feedback for actions
 * Works on Android + iOS (fallback)
 * ======================================================== */

// Basic vibration (short tap)
export function hapticLight() {
  if (navigator.vibrate) navigator.vibrate(10);
}

// Medium vibration (button confirmations)
export function hapticMedium() {
  if (navigator.vibrate) navigator.vibrate(25);
}

// Strong vibration (errors, warnings)
export function hapticHeavy() {
  if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
}

// Pattern vibration (swipe or mode changes)
export function hapticPattern() {
  if (navigator.vibrate) navigator.vibrate([10, 20, 10]);
}
