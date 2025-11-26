const KEY = "pahrikyns_trusted_devices_v1";

export function getTrustedDevices() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveTrustedDevices(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addTrustedDevice(device) {
  const list = getTrustedDevices();
  list.push(device);
  saveTrustedDevices(list);
}

export function removeTrustedDevice(deviceId) {
  const updated = getTrustedDevices().filter(
    (d) =>
      d.deviceId !== deviceId && d.fingerprintId !== deviceId
  );
  saveTrustedDevices(updated);
}
