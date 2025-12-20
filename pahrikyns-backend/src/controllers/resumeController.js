const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const SHARE_TTL_DAYS = 30; // share link valid for 30 days


// DATA PATHS
const RESUME_DATA_PATH = path.join(__dirname, "../data/resumes");
const LOG_PATH = path.join(__dirname, "../logs/resume-edits.log");

// Helper: Ensure folders exist
if (!fs.existsSync(RESUME_DATA_PATH)) fs.mkdirSync(RESUME_DATA_PATH, { recursive: true });
if (!fs.existsSync(path.join(__dirname, "../logs"))) fs.mkdirSync(path.join(__dirname, "../logs"));

// ================================
// ✅ 1. SAVE / UPDATE RESUME (USER)
// ================================
exports.saveOrUpdateResume = async (req, res) => {
  try {
    const user = req.user; // from authMiddleware
    const resumeData = req.body;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const resumeId = resumeData.id || uuidv4();
    const filePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);

    const finalData = {
      id: resumeId,
      userId: user.id,
      username: user.username,
      data: resumeData,
      updatedAt: new Date(),
      published: true,
    };

    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

    // ✅ Log edit history
    logEdit({
      resumeId,
      editedBy: user.id,
      role: user.role,
      ip: req.ip,
      fields: Object.keys(resumeData),
    });

    res.status(200).json({
      message: "Resume saved successfully",
      resumeId,
    });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res.status(500).json({ message: "Failed to save resume" });
  }
};

// ================================
// ✅ 2. PUBLIC RESUME VIEW
// ================================
exports.getPublicResume = async (req, res) => {
  try {
    const { username } = req.params;

    const files = fs.readdirSync(RESUME_DATA_PATH);

    const resumeFile = files.find((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(RESUME_DATA_PATH, file)));
      return data.username === username && data.published === true;
    });

    if (!resumeFile)
      return res.status(404).json({ message: "Resume not found" });

    const resumeData = JSON.parse(
      fs.readFileSync(path.join(RESUME_DATA_PATH, resumeFile))
    );

    res.status(200).json(resumeData);
  } catch (error) {
    console.error("Public Resume Error:", error);
    res.status(500).json({ message: "Failed to load resume" });
  }
};

// ================================
// ✅ 3. DOWNLOAD RESUME (SUBSCRIBED)
// ================================
exports.downloadResume = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!user.subscriptionActive && user.role !== "ADMIN")
      return res.status(403).json({ message: "Subscription required to download" });

    const resumePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);

    if (!fs.existsSync(resumePath))
      return res.status(404).json({ message: "Resume not found" });

    res.download(resumePath, `resume-${resumeId}.json`);
  } catch (error) {
    console.error("Download Resume Error:", error);
    res.status(500).json({ message: "Download failed" });
  }
};

// ================================
// ✅ 4. SHARE RESUME (SUBSCRIBED) – CREATE TOKEN
// ================================
exports.generateShareLink = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId } = req.body;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Subscription check is in subscriptionGuard middleware

    const resumePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const token = uuidv4();
    const shareFilePath = path.join(RESUME_DATA_PATH, `${resumeId}.share.json`);

    const shareDoc = {
      token,
      resumeId,
      sharedBy: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SHARE_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
      views: 0,
      active: true,
    };

    fs.writeFileSync(shareFilePath, JSON.stringify(shareDoc, null, 2));

    const shareLink = `${process.env.FRONTEND_URL}/resume/share/${token}`;

    res.status(200).json({ shareLink, token, expiresAt: shareDoc.expiresAt });
  } catch (error) {
    console.error("Share Resume Error:", error);
    res.status(500).json({ message: "Share failed" });
  }
};
// ================================
// ✅ 8. PUBLIC – VIEW VIA SHARE TOKEN
// ================================
exports.getSharedResume = async (req, res) => {
  try {
    const { token } = req.params;

    // find *.share.json with this token
    const files = fs
      .readdirSync(RESUME_DATA_PATH)
      .filter((f) => f.endsWith(".share.json"));

    let shareFilePath = null;
    let shareDoc = null;

    for (const f of files) {
      const fullPath = path.join(RESUME_DATA_PATH, f);
      const json = JSON.parse(fs.readFileSync(fullPath));

      if (json.token === token) {
        shareFilePath = fullPath;
        shareDoc = json;
        break;
      }
    }

    if (!shareDoc || !shareFilePath) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    // check active
    if (shareDoc.active === false) {
      return res.status(410).json({ message: "Share link has been disabled" });
    }

    // check expiry
    const now = Date.now();
    const expiresAt = new Date(shareDoc.expiresAt).getTime();
    if (now > expiresAt) {
      return res.status(410).json({ message: "Share link expired" });
    }

    // load actual resume
    const resumePath = path.join(RESUME_DATA_PATH, `${shareDoc.resumeId}.json`);
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeDoc = JSON.parse(fs.readFileSync(resumePath));

    // increment share views
    shareDoc.views = (shareDoc.views || 0) + 1;
    fs.writeFileSync(shareFilePath, JSON.stringify(shareDoc, null, 2));

    // optional: log as "share view"
    logEdit({
      resumeId: shareDoc.resumeId,
      editedBy: shareDoc.sharedBy,
      role: "SHARE_VIEW",
      ip: req.ip,
      shareToken: token,
    });

    res.status(200).json({
      message: "Shared resume loaded",
      resume: resumeDoc,
      shareMeta: {
        views: shareDoc.views,
        expiresAt: shareDoc.expiresAt,
      },
    });
  } catch (error) {
    console.error("Shared Resume Error:", error);
    res.status(500).json({ message: "Failed to load shared resume" });
  }
};

// ================================
// ✅ 5. ADMIN – GET ALL RESUMES
// ================================
exports.adminGetAllResumes = async (req, res) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN")
      return res.status(403).json({ message: "Admin only" });

    const files = fs.readdirSync(RESUME_DATA_PATH);
    const resumes = files.map((file) =>
      JSON.parse(fs.readFileSync(path.join(RESUME_DATA_PATH, file)))
    );

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Admin Get Resumes Error:", error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// ================================
// ✅ 6. ADMIN – VIEW EDIT HISTORY
// ================================
exports.adminGetResumeHistory = async (req, res) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN")
      return res.status(403).json({ message: "Admin only" });

    if (!fs.existsSync(LOG_PATH))
      return res.status(200).json([]);

    const logs = fs.readFileSync(LOG_PATH, "utf-8");
    const history = logs.split("\n").filter(Boolean).map(JSON.parse);

    res.status(200).json(history);
  } catch (error) {
    console.error("Admin History Error:", error);
    res.status(500).json({ message: "Failed to load edit history" });
  }
};

// ================================
// ✅ 7. ADMIN – FORCE UPDATE RESUME
// ================================
exports.adminForceUpdateResume = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId, data } = req.body;

    if (!user || user.role !== "ADMIN")
      return res.status(403).json({ message: "Admin only" });

    const filePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ message: "Resume not found" });

    const oldData = JSON.parse(fs.readFileSync(filePath));

    const newData = {
      ...oldData,
      data,
      updatedAt: new Date(),
    };

    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

    logEdit({
      resumeId,
      editedBy: user.id,
      role: "ADMIN",
      forceEdit: true,
      ip: req.ip,
    });

    res.status(200).json({ message: "Resume force-updated by admin" });
  } catch (error) {
    console.error("Admin Force Update Error:", error);
    res.status(500).json({ message: "Force update failed" });
  }
};

// ================================
// ✅ HELPER: LOG EDIT HISTORY
// ================================
function logEdit(log) {
  const entry = {
    ...log,
    timestamp: new Date(),
  };

  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
}
const generateResumePDF = require("../utils/generateResumePDF");

exports.downloadResume = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!user.subscriptionActive && user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Subscription required to download" });
    }

    const resumePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeDoc = JSON.parse(fs.readFileSync(resumePath));
    const pdfPath = path.join(
      __dirname,
      `../uploads/resumes/${resumeId}.pdf`
    );

    await generateResumePDF(resumeDoc.data || resumeDoc, pdfPath);

    return res.download(pdfPath, `resume-${resumeId}.pdf`);
  } catch (error) {
    console.error("Download Resume Error:", error);
    res.status(500).json({ message: "PDF generation failed" });
  }
};
// ================================
// ✅ 9. GET RESUME SCORE (AI-LIKE SCORER)
// ================================
exports.getResumeScore = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const filePath = path.join(RESUME_DATA_PATH, `${resumeId}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeDoc = JSON.parse(fs.readFileSync(filePath));

    // Ownership check: user can only score own resume (admin can score all)
    if (user.role !== "ADMIN" && resumeDoc.userId !== user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const result = scoreResume(resumeDoc);

    res.status(200).json({
      resumeId,
      ...result,
    });
  } catch (error) {
    console.error("Get Resume Score Error:", error);
    res.status(500).json({ message: "Failed to score resume" });
  }
};
// ================================
// ✅ 10. ADMIN – RESUME VERSION HISTORY BY RESUME ID
// ================================
exports.adminGetResumeVersionHistoryByResumeId = async (req, res) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin only" });
    }

    if (!fs.existsSync(LOG_PATH)) {
      return res.status(200).json([]);
    }

    const logs = fs
      .readFileSync(LOG_PATH, "utf-8")
      .split("\n")
      .filter(Boolean)
      .map(JSON.parse)
      .filter((entry) => entry.resumeId === resumeId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    res.status(200).json(logs);
  } catch (error) {
    console.error("Admin Resume History By ID Error:", error);
    res.status(500).json({ message: "Failed to load version history" });
  }
};
// ================================
// ✅ 11. USER – MY RESUME ACTIVITY
// ================================
exports.getMyResumeActivity = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!fs.existsSync(LOG_PATH)) {
      return res.status(200).json([]);
    }

    const logs = fs
      .readFileSync(LOG_PATH, "utf-8")
      .split("\n")
      .filter(Boolean)
      .map(JSON.parse)
      .filter((entry) => entry.editedBy === user.id)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    res.status(200).json(logs);
  } catch (error) {
    console.error("My Resume Activity Error:", error);
    res.status(500).json({ message: "Failed to load activity" });
  }
};

// ================================
// ✅ 12. ADMIN – USER RESUME ACTIVITY
// ================================
exports.adminGetUserResumeActivity = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin only" });
    }

    if (!fs.existsSync(LOG_PATH)) {
      return res.status(200).json([]);
    }

    const logs = fs
      .readFileSync(LOG_PATH, "utf-8")
      .split("\n")
      .filter(Boolean)
      .map(JSON.parse)
      .filter((entry) => entry.editedBy === userId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    res.status(200).json(logs);
  } catch (error) {
    console.error("Admin User Resume Activity Error:", error);
    res.status(500).json({ message: "Failed to load user activity" });
  }
};
