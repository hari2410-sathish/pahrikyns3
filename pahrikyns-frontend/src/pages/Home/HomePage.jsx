import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/* ✅✅ IMPORT COMPANY LOGOS */
import infosys from "../../assets/logos/infosys.png";
import tcs from "../../assets/logos/tcs.png";
import wipro from "../../assets/logos/wipro.png";
import accenture from "../../assets/logos/accenture.png";
import amazon from "../../assets/logos/amazon.png";
import zoho from "../../assets/logos/zoho.png";

const AnimatedStat = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start > end) start = end;
      setCount(start);
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "800", background: "linear-gradient(90deg, #00eaff, #7b3fe4)", WebkitBackgroundClip: "text", color: "transparent" }}>
        {count}+
      </div>
      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginTop: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    transition: "transform 0.3s ease",
    cursor: "default"
  }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
  >
    <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
    <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>{title}</h4>
    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>{desc}</p>
  </div>
);

const CourseCard = ({ title, desc, link, tag }) => (
  <div style={{
    background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{
      position: "absolute",
      top: "0",
      right: "0",
      background: "#00eaff",
      color: "#000",
      fontSize: "10px",
      fontWeight: "800",
      padding: "4px 12px",
      borderBottomLeftRadius: "12px"
    }}>{tag}</div>

    <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>{title}</h3>
    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "20px", flex: 1 }}>{desc}</p>
    <Link to={link} style={{
      display: "inline-block",
      textAlign: "center",
      padding: "10px 0",
      borderRadius: "8px",
      background: "rgba(0, 234, 255, 0.1)",
      color: "#00eaff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      border: "1px solid rgba(0, 234, 255, 0.2)",
      transition: "all 0.2s"
    }}>
      View Curriculum
    </Link>
  </div>
);

const Testimonial = ({ name, role, msg }) => (
  <div style={{
    background: "rgba(2, 6, 23, 0.8)",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)"
  }}>
    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", fontStyle: "italic", marginBottom: "16px" }}>“{msg}”</p>
    <div>
      <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{name}</h4>
      <span style={{ fontSize: "12px", color: "#7b3fe4" }}>{role}</span>
    </div>
  </div>
);

export default function HomePage() {
  const canvasRef = useRef(null);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [...Array(60)].map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#00eaff";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", background: "#020617", minHeight: "100vh", overflowX: "hidden" }}>
      {/* BACKGROUND CANVAS */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />

      {/* HERO SECTION */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "140px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

          {/* LEFT CONTENT */}
          <div>
            <div style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "50px",
              background: "rgba(0, 234, 255, 0.1)",
              border: "1px solid rgba(0, 234, 255, 0.3)",
              color: "#00eaff",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "24px",
              letterSpacing: "0.5px"
            }}>
              🚀 PRODUCTION-READY DEVOPS
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: "900",
              lineHeight: "1.1",
              color: "#fff",
              marginBottom: "24px"
            }}>
              Master DevOps <br />
              <span style={{ color: "transparent", WebkitBackgroundClip: "text", background: "linear-gradient(90deg, #00eaff, #7b3fe4)" }}>
                The Right Way.
              </span>
            </h1>

            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", marginBottom: "40px", maxWidth: "540px", lineHeight: "1.6" }}>
              Stop watching tutorials. Start deploying real infrastructure.
              Learn Linux, AWS, Docker, K8s & Terraform by doing it.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/courses" style={{
                padding: "16px 32px",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                color: "#black",
                fontWeight: "800",
                textDecoration: "none",
                fontSize: "16px",
                boxShadow: "0 0 20px rgba(0, 234, 255, 0.4)",
                border: "none"
              }}>
                Start Learning Free
              </Link>
              <Link to="/courses/aws" style={{
                padding: "16px 32px",
                borderRadius: "12px",
                background: "transparent",
                color: "#fff",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "16px",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                View AWS Track
              </Link>
            </div>

            <div style={{ marginTop: "60px", display: "flex", gap: "40px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "30px" }}>
              <AnimatedStat value="5000" label="Students" />
              <AnimatedStat value="25" label="Real Projects" />
              <AnimatedStat value="98" label="Success Rate" />
            </div>
          </div>

          {/* RIGHT CONTENT - JOURNEY CARD */}
          <div style={{ display: "none", md: { display: "block" } }}> {/* Hidden on mobile, handled via CSS usually, but simple display here */}
            <div style={{
              background: "rgba(10, 15, 30, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 234, 255, 0.2)",
              borderRadius: "24px",
              padding: "40px",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
            }}>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "30px" }}>Your Learning Path</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", color: "rgba(255,255,255,0.8)" }}>
                  <span style={{ width: "32px", height: "32px", background: "rgba(0,234,255,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#00eaff" }}>1</span>
                  Linux Fundamentals & Git
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", color: "rgba(255,255,255,0.8)" }}>
                  <span style={{ width: "32px", height: "32px", background: "rgba(0,234,255,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#00eaff" }}>2</span>
                  AWS Cloud Infrastructure
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", color: "rgba(255,255,255,0.8)" }}>
                  <span style={{ width: "32px", height: "32px", background: "rgba(0,234,255,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#00eaff" }}>3</span>
                  Docker Containerization
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "30px", padding: "15px", background: "rgba(123, 63, 228, 0.1)", borderRadius: "12px", border: "1px solid #7b3fe4", color: "#fff", fontWeight: "700" }}>
                  <span style={{ fontSize: "20px" }}>🚀</span>
                  Master CI/CD Pipelines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOS SECTION */}
      <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "24px", letterSpacing: "1px", textTransform: "uppercase" }}>Trusted by engineers at</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap", alignItems: "center", opacity: 0.6 }}>
            {[infosys, tcs, wipro, accenture, amazon, zoho].map((logo, i) => (
              <img key={i} src={logo} alt="Company Logo" style={{ height: "35px", filter: "grayscale(100%)", transition: "filter 0.3s" }}
                onMouseEnter={(e) => e.target.style.filter = "grayscale(0%)"}
                onMouseLeave={(e) => e.target.style.filter = "grayscale(100%)"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ padding: "100px 24px", maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "16px" }}>Why PAHRIKYNS?</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>We don't just teach tools. We teach workflows.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <Feature icon="📘" title="Structured Learning" desc="No random tutorials. A complete path from Zero to Hero in DevOps." />
          <Feature icon="⚡" title="Real-World Labs" desc="Practice on real servers, not just in the browser. Production simulations." />
          <Feature icon="🤝" title="1 : 1 Mentorship" desc="Get stuck? Our mentors hop on a call to unblock you instantly." />
          <Feature icon="💼" title="Job Assistance" desc="Resume building, mock interviews, and referrals to top companies." />
        </div>
      </div>

      {/* TRACKS SECTION */}
      <div style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 234, 255, 0.05) 100%)", padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "50px" }}>
            <div>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "10px" }}>Popular Tracks</h2>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Choose your specialization.</p>
            </div>
            <Link to="/courses" style={{ color: "#00eaff", textDecoration: "none", fontWeight: "700" }}>View All Courses →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <CourseCard title="AWS DevOps Master" desc="Complete EC2, S3, VPC, IAM & CI/CD with AWS CodePipeline." link="/courses/aws" tag="BESTSELLER" />
            <CourseCard title="Linux & Shell" desc="Master the command line. Scripting, permissions, networking & init systems." link="/courses/linux" tag="FRESHER FRIENDLY" />
            <CourseCard title="Kubernetes Pro" desc="Deploy microservices on K8s. Helm, Prometheus, Grafana & GitOps." link="/courses/kubernetes" tag="ADVANCED" />
            <CourseCard title="The Complete CI/CD" desc="Jenkins, GitLab CI, GitHub Actions. Automate everything." link="/courses/devops" tag="CAREER READY" />
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div style={{ padding: "100px 24px", maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "42px", fontWeight: "900", color: "#fff", marginBottom: "20px" }}>
          Ready to launch your career?
        </h2>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", marginBottom: "40px" }}>
          Join 5000+ engineers who switched to high-paying DevOps roles.
        </p>
        <Link to="/register" style={{
          padding: "18px 48px",
          borderRadius: "100px",
          background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
          color: "#000",
          fontWeight: "800",
          textDecoration: "none",
          fontSize: "18px",
          display: "inline-block",
          boxShadow: "0 0 40px rgba(0, 234, 255, 0.5)",
          transition: "transform 0.2s"
        }}>
          Join PAHRIKYNS Now
        </Link>
      </div>

    </div>
  );
}
