import { create } from "zustand";
import Cookies from "js-cookie";
import { login as apiLogin, signup as apiSignup, getMe } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  login: async (email, password) => {
    const { data } = await apiLogin(email, password);
    Cookies.set("token", data.access_token, { expires: 1 });
    const me = await getMe();
    set({ user: me.data });
  },

  signup: async (email, name, password) => {
    const { data } = await apiSignup(email, name, password);
    Cookies.set("token", data.access_token, { expires: 1 });
    const me = await getMe();
    set({ user: me.data });
  },

  logout: () => {
    Cookies.remove("token");
    set({ user: null });
  },

  fetchMe: async () => {
    const token = Cookies.get("token");
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const me = await getMe();
      set({ user: me.data, loading: false });
    } catch {
      Cookies.remove("token");
      set({ user: null, loading: false });
    }
  },
}));
