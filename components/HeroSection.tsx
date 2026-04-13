"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { num: "14+", label: "Years Active" },
  { num: "10K+", label: "Members" },
  { num: "98%", label: "Satisfaction" },
];

const cards = [
  {
    color: "pink" as const,
    title: "Unified Dashboard",
    desc: "Manage all your operations from a single, streamlined admin panel.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#e01e84" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    color: "teal" as const,
    title: "Team Collaboration",
    desc: "Role-based access and real-time collaboration built for growing teams.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="#00d4be" strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#00d4be" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: "purple" as const,
    title: "Smart Hiring Tools",
    desc: "Automate screening, scheduling, and candidate management with ease.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.5 7H16.5L12.5 10.5L14 16L9 13L4 16L5.5 10.5L1.5 7H6.5L9 2Z" stroke="#a060dc" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: "pink" as const,
    title: "Advanced Analytics",
    desc: "Track performance metrics and generate reports in real time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v4M9 12v4M2 9h4M12 9h4" stroke="#e01e84" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke="#e01e84" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const iconBg: Record<string, string> = {
  pink: "bg-[#e01e84]/10",
  teal: "bg-[#00d4be]/10",
  purple: "bg-[#a060dc]/10",
};

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#06030f] py-20 px-4">

      {/* ── Google Fonts (font loading only — not layout CSS) ── */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bricolage+Grotesque:wght@700;800&display=swap');`}</style>

      {/* ── Background gradients ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(180,30,100,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(60,20,160,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_60%_50%,rgba(0,180,160,0.07)_0%,transparent_60%)]" />
        {/* dot grid */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
      </div>

      {/* ── Top accent bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e01e84] to-[#00d4be]" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

        {/* ─── LEFT ─── */}
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4be]/[0.07] border border-[#00d4be]/25 text-[#00d4be] text-[10px] font-semibold tracking-widest uppercase mb-7 select-none">
              <span className="w-[5px] h-[5px] rounded-full bg-[#00d4be] animate-pulse" />
              Now Accepting Members
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="font-extrabold leading-none tracking-tight mb-5"
          >
            <span className="block text-[clamp(46px,7vw,80px)] text-[#f0eeff]">ZENO</span>
            <span className="block text-[clamp(46px,7vw,80px)] text-[#e01e84] relative w-fit after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[3px] after:rounded after:bg-gradient-to-r after:from-[#e01e84] after:via-[#ff6ab0] after:to-transparent">
              TECHNOLOGIES
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] text-[#dcd2ff]/60 leading-relaxed max-w-[440px] mt-7 mb-9"
          >
            Access advanced tools, manage hiring operations, and collaborate
            with your team effortlessly. Empower your workspace with{" "}
            <strong className="text-[#dcd2ff]/90 font-medium">Zeno Admin</strong>
            {" "}— built for teams that move fast.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/Login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#e01e84] hover:bg-[#f02090] active:scale-95 text-white text-[13px] font-semibold tracking-wide transition-all duration-200 hover:-translate-y-px"
            >
              Go to Dashboard
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/Login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-[#c8beff]/20 text-[#c8beff]/80 text-[13px] font-semibold tracking-wide hover:border-[#c8beff]/45 hover:text-[#dcd2ff] hover:-translate-y-px active:scale-95 transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-7 mt-11 pt-8 border-t border-white/[0.07]"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  className="text-[26px] font-bold text-[#f0eeff] leading-none"
                >
                  {s.num}
                </div>
                <div className="text-[10px] text-[#c8beff]/40 tracking-widest uppercase mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT ─── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="order-first lg:order-last"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#c8b4ff]/30 uppercase mb-4">
            Platform Highlights
          </p>
          <div className="flex flex-col gap-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.045] hover:border-[#e01e84]/25 transition-all duration-200 cursor-default"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[c.color]}`}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#dcd2ff]/90 mb-0.5 tracking-[0.01em]">
                    {c.title}
                  </p>
                  <p className="text-[12.5px] text-[#c8b4ff]/45 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}