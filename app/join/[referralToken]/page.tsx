"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2, UserPlus, Phone, AlertCircle,
  CheckCircle, Mail, CreditCard, User, Copy, AlertTriangle
} from "lucide-react";

interface ReferrerInfo { name: string; userCode: string }
interface SuccessData  { userCode: string; name: string }

export default function JoinReferralForm() {
  const [loading,       setLoading]       = useState(false);
  const [validating,    setValidating]    = useState(true);
  const [referralToken, setReferralToken] = useState("");
  const [referrerInfo,  setReferrerInfo]  = useState<ReferrerInfo | null>(null);
  const [successData,   setSuccessData]   = useState<SuccessData  | null>(null);
  const [copied,        setCopied]        = useState(false);
  const [error,         setError]         = useState("");
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", pan: "",
  });

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
      return "Full name is required";
    if (!/^\d{10}$/.test(form.mobile))
      return "Enter a valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Enter a valid email address";
    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan))
      return "PAN format: ABCDE1234F";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      // No password sent — backend will set default 123456
      const res  = await fetch(`/api/join/${referralToken}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, pan: form.pan.toUpperCase() }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessData({
          userCode: data.data.userCode,
          name:     data.data.name,
        });
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch {
      setError("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!successData?.userCode) return;
    navigator.clipboard.writeText(successData.userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp      = "w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-amber-400/50 transition-all";
  const iconWrap = "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none";

  // ── Loading ────────────────────────────────────────────────────────────────
  if (validating) return (
    <Shell>
      <div className="flex flex-col items-center gap-3 py-16">
        <div className="w-10 h-10 border-4 border-t-transparent border-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-white/40 uppercase tracking-widest">Validating link…</p>
      </div>
    </Shell>
  );

  // ── Invalid link ───────────────────────────────────────────────────────────
  if (!referralToken) return (
    <Shell>
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <p className="font-bold text-white text-lg">Invalid Referral Link</p>
        <p className="text-sm text-white/50">This link is invalid or has expired.</p>
        <a href="/login" className="mt-2 px-5 py-2.5 bg-amber-500 rounded-xl text-sm font-semibold text-white">
          Go to Login
        </a>
      </div>
    </Shell>
  );

  // ── Success screen ─────────────────────────────────────────────────────────
  if (successData) return (
    <Shell>
      <div className="flex flex-col items-center text-center gap-4 py-6 px-2">

        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>

        <div>
          <p className="text-xl font-bold text-white">
            Welcome, {successData.name.split(" ")[0]}! 🎉
          </p>
          <p className="text-sm text-white/50 mt-1">Account created successfully.</p>
        </div>

        {/* User code box */}
        <div className="w-full bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4">
          <p className="text-xs text-amber-400/70 uppercase tracking-widest mb-1">Your Unique User ID</p>
          <p className="text-4xl font-black text-amber-400 tracking-widest font-mono">
            {successData.userCode}
          </p>
          <p className="text-xs text-white/35 mt-1">Login ID · Referral ID</p>
        </div>

        {/* Password info */}
        <div className="w-full flex gap-2.5 items-start bg-blue-500/10 border border-blue-400/20 rounded-xl px-3.5 py-3 text-left">
          <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-300 leading-relaxed">
            For your login password, please <strong className="text-blue-300">contact your head</strong>.
          </p>
        </div>

        {/* Save ID warning */}
        <div className="w-full flex gap-2.5 items-start bg-red-500/10 border border-red-400/20 rounded-xl px-3.5 py-3 text-left">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-300 leading-relaxed">
            <strong>Save this ID now.</strong> It is your only way to log in.
            You cannot recover it later — note it down immediately.
          </p>
        </div>

        <button
          onClick={copyCode}
          className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl font-semibold text-sm text-white transition-all"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : `Copy ID: ${successData.userCode}`}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full py-2.5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/5 transition-all"
        >
          Go to Login →
        </button>
      </div>
    </Shell>
  );

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <Shell>
      {/* Referrer badge */}
      {referrerInfo && (
        <div className="flex items-center gap-3 px-3 py-2.5 mb-3 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-xs flex-shrink-0">
            {referrerInfo.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-white/40">Referred by</p>
            <p className="text-sm font-semibold text-white truncate">{referrerInfo.name}</p>
            <p className="text-xs text-amber-400 font-mono">{referrerInfo.userCode}</p>
          </div>
        </div>
      )}

      {/* Form card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />
        <div className="p-5">

          {/* Error banner */}
          {error && (
            <div className="flex gap-2 items-start mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Full name */}
            <Field label="Full Name *">
              <User className={iconWrap} />
              <input
                className={inp}
                placeholder="Your full name"
                value={form.name}
                onChange={set("name")}
                required
              />
            </Field>

            {/* Mobile + PAN */}
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Mobile *">
                <Phone className={iconWrap} />
                <input
                  className={inp}
                  placeholder="10 digits"
                  type="tel"
                  maxLength={10}
                  value={form.mobile}
                  onChange={set("mobile")}
                  required
                />
              </Field>
              <Field label="PAN">
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

            {/* Email */}
            <Field label="Email">
              <Mail className={iconWrap} />
              <input
                className={inp}
                placeholder="your@email.com (optional)"
                type="email"
                value={form.email}
                onChange={set("email")}
              />
            </Field>

            {/* Password contact notice */}
            <div className="flex gap-2 items-start bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-300/80 leading-relaxed">
                For your login password, please{" "}
                <strong className="text-blue-300">contact your head</strong>. You will
                also receive a unique{" "}
                <strong className="text-blue-300">User Code</strong> (e.g. ZENO001) which
                is your Login ID and Referral ID — save it carefully.
              </p>
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
            <a href="/login" className="text-amber-400 hover:text-amber-300 font-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </Shell>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────────
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(135deg,#0f0c29 0%,#1a1650 50%,#0f0c29 100%)" }}
    >
      <div className="fixed top-16 left-8 w-56 h-56 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-16 right-8 w-56 h-56 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-sm relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-amber-500/25">
            <UserPlus className="w-4 h-4 text-white" strokeWidth={2.5} />
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

// ── Field wrapper ──────────────────────────────────────────────────────────────
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