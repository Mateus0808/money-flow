import Image from "next/image"
import { Currency, LayoutDashboard, Settings, LogOut, Goal, Home } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const menuItems = [
  { name: "Home", icon: <Home size={24} />, path: "/home" },
  { name: "Dashboard", icon: <LayoutDashboard size={24} />, path: "/dashboard" },
  { name: "Transações", icon: <Currency size={24} />, path: "/transactions" },
  { name: "Metas", icon: <Goal size={24} />, path: "/metas" },
  { name: "Configurações", icon: <Settings size={24} />, path: "/settings" },
  // { name: "Relatórios", icon: <FileText size={24} />, path: "/reports" },
];

interface SidebaritemsProps {
  handleLogout: () => void
  theme: string
  setTheme: (newTheme: "light" | "dark") => void
}

export const SidebarItems = ({ handleLogout, theme, setTheme }: SidebaritemsProps) => {
  return (
    <aside
      className={clsx(
        'sticky left-0 top-0 h-screen p-4 bg-sidebar-light dark:bg-sidebar-dark text-white transition-all',
        'w-16 md:w-56'
      )}>

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
            <span className="hidden md:block text-sm">{item.name}</span>
          </Link>
        ))}

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-black transition"
        >
          <LogOut size={24} />
          <span className="hidden md:block text-sm">Sair</span>
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
              <span className="hidden md:block">Light Mode</span>
            </>
          ) : (
            <>
              <span>🌙</span>
              <span className="hidden md:block">Dark Mode</span>
            </>
          )}
        </button>
      </nav>
    </aside>
  )
}