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
import { ArrowRight, BookOpen, CheckCircle, PlayCircle } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Chào mừng trở lại, {user.name}!</h1>
          <p className="text-gray-500 text-sm mt-1">Tiếp tục hành trình học AI của bạn</p>
        </div>

        {/* Stats */}
        {dash && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Tiến độ tổng</p>
              <p className="text-3xl font-bold text-indigo-600 mt-1">{dash.overall_percent}%</p>
              <ProgressBar value={dash.overall_percent} className="mt-2" />
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Modules hoàn thành</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {dash.completed_modules}
                <span className="text-base font-normal text-gray-400">/{dash.total_modules}</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
              <p className="text-sm text-gray-500">Tiếp tục học</p>
              {dash.current_module_id ? (
                <Link
                  href={`/lesson/${dash.current_lesson_id}`}
                  className="mt-2 flex items-center gap-2 text-indigo-600 font-medium text-sm hover:underline"
                >
                  <PlayCircle className="w-4 h-4" />
                  Module {dash.current_module_id} <ArrowRight className="w-3 h-3" />
                </Link>
              ) : (
                <Link href="/modules" className="mt-2 text-indigo-600 text-sm font-medium hover:underline">
                  Bắt đầu học →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Recent Modules */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Modules gần đây</h2>
            <Link href="/modules" className="text-sm text-indigo-600 hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(dash?.recent_modules ?? []).map((m: any) => (
              <Link
                key={m.id}
                href={`/modules/${m.id}`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {m.id}
                  </div>
                  <LevelBadge level={m.level} />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-3 group-hover:text-indigo-600 transition">{m.title}</h3>
                <ProgressBar value={m.percent} showLabel />
                <p className="text-xs text-gray-400 mt-1">
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
