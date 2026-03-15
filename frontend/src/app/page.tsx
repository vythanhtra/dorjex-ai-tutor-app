"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import Link from "next/link";
import { Brain, BookOpen, MessageSquare, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <Brain className="w-6 h-6" /> DorjeX AI Tutor
        </div>
        <Link href="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          Bắt đầu học
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Học AI chuyên sâu<br />
          <span className="text-indigo-600">với trợ lý AI cá nhân</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          23 module từ Giới thiệu AI đến AI Agents. Học theo lộ trình, kiểm tra kiến thức,
          và nhận chứng chỉ hoàn thành.
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
        >
          Bắt đầu miễn phí <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { icon: BookOpen, title: "23 Modules", desc: "Từ AI cơ bản (L1) đến AI Agents (L4)", color: "text-indigo-600" },
          { icon: MessageSquare, title: "AI Tutor Chat", desc: "Hỏi đáp theo ngữ cảnh của từng module", color: "text-purple-600" },
          { icon: Trophy, title: "Quiz & Chứng chỉ", desc: "Kiểm tra kiến thức và nhận chứng chỉ", color: "text-green-600" },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <f.icon className={`w-10 h-10 mx-auto mb-4 ${f.color}`} />
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
