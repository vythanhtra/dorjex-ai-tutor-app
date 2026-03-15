"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { getQuiz, submitQuiz } from "@/lib/api";
import Link from "next/link";
import { CheckCircle, XCircle, ChevronRight, Award } from "lucide-react";

export default function QuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  const { data: quiz } = useQuery({
    queryKey: ["quiz", moduleId],
    queryFn: () => getQuiz(moduleId).then((r) => r.data),
    enabled: !!user,
  });

  const { mutate: submit, isPending: submitting } = useMutation({
    mutationFn: () =>
      submitQuiz(
        moduleId,
        Object.entries(answers).map(([question_id, answer]) => ({ question_id, answer }))
      ).then((r) => r.data),
    onSuccess: (data) => setResult(data),
  });

  if (loading || !user || !quiz) return null;

  const question = quiz.questions[currentQ];
  const answered = Object.keys(answers).length;
  const total = quiz.questions.length;

  // Results view
  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            {result.passed ? (
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {result.passed ? "Chúc mừng! Đạt yêu cầu" : "Chưa đạt — Thử lại nhé!"}
            </h2>
            <p className="text-5xl font-bold text-indigo-600 my-4">{result.score}%</p>
            <p className="text-gray-500 text-sm mb-6">
              Đúng {result.correct_count}/{result.total_questions} câu · Điểm đạt: {result.passing_score}%
            </p>

            {/* Question breakdown */}
            <div className="text-left space-y-4 mt-6">
              {result.results.map((r: any, i: number) => {
                const q = quiz.questions.find((q: any) => q.id === r.question_id);
                return (
                  <div key={r.question_id} className={`rounded-xl p-4 border ${r.is_correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <div className="flex items-start gap-2">
                      {r.is_correct ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">{q?.question_text}</p>
                        {!r.is_correct && (
                          <p className="text-xs text-red-600 mb-1">
                            Bạn chọn: {r.your_answer.toUpperCase()} · Đúng: {r.correct_answer.toUpperCase()}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">{r.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-8 justify-center">
              <button
                onClick={() => { setResult(null); setAnswers({}); setCurrentQ(0); }}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Làm lại
              </button>
              <Link
                href={`/modules/${moduleId}`}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
              >
                Về Module
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Link href={`/modules/${moduleId}`} className="text-sm text-gray-500 hover:text-indigo-600">
              ← Module {moduleId}
            </Link>
            <span className="text-sm text-gray-500">
              Câu {currentQ + 1}/{total} · Đã trả lời {answered}/{total}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{question?.question_text}</h2>
          <div className="space-y-3">
            {question?.options.map((opt: any) => (
              <button
                key={opt.id}
                onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: opt.id }))}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                  answers[question.id] === opt.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                <span className="font-semibold mr-2">{opt.id.toUpperCase()}.</span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((q) => q - 1)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-40"
          >
            ← Câu trước
          </button>

          {currentQ < total - 1 ? (
            <button
              onClick={() => setCurrentQ((q) => q + 1)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Câu tiếp <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => submit()}
              disabled={submitting || answered < total}
              className="flex items-center gap-1 px-5 py-2.5 text-sm bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {submitting ? "Đang nộp..." : `Nộp bài (${answered}/${total})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
