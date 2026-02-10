export const createChannel = async ({
  name,
  description,
  isPrivate,
  members,
  userId,
}) => {
  // Call Backend API instead of direct Firestore
  const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chat/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if needed, for instance:
      // "Authorization": `Bearer ${localStorage.getItem("USER_TOKEN")}` 
      // But keeping it simple as per request to just "fix" it first.
    },
    body: JSON.stringify({
      name,
      description,
      isPrivate,
      members,
      createdBy: userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error + (errorData.details ? `: ${errorData.details}` : "") || "Failed to create channel");
  }

  return await response.json();
};
