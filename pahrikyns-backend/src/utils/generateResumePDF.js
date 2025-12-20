const path = require("path");
const fs = require("fs");

async function generateResumePDF(resumeData) {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      `resume-${Date.now()}.pdf`
    );

    // Temporary dummy PDF content
    fs.writeFileSync(filePath, "PDF GENERATION TEMP DISABLED");

    return filePath;
  } catch (err) {
    console.error("PDF Generation Error:", err);
    throw err;
  }
}

module.exports = generateResumePDF;
