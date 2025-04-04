import { Menu, X, LogOut, Home, Sun, Moon } from "lucide-react";
import { useNavigate, useMatches } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function HeaderDashboard({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn } = useRootLoaderData() ?? { isLoggedIn: false };

  function useRootLoaderData(): { isLoggedIn: boolean; role: string | null } {
    const matches = useMatches();
    const rootMatch = matches.find((m) => m.id === "root");
    return rootMatch?.data as { isLoggedIn: boolean; role: string | null };
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md flex items-center justify-between px-4 md:px-6 z-50">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="md:hidden focus:outline-none"
        >
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <Home size={20} />
          Ir al inicio
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {isLoggedIn && (
          <button
            onClick={() => navigate("/logout")}
            className="flex items-center gap-1 text-sm hover:text-red-500"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}
