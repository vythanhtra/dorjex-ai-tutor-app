"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getModule, getModuleLessons, getModuleProgress } from "@/lib/api";
import Link from "next/link";
import { CheckCircle, Circle, Lock, HelpCircle, Award } from "lucide-react";

export default function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  const { data: module } = useQuery({
    queryKey: ["module", id],
    queryFn: () => getModule(id).then((r) => r.data),
    enabled: !!user,
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", id],
    queryFn: () => getModuleLessons(id).then((r) => r.data),
    enabled: !!user,
  });

  const { data: progress } = useQuery({
    queryKey: ["module-progress", id],
    queryFn: () => getModuleProgress(id).then((r) => r.data),
    enabled: !!user,
  });

  if (loading || !user || !module) return null;

  const completedIds = new Set<string>(); // simplified — could use progress API

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-indigo-600">{module.id}</span>
                <LevelBadge level={module.level} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{module.description}</p>

          {progress && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Tiến độ</span>
                <span>{progress.completed_lessons}/{progress.total_lessons} bài</span>
              </div>
              <ProgressBar value={progress.percent} color={progress.percent === 100 ? "green" : "indigo"} />
            </div>
          )}
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Bài học ({lessons.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {lessons.map((lesson: any, idx: number) => (
              <Link
                key={lesson.id}
                href={`/lesson/${lesson.id}`}
                className="flex items-center gap-4 p-4 hover:bg-indigo-50 transition group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">~{lesson.estimated_time} phút</p>
                </div>
                <Circle className="w-4 h-4 text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-semibold text-gray-900">Quiz kiểm tra</p>
                <p className="text-xs text-gray-400">Điểm đạt: {80}%</p>
              </div>
            </div>
            <Link
              href={`/quiz/${id}`}
              className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Làm quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
