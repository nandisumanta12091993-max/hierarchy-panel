"use client";
import Link from "next/link";

const stats = [
  { num: "14+", label: "Years Active" },
  { num: "10K+", label: "Members" },
  { num: "98%", label: "Satisfaction" },
];

const cards = [
  {
    color: "#e01e84",
    bg: "rgba(224,30,132,0.08)",
    title: "Unified Dashboard",
    desc: "Manage all operations from a single streamlined panel.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    color: "#00d4be",
    bg: "rgba(0,212,190,0.08)",
    title: "Team Collaboration",
    desc: "Role-based access and real-time collaboration built for teams.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="#00d4be" strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#00d4be" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: "#a060dc",
    bg: "rgba(160,96,220,0.08)",
    title: "Smart Hiring Tools",
    desc: "Automate screening, scheduling, and candidate management.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.5 7H16.5L12.5 10.5L14 16L9 13L4 16L5.5 10.5L1.5 7H6.5L9 2Z" stroke="#a060dc" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#e01e84",
    bg: "rgba(224,30,132,0.08)",
    title: "Advanced Analytics",
    desc: "Track performance metrics and generate reports in real time.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="#e01e84" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#e01e84" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#06030f] py-20 px-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bricolage+Grotesque:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseGreen {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        .hero-badge    { animation: fadeUp 0.4s ease both; animation-delay: 0ms; }
        .hero-h1       { animation: fadeUp 0.45s ease both; animation-delay: 80ms; }
        .hero-desc     { animation: fadeIn 0.5s ease both; animation-delay: 200ms; }
        .hero-btns     { animation: fadeUp 0.45s ease both; animation-delay: 280ms; }
        .hero-stats    { animation: fadeIn 0.5s ease both; animation-delay: 480ms; }
        .hero-cards    { animation: fadeUp 0.55s ease both; animation-delay: 160ms; }

        .feature-card {
          transition: transform 0.18s ease, border-color 0.18s ease;
          will-change: transform;
        }
        .feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.12) !important;
        }

        .pulse-dot { animation: pulseGreen 2s ease-in-out infinite; }

        .btn-primary {
          transition: background 0.15s ease, transform 0.12s ease;
          will-change: transform;
        }
        .btn-primary:hover  { background: #f02090 !important; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.97); }

        .btn-ghost {
          transition: border-color 0.15s ease, color 0.15s ease, transform 0.12s ease;
          will-change: transform;
        }
        .btn-ghost:hover  { border-color: rgba(200,190,255,0.45) !important; color: #dcd2ff !important; transform: translateY(-1px); }
        .btn-ghost:active { transform: scale(0.97); }
      `}</style>

      {/* Dot grid — CSS only, no JS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Subtle color wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(180,30,100,0.15) 0%, transparent 60%), " +
            "radial-gradient(ellipse 55% 50% at 82% 80%, rgba(60,20,160,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 2, background: "linear-gradient(90deg, transparent, #e01e84 40%, #00d4be 80%, transparent)" }}
      />

      {/* ── Grid ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-14 items-center">

        {/* ── LEFT ── */}
        <div className="order-2 lg:order-1">

          {/* Badge */}
          <div className="hero-badge">
            <span
              className="inline-flex items-center gap-2 mb-7 select-none"
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(0,212,190,0.06)",
                border: "1px solid rgba(0,212,190,0.22)",
                color: "#00d4be",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#00d4be", display: "inline-block" }} />
              Now Accepting Members
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-h1 leading-none tracking-tight mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(46px, 7vw, 80px)",
                color: "#f0eeff",
              }}
            >
              ZENO
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(46px, 7vw, 80px)",
                color: "#e01e84",
                position: "relative",
                width: "fit-content",
              }}
            >
              TECHNOLOGIES
              <span
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 0,
                  right: 0,
                  height: 3,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #e01e84, #ff6ab0, transparent)",
                }}
              />
            </span>
          </h1>

          {/* Description */}
          <p
            className="hero-desc"
            style={{ fontSize: 15, color: "rgba(220,210,255,0.58)", lineHeight: 1.7, maxWidth: 440, marginTop: 28, marginBottom: 32 }}
          >
            Access advanced tools, manage hiring operations, and collaborate
            with your team effortlessly. Empower your workspace with{" "}
            <strong style={{ color: "rgba(220,210,255,0.9)", fontWeight: 500 }}>Zeno Admin</strong>
            {" "}— built for teams that move fast.
          </p>

          {/* Buttons */}
          <div className="hero-btns flex flex-col sm:flex-row gap-3">
            <Link
              href="/Login"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{
                padding: "12px 28px",
                borderRadius: 6,
                background: "#e01e84",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              Go to Dashboard
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/Login"
              className="btn-ghost inline-flex items-center justify-center gap-2"
              style={{
                padding: "12px 28px",
                borderRadius: 6,
                border: "1px solid rgba(200,190,255,0.2)",
                color: "rgba(200,190,255,0.75)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div
            className="hero-stats flex flex-wrap gap-7 mt-10 pt-7"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#f0eeff",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(200,190,255,0.38)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Feature Cards ── */}
        <div className="hero-cards order-1 lg:order-2 grid grid-cols-2 gap-3">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="feature-card"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "18px 16px",
                animationDelay: `${160 + i * 60}ms`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                {card.icon}
              </div>

              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#f0eeff",
                  margin: "0 0 6px",
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(200,190,255,0.45)",
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}