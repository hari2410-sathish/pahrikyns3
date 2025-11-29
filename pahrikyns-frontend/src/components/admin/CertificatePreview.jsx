import React from "react";

export default function CertificatePreview({ template, cert, assets, lang = "en" }) {
  const container = {
    width: "1200px",
    height: "840px",
    background: template === "dark"
      ? "#0a0a14"
      : template === "gold"
      ? "#fff7e6"
      : "#ffffff",
    color: template === "dark" ? "#00fff0" : "#222",
    padding: "40px",
    position: "relative",
    borderRadius: "12px",
    boxSizing: "border-box",
    fontFamily: "Times New Roman, serif",
    boxShadow: "0 0 40px rgba(0,0,0,0.25)",
  };

  return (
    <div style={container} id="certificate-preview-root">

      {/* Logo */}
      {assets?.logo && (
        <img
          src={assets.logo}
          alt="logo"
          style={{ width: 120, margin: "0 auto", display: "block" }}
        />
      )}

      {/* Header */}
      <h1 style={{ textAlign: "center", marginTop: 20 }}>
        Certificate of Excellence
      </h1>

      {/* Student */}
      <h2 style={{ textAlign: "center", marginTop: 60 }}>
        {cert.studentName}
      </h2>

      {/* Course */}
      <h3 style={{ textAlign: "center", marginTop: 20, fontWeight: "normal" }}>
        Completed: {cert.course}
      </h3>

      {/* Date */}
      <p style={{ textAlign: "center", marginTop: 10 }}>
        Awarded on {cert.date}
      </p>

      {/* Seal */}
      {assets?.seal && (
        <img
          src={assets.seal}
          alt="seal"
          style={{
            width: 110,
            position: "absolute",
            bottom: 25,
            right: 25,
            opacity: 0.9,
          }}
        />
      )}

      {/* Signature */}
      {assets?.signature && (
        <div style={{ position: "absolute", bottom: 30, left: 40, textAlign: "center" }}>
          <img
            src={assets.signature}
            alt="signature"
            style={{ width: 120 }}
          />
          <div style={{ fontSize: 14 }}>Instructor</div>
        </div>
      )}
    </div>
  );
}
