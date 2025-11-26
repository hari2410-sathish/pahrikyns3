import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Stat = ({ value, label }) => (
  <div className="hp-stat">
    <div className="hp-stat-value">{value}</div>
    <div className="hp-stat-label">{label}</div>
  </div>
);

export default function HomePage() {
  return (
    <div className="hp-root">
      <div className="hp-hero">
        <div className="hp-hero-inner">

          {/* LEFT SIDE */}
          <div className="hp-left">

            <div className="hp-badge">DevOps • AWS • Linux • CI/CD</div>

            <h1 className="hp-title">
              Learn DevOps the <span className="hp-accent">clean &</span><br />
              <span className="hp-accent-purple">structured</span> way.
            </h1>

            <p className="hp-desc">
              PAHRIKYNS Teaching will take you from basics of Linux and AWS
              to real production-ready CI/CD pipelines with tools like Jenkins,
              Docker, Kubernetes, Terraform, Ansible & more — step by step,
              without confusion.
            </p>

            <div className="hp-cta-row">
              <Link to="/courses" className="hp-cta-primary">Start Learning FREE</Link>
              <Link to="/courses/aws" className="hp-cta-secondary">View AWS Track</Link>
            </div>

            <div className="hp-stats">
              <Stat value="5000+" label="Students trained" />
              <Stat value="25+" label="Hands-on projects" />
              <Stat value="98%" label="Success & clarity" />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="hp-right">
            <div className="hp-journey-card">

              <h3 className="hp-journey-title">Your DevOps Journey</h3>

              <ul className="hp-journey-list">
                <li><span className="hp-journey-icon">🛠️</span> Foundations</li>
                <li><span className="hp-journey-icon">☁️</span> Cloud & AWS</li>
                <li><span className="hp-journey-icon">🛡️</span> Security</li>
                <li><span className="hp-journey-icon">⚙️</span> CI/CD & Automation</li>
              </ul>

              <div className="hp-journey-footer">
                <small>Activate Windows — Go to Settings to activate Windows.</small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
