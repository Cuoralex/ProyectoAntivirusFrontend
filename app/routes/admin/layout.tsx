// routes/admin/layout.tsx
import { Outlet, Link } from "@remix-run/react";
import { Home, Users, PlusSquare, Briefcase, Settings } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-screen">
      <aside className="col-span-1 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin"
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
            to="/admin/oportunidades"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <Briefcase size={20} /> Oportunidades
          </Link>
          <Link
            to="/admin/servicios"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <PlusSquare size={20} /> Servicios
          </Link>
          <Link
            to="/admin/config"
            className="hover:bg-gray-800 p-2 rounded flex gap-2 items-center"
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </aside>
      <main className="col-span-4 p-6">
        <Outlet />
      </main>
    </div>
  );
}
