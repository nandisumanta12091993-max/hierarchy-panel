"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2, UserPlus, Phone, AlertCircle,
  CheckCircle, Mail, CreditCard, User, Copy,
  AlertTriangle, Lock, Shield, LogIn,
} from "lucide-react";

interface ReferrerInfo { name: string; userCode: string }
interface SuccessData  { userCode: string; name: string }

export default function JoinReferralForm() {
  const [loading,       setLoading]       = useState(false);
  const [validating,    setValidating]    = useState(true);
  const [referralToken, setReferralToken] = useState("");
  const [referrerInfo,  setReferrerInfo]  = useState<ReferrerInfo | null>(null);
  const [successData,   setSuccessData]   = useState<SuccessData  | null>(null);
  const [copiedId,      setCopiedId]      = useState(false);
  const [copiedPwd,     setCopiedPwd]     = useState(false);
  const [error,         setError]         = useState("");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", pan: "" });

  const DEFAULT_PASSWORD = "123456";

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!params?.referralToken) { setValidating(false); return; }
      const token = params.referralToken as string;
      setReferralToken(token);
      try {
        const res  = await fetch(`/api/users/referrer/${token}`);
        const data = await res.json();
        if (data.success) setReferrerInfo(data.data);
      } catch {}
      setValidating(false);
    })();
  }, [params]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: k === "pan" ? e.target.value.toUpperCase() : e.target.value }));

  const validate = () => {
    if (!form.name.trim())
      return "Full name is required.";
    if (!/^\d{10}$/.test(form.mobile))
      return "Please enter a valid 10-digit mobile number.";
    if (!form.email.trim())
      return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan))
      return "PAN format must be: ABCDE1234F";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      const res  = await fetch(`/api/join/${referralToken}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, pan: form.pan.toUpperCase() }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessData({ userCode: data.data.userCode, name: data.data.name });
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    if (!successData?.userCode) return;
    navigator.clipboard.writeText(successData.userCode);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(DEFAULT_PASSWORD);
    setCopiedPwd(true);
    setTimeout(() => setCopiedPwd(false), 2000);
  };

  const inp      = "w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-amber-400/60 focus:bg-white/8 transition-all duration-200";
  const iconWrap = "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none";

  // ── Validating ─────────────────────────────────────────────────────────────
  if (validating) return (
    <Shell>
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="w-12 h-12 border-[3px] border-t-transparent border-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Validating your link…</p>
      </div>
    </Shell>
  );

  // ── Invalid link ───────────────────────────────────────────────────────────
  if (!referralToken) return (
    <Shell>
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-red-400" />
        </div>
        <div>
          <p className="font-bold text-white text-lg">Invalid Referral Link</p>
          <p className="text-sm text-white/50 mt-1">This link is invalid or has expired.</p>
        </div>
        <a href="/login" className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 transition-colors rounded-xl text-sm font-semibold text-white">
          Go to Login
        </a>
      </div>
    </Shell>
  );

  // ── Success screen ─────────────────────────────────────────────────────────
  if (successData) return (
    <Shell>
      <div className="flex flex-col items-center text-center gap-3.5 py-4 px-1">

        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <p className="text-xl font-bold text-white">
            Welcome, {successData.name.split(" ")[0]}! 🎉
          </p>
          <p className="text-sm text-white/45 mt-1">Your account has been created successfully.</p>
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-[2px] bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
          <div className="p-4 space-y-3">

            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.18em] text-left">
              Your Login Credentials
            </p>

            {/* User ID */}
            <div className="bg-amber-500/10 border border-amber-400/25 rounded-xl p-3.5 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-amber-400/60 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <User className="w-3 h-3" /> User ID (Login ID · Referral ID)
                </p>
                <button
                  onClick={copyId}
                  className="flex items-center gap-1 text-[10px] text-amber-400/70 hover:text-amber-400 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  {copiedId ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-3xl font-black text-amber-400 tracking-[0.12em] font-mono">
                {successData.userCode}
              </p>
            </div>

            {/* Default Password */}
            <div className="bg-emerald-500/10 border border-emerald-400/25 rounded-xl p-3.5 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] text-emerald-400/60 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Lock className="w-3 h-3" /> Default Password
                </p>
                <button
                  onClick={copyPassword}
                  className="flex items-center gap-1 text-[10px] text-emerald-400/70 hover:text-emerald-400 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  {copiedPwd ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-3xl font-black text-emerald-400 tracking-[0.12em] font-mono">
                {DEFAULT_PASSWORD}
              </p>
              <p className="text-[10px] text-white/30 mt-1">
                Change this after your first login.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-2.5 items-start bg-amber-500/10 border border-amber-400/20 rounded-xl px-3.5 py-3 text-left">
          <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-300/80 leading-relaxed">
            For your security, please <strong className="text-amber-300">change your password</strong> immediately after your first login via the Settings page.
          </p>
        </div>

        <div className="w-full flex gap-2.5 items-start bg-red-500/10 border border-red-400/20 rounded-xl px-3.5 py-3 text-left">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-300/80 leading-relaxed">
            <strong className="text-red-300">Save your User ID now.</strong> It is your only way to log in and cannot be recovered if lost.
          </p>
        </div>

        <button
          onClick={copyId}
          className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-sm text-white transition-all shadow-lg shadow-amber-500/20"
        >
          <Copy className="w-4 h-4" />
          {copiedId ? "ID Copied!" : `Copy User ID: ${successData.userCode}`}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all"
        >
          <LogIn className="w-4 h-4" />
          Proceed to Login
        </button>
      </div>
    </Shell>
  );

  // ── Registration Form ──────────────────────────────────────────────────────
  return (
    <Shell>
      {referrerInfo && (
        <div className="flex items-center gap-3 px-3 py-2.5 mb-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0">
            {referrerInfo.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-white/35 uppercase tracking-widest">Referred by</p>
            <p className="text-sm font-semibold text-white truncate">{referrerInfo.name}</p>
            <p className="text-xs text-amber-400 font-mono">{referrerInfo.userCode}</p>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />
        <div className="p-5">

          {error && (
            <div className="flex gap-2 items-start mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            <Field label="Full Name *">
              <User className={iconWrap} />
              <input
                className={inp}
                placeholder="Enter your full name"
                value={form.name}
                onChange={set("name")}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Mobile *">
                <Phone className={iconWrap} />
                <input
                  className={inp}
                  placeholder="10-digit number"
                  type="tel"
                  maxLength={10}
                  value={form.mobile}
                  onChange={set("mobile")}
                  required
                />
              </Field>
              <Field label="PAN (Optional)">
                <CreditCard className={iconWrap} />
                <input
                  className={`${inp} uppercase font-mono tracking-wider`}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={form.pan}
                  onChange={set("pan")}
                />
              </Field>
            </div>

            <Field label="Email *">
              <Mail className={iconWrap} />
              <input
                className={inp}
                placeholder="your@email.com"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
              />
            </Field>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2">
              <p className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">
                After Registration, You Will Receive
              </p>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <p className="text-xs text-white/55 leading-relaxed">
                  A unique <strong className="text-amber-400">User ID</strong> (e.g. ZENO001) — this is your Login ID and Referral ID. Save it carefully.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-xs text-white/55 leading-relaxed">
                  A <strong className="text-emerald-400">default password</strong> of <strong className="text-emerald-400 font-mono">123456</strong> — change it after your first login.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-sm text-white transition-all shadow-lg shadow-amber-500/20"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account…</>
                : <><UserPlus className="w-4 h-4" /> Create Account</>
              }
            </button>
          </form>

          <p className="text-center text-xs text-white/35 mt-4">
            Already have an account?{" "}
            <a href="/Login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(135deg,#0f0c29 0%,#1a1650 50%,#0f0c29 100%)" }}
    >
      <div className="fixed top-16 left-8 w-64 h-64 bg-purple-700/12 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-16 right-8 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-amber-500/30">
            <UserPlus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-lg font-black text-white leading-none">
              Join <span className="text-amber-400">ZENO</span>
            </p>
            <p className="text-xs text-white/35">Create your investment account</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}