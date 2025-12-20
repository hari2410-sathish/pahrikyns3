import api from "../../../api/axios";


// ✅ Get all notifications (admin)
export const fetchAllNotifications = () => {
  return API.get("/admin/notifications");
};

// ✅ Send notification to user / broadcast
export const sendNotification = (data) => {
  return API.post("/admin/notifications", data);
};

// ✅ Delete notification
export const deleteNotification = (id) => {
  return API.delete(`/admin/notifications/${id}`);
};
