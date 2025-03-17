import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((
  set: (state: Partial<AuthStore>) => void
) => ({
  user: null,

  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true })
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `ftoken=${data.token}; path=/; Secure; HttpOnly`;
      set({ user: data.user, loading: false });
    } else {
      throw new Error("Credenciais inválidas");
    }
  },

  logout: async () => {
    set({ loading: true })
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    set({ user: null, loading: false });
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const response = await fetch("/api/auth/me", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        set({ user: data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      set({ user: null, loading: false });
    }
  },
}));
