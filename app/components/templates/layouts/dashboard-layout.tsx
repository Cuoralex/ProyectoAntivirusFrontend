// components/templates/layouts/dashboard-layout.tsx
import { Outlet } from "@remix-run/react";
import { Home, Users, Settings } from "lucide-react";
import { Link } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div className="flex grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 fixed h-screen w-72 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin/index"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <Home size={20} /> Inicio
          </Link>
          <Link
            to="/admin/users"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <Users size={20} /> Usuarios
          </Link>
          <Link
            to="/admin/config"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="col-span-4 p-6 ml-72 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
