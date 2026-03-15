"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import Link from "next/link";
import { Brain, BookOpen, MessageSquare, Trophy, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb w-[600px] h-[600px] -top-40 -left-40 opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="orb w-[500px] h-[500px] top-1/3 -right-40 opacity-20"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div className="orb w-[400px] h-[400px] bottom-0 left-1/3 opacity-15"
          style={{ background: 'radial-gradient(circle, #c084fc, transparent)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">DorjeX <span className="gradient-text">AI Tutor</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm text-slate-400 hover:text-white transition">Đăng nhập</Link>
          <Link href="/auth" className="btn-primary text-sm px-5 py-2.5">
            Bắt đầu học <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-8 animate-fade-up"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>
          <Sparkles className="w-3.5 h-3.5" />
          23 modules · AI từ cơ bản đến Agents
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight mb-6 animate-fade-up delay-100">
          <span className="text-white">Làm chủ</span>{" "}
          <span className="gradient-text">AI</span>
          <br />
          <span className="text-white">theo lộ trình</span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
          Học AI chuyên sâu từ Giới thiệu đến AI Agents. Trợ lý AI cá nhân,
          quiz kiểm tra và chứng chỉ hoàn thành từng cấp độ.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <Link href="/auth" className="btn-primary text-base px-8 py-4">
            Bắt đầu miễn phí <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/auth"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition px-6 py-4 rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <BookOpen className="w-4 h-4" /> Xem chương trình học
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-16 animate-fade-up delay-400">
          {[
            { value: "23", label: "Modules" },
            { value: "4", label: "Cấp độ" },
            { value: "100+", label: "Bài học" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: BookOpen,
              title: "23 Modules có lộ trình",
              desc: "L1 → L2 → L3 → L4. Học tuần tự hoặc nhảy vào module bất kỳ theo trình độ.",
              color: "#6366f1",
              delay: "delay-100",
            },
            {
              icon: MessageSquare,
              title: "AI Tutor theo ngữ cảnh",
              desc: "Trợ lý Claude hiểu nội dung bài học đang học. Hỏi bất cứ điều gì về module.",
              color: "#8b5cf6",
              delay: "delay-200",
            },
            {
              icon: Trophy,
              title: "Quiz & Chứng chỉ",
              desc: "Kiểm tra kiến thức sau mỗi module. Nhận chứng chỉ khi hoàn thành từng cấp.",
              color: "#c084fc",
              delay: "delay-300",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`card-dark p-6 animate-fade-up ${f.delay}`}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-up delay-400">
          {[
            { icon: Zap, text: "Cập nhật liên tục" },
            { icon: Shield, text: "Học miễn phí" },
            { icon: Sparkles, text: "AI-powered" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2 text-sm text-slate-500">
              <t.icon className="w-4 h-4 text-violet-500" />
              {t.text}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
