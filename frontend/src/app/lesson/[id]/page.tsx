"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { Navbar } from "@/components/layout/Navbar";
import { getLesson, getNextLesson, getPrevLesson, markComplete, sendMessage } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle, MessageSquare, X, Send } from "lucide-react";

function ChatWidget({ lessonId, moduleId }: { lessonId: string; moduleId: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [convId, setConvId] = useState<string | undefined>();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message.trim();
    setMessage("");
    setSending(true);
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    try {
      const { data } = await sendMessage(userMsg, moduleId, convId);
      setConvId(data.conversation_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Xin lỗi, có lỗi xảy ra." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition z-40"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50" style={{ maxHeight: "500px" }}>
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <p className="font-semibold text-sm text-gray-900">AI Tutor</p>
              <p className="text-xs text-gray-400">Module {moduleId}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <p className="text-xs text-gray-400 text-center">Hỏi AI Tutor bất kỳ điều gì về module này!</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] text-sm rounded-xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-400">
                  Đang soạn...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Hỏi về bài học..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={sending || !message.trim()}
              className="bg-indigo-600 text-white rounded-lg px-3 py-2 hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  const { data: lesson } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLesson(id).then((r) => r.data),
    enabled: !!user,
  });

  const { data: nextLesson } = useQuery({
    queryKey: ["lesson-next", id],
    queryFn: () => getNextLesson(id).then((r) => r.data),
    enabled: !!lesson,
  });

  const { data: prevLesson } = useQuery({
    queryKey: ["lesson-prev", id],
    queryFn: () => getPrevLesson(id).then((r) => r.data),
    enabled: !!lesson,
  });

  const { mutate: complete, isPending: completing } = useMutation({
    mutationFn: () => markComplete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["module-progress", lesson?.module_id] });
    },
  });

  if (loading || !user || !lesson) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/modules" className="hover:text-indigo-600">Modules</Link>
          <span>/</span>
          <Link href={`/modules/${lesson.module_id}`} className="hover:text-indigo-600">
            {lesson.module_id}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{lesson.title}</span>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-indigo-600 prose-code:bg-gray-100 prose-code:rounded prose-code:px-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            {prevLesson ? (
              <Link
                href={`/lesson/${prevLesson.id}`}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
              >
                <ChevronLeft className="w-4 h-4" /> {prevLesson.title.slice(0, 30)}...
              </Link>
            ) : (
              <Link href={`/modules/${lesson.module_id}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600">
                <ChevronLeft className="w-4 h-4" /> Về Module
              </Link>
            )}
          </div>

          <button
            onClick={() => complete()}
            disabled={completing}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            {completing ? "Đang lưu..." : "Đánh dấu hoàn thành"}
          </button>

          {nextLesson ? (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
            >
              {nextLesson.title.slice(0, 30)}... <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href={`/quiz/${lesson.module_id}`} className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium">
              Làm quiz <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <ChatWidget lessonId={id} moduleId={lesson.module_id} />
    </div>
  );
}
