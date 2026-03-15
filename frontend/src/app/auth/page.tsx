"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Brain, ArrowRight, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, name, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail ?? "Có lỗi xảy ra, thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] -top-20 -left-20 opacity-25"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="orb w-[400px] h-[400px] bottom-0 -right-20 opacity-20"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              DorjeX <span className="gradient-text">AI Tutor</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm">Học AI chuyên sâu với trợ lý AI cá nhân</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Tab switcher */}
          <div className="flex mb-6 p-1 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={mode === m
                  ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', boxShadow: '0 2px 10px rgba(99,102,241,0.3)' }
                  : { color: '#64748b' }
                }
              >
                {m === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Tên hiển thị</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nguyễn Văn A"
                    className="input-dark pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="input-dark pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="input-dark pl-10"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 rounded-xl px-4 py-3"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                <>
                  {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
