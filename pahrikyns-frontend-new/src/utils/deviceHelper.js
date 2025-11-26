export function getDeviceFingerprint() {
  const ua = navigator.userAgent || "unknown";
  const lang = navigator.language || "unknown";
  const platform = navigator.platform || "unknown";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const scr = `${screen.width}x${screen.height}@${screen.pixelRatio || 1}`;

  const fp = { ua, lang, platform, tz, scr };
  return fp;
}

export function fingerprintToId(fp) {
  try {
    return btoa(JSON.stringify(fp));
  } catch {
    return "unknown_device_fp";
  }
}

export function getPersistentDeviceId() {
  const key = "pahrikyns_device_id_v1";
  let id = localStorage.getItem(key);

  if (!id) {
    id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

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
    found,
  };
}
