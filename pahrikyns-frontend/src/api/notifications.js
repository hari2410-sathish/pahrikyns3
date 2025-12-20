import axios from "./axios"; // axios instance with auth token

// ✅ Fetch logged-in user's notifications (pagination + unread)
export const fetchNotifications = async (page = 1, limit = 20) => {
  const { data } = await axios.get(
    `/api/notifications?page=${page}&limit=${limit}`
  );
  return data;
};

// ✅ Admin / System create notification
export const createNotificationAPI = async (payload) => {
  const { data } = await axios.post("/api/notifications", payload);
  return data;
};

// ✅ Mark single notification as read
export const markNotificationReadAPI = async (id) => {
  const { data } = await axios.put(`/api/notifications/${id}/read`);
  return data;
};

// ✅ Delete a notification
export const deleteNotificationAPI = async (id) => {
  const { data } = await axios.delete(`/api/notifications/${id}`);
  return data;
};
