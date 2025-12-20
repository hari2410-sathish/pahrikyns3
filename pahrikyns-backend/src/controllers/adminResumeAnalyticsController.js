const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data", "resumes");

// ✅ Helper – read all resumes
function getAllResumes() {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f))));
}

// ✅ 1. OVERALL ANALYTICS
exports.getOverallAnalytics = (req, res) => {
  try {
    const resumes = getAllResumes();

    const total = resumes.length;
    const totalViews = resumes.reduce((a, b) => a + (b.views || 0), 0);
    const totalDownloads = resumes.reduce((a, b) => a + (b.downloads || 0), 0);
    const totalShares = resumes.reduce((a, b) => a + (b.shares || 0), 0);
    const premiumResumes = resumes.filter((r) => r.premium).length;

    return res.json({
      totalResumes: total,
      totalViews,
      totalDownloads,
      totalShares,
      premiumResumes,
    });
  } catch (err) {
    console.error("Overall Analytics Error:", err);
    res.status(500).json({ message: "Analytics failed" });
  }
};

// ✅ 2. TOP PERFORMING RESUMES
exports.getTopResumes = (req, res) => {
  try {
    const resumes = getAllResumes();

    const topByViews = [...resumes]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);

    const topByDownloads = [...resumes]
      .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
      .slice(0, 5);

    return res.json({
      topByViews,
      topByDownloads,
    });
  } catch (err) {
    console.error("Top Resume Error:", err);
    res.status(500).json({ message: "Top analytics failed" });
  }
};

// ✅ 3. DAILY ACTIVITY GRAPH DATA
exports.getDailyStats = (req, res) => {
  try {
    const resumes = getAllResumes();

    const dailyMap = {};

    resumes.forEach((r) => {
      const date = new Date(r.updatedAt || r.createdAt)
        .toISOString()
        .slice(0, 10);

      if (!dailyMap[date]) {
        dailyMap[date] = { views: 0, downloads: 0, shares: 0 };
      }

      dailyMap[date].views += r.views || 0;
      dailyMap[date].downloads += r.downloads || 0;
      dailyMap[date].shares += r.shares || 0;
    });

    const chartData = Object.keys(dailyMap).map((date) => ({
      date,
      ...dailyMap[date],
    }));

    return res.json(chartData);
  } catch (err) {
    console.error("Daily Analytics Error:", err);
    res.status(500).json({ message: "Daily analytics failed" });
  }
};

// ✅ 4. SINGLE RESUME ANALYTICS
exports.getSingleResumeStats = (req, res) => {
  try {
    const { id } = req.params;
    const file = path.join(DATA_DIR, `${id}.json`);

    if (!fs.existsSync(file)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resume = JSON.parse(fs.readFileSync(file));

    return res.json({
      id: resume.id,
      name: resume.name,
      views: resume.views || 0,
      downloads: resume.downloads || 0,
      shares: resume.shares || 0,
      premium: resume.premium || false,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    });
  } catch (err) {
    console.error("Single Resume Analytics Error:", err);
    res.status(500).json({ message: "Single analytics failed" });
  }
};
