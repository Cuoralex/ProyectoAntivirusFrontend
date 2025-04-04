import { Link, Outlet, useLocation, useMatches } from "@remix-run/react";
import {
  Home,
  Users,
  Settings,
  Briefcase,
  Building,
  Layers,
  ClipboardList,
  Network,
  FolderCog,
} from "lucide-react";
import { useEffect, useState } from "react";

function useCurrentUserEmail(): string | null {
  const matches = useMatches();
  const root = matches.find((m) => m.id === "root");
  const data = root?.data as { email?: string } | undefined;
  return data?.email ?? null;
}
interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  birthdate: string;
  isActive: boolean;
}

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const currentUserEmail = useCurrentUserEmail();
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5055/api/v1/user", {
          credentials: "include",
        });
        const data: User[] = await res.json();
        const currentUser = data.find((u) => u.email === currentUserEmail);
        setFirstName(currentUser?.fullName.split(" ")[0] ?? null);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      }
    };

    fetchUsers();
  }, [currentUserEmail]);

  return (
    <div className="flex grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 fixed h-screen w-72 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin/index"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/index")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Home size={20} /> Inicio
          </Link>

          <Link
            to="/admin/users"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/users")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Users size={20} /> Usuarios
          </Link>

          <Link
            to="/admin/opportunities"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/opportunities")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Briefcase size={20} /> Oportunidades
          </Link>

          <Link
            to="/admin/institutions"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/institutions")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Building size={20} /> Instituciones
          </Link>

          <Link
            to="/admin/services"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/services")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Layers size={20} /> Servicios
          </Link>

          <Link
            to="/admin/service-types"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/service-types")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <ClipboardList size={20} /> Tipos de Servicio
          </Link>

          <Link
            to="/admin/opportunity-types"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/opportunity-types")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <FolderCog size={20} /> Tipos de Oportunidad
          </Link>

          <Link
            to="/admin/sectors"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/sectors")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Network size={20} /> Sectores
          </Link>

          <Link
            to="/admin/config"
            className={`p-2 rounded flex gap-2 items-center ${
              isActive("/admin/config")
                ? "bg-gray-800 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="col-span-4 p-6 ml-72 flex-1">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">
          Hola {firstName ?? "Usuario"}
        </h1>
        <Outlet />
      </main>
    </div>
  );
}
