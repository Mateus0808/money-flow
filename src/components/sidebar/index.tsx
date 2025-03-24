"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { useQueryClient } from "@tanstack/react-query";
import { SidebarItems } from "./SidebarItems";

export default function Sidebar() {
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()
  const { logout } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const handleLogout = async () => {
    await logout(queryClient)

    router.push('/login')
  }

  return (
    <SidebarItems 
      handleLogout={handleLogout}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
