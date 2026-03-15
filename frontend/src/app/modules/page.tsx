"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getModules } from "@/lib/api";
import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";

export default function ModulesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  const { data: modules = [] } = useQuery({
    queryKey: ["modules"],
    queryFn: () => getModules().then((r) => r.data),
    enabled: !!user,
  });

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tất cả Modules</h1>
          <p className="text-gray-500 text-sm mt-1">23 modules AI từ cơ bản đến nâng cao</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((m: any) => (
            <Link
              key={m.id}
              href={`/modules/${m.id}`}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  {m.id}
                </div>
                <LevelBadge level={m.level} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition flex-1">
                {m.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {m.lesson_count} bài
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~{m.estimated_hours}h
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
