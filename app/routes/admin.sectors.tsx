// Componente AdminSectors.jsx o .tsx
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import Pagination from "../components/organisms/pagination";
import { useSearchParams } from "@remix-run/react";

interface Sector {
  id?: number;
  name: string;
  description?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminSectors() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selected, setSelected] = useState<Sector | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );

  const [loading, setLoading] = useState(true);

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/sectors`, {
        credentials: "include",
      });
      const data = await res.json();
      setSectors(data);
    } catch (err) {
      console.error("Error al cargar sectores", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    const method = selected.id ? "PUT" : "POST";
    const url = selected.id
      ? `${API_URL}/api/v1/sectors/${selected.id}`
      : "${API_URL}/api/v1/sectors";

    const body = JSON.stringify({
      name: selected.name,
      description: selected.description,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });
      if (res.ok) {
        if (selected.id) {
          setSectors((prev) =>
            prev.map((s) =>
              s.id === selected.id
                ? {
                    ...s,
                    name: selected.name,
                    description: selected.description,
                  }
                : s
            )
          );
        } else {
          const newSector = await res.json();
          setSectors((prev) => [...prev, newSector]);
          setCurrentPage(1);
        }
        setSelected(null);
      } else {
        console.error("Error al guardar sector", await res.json());
      }
    } catch (err) {
      console.error("Error en la petición", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API_URL}/api/v1/sectors/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteId(null);
      fetchSectors();
    } catch (err) {
      console.error("Error al eliminar sector", err);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const filtered = sectors.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const newPageSize = Number(searchParams.get("pageSize")) || 10;
    setPageSize(newPageSize);
  }, [searchParams]);

  return (
    <div>
      {loading ? (
        <p className="text-4xl">Cargando sectores...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setSelected({ name: "", description: "" })}
              className="flex gap-2 items-center"
            >
              <Plus size={18} /> Nuevo
            </Button>
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2"
            />
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow dark:bg-neutral-600">
              <thead className="bg-gray-100">
                <tr className="dark:text-black">
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Descripción</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2 text-left">{s.name}</td>
                    <td className="p-2 text-left">
                      {s.description?.length
                        ? s.description
                        : "Sin descripción"}
                    </td>
                    <td className="p-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(s)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(s.id!)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={(page) => {
          setCurrentPage(page);
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", String(page));
            return next;
          });
        }}
      />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selected?.id ? "Editar Sector" : "Nuevo Sector"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={selected?.name || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                rows={3}
                className="w-full border border-gray-300 rounded p-2 bg-white"
                value={selected?.description || ""}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent aria-describedby="delete-sector-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar sector?</DialogTitle>
            <DialogDescription id="delete-sector-description">
              Esta acción es irreversible. ¿Deseas continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleteId(null)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} variant="destructive">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
