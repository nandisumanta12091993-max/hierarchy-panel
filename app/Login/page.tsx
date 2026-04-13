"use client";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const texts = ["Intelligent Hierarchy", "From Vision to Execution"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === texts.length) return;
    const timeout = setTimeout(() => {
      const fullText = texts[index];
      setCurrentText(
        deleting ? fullText.substring(0, subIndex - 1) : fullText.substring(0, subIndex + 1)
      );
      if (!deleting && subIndex === fullText.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, deleting ? 60 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  const handleUserCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUserCode(value);
    setIsSwapped(value.length > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (err) {
      setError("Network error! Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@300;400;500;600&display=swap');

        .zeno-login-root {
          font-family: 'Exo 2', sans-serif;
        }

        /* BG layers */
        .zeno-bg {
          background: #0d0620;
          position: relative;
        }
        .zeno-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 120% 100% at 30% 50%, #2d1260 0%, #1a0840 50%, #0d0620 100%);
        }
        .zeno-stripes {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg, transparent, transparent 6px,
            rgba(255,255,255,0.015) 6px, rgba(255,255,255,0.015) 7px
          );
          pointer-events: none;
        }
        .zeno-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(150,50,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(150,50,255,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Triangle decorations */
        .zeno-tri-tl {
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 260px 200px 0 0;
          border-color: #c0186e transparent transparent transparent;
          opacity: 0.8;
        }
        .zeno-tri-tl-inner {
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 160px 125px 0 0;
          border-color: #e01e84 transparent transparent transparent;
          opacity: 0.9;
        }
        .zeno-tri-br {
          position: absolute;
          bottom: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 0 200px 160px;
          border-color: transparent transparent #8b1259 transparent;
          opacity: 0.6;
        }

        /* Orbs */
        .zeno-orb-pink {
          position: absolute;
          width: 400px; height: 400px;
          top: -80px; left: -60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,30,132,0.3) 0%, transparent 70%);
          pointer-events: none;
          animation: zenoPulse 5s ease-in-out infinite;
        }
        .zeno-orb-cyan {
          position: absolute;
          width: 300px; height: 300px;
          bottom: -40px; right: 5%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,220,200,0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: zenoPulse 7s ease-in-out infinite 1s;
        }
        @keyframes zenoPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        /* Left panel text */
        .zeno-brand-name {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 3rem;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .zeno-brand-line1 {
          display: block;
          color: #a0f0e8;
          text-shadow: 0 0 40px rgba(0,220,200,0.5);
        }
        .zeno-brand-line2 {
          display: block;
          background: linear-gradient(135deg, #e01e84 0%, #ff6ab0 50%, #c0186e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(224,30,132,0.5));
        }
        .zeno-tagline-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(41,121,255,0.5);
          background: rgba(41,121,255,0.15);
          color: #a0c4ff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .zeno-typewriter {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a0f0e8, #fff, #a0c4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.04em;
        }
        .zeno-cursor {
          -webkit-text-fill-color: #00dcc8;
          color: #00dcc8;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Form panel */
        .zeno-form-panel {
          background: rgba(13,6,32,0.95);
          border-left: 1px solid rgba(150,50,255,0.15);
        }

        /* Inputs */
        .zeno-input {
          width: 100%;
          background: rgba(45,18,96,0.4);
          border: 1px solid rgba(150,50,255,0.25);
          border-radius: 8px;
          padding: 14px 16px 14px 48px;
          color: #e0d0ff;
          font-family: 'Exo 2', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .zeno-input::placeholder { color: rgba(180,150,255,0.35); }
        .zeno-input:focus {
          border-color: rgba(0,220,200,0.5);
          background: rgba(45,18,96,0.6);
          box-shadow: 0 0 20px rgba(0,220,200,0.1);
        }

        /* Submit button */
        .zeno-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #e01e84 0%, #c0186e 100%);
          color: #fff;
          font-family: 'Exo 2', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 15px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(224,30,132,0.4), 0 4px 20px rgba(224,30,132,0.2);
          transition: all 0.25s ease;
        }
        .zeno-submit-btn:hover:not(:disabled) {
          box-shadow: 0 0 50px rgba(224,30,132,0.6), 0 4px 30px rgba(224,30,132,0.4);
          transform: translateY(-1px);
          background: linear-gradient(135deg, #f02090 0%, #e01e84 100%);
        }
        .zeno-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Forgot link */
        .zeno-forgot {
          color: #00dcc8;
          font-size: 13px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }
        .zeno-forgot:hover { color: #a0f0e8; }

        /* Label */
        .zeno-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(180,150,255,0.7);
          margin-bottom: 8px;
        }

        /* Error box */
        .zeno-error {
          padding: 12px 16px;
          background: rgba(224,30,132,0.08);
          border: 1px solid rgba(224,30,132,0.3);
          border-radius: 8px;
          color: #ff80b0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          margin-bottom: 1.5rem;
        }

        /* Stat chips */
        .zeno-stats-row {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(150,50,255,0.2);
        }
        .zeno-stat-num {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #00dcc8;
          text-shadow: 0 0 15px rgba(0,220,200,0.5);
        }
        .zeno-stat-lbl {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(180,150,255,0.5);
          margin-top: 3px;
        }

        /* Input icon */
        .zeno-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(150,50,255,0.6);
          pointer-events: none;
        }
      `}</style>

      <div className="zeno-login-root h-screen w-screen flex overflow-hidden relative zeno-bg">
        {/* Global BG effects */}
        <div className="zeno-stripes" />
        <div className="zeno-grid-bg" />
        <div className="zeno-orb-pink" />
        <div className="zeno-orb-cyan" />

        {/* ─── LEFT PANEL ─── */}
        <div
          className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-all duration-700 ease-in-out ${
            isSwapped ? "lg:translate-x-full" : "lg:translate-x-0"
          }`}
          style={{ zIndex: isSwapped ? 10 : 1 }}
        >
          {/* Decorative triangles */}
          <div className="zeno-tri-tl" />
          <div className="zeno-tri-tl-inner" />
          <div className="zeno-tri-br" />

          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/login.png"
              alt="Background"
              className="w-full h-full object-cover"
              style={{ opacity: 0.25, mixBlendMode: "luminosity" }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,6,32,0.95) 0%, rgba(45,18,96,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Left panel content */}
          <div className="absolute inset-0 flex flex-col justify-between p-12 z-10">
            {/* Top — logo */}
            <div>
              <div className="zeno-tagline-badge">✦ 14 Years of Excellence</div>
              <div className="zeno-brand-name">
                <span className="zeno-brand-line1">ZENO</span>
                <span className="zeno-brand-line2">TECHNOLOGIES</span>
              </div>
            </div>

            {/* Bottom — typewriter */}
            <div>
              <div className="zeno-typewriter">
                {currentText}
                <span className="zeno-cursor">|</span>
              </div>
              <p
                style={{
                  color: "rgba(200,180,255,0.6)",
                  fontSize: "14px",
                  marginTop: "12px",
                  lineHeight: "1.7",
                  maxWidth: "340px",
                }}
              >
                View reporting structures and departments across the{" "}
                <span style={{ color: "#a0f0e8", fontWeight: 500 }}>
                  organization
                </span>
                .
              </p>

              {/* Stats */}
              <div className="zeno-stats-row">
                {[
                  { num: "14+", lbl: "Years Active" },
                  { num: "10K+", lbl: "Members" },
                  { num: "98%", lbl: "Satisfaction" },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div className="zeno-stat-num">{s.num}</div>
                    <div className="zeno-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL — FORM ─── */}
        <div
          className={`w-full lg:w-1/2 zeno-form-panel flex flex-col justify-center overflow-y-auto transition-all duration-700 ease-in-out ${
            isSwapped ? "lg:-translate-x-full" : "lg:translate-x-0"
          }`}
          style={{ zIndex: isSwapped ? 1 : 10, position: "relative" }}
        >
          {/* Subtle right-side orb */}
          <div
            style={{
              position: "absolute",
              width: "350px",
              height: "350px",
              top: "10%",
              right: "-80px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(100,20,200,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "420px",
              width: "100%",
              margin: "0 auto",
              padding: "3rem 2rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(0,220,200,0.3)",
                  background: "rgba(0,220,200,0.06)",
                  color: "#00dcc8",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00dcc8",
                    boxShadow: "0 0 8px #00dcc8",
                    display: "inline-block",
                    animation: "dotBlink 1.5s ease-in-out infinite",
                  }}
                />
                Member Portal
              </div>

              <h1
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  background: "linear-gradient(135deg, #a0f0e8 0%, #fff 50%, #e0d0ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Welcome Back
              </h1>
              <p style={{ color: "rgba(180,150,255,0.6)", fontSize: "14px" }}>
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="zeno-error">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* User Code */}
              <div>
                <label className="zeno-label">User Code</label>
                <div style={{ position: "relative" }}>
                  <KeyRound size={18} className="zeno-input-icon" />
                  <input
                    type="text"
                    value={userCode}
                    onChange={handleUserCodeChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    className="zeno-input"
                    placeholder="e.g. ZENO001"
                    style={{ textTransform: "uppercase" }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="zeno-label">Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} className="zeno-input-icon" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    className="zeno-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Forgot */}
              <div style={{ textAlign: "right" }}>
                <Link href="/Secretkey">
                  <button className="zeno-forgot">Forgot Password?</button>
                </Link>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(150,50,255,0.3), transparent)",
                  margin: "0.25rem 0",
                }}
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="zeno-submit-btn"
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Authenticating...
                  </span>
                ) : (
                  "Sign In →"
                )}
              </button>

              {/* Footer note */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "rgba(180,150,255,0.4)",
                  marginTop: "0.5rem",
                }}
              >
                Protected by{" "}
                <span style={{ color: "#a0f0e8", fontWeight: 600 }}>
                  ZENO TECHNOLOGIES
                </span>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        `}</style>
      </div>
    </>
  );
}