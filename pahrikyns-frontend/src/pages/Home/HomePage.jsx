import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/* ✅✅ IMPORT COMPANY LOGOS (FIX FOR WHITE SCREEN) */
import infosys from "../../assets/logos/infosys.png";
import tcs from "../../assets/logos/tcs.png";
import wipro from "../../assets/logos/wipro.png";
import accenture from "../../assets/logos/accenture.png";
import amazon from "../../assets/logos/amazon.png";
import zoho from "../../assets/logos/zoho.png";

/* ================= ANIMATED STAT ================= */
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
    <div className="hp-stat">
      <div className="hp-stat-value">{count}+</div>
      <div className="hp-stat-label">{label}</div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="hp-feature-card">
    <div className="hp-feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const CourseCard = ({ title, desc, link }) => (
  <div className="hp-course-card">
    <h3>{title}</h3>
    <p>{desc}</p>
    <Link to={link}>View Track →</Link>
  </div>
);

const Testimonial = ({ name, role, msg }) => (
  <div className="hp-testimonial-card">
    <p>“{msg}”</p>
    <h4>{name}</h4>
    <span>{role}</span>
  </div>
);

export default function HomePage() {
  return (
    <div className="hp-root">
      {/* HERO */}
      <div className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-left">
            <div className="hp-badge">DevOps • AWS • Linux • CI/CD</div>

            <h1 className="hp-title">
              Learn DevOps the <span className="hp-accent">clean &</span><br />
              <span className="hp-accent-purple">structured</span> way.
            </h1>

            <p className="hp-desc">
              From Linux basics to production-ready CI/CD pipelines using
              Docker, Kubernetes, AWS, Terraform & Ansible.
            </p>

            <div className="hp-cta-row">
              <Link to="/courses" className="hp-cta-primary">
                Start Learning FREE
              </Link>
              <Link to="/courses/aws" className="hp-cta-secondary">
                View AWS Track
              </Link>
            </div>

            <div className="hp-stats">
              <AnimatedStat value="5000" label="Students" />
              <AnimatedStat value="25" label="Projects" />
              <AnimatedStat value="98" label="Success Rate" />
            </div>
          </div>

          <div className="hp-right">
            <div className="hp-journey-card">
              <h3>Your DevOps Journey</h3>
              <ul>
                <li>🛠️ Linux & Git</li>
                <li>☁️ AWS Cloud</li>
                <li>⚙️ Docker & Kubernetes</li>
                <li>🚀 CI/CD Automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ LOGOS – NOW FIXED */}
      <section className="hp-section">
        <h2 className="hp-section-title">Trusted by Students Placed In</h2>
        <div className="hp-logo-grid">
          <img src={infosys} alt="Infosys" />
          <img src={tcs} alt="TCS" />
          <img src={wipro} alt="Wipro" />
          <img src={accenture} alt="Accenture" />
          <img src={amazon} alt="Amazon" />
          <img src={zoho} alt="Zoho" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="hp-section dark">
        <h2 className="hp-section-title">Why Choose PAHRIKYNS?</h2>
        <div className="hp-features-grid">
          <Feature icon="📘" title="Beginner Friendly" desc="No confusion learning." />
          <Feature icon="🧪" title="Real Labs" desc="Production level practice." />
          <Feature icon="👨‍🏫" title="Mentor Support" desc="Live doubt solving." />
          <Feature icon="🏆" title="Job Support" desc="Interview + placement help." />
        </div>
      </section>

      {/* COURSES */}
      <section className="hp-section">
        <h2 className="hp-section-title">Popular Learning Tracks</h2>
        <div className="hp-course-grid">
          <CourseCard title="AWS DevOps" desc="EC2, S3, VPC, CI/CD" link="/courses/aws" />
          <CourseCard title="Linux Master" desc="Shell, OS, Networking" link="/courses/linux" />
          <CourseCard title="Kubernetes Pro" desc="Pods, Services, Helm" link="/courses/kubernetes" />
          <CourseCard title="Full CI/CD" desc="Git, Jenkins, Docker, K8s" link="/courses/devops" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="hp-section dark">
        <h2 className="hp-section-title">Student Success Stories</h2>
        <div className="hp-testimonial-grid">
          <Testimonial name="Arun" role="AWS Engineer" msg="Got job in 3 months!" />
          <Testimonial name="Priya" role="Cloud Engineer" msg="Real labs helped a lot." />
          <Testimonial name="Karthik" role="DevOps Engineer" msg="Production level skills gained." />
        </div>
      </section>

      {/* CTA */}
      <section className="hp-cta-big">
        <h2>Start Your DevOps Career Today</h2>
        <p>Join 5000+ students learning DevOps with real skills.</p>
        <Link to="/register" className="hp-cta-primary large">
          Join Now
        </Link>
      </section>
    </div>
  );
}
