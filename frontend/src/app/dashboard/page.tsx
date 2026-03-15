"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { getDashboard } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, PlayCircle, Flame, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  const { data: dash } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard().then((r) => r.data),
    enabled: !!user,
  });

  if (loading || !user) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-slate-500 text-sm mb-1">{greeting} 👋</p>
          <h1 className="text-3xl font-bold text-white">
            {user.name}
            <span className="gradient-text">!</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Tiếp tục hành trình học AI của bạn</p>
        </div>

        {/* Stats */}
        {dash && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-up delay-100">
            {/* Overall progress */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div className="absolute top-3 right-3 opacity-10">
                <TrendingUp className="w-16 h-16 text-indigo-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <p className="text-xs text-slate-400 font-medium">Tiến độ tổng</p>
              </div>
              <p className="text-4xl font-extrabold gradient-text mb-3">
                {dash.overall_percent}<span className="text-2xl">%</span>
              </p>
              <ProgressBar value={dash.overall_percent} />
            </div>

            {/* Completed modules */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.08))', border: '1px solid rgba(16,185,129,0.15)' }}>
              <div className="absolute top-3 right-3 opacity-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-xs text-slate-400 font-medium">Modules hoàn thành</p>
              </div>
              <p className="text-4xl font-extrabold text-emerald-400 mb-1">
                {dash.completed_modules}
                <span className="text-xl text-slate-500 font-normal">/{dash.total_modules}</span>
              </p>
              <p className="text-xs text-slate-600">
                còn {dash.total_modules - dash.completed_modules} modules nữa
              </p>
            </div>

            {/* Continue learning */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.08))', border: '1px solid rgba(245,158,11,0.15)' }}>
              <div className="absolute top-3 right-3 opacity-10">
                <Flame className="w-16 h-16 text-amber-400" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <p className="text-xs text-slate-400 font-medium">Tiếp tục học</p>
              </div>
              {dash.current_module_id ? (
                <Link
                  href={`/lesson/${dash.current_lesson_id}`}
                  className="inline-flex items-center gap-2 font-medium text-amber-400 hover:text-amber-300 transition group mt-1"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span className="text-sm">Module {dash.current_module_id}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link href="/modules"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition mt-1">
                  Bắt đầu học →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Recent modules */}
        <div className="animate-fade-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Modules gần đây</h2>
            <Link href="/modules" className="text-sm text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(dash?.recent_modules ?? []).map((m: any, i: number) => (
              <Link
                key={m.id}
                href={`/modules/${m.id}`}
                className="card-dark p-5 block group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {m.id}
                  </div>
                  <LevelBadge level={m.level} />
                </div>
                <h3 className="font-medium text-slate-200 text-sm mb-4 group-hover:text-indigo-300 transition leading-snug">
                  {m.title}
                </h3>
                <ProgressBar value={m.percent} showLabel />
                <p className="text-xs text-slate-600 mt-1.5">
                  {m.completed_lessons}/{m.total_lessons} bài học
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
