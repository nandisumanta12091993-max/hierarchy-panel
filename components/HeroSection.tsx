"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .zh {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #06030f;
          font-family: 'Space Grotesk', sans-serif;
          padding: 80px 0 60px;
        }

        /* Background */
        .zh-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(180, 30, 100, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(60, 20, 160, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 60% 50%, rgba(0, 180, 160, 0.08) 0%, transparent 60%);
        }

        /* Subtle dot grid */
        .zh-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        /* Top accent bar */
        .zh-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #e01e84 30%, #00d4be 70%, transparent 100%);
        }

        /* Content wrapper */
        .zh-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .zh-wrap {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 20px;
          }
          .zh-right { order: -1; }
        }

        /* Badge */
        .zh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(0, 212, 190, 0.08);
          border: 1px solid rgba(0, 212, 190, 0.25);
          color: #00d4be;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .zh-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00d4be;
          animation: zhBlink 2s ease-in-out infinite;
        }

        @keyframes zhBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        /* Heading */
        .zh-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 1;
          margin: 0 0 20px;
          letter-spacing: -0.03em;
        }

        .zh-h-top {
          display: block;
          font-size: clamp(48px, 7vw, 80px);
          color: #f0eeff;
        }

        .zh-h-bot {
          display: block;
          font-size: clamp(48px, 7vw, 80px);
          color: #e01e84;
          position: relative;
        }

        /* Underline accent under TECHNOLOGIES */
        .zh-h-bot::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #e01e84, #ff6ab0 60%, transparent);
          border-radius: 2px;
        }

        /* Description */
        .zh-desc {
          font-size: 16px;
          color: rgba(220, 210, 255, 0.65);
          line-height: 1.75;
          max-width: 440px;
          margin: 28px 0 36px;
        }

        .zh-desc strong {
          color: rgba(220, 210, 255, 0.9);
          font-weight: 500;
        }

        /* Buttons */
        .zh-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .zh-btn-p {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 6px;
          background: #e01e84;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }

        .zh-btn-p:hover {
          background: #f02090;
          transform: translateY(-1px);
        }

        .zh-btn-p:active { transform: translateY(0); }

        .zh-btn-s {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 6px;
          background: transparent;
          color: rgba(200, 190, 255, 0.85);
          font-size: 14px;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.04em;
          text-decoration: none;
          border: 1px solid rgba(200, 190, 255, 0.2);
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          white-space: nowrap;
        }

        .zh-btn-s:hover {
          border-color: rgba(200, 190, 255, 0.45);
          color: rgba(220, 210, 255, 1);
          transform: translateY(-1px);
        }

        /* Stats row */
        .zh-stats {
          display: flex;
          gap: 32px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          flex-wrap: wrap;
        }

        .zh-stat-n {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #f0eeff;
          line-height: 1;
        }

        .zh-stat-l {
          font-size: 11px;
          color: rgba(200, 190, 255, 0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 5px;
        }

        /* Right panel */
        .zh-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .zh-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: border-color 0.2s, background 0.2s;
        }

        .zh-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(224, 30, 132, 0.25);
        }

        .zh-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .zh-icon-pink { background: rgba(224, 30, 132, 0.15); }
        .zh-icon-teal { background: rgba(0, 212, 190, 0.12); }
        .zh-icon-purple { background: rgba(130, 80, 220, 0.15); }

        .zh-card-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(220, 210, 255, 0.9);
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }

        .zh-card-desc {
          font-size: 13px;
          color: rgba(200, 180, 255, 0.45);
          line-height: 1.6;
        }

        /* Divider label on right */
        .zh-panel-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(200, 180, 255, 0.3);
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
          .zh { padding: 60px 0 40px; }
          .zh-stats { gap: 20px; }
          .zh-btn-p, .zh-btn-s { width: 100%; justify-content: center; }
          .zh-btns { flex-direction: column; }
        }
      `}</style>

      <div className="zh">
        <div className="zh-bg" />
        <div className="zh-dots" />
        <div className="zh-accent-bar" />

        <div className="zh-wrap">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="zh-badge">
                <span className="zh-dot" />
                Now Accepting Members
              </div>
            </motion.div>

            <motion.h1
              className="zh-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <span className="zh-h-top">ZENO</span>
              <span className="zh-h-bot">TECHNOLOGIES</span>
            </motion.h1>

            <motion.p
              className="zh-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Access advanced tools, manage hiring operations, and collaborate
              with your team effortlessly. Empower your workspace with{" "}
              <strong>Zeno Admin</strong> — built for teams that move fast.
            </motion.p>

            <motion.div
              className="zh-btns"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/Login" className="zh-btn-p">
                Go to Dashboard
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/Login" className="zh-btn-s">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              className="zh-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { num: "14+", label: "Years Active" },
                { num: "10K+", label: "Members" },
                { num: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="zh-stat-n">{s.num}</div>
                  <div className="zh-stat-l">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            className="zh-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="zh-panel-label">Platform Highlights</div>
            <div className="zh-cards">
              {[
                {
                  iconClass: "zh-icon-pink",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
                      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
                      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
                      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
                    </svg>
                  ),
                  title: "Unified Dashboard",
                  desc: "Manage all your operations from a single, streamlined admin panel.",
                },
                {
                  iconClass: "zh-icon-teal",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="6" r="3" stroke="#00d4be" strokeWidth="1.5" />
                      <path d="M3 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#00d4be" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Team Collaboration",
                  desc: "Role-based access and real-time collaboration built for growing teams.",
                },
                {
                  iconClass: "zh-icon-purple",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L11.5 7H16.5L12.5 10.5L14 16L9 13L4 16L5.5 10.5L1.5 7H6.5L9 2Z" stroke="#a060dc" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Smart Hiring Tools",
                  desc: "Automate screening, scheduling, and candidate management with ease.",
                },
                {
                  iconClass: "zh-icon-pink",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="#e01e84" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="9" cy="9" r="3" stroke="#e01e84" strokeWidth="1.5" />
                    </svg>
                  ),
                  title: "Advanced Analytics",
                  desc: "Track performance metrics and generate reports in real time.",
                },
              ].map((c) => (
                <div className="zh-card" key={c.title}>
                  <div className={`zh-icon ${c.iconClass}`}>{c.icon}</div>
                  <div>
                    <div className="zh-card-title">{c.title}</div>
                    <div className="zh-card-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}