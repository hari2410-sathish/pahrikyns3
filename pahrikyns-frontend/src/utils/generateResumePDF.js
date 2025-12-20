const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

/**
 * generateResumePDF
 * @param {object} resumeData - full resume object
 * @param {string} outputPath - absolute path to save pdf
 */
module.exports = function generateResumePDF(resumeData, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // =========================
      // ✅ HEADER
      // =========================
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text(resumeData?.name || "Your Name", { align: "center" });

      doc
        .moveDown(0.5)
        .fontSize(12)
        .font("Helvetica")
        .text(resumeData?.title || "Professional Title", { align: "center" });

      doc
        .moveDown(0.5)
        .fontSize(10)
        .fillColor("gray")
        .text(
          `${resumeData?.email || ""}  |  ${resumeData?.phone || ""}  |  ${
            resumeData?.location || ""
          }`,
          { align: "center" }
        );

      doc.moveDown(1.5).fillColor("black");

      // =========================
      // ✅ SUMMARY
      // =========================
      sectionTitle(doc, "SUMMARY");
      doc
        .fontSize(11)
        .font("Helvetica")
        .text(resumeData?.summary || "No summary provided.");

      // =========================
      // ✅ SKILLS
      // =========================
      if (Array.isArray(resumeData?.skills)) {
        sectionTitle(doc, "SKILLS");
        resumeData.skills.forEach((skill) => {
          doc.fontSize(11).text(`• ${skill}`);
        });
      }

      // =========================
      // ✅ EXPERIENCE
      // =========================
      if (Array.isArray(resumeData?.experience)) {
        sectionTitle(doc, "EXPERIENCE");

        resumeData.experience.forEach((exp) => {
          doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(`${exp.role} - ${exp.company}`);

          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("gray")
            .text(`${exp.start} - ${exp.end || "Present"}`);

          doc
            .fillColor("black")
            .fontSize(11)
            .text(exp.description || "");

          doc.moveDown(0.8);
        });
      }

      // =========================
      // ✅ PROJECTS
      // =========================
      if (Array.isArray(resumeData?.projects)) {
        sectionTitle(doc, "PROJECTS");

        resumeData.projects.forEach((project) => {
          doc.font("Helvetica-Bold").fontSize(11).text(project.title);

          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("gray")
            .text(project.tech?.join(", ") || "");

          doc
            .fillColor("black")
            .fontSize(11)
            .text(project.description || "");

          doc.moveDown(0.8);
        });
      }

      // =========================
      // ✅ EDUCATION
      // =========================
      if (Array.isArray(resumeData?.education)) {
        sectionTitle(doc, "EDUCATION");

        resumeData.education.forEach((edu) => {
          doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(`${edu.degree} - ${edu.institution}`);

          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("gray")
            .text(`${edu.start} - ${edu.end}`);

          doc.fillColor("black").moveDown(0.6);
        });
      }

      // =========================
      // ✅ FOOTER
      // =========================
      doc
        .moveDown(2)
        .fontSize(9)
        .fillColor("gray")
        .text(
          `Generated on ${new Date().toLocaleDateString()} via Resume Platform`,
          { align: "center" }
        );

      doc.end();

      stream.on("finish", () => resolve(outputPath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

// =========================
// ✅ Helper: Section Title
// =========================
function sectionTitle(doc, title) {
  doc
    .moveDown(1.2)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text(title);

  doc
    .moveDown(0.3)
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown(0.6);
}
