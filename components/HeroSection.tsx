"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@300;400;500;600&display=swap');

        .zeno-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0d0620;
          font-family: 'Exo 2', sans-serif;
        }

        /* Deep purple gradient base */
        .zeno-bg-base {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 120% 80% at 60% 40%, #2d1260 0%, #1a0840 40%, #0d0620 100%);
        }

        /* Diagonal stripe texture */
        .zeno-stripes {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 6px,
            rgba(255,255,255,0.018) 6px,
            rgba(255,255,255,0.018) 7px
          );
        }

        /* Pink/magenta triangle — top left */
        .zeno-tri-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 420px 340px 0 0;
          border-color: #c0186e transparent transparent transparent;
          opacity: 0.85;
          filter: blur(0px);
        }
        .zeno-tri-left-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 260px 210px 0 0;
          border-color: #e01e84 transparent transparent transparent;
          opacity: 0.9;
        }

        /* Pink triangle — bottom right */
        .zeno-tri-right {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 380px 300px;
          border-color: transparent transparent #8b1259 transparent;
          opacity: 0.7;
        }

        /* Glowing orbs */
        .zeno-orb-pink {
          position: absolute;
          width: 500px;
          height: 500px;
          top: -80px;
          left: -60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,30,132,0.35) 0%, transparent 70%);
          pointer-events: none;
          animation: zenoPulse 5s ease-in-out infinite;
        }
        .zeno-orb-cyan {
          position: absolute;
          width: 400px;
          height: 400px;
          bottom: -60px;
          right: 10%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,220,200,0.18) 0%, transparent 70%);
          pointer-events: none;
          animation: zenoPulse 6s ease-in-out infinite 1s;
        }
        .zeno-orb-purple {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 30%;
          right: -100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100,20,200,0.25) 0%, transparent 70%);
          pointer-events: none;
          animation: zenoPulse 7s ease-in-out infinite 0.5s;
        }

        @keyframes zenoPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }

        /* Grid lines */
        .zeno-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(150,50,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(150,50,255,0.08) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(ellipse 70% 70% at 70% 50%, black, transparent);
        }

        /* Content */
        .zeno-content {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          width: 100%;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .zeno-content { grid-template-columns: 1fr; gap: 2rem; }
          .zeno-tri-left { border-width: 220px 180px 0 0; }
        }

        /* Badge */
        .zeno-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 100px;
          border: 1px solid rgba(0,220,200,0.4);
          background: rgba(0,220,200,0.08);
          color: #00dcc8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .zeno-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00dcc8;
          animation: dotBlink 1.5s ease-in-out infinite;
          box-shadow: 0 0 8px #00dcc8;
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        /* Title */
        .zeno-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .zeno-title-line1 {
          display: block;
          color: #a0f0e8;
          text-shadow: 0 0 40px rgba(0,220,200,0.5), 0 0 80px rgba(0,220,200,0.2);
        }
        .zeno-title-line2 {
          display: block;
          background: linear-gradient(135deg, #e01e84 0%, #ff6ab0 50%, #c0186e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          filter: drop-shadow(0 0 30px rgba(224,30,132,0.6));
        }

        /* Tagline */
        .zeno-tagline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 1.2rem 0 1.5rem;
          padding: 8px 20px;
          border-radius: 4px;
          background: rgba(41,121,255,0.2);
          border: 1px solid rgba(41,121,255,0.5);
          color: #a0c4ff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Description */
        .zeno-desc {
          color: rgba(200,180,255,0.7);
          font-size: 1rem;
          line-height: 1.75;
          max-width: 420px;
        }
        .zeno-desc-accent { color: #00dcc8; font-weight: 500; }

        /* Buttons */
        .zeno-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 4px;
          background: linear-gradient(135deg, #e01e84 0%, #c0186e 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 30px rgba(224,30,132,0.5), 0 4px 20px rgba(224,30,132,0.3);
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .zeno-btn-primary:hover {
          box-shadow: 0 0 50px rgba(224,30,132,0.7), 0 4px 30px rgba(224,30,132,0.5);
          transform: translateY(-2px);
          background: linear-gradient(135deg, #f02090 0%, #e01e84 100%);
        }
        .zeno-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 4px;
          background: transparent;
          color: #a0f0e8;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid rgba(0,220,200,0.4);
          transition: all 0.25s ease;
          text-decoration: none;
          box-shadow: 0 0 15px rgba(0,220,200,0.1);
        }
        .zeno-btn-secondary:hover {
          background: rgba(0,220,200,0.1);
          border-color: #00dcc8;
          box-shadow: 0 0 30px rgba(0,220,200,0.25);
          transform: translateY(-2px);
        }

        /* Stats */
        .zeno-stats {
          display: flex;
          gap: 2.5rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(150,50,255,0.2);
        }
        .zeno-stat-num {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #00dcc8;
          text-shadow: 0 0 20px rgba(0,220,200,0.5);
        }
        .zeno-stat-label {
          font-size: 11px;
          color: rgba(200,180,255,0.5);
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* Right panel — feature cards */
        .zeno-card {
          padding: 1.25rem 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(150,50,255,0.2);
          background: rgba(45,18,96,0.4);
          backdrop-filter: blur(12px);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .zeno-card:hover {
          border-color: rgba(224,30,132,0.4);
          box-shadow: 0 0 20px rgba(224,30,132,0.1);
        }
        .zeno-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(224,30,132,0.3), rgba(100,20,200,0.3));
          border: 1px solid rgba(224,30,132,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .zeno-card-title {
          font-weight: 600;
          font-size: 14px;
          color: #a0f0e8;
          margin-bottom: 4px;
          letter-spacing: 0.03em;
        }
        .zeno-card-desc {
          font-size: 13px;
          color: rgba(200,180,255,0.6);
          line-height: 1.6;
        }

        /* Tags */
        .zeno-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .zeno-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 3px;
          border: 1px solid rgba(0,220,200,0.25);
          background: rgba(0,220,200,0.06);
          color: rgba(0,220,200,0.8);
        }
      `}</style>

      <div className="zeno-hero">
        {/* BG Layers */}
        <div className="zeno-bg-base" />
        <div className="zeno-stripes" />
        <div className="zeno-grid" />
        <div className="zeno-orb-pink" />
        <div className="zeno-orb-cyan" />
        <div className="zeno-orb-purple" />

        {/* Geometric Triangles */}
        <div className="zeno-tri-left" />
        <div className="zeno-tri-left-inner" />
        <div className="zeno-tri-right" />

        {/* Content */}
        <div className="zeno-content">

          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="zeno-badge">
                <span className="zeno-badge-dot" />
                Now Accepting Members
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="zeno-title">
                <span className="zeno-title-line1">ZENO</span>
                <span className="zeno-title-line2">TECHNOLOGIES</span>
              </div>
            </motion.div>

         

            <motion.p
              className="zeno-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Access advanced tools, manage your hiring operations, and
              collaborate with your team effortlessly. Empower your workspace
              with{" "}
              <span className="zeno-desc-accent">Zeno Admin</span>{" "}
              — built for teams that move fast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}
            >
              <Link href="/Login">
                <div className="zeno-btn-primary">
                  Go to Dashboard
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
<Link href="/Login">
              <div className="zeno-btn-secondary">Learn More</div>
</Link>            </motion.div>

            <motion.div
              className="zeno-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { num: "14+", label: "Years Active" },
                { num: "10K+", label: "Members" },
                { num: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="zeno-stat-num">{s.num}</div>
                  <div className="zeno-stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

     

        </div>
      </div>
    </>
  );
}