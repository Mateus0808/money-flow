import { ICreateUser, ICreateUserResponse } from "@/types/user";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  message: string
  success: boolean
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (createUser: ICreateUser) => Promise<ICreateUserResponse>
  logout: (queryClient: QueryClient) => Promise<void>;
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
    
    const data = await response.json();

    if (response.ok) {
      set({ user: data.user, loading: false });
      return {
        message: data.message,
        success: true
      }
    } else {
      set({ loading: false })
      return {
        message: data.message,
        success: false
      }
    }
  },

  signup: async ({ name, email, password }: ICreateUser) => {
    set({ loading: true })

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      set({ loading: false });
      return { message: data.message, success: false }
    }

    set({ loading: false })
    return { message: data.message, success: true }
  },

  logout: async (queryClient: QueryClient) => {
    set({ loading: true })

    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });

    queryClient.removeQueries();

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
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
