import Image from "next/image"
import { 
  Currency, LayoutDashboard, Settings, LogOut, Goal, Home, Menu, X 
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
  openMenu: boolean
  setOpenMenu: (value: boolean) => void
}

export const SidebarItems = ({ 
  handleLogout, theme, setTheme, openMenu, setOpenMenu
}: SidebaritemsProps) => {
  const pathname = usePathname()

  return (
    <> 
      {!openMenu &&
        <button
          onClick={() => setOpenMenu(!openMenu)} 
          className={clsx(
            'lg:hidden fixed top-4 right-4 z-50 bg-gray-300 text-gray-700 p-2 rounded-lg shadow-lg',
            'dark:bg-cardDark dark:text-white dark:hover:bg-gray-900/50 hover:bg-gray-400',
            'transition-all duration-200'
          )}>
          <Menu size={32} height={32} />
        </button>}

      <aside
        className={clsx(
          "z-50 fixed top-0 left-0 min-h-screen p-4 bg-sidebar-light dark:bg-sidebar-dark text-white transition-all",
          "w-64 lg:w-60 lg:relative", // Desktop: Fixo na lateral
          openMenu ? "translate-x-0 duration-300" : "-translate-x-full",
          "lg:translate-x-0 lg:block" // Sempre visível no desktop
        )}>

        <button 
          onClick={() => setOpenMenu(false)} 
          className="z-10 lg:hidden absolute top-4 right-4 text-white hover:text-gray-200 transition duration-150"
        >
          <X size={32} className="" />
        </button>

        <div className="relative flex items-center justify-center my-4">
          <Image className="" height={124} width={124} alt="Logo" src="/ms-logo.png" />
        </div>
        
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={clsx(
                'flex items-center font-medium gap-3 p-2 rounded-lg transition',
                pathname === item.path
                  ? "bg-gray-100 text-gray-800 dark:text-gray-700"
                  : "hover:bg-gray-100 hover:text-gray-800"
              )}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}

          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition"
          >
            <LogOut size={24} />
            <span className="text-sm">Sair</span>
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={clsx(
              "p-2 rounded-lg bg-gray-100 hover:bg-gray-300 hover:text-black text-gray-800",
              "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white",
              "flex items-center justify-center gap-2 transition duration-200"
            )}
          >
            {theme === "dark" 
              ? <span>☀️ Light Mode</span>
              : <span>🌙 Dark Mode</span>
            }
          </button>
        </nav>
      </aside>

      {openMenu && (
        <div 
          className="z-40 fixed inset-0 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setOpenMenu(false)}
        />
      )}
    </>
  )
}