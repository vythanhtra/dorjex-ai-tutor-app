"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Brain, LogOut, BookOpen, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <nav className="sticky top-0 z-50"
      style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-white">
            DorjeX <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/dashboard')
                ? 'text-indigo-400 bg-indigo-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/modules"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/modules')
                ? 'text-indigo-400 bg-indigo-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Modules</span>
          </Link>
        </div>

        {/* User area */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                {user.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <span className="text-sm text-slate-300">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
