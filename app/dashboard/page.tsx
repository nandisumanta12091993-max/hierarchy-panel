"use client";
import React, { useEffect, useState } from "react";
import {
  User, Settings, LogOut, Edit2, Save, X,
  Users, Mail, Share2, Phone,
  Sun, Moon, DollarSign, Plus, Trash2, AlertCircle,
  Eye, EyeOff, CreditCard, TrendingUp, Menu,
  Key, Clock, CheckCircle, XCircle,
  Copy, Zap, BarChart3, Wallet, Star, Shield, Activity,
  ShieldCheck, Network, ChevronDown, ChevronRight, Smartphone,
  FileText
} from "lucide-react";

interface Payment {
  _id: string;
  amount: number;
  screenshot: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  dailyInterest?: number;
  maxInterest?: number;
  maxMonths?: number;
  createdAt: string;
  investmentCalc?: {
    daysElapsed: number;
    dailyInterest: number;
    totalInterest: number;
    maxInterest: number;
    isMatured: boolean;
    maturityDate: string;
  };
}

interface Portfolio {
  totalInvested: number;
  totalInterestEarned: number;
  totalValue: number;
  maxMonths: number;
}

interface PaymentSummary {
  totalInvested: number;
  approvedCount: number;
  pendingCount: number;
  totalInterestEarned: number;
}

interface UserNode {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  userCode?: string;
  walletName?: string;
  walletAddress?: string;
  referralToken?: string;
  parentId?: string;
  children: UserNode[];
  payments: Payment[];
  paymentSummary: PaymentSummary;
  level: number;
  createdAt: string;
}

interface UserData {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  pan?: string;
  userCode?: string;
  walletName?: string;
  walletAddress?: string;
  referralToken?: string;
  parentId?: string;
  children?: any[];
  payments?: Payment[];
  createdAt: string;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  pan: string;
  walletName: string;
  walletAddress: string;
}

interface PaymentFormData {
  amount: string;
  description: string;
  screenshot: File | null;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const MONTHLY_RATE = 0.08;
const DAYS_PER_MONTH = 30;
const SUPER_ADMIN_CODE = "ZENO000";

function getDailyInterest(amount: number) {
  return (amount * MONTHLY_RATE) / DAYS_PER_MONTH;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "approved":
      return { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30", label: "Approved" };
    case "rejected":
      return { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", label: "Rejected" };
    default:
      return { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30", label: "Pending" };
  }
}

// ─── Admin Panel ─────────────────────────────────────────────────────────────

interface AdminPayment {
  _id: string;
  amount: number;
  screenshot: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  userName: string;
  userCode: string;
  userMobile: string;
  userId: string;
}

function AdminPanel({ isDarkMode, card }: { isDarkMode: boolean; card: string }) {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPayments(data.data);
      else setError(data.message);
    } catch {
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, paymentId: string, status: "approved" | "rejected") => {
    setActionLoading(paymentId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/payments/${userId}/${paymentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setPayments((prev) => prev.map((p) => p._id === paymentId ? { ...p, status } : p));
      } else {
        alert(data.message || "Error");
      }
    } catch {
      alert("Network error");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = payments.filter((p) => filter === "all" || p.status === filter);
  const pendingCount = payments.filter((p) => p.status === "pending").length;

  const statusStyle = {
    pending: "bg-amber-400/10 text-amber-400 border-amber-400/30",
    approved: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    rejected: "bg-red-400/10 text-red-400 border-red-400/30",
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" /> Admin Panel
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Approve or reject user investments
          </p>
        </div>
        <button
          onClick={fetchPayments}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${isDarkMode ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: payments.length, color: "from-blue-500 to-blue-600" },
          { label: "Pending", value: pendingCount, color: "from-amber-500 to-orange-500" },
          { label: "Approved", value: payments.filter(p => p.status === "approved").length, color: "from-emerald-500 to-emerald-600" },
        ].map((s) => (
          <div key={s.label} className={`${card} p-4`}>
            <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
            <p className={`text-2xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              filter === f
                ? "bg-amber-500 text-black"
                : isDarkMode ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
            {f === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-black/20 px-1.5 py-0.5 rounded-full text-xs">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-t-transparent border-amber-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className={`${card} p-12 text-center`}>
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>No {filter} payments</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((payment) => (
            <div key={payment._id} className={`${card} p-5`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-black text-sm">
                    {payment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{payment.userName}</p>
                    <p className="text-xs text-amber-400 font-mono">{payment.userCode}</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{payment.userMobile}</p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${statusStyle[payment.status]}`}>
                  {payment.status}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-black">
                    {payment.amount} <span className="text-sm font-normal text-gray-400">USDT</span>
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {new Date(payment.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                  {payment.description && (
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{payment.description}</p>
                  )}
                </div>
                <button
                  onClick={() => window.open(payment.screenshot, "_blank")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}
                >
                  <Eye className="w-4 h-4" /> Screenshot
                </button>
              </div>

              {payment.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(payment.userId, payment._id, "approved")}
                    disabled={actionLoading === payment._id}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    {actionLoading === payment._id ? (
                      <div className="w-4 h-4 border-2 border-t-transparent border-emerald-400 rounded-full animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(payment.userId, payment._id, "rejected")}
                    disabled={actionLoading === payment._id}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Network Panel ────────────────────────────────────────────────────────────

function NetworkPanel({ userId, isDarkMode, card }: { userId: string; isDarkMode: boolean; card: string }) {
  const [hierarchyData, setHierarchyData] = useState<UserNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNetwork();
  }, []);

  const fetchNetwork = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/tree/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const enriched = await enrichWithPayments(data.data, token!);
        setHierarchyData(enriched);
        setExpandedNodes(new Set([enriched._id]));
      } else {
        setError(data.message || "Failed to load network");
      }
    } catch {
      setError("Failed to load network");
    } finally {
      setLoading(false);
    }
  };

  const enrichWithPayments = async (node: any, token: string, level = 0): Promise<UserNode> => {
    try {
      const res = await fetch(`/api/users/${node._id}/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let payments: Payment[] = [];
      if (res.ok) {
        const d = await res.json();
        payments = d.success ? d.data : [];
      }

      const approved = payments.filter(p => p.status === "approved");
      const pending  = payments.filter(p => p.status === "pending");
      const paymentSummary: PaymentSummary = {
        totalInvested:       approved.reduce((s, p) => s + p.amount, 0),
        approvedCount:       approved.length,
        pendingCount:        pending.length,
        totalInterestEarned: approved.reduce((s, p) => s + (p.investmentCalc?.totalInterest || 0), 0),
      };

      const children: UserNode[] = node.children?.length
        ? await Promise.all(node.children.map((c: any) => enrichWithPayments(c, token, level + 1)))
        : [];

      return { ...node, payments, paymentSummary, children, level };
    } catch {
      return {
        ...node,
        payments: [],
        paymentSummary: { totalInvested: 0, approvedCount: 0, pendingCount: 0, totalInterestEarned: 0 },
        children: node.children || [],
        level,
      };
    }
  };

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getInitials = (name: string) => {
    const w = name.trim().split(" ");
    return w.length >= 2 ? (w[0][0] + w[w.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const avatarGradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
  ];

  const getGradient = (name: string) => avatarGradients[name.charCodeAt(0) % avatarGradients.length];

  const renderNode = (node: UserNode): React.ReactElement => {
    const hasChildren = node.children?.length > 0;
    const isExpanded  = expandedNodes.has(node._id);
    const isRoot      = node.level === 0;
    const ps          = node.paymentSummary;

    return (
      <div key={node._id} className="mb-3">
        {/* Node card */}
        <div
          className={`rounded-2xl border transition-all ${
            isRoot
              ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/40"
              : isDarkMode
              ? "bg-white/3 border-white/8 hover:bg-white/6"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
          style={{ marginLeft: `${Math.min(node.level * 24, 72)}px` }}
        >
          {/* Top row — avatar + name + expand toggle */}
          <div
            className="flex items-center gap-3 p-4 cursor-pointer"
            onClick={() => hasChildren && toggleNode(node._id)}
          >
            {/* Expand icon */}
            <div className="w-5 flex-shrink-0">
              {hasChildren ? (
                isExpanded
                  ? <ChevronDown className="w-4 h-4 text-gray-400" />
                  : <ChevronRight className="w-4 h-4 text-gray-400" />
              ) : null}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient(node.name)} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
              {getInitials(node.name)}
            </div>

            {/* Name + code */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-sm">{node.name}</p>
                {isRoot && (
                  <span className="bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full text-xs font-bold">YOU</span>
                )}
                {node.userCode && (
                  <span className="font-mono text-xs text-amber-400">{node.userCode}</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className={`text-xs flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <Smartphone className="w-3 h-3" />{node.mobile}
                </span>
                {node.email && (
                  <span className={`text-xs flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <Mail className="w-3 h-3" />{node.email}
                  </span>
                )}
              </div>
            </div>

            {/* Children badge */}
            {hasChildren && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                isDarkMode ? "bg-white/8 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
                <Users className="w-3 h-3" />
                {node.children.length}
              </div>
            )}
          </div>

          {/* Investment summary row */}
          <div className={`mx-4 mb-4 p-3 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-3 ${
            isDarkMode ? "bg-white/5" : "bg-gray-50"
          }`}>
            {[
              { label: "Invested",  value: `${ps.totalInvested} USDT`,           icon: Wallet,    color: "text-blue-400" },
              { label: "Interest",  value: `${ps.totalInterestEarned.toFixed(2)} USDT`, icon: TrendingUp, color: "text-emerald-400" },
              { label: "Approved",  value: `${ps.approvedCount} plans`,           icon: CheckCircle, color: "text-emerald-400" },
              { label: "Pending",   value: `${ps.pendingCount} plans`,            icon: Clock,     color: "text-amber-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
                <p className={`text-xs mb-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
                <p className="font-bold text-xs">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className={`mt-2 ml-6 pl-4 border-l-2 border-dashed ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-10 h-10 border-4 border-t-transparent border-amber-400 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  if (!hierarchyData) return (
    <div className={`${card} p-12 text-center`}>
      <Users className="w-12 h-12 mx-auto mb-3 text-gray-600" />
      <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
        No network data found. Share your referral link to start building your network.
      </p>
    </div>
  );

  // Count total members excluding self
  const countAll = (node: UserNode): number =>
    (node.children?.length || 0) + (node.children?.reduce((s, c) => s + countAll(c), 0) || 0);

  const totalMembers = countAll(hierarchyData);

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Network className="w-6 h-6 text-amber-400" /> My Network
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {totalMembers} member{totalMembers !== 1 ? "s" : ""} in your network
          </p>
        </div>
        <button
          onClick={fetchNetwork}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
            isDarkMode ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          Refresh
        </button>
      </div>

      {/* Tree */}
      <div className={`${card} p-4 md:p-6`}>
        {renderNode(hierarchyData)}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab]   = useState("dashboard");
  const [user, setUser]             = useState<UserData | null>(null);
  const [loading, setLoading]       = useState(true);
  const [isEditing, setIsEditing]   = useState(false);
  const [payments, setPayments]     = useState<Payment[]>([]);
  const [portfolio, setPortfolio]   = useState<Portfolio | null>(null);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [showAddPayment, setShowAddPayment]   = useState(false);
  const [copied, setCopied]         = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: "", newPassword: "", confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState<FormData>({
    name: "", mobile: "", email: "", pan: "", walletName: "", walletAddress: "",
  });

  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    amount: "", description: "", screenshot: null,
  });

  const isAdmin = user?.userCode === SUPER_ADMIN_CODE;

  useEffect(() => {
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) { window.location.href = "/login"; return; }
    try {
      const parsedUser: UserData = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserDetails(parsedUser._id, token);
    } catch {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (activeTab === "investments") fetchPayments(user._id);
  }, [activeTab, user]);

  const fetchUserDetails = async (userId: string, token: string) => {
    try {
      const res  = await fetch(`/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setFormData({
          name: data.data.name || "", mobile: data.data.mobile || "",
          email: data.data.email || "", pan: data.data.pan || "",
          walletName: data.data.walletName || "", walletAddress: data.data.walletAddress || "",
        });
        fetchPayments(data.data._id);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchPayments = async (userId: string) => {
    setPaymentsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`/api/users/${userId}/payments`, { headers: { Authorization: `Bearer ${token}` } });
      const data  = await res.json();
      if (data.success) { setPayments(data.data); setPortfolio(data.portfolio || null); }
    } catch (e) { console.error(e); }
    finally { setPaymentsLoading(false); }
  };

  const handleAddPayment = async () => {
    if (!user || !paymentForm.amount || !paymentForm.screenshot) { alert("Please fill all required fields!"); return; }
    const amount = parseFloat(paymentForm.amount);
    if (amount < 50 || amount > 5000) { alert("Investment must be between 50 and 5,000 USDT!"); return; }
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("amount", paymentForm.amount);
      fd.append("description", paymentForm.description);
      fd.append("screenshot", paymentForm.screenshot);
      const res  = await fetch(`/api/users/${user._id}/payments`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (data.success) {
        alert(`Investment submitted! ${data.data.note}`);
        setPaymentForm({ amount: "", description: "", screenshot: null });
        setShowAddPayment(false);
        fetchPayments(user._id);
      } else { alert(data.message || "Error submitting investment"); }
    } catch { alert("Error submitting investment"); }
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (!user || !confirm("Delete this investment record?")) return;
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`/api/users/${user._id}/payments/${paymentId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data  = await res.json();
      if (data.success) fetchPayments(user._id);
      else alert(data.message || "Error deleting");
    } catch { alert("Error deleting payment"); }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setIsEditing(false);
        alert("Profile updated!");
      } else alert(data.message || "Error updating profile");
    } catch { alert("Error updating profile"); }
  };

  const handleUpdatePassword = async () => {
    if (!user) return;
    setPasswordMessage({ type: "", text: "" });
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "All fields required!" }); return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match!" }); return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "Min 6 characters!" }); return;
    }
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`/api/users/${user._id}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordMessage({ type: "success", text: "Password updated!" });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else setPasswordMessage({ type: "error", text: data.message || "Error" });
    } catch { setPasswordMessage({ type: "error", text: "Error updating password" }); }
  };

  const handleLogout     = () => { localStorage.clear(); window.location.href = "/login"; };
  const handleCopyCode   = () => {
    if (!user?.userCode) return;
    navigator.clipboard.writeText(user.userCode);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const handleCopyShareLink = () => {
    if (!user?.userCode) return;
    const link = `${window.location.origin}/join/${user.userCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (name: string) => {
    const w = name.trim().split(" ");
    return w.length >= 2 ? (w[0][0] + w[w.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const approvedPayments = payments.filter(p => p.status === "approved");
  const pendingPayments  = payments.filter(p => p.status === "pending");

  const tabs = [
    { id: "dashboard",   label: "Dashboard",  icon: BarChart3   },
    { id: "investments", label: "Investments", icon: TrendingUp  },
    { id: "network",     label: "Network",     icon: Network     },
    { id: "profile",     label: "Profile",     icon: User        },
    { id: "share",       label: "Share",       icon: Share2      },
    { id: "settings",    label: "Settings",    icon: Settings    },
    ...(isAdmin ? [{ id: "admin", label: "Admin", icon: ShieldCheck }] : []),
  ];

  const bg   = isDarkMode ? "min-h-screen bg-[#080c14] text-white" : "min-h-screen bg-gray-50 text-gray-900";
  const card = isDarkMode ? "bg-[#111827] border border-white/5 rounded-2xl" : "bg-white border border-gray-200 rounded-2xl shadow-sm";
  const input = isDarkMode
    ? "bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-amber-400/50 transition-all text-sm"
    : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-amber-500 transition-all text-sm";

  if (loading) return (
    <div className={`${bg} flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-amber-400 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-amber-400/70 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c14]">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-white">Session Expired</h2>
        <button onClick={() => window.location.href = "/login"} className="bg-amber-500 text-black font-bold px-6 py-3 rounded-xl">
          Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className={bg}>
      {/* Mobile Header */}
      <div className={`md:hidden sticky top-0 z-50 ${isDarkMode ? "bg-[#080c14]/95 backdrop-blur-xl border-b border-white/5" : "bg-white/95 backdrop-blur-xl border-b border-gray-200"}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-black font-black text-sm">
              {getInitials(user.name)}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{user.name}</p>
              {user.userCode && <p className="text-xs text-amber-400 font-mono">{user.userCode}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg hover:bg-white/5">
              {isDarkMode ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-400" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto px-3 pb-2 gap-1 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? tab.id === "admin" ? "bg-red-500 text-white" : "bg-amber-500 text-black"
                  : isDarkMode ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-600"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className={`absolute right-0 top-0 h-full w-72 ${isDarkMode ? "bg-[#111827]" : "bg-white"} shadow-2xl`}>
            <div className={`p-5 border-b ${isDarkMode ? "border-white/10" : "border-gray-100"}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-black font-black">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="font-bold">{user.name}</p>
                  {user.userCode && <p className="text-sm text-amber-400 font-mono">{user.userCode}</p>}
                </div>
              </div>
            </div>
            <div className="p-4 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? tab.id === "admin" ? "bg-red-500 text-white font-bold" : "bg-amber-500 text-black font-bold"
                      : isDarkMode ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <div className="pt-3 mt-3 border-t border-white/10">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-400/10">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        <div className={`w-20 flex flex-col items-center py-6 border-r ${isDarkMode ? "bg-[#0d1117] border-white/5" : "bg-white border-gray-200"}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-black font-black text-sm mb-8">Z</div>
          <div className="flex flex-col items-center gap-2 flex-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl w-16 transition-all ${
                  activeTab === tab.id
                    ? tab.id === "admin" ? "bg-red-500 text-white" : "bg-amber-500 text-black"
                    : isDarkMode ? "text-gray-500 hover:text-white hover:bg-white/5" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-xl ${isDarkMode ? "text-gray-500 hover:text-white hover:bg-white/5" : "text-gray-400 hover:bg-gray-50"}`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={handleLogout} className="p-3 rounded-xl text-red-500 hover:bg-red-500/10">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden p-4">{renderContent()}</div>
    </div>
  );

  function renderContent() {
    switch (activeTab) {
      case "dashboard":   return renderDashboard();
      case "investments": return renderInvestments();
      case "network":     return <NetworkPanel userId={user!._id} isDarkMode={isDarkMode} card={card} />;
      case "profile":     return renderProfile();
      case "share":       return renderShare();
      case "settings":    return renderSettings();
      case "admin":       return isAdmin ? <AdminPanel isDarkMode={isDarkMode} card={card} /> : renderDashboard();
      default:            return renderDashboard();
    }
  }

  function renderDashboard() {
    const totalInterestEarned = approvedPayments.reduce((sum, p) => sum + (p.investmentCalc?.totalInterest || 0), 0);
    const totalInvested       = approvedPayments.reduce((sum, p) => sum + p.amount, 0);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Welcome back 👋</p>
            <h1 className="text-2xl md:text-3xl font-black mt-0.5">{user!.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button onClick={() => setActiveTab("admin")} className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all">
                <ShieldCheck className="w-4 h-4" /> Admin
              </button>
            )}
            {user!.userCode && (
              <div className={`text-right ${card} px-4 py-2`}>
                <p className="text-xs text-gray-500 mb-0.5">User Code</p>
                <p className="font-mono font-bold text-amber-400">{user!.userCode}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Invested",  value: `${totalInvested.toFixed(2)} USDT`,             icon: Wallet,    color: "from-blue-500 to-blue-600",    sub: `${approvedPayments.length} active` },
            { label: "Interest Earned", value: `${totalInterestEarned.toFixed(4)} USDT`,        icon: TrendingUp, color: "from-emerald-500 to-emerald-600", sub: "Total so far" },
            { label: "Daily Return",    value: `${approvedPayments.reduce((s, p) => s + (p.investmentCalc?.dailyInterest || 0), 0).toFixed(4)} USDT`, icon: Activity, color: "from-amber-500 to-orange-500", sub: "Per day" },
            { label: "Pending",         value: `${pendingPayments.length}`,                     icon: Clock,     color: "from-purple-500 to-purple-600", sub: "Awaiting approval" },
          ].map((stat, i) => (
            <div key={i} className={`${card} p-4 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-4 -mt-4`} />
              <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-1`}>{stat.label}</p>
              <p className="font-bold text-base md:text-lg">{stat.value}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {approvedPayments.length > 0 && (
          <div className={card}>
            <div className="p-4 md:p-5">
              <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Active Investments
              </h2>
              <div className="space-y-3">
                {approvedPayments.slice(0, 3).map(payment => {
                  const calc     = payment.investmentCalc;
                  const progress = calc ? Math.min((calc.daysElapsed / ((payment.maxMonths || 25) * 30)) * 100, 100) : 0;
                  return (
                    <div key={payment._id} className={`p-4 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-base">{payment.amount} USDT</p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Invested {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">{calc?.totalInterest.toFixed(4)} USDT</p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>earned so far</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{calc?.daysElapsed || 0} days</span>
                          <span>{payment.maxMonths || 25} months max</span>
                        </div>
                        <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}>
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {approvedPayments.length > 3 && (
                <button onClick={() => setActiveTab("investments")} className="w-full mt-3 text-amber-400 text-sm font-semibold hover:underline">
                  View all {approvedPayments.length} investments →
                </button>
              )}
            </div>
          </div>
        )}

        {pendingPayments.length > 0 && (
          <div className={`${card} border-l-4 border-amber-400`}>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-400" />
                <h2 className="font-bold text-sm">{pendingPayments.length} Pending Approval{pendingPayments.length > 1 ? "s" : ""}</h2>
              </div>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Your investment{pendingPayments.length > 1 ? "s are" : " is"} awaiting Super Admin approval.
              </p>
            </div>
          </div>
        )}

        {approvedPayments.length === 0 && pendingPayments.length === 0 && (
          <div className={`${card} p-8 text-center`}>
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Start Investing</h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
              Invest 50–5,000 USDT and earn 8% monthly interest
            </p>
            <button onClick={() => setActiveTab("investments")} className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
              Make First Investment
            </button>
          </div>
        )}
      </div>
    );
  }

  function renderInvestments() {
    const amountVal       = parseFloat(paymentForm.amount) || 0;
    const dailyInterest   = amountVal >= 50 && amountVal <= 5000 ? getDailyInterest(amountVal) : 0;
    const monthlyInterest = amountVal * MONTHLY_RATE;

    return (
      <div className="space-y-5 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Investments</h1>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>8% monthly · Up to 5,000 USDT</p>
          </div>
          <button onClick={() => setShowAddPayment(!showAddPayment)} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-4 py-2.5 rounded-xl text-sm">
            <Plus className="w-4 h-4" /> Invest
          </button>
        </div>

        {showAddPayment && (
          <div className={`${card} overflow-hidden`}>
            <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-base">New Investment</h3>
                <button onClick={() => setShowAddPayment(false)} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Amount (USDT) *</label>
                  <input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className={input} placeholder="Min: 50 — Max: 5,000 USDT" min="50" max="5000" />
                  {amountVal >= 50 && amountVal <= 5000 && (
                    <div className={`mt-2 p-3 rounded-xl ${isDarkMode ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div><p className="text-xs text-gray-500 mb-0.5">Daily</p><p className="font-bold text-emerald-400 text-sm">{dailyInterest.toFixed(4)} USDT</p></div>
                        <div><p className="text-xs text-gray-500 mb-0.5">Monthly (8%)</p><p className="font-bold text-emerald-400 text-sm">{monthlyInterest.toFixed(2)} USDT</p></div>
                        <div><p className="text-xs text-gray-500 mb-0.5">Max Return</p><p className="font-bold text-amber-400 text-sm">{(amountVal * 2).toFixed(0)} USDT</p></div>
                      </div>
                    </div>
                  )}
                  {amountVal > 0 && (amountVal < 50 || amountVal > 5000) && <p className="text-red-400 text-xs mt-1">Amount must be between 50 and 5,000 USDT</p>}
                </div>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Note (Optional)</label>
                  <input type="text" value={paymentForm.description} onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })} className={input} placeholder="Transaction note..." />
                </div>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Payment Screenshot *</label>
                  <div className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${isDarkMode ? "border-white/10 hover:border-amber-400/30" : "border-gray-200 hover:border-amber-400/50"}`}>
                    {paymentForm.screenshot ? (
                      <div className="space-y-2">
                        <img src={URL.createObjectURL(paymentForm.screenshot)} alt="Preview" className="mx-auto h-24 w-auto object-contain rounded-lg" />
                        <p className="text-xs text-gray-400 truncate">{paymentForm.screenshot.name}</p>
                        <button onClick={() => setPaymentForm({ ...paymentForm, screenshot: null })} className="text-xs text-red-400 hover:underline">Remove</button>
                      </div>
                    ) : (
                      <div>
                        <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                        <p className="text-sm text-gray-400 mb-2">Upload payment proof</p>
                        <label className="bg-amber-500 text-black px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold hover:bg-amber-400 transition-all inline-block">
                          Choose File
                          <input type="file" accept="image/*" onChange={(e) => setPaymentForm({ ...paymentForm, screenshot: e.target.files?.[0] || null })} className="hidden" />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-xl flex items-start gap-2 ${isDarkMode ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-200"}`}>
                  <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-300">Your investment will be <strong>pending</strong> until the Super Admin approves it.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddPayment} disabled={!paymentForm.amount || !paymentForm.screenshot || amountVal < 50 || amountVal > 5000} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed">
                    Submit Investment
                  </button>
                  <button onClick={() => setShowAddPayment(false)} className={`px-4 py-3 rounded-xl border ${isDarkMode ? "border-white/10" : "border-gray-200"} text-sm`}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentsLoading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-t-transparent border-amber-400 rounded-full animate-spin" /></div>
        ) : payments.length === 0 ? (
          <div className={`${card} p-8 text-center`}>
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>No investments yet. Start with as little as 50 USDT!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map(payment => {
              const statusCfg  = getStatusConfig(payment.status);
              const StatusIcon = statusCfg.icon;
              const calc       = payment.investmentCalc;
              return (
                <div key={payment._id} className={card}>
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-amber-500/10" : "bg-amber-50"}`}>
                          <DollarSign className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{payment.amount} <span className="text-sm font-normal text-gray-400">USDT</span></p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusCfg.bg}`}>
                          <StatusIcon className={`w-3.5 h-3.5 ${statusCfg.color}`} />
                          <span className={statusCfg.color}>{statusCfg.label}</span>
                        </div>
                        <button onClick={() => window.open(payment.screenshot, "_blank")} className="p-2 rounded-lg hover:bg-white/5"><Eye className="w-4 h-4 text-gray-400" /></button>
                        <button onClick={() => handleDeletePayment(payment._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {payment.status === "approved" && calc && (
                      <div className={`rounded-xl p-4 ${isDarkMode ? "bg-white/3" : "bg-gray-50"}`}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div><p className={`text-xs mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Days Active</p><p className="font-bold text-sm">{calc.daysElapsed} days</p></div>
                          <div><p className={`text-xs mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Daily Interest</p><p className="font-bold text-sm text-emerald-400">{calc.dailyInterest} USDT</p></div>
                          <div><p className={`text-xs mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Earned So Far</p><p className="font-bold text-sm text-emerald-400">{calc.totalInterest.toFixed(4)} USDT</p></div>
                          <div><p className={`text-xs mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Max Return</p><p className="font-bold text-sm text-amber-400">{calc.maxInterest.toFixed(2)} USDT</p></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{calc.daysElapsed} / {(payment.maxMonths || 25) * 30} days</span>
                            <span>{((calc.daysElapsed / ((payment.maxMonths || 25) * 30)) * 100).toFixed(1)}%</span>
                          </div>
                          <div className={`h-2 rounded-full ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}>
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${Math.min((calc.daysElapsed / ((payment.maxMonths || 25) * 30)) * 100, 100)}%` }} />
                          </div>
                          <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Matures: {new Date(calc.maturityDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {calc.isMatured && <span className="text-amber-400 ml-2 font-semibold">✓ Matured</span>}
                          </p>
                        </div>
                      </div>
                    )}
                    {payment.status === "pending" && (
                      <div className={`rounded-xl p-3 flex items-center gap-2 ${isDarkMode ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-200"}`}>
                        <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <p className="text-xs text-amber-300">Awaiting approval. Daily interest of <strong>{getDailyInterest(payment.amount).toFixed(4)} USDT</strong> will start once approved.</p>
                      </div>
                    )}
                    {payment.description && <p className={`text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{payment.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function renderProfile() {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black">Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-amber-500 text-black font-bold px-4 py-2.5 rounded-xl text-sm"><Edit2 className="w-4 h-4" /> Edit</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSaveProfile} className="flex items-center gap-2 bg-emerald-500 text-black font-bold px-4 py-2.5 rounded-xl text-sm"><Save className="w-4 h-4" /> Save</button>
              <button onClick={() => setIsEditing(false)} className={`px-4 py-2.5 rounded-xl text-sm border ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>Cancel</button>
            </div>
          )}
        </div>
        {user!.userCode && (
          <div className={`${card} p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Your User Code</p>
                <p className="text-3xl font-black text-amber-400 font-mono">{user!.userCode}</p>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Login ID · Referral ID</p>
              </div>
              <button onClick={handleCopyCode} className={`p-3 rounded-xl transition-all ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"}`}>
                {copied ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-amber-400" />}
              </button>
            </div>
          </div>
        )}
        <div className={`${card} p-5`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "name",          label: "Full Name",       icon: User,       placeholder: "Your full name",    editable: true  },
              { key: "mobile",        label: "Mobile Number",   icon: Phone,      placeholder: "10-digit mobile",   editable: false },
              { key: "email",         label: "Email Address",   icon: Mail,       placeholder: "your@email.com",    editable: true  },
              { key: "pan",           label: "PAN Number",      icon: CreditCard, placeholder: "ABCDE1234F",        editable: false },
              { key: "walletName",    label: "Wallet Name",     icon: Wallet,     placeholder: "Wallet name",       editable: true  },
              { key: "walletAddress", label: "Wallet Address",  icon: Key,        placeholder: "Wallet address",    editable: true  },
            ].map(({ key, label, icon: Icon, placeholder, editable }) => (
              <div key={key}>
                <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</label>
                {isEditing && editable ? (
                  <input type="text" value={formData[key as keyof FormData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className={input} placeholder={placeholder} />
                ) : (
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className={`text-sm ${!formData[key as keyof FormData] ? "text-gray-500 italic" : ""}`}>{formData[key as keyof FormData] || "Not provided"}</span>
                    {!editable && <span className="ml-auto text-xs text-gray-500 bg-gray-500/10 px-2 py-0.5 rounded">Fixed</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderShare() {
    const shareLink = user!.userCode ? `${window.location.origin}/join/${user!.userCode}` : "";
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-black">Share & Earn</h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Invite friends to extend your investment to 35 months</p>
        </div>
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="font-bold">Referral Bonus</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Invite someone → your investment period extends to <strong className="text-amber-400">35 months</strong></p>
            </div>
          </div>
          {user!.userCode && (
            <>
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Your Referral Link</label>
              <div className={`flex items-center gap-2 p-3 rounded-xl ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"} mb-3`}>
                <p className={`flex-1 text-xs truncate font-mono ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{shareLink}</p>
                <button onClick={handleCopyShareLink} className="bg-amber-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold flex-shrink-0">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className={`p-4 rounded-xl ${isDarkMode ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-200"}`}>
                <p className={`text-xs font-bold mb-1 ${isDarkMode ? "text-amber-300" : "text-amber-700"}`}>Your User Code: {user!.userCode}</p>
                <p className={`text-xs ${isDarkMode ? "text-amber-400/70" : "text-amber-600"}`}>Share this code or the link above to extend your plan from 25 to 35 months!</p>
              </div>
            </>
          )}
        </div>
        {user!.children && user!.children.length > 0 && (
          <div className={card}>
            <div className="p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                {user!.children.length} Referred Member{user!.children.length > 1 ? "s" : ""}
              </h3>
              <div className="space-y-2">
                {user!.children.slice(0, 5).map((child: any, i: number) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      {child.name ? child.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{child.name || "Member"}</p>
                      {child.userCode && <p className="text-xs text-amber-400 font-mono">{child.userCode}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <h1 className="text-2xl font-black">Settings</h1>
        <div className={card}>
          <div className="p-5">
            <h3 className="font-bold mb-1">Update Password</h3>
            <p className={`text-xs mb-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Change your account password</p>
            {passwordMessage.text && (
              <div className={`mb-4 p-3 rounded-xl text-sm ${passwordMessage.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                {passwordMessage.text}
              </div>
            )}
            <div className="space-y-3">
              {[
                { label: "Current Password", key: "currentPassword" },
                { label: "New Password",      key: "newPassword"     },
                { label: "Confirm Password",  key: "confirmPassword" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</label>
                  <div className="relative">
                    <input
                      type={showPassword[key.replace("Password", "") as keyof typeof showPassword] ? "text" : "password"}
                      value={passwordForm[key as keyof PasswordFormData]}
                      onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })}
                      className={`${input} pr-12`}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button
                      onClick={() => {
                        const k = key.replace("Password", "") as keyof typeof showPassword;
                        setShowPassword({ ...showPassword, [k]: !showPassword[k] });
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword[key.replace("Password", "") as keyof typeof showPassword]
                        ? <EyeOff className="w-4 h-4 text-gray-400" />
                        : <Eye className="w-4 h-4 text-gray-400" />
                      }
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={handleUpdatePassword} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl">
                Update Password
              </button>
            </div>
          </div>
        </div>
        <div className={`${card} p-5`}>
          <h3 className="font-bold mb-1">Session</h3>
          <p className={`text-xs mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Sign out of your account</p>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 font-bold px-4 py-3 rounded-xl w-full justify-center">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    );
  }
}