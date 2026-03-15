"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Brain, LogOut, User, BookOpen } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Brain className="w-6 h-6" />
          DorjeX AI Tutor
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/modules" className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600">
            <BookOpen className="w-4 h-4" />
            Modules
          </Link>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 hidden sm:block">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
