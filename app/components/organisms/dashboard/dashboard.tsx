import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Home, BarChart2, Settings } from "lucide-react";
import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 md:col-span-1 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded"
          >
            <Home size={20} /> Home
          </Link>
          <Link
            to="/stats"
            className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded"
          >
            <BarChart2 size={20} /> Estadísticas
          </Link>
          <Link
            to="/config"
            className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded"
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="col-span-4 p-6 space-y-6">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">Usuarios</h3>
              <p className="text-2xl">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">Visitas</h3>
              <p className="text-2xl">2,345</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">Tickets activos</h3>
              <p className="text-2xl">17</p>
            </CardContent>
          </Card>
        </div>
        <Button className="mt-4">Ver más detalles</Button>
      </main>
    </div>
  );
}
