const admin = require("../config/firebaseAdmin");
const db = admin.firestore();

async function createChannel(req, res) {
  try {
    const { name, description, createdBy, isPrivate, members } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Channel name is required" });
    }

    const channelData = {
      name: name.toLowerCase(),
      description: description || "",
      createdBy: createdBy || "system",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isPrivate: !!isPrivate,
      members: members || [createdBy]
    };

    const docRef = await db.collection("channels").add(channelData);

    res.status(201).json({
      success: true,
      channelId: docRef.id,
      ...channelData
    });

  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ error: "Failed to create channel", details: error.message });
  }
}

async function onUserMessage(userId, text) {
  // Placeholder/Legacy - consider moving or keeping if used elsewhere
}

async function onAdminMessage(userId, text) {
  // Placeholder/Legacy
}

module.exports = { createChannel, onUserMessage, onAdminMessage };
