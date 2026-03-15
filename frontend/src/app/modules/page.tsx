"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { getModules } from "@/lib/api";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";

const LEVEL_GRADIENT: Record<string, string> = {
  L1: 'linear-gradient(135deg, #6366f1, #818cf8)',
  L2: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  L3: 'linear-gradient(135deg, #ec4899, #f472b6)',
  L4: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
};

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

  const levels = ["L1", "L2", "L3", "L4"];
  const byLevel = levels.reduce((acc, l) => {
    acc[l] = (modules as any[]).filter((m) => m.level === l);
    return acc;
  }, {} as Record<string, any[]>);

  const levelTitles: Record<string, string> = {
    L1: "Cơ bản",
    L2: "Trung cấp",
    L3: "Nâng cao",
    L4: "Chuyên gia",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold text-white mb-1">Tất cả Modules</h1>
          <p className="text-slate-500 text-sm">23 modules AI từ cơ bản đến chuyên gia</p>
        </div>

        {/* Show all at once if no level grouping, or by level */}
        {levels.some((l) => (byLevel[l]?.length ?? 0) > 0) ? (
          <div className="space-y-10">
            {levels.map((level, li) => {
              const mods = byLevel[level];
              if (!mods?.length) return null;
              return (
                <div key={level} className={`animate-fade-up delay-${(li + 1) * 100}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: LEVEL_GRADIENT[level] }}>
                      {level}
                    </div>
                    <h2 className="font-semibold text-slate-200">{levelTitles[level]}</h2>
                    <span className="text-xs text-slate-600">{mods.length} modules</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mods.map((m: any) => (
                      <ModuleCard key={m.id} m={m} gradient={LEVEL_GRADIENT[level]} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-up delay-100">
            {(modules as any[]).map((m: any) => (
              <ModuleCard key={m.id} m={m} gradient={LEVEL_GRADIENT[m.level] ?? LEVEL_GRADIENT.L1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleCard({ m, gradient }: { m: any; gradient: string }) {
  return (
    <Link
      href={`/modules/${m.id}`}
      className="card-dark p-5 flex flex-col group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: gradient }}>
          {m.id}
        </div>
        <LevelBadge level={m.level} />
      </div>

      <h3 className="font-semibold text-slate-200 text-sm mb-3 group-hover:text-indigo-300 transition leading-snug flex-1">
        {m.title}
      </h3>

      <div className="flex items-center justify-between text-xs text-slate-600 mt-auto pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> {m.lesson_count} bài
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> ~{m.estimated_hours}h
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
