/* ==========================================================
   PAHRIKYNS – DEVICE IDENTIFICATION + SECURITY UTILITIES
   ========================================================== */

// Create browser fingerprint (browser + OS + screen)
export function getDeviceFingerprint() {
  const ua = navigator.userAgent || "unknown";
  const lang = navigator.language || "unknown";
  const platform = navigator.platform || "unknown";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const scr = `${screen.width}x${screen.height}@${window.devicePixelRatio || 1}`;

  return { ua, lang, platform, tz, scr };
}

// Convert fingerprint json → base64 ID
export function fingerprintToId(fp) {
  try {
    return btoa(JSON.stringify(fp));
  } catch {
    return "unknown_device_fp";
  }
}

// Persistent device ID (localStorage)
export function getPersistentDeviceId() {
  const key = "pahrikyns_device_id_v1";
  let id = localStorage.getItem(key);

  if (!id) {
    id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

// Verify whether device exists in trusted list
export function isDeviceTrusted(trustedDevices = []) {
  const fp = getDeviceFingerprint();
  const fingerprintId = fingerprintToId(fp);
  const persistentId = getPersistentDeviceId();

  const found = trustedDevices.find(
    (d) => d.deviceId === persistentId || d.fingerprintId === fingerprintId
  );

  return {
    trusted: !!found,
    fingerprintId,
    persistentId,
    fp,
    matchedRecord: found || null,
  };
}

/* ==========================================================
   🚀 THE IMPORTANT PART (used by Login.jsx)
   getDeviceInfo() – main export used in login/OTP flows
   ========================================================== */

export function getDeviceInfo() {
  const fp = getDeviceFingerprint();
  const fingerprintId = fingerprintToId(fp);
  const persistentId = getPersistentDeviceId();

  return {
    // fingerprint system
    fingerprint: fp,
    fingerprintId,
    persistentId,

    // basic browser info
    userAgent: navigator.userAgent || "unknown",
    platform: navigator.platform || "unknown",
    language: navigator.language || "unknown",

    // screen details
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
    },

    // timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",

    // helpful for security dashboard logs
    timestamp: Date.now(),
  };
}
