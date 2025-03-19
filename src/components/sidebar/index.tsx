"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Currency, LayoutDashboard, Settings, FileText, LogOut, Goal, Home } from "lucide-react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  { name: "Home", icon: <Home size={24} />, path: "/home" },
  { name: "Dashboard", icon: <LayoutDashboard size={24} />, path: "/dashboard" },
  { name: "Transações", icon: <Currency size={24} />, path: "/transactions" },
  { name: "Metas", icon: <Goal size={24} />, path: "/metas" },
  { name: "Configurações", icon: <Settings size={24} />, path: "/settings" },
  { name: "Relatórios", icon: <FileText size={24} />, path: "/reports" },
];

export default function Sidebar() {
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()
  const { logout } = useAuthStore()
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
    <aside
      className={`sticky left-0 top-0 h-screen p-4 bg-sidebar-light dark:bg-sidebar-dark text-white transition-all ${
        isDesktop ? "w-56" : "w-16"
      }`}>

      <div className="relative flex items-center justify-center my-4">
        <Image className="" height={124} width={124} alt="Logo" src="/ms-logo.png" />
      </div>
      
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-black transition"
          >
            {item.icon}
            {isDesktop && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-black transition"
        >
          <LogOut size={24} />
          {isDesktop && <span className="text-sm">Sair</span>}
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={clsx(
            "p-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:text-black text-gray-800",
            "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white",
            "flex items-center justify-center gap-2 transition duration-200"
          )}
        >
          {theme === "dark" ? (
            <>
              <span>☀️</span>
              {isDesktop && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <span>🌙</span>
              {isDesktop && <span>Dark Mode</span>}
            </>
          )}
        </button>
      </nav>
    </aside>
  );
}
