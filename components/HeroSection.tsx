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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
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
    desc: "Real-time collaboration with role-based access.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="#00d4be" strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#00d4be" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: "#a060dc",
    bg: "rgba(160,96,220,0.08)",
    title: "Smart Hiring",
    desc: "Automate screening and candidate workflows.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.5 7H16.5L12.5 10.5L14 16L9 13L4 16L5.5 10.5L1.5 7H6.5L9 2Z" stroke="#a060dc" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "#e01e84",
    bg: "rgba(224,30,132,0.08)",
    title: "Analytics",
    desc: "Track metrics and generate reports instantly.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="#e01e84" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#e01e84" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#06030f] py-14 sm:py-20 px-4">

      {/* Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(224,30,132,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(96,60,255,0.15), transparent 40%)",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              Now Accepting Members
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-extrabold leading-tight tracking-tight text-white">
            <span className="block text-[clamp(28px,9vw,70px)]">ZENO</span>
            <span className="block text-[clamp(28px,9vw,70px)] text-pink-500">
              TECHNOLOGIES
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-md mx-auto lg:mx-0">
            Manage hiring, collaborate with your team, and track performance —
            all from a single powerful dashboard built for modern teams.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/Login"
              className="px-5 py-2.5 text-sm font-semibold bg-pink-600 hover:bg-pink-700 transition rounded-md text-white text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/Login"
              className="px-5 py-2.5 text-sm font-semibold border border-white/20 hover:border-white/40 text-gray-300 rounded-md text-center"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-md mx-auto lg:mx-0">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-lg font-bold text-white">{s.num}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:border-white/20 transition"
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-md mb-3"
                style={{ background: card.bg }}
              >
                {card.icon}
              </div>

              <h3 className="text-sm font-semibold text-white mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}