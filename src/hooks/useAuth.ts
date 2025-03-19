import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export const useAuth = () => {
  const { checkAuth, loading } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { loading }
}
