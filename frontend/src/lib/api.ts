import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove("token");
      if (typeof window !== "undefined") window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

// Auth
export const signup = (email: string, name: string, password: string) =>
  api.post("/auth/signup", { email, name, password });

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const getMe = () => api.get("/auth/me");

// Modules
export const getModules = () => api.get("/modules");
export const getModule = (id: string) => api.get(`/modules/${id}`);
export const getModuleLessons = (id: string) => api.get(`/modules/${id}/lessons`);
export const getModuleProgress = (id: string) => api.get(`/modules/${id}/progress`);

// Lessons
export const getLesson = (id: string) => api.get(`/lessons/${id}`);
export const getNextLesson = (id: string) => api.get(`/lessons/${id}/next`);
export const getPrevLesson = (id: string) => api.get(`/lessons/${id}/previous`);

// Progress
export const markComplete = (lessonId: string) =>
  api.post("/progress/mark-complete", { lesson_id: lessonId });
export const getDashboard = () => api.get("/progress/dashboard");

// Quiz
export const getQuiz = (moduleId: string) => api.get(`/quizzes/module/${moduleId}`);
export const submitQuiz = (moduleId: string, answers: { question_id: string; answer: string }[]) =>
  api.post(`/quizzes/module/${moduleId}/submit`, { answers });

// Chat
export const sendMessage = (message: string, moduleId?: string, conversationId?: string) =>
  api.post("/chat/message", { message, module_id: moduleId, conversation_id: conversationId });
