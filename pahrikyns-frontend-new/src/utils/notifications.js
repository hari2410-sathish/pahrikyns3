export function getNotifications() {
  const n = localStorage.getItem("notifications");
  return n ? JSON.parse(n) : [];
}

export function addNotification(text) {
  const list = getNotifications();
  list.push({
    id: Date.now(),
    text,
    read: false,
  });
  localStorage.setItem("notifications", JSON.stringify(list));
}

export function markAllRead() {
  const list = getNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem("notifications", JSON.stringify(list));
}
