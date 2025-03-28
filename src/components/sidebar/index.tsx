"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useTheme } from "@/hooks/useTheme";
import { useQueryClient } from "@tanstack/react-query";
import { SidebarItems } from "./SidebarItems";

export default function Sidebar() {
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()
  const { logout } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
    />
  );
}
