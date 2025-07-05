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

interface ServiceType {
  id?: number;
  name: string;
  description?: string;
}

const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

export default function AdminServiceTypes() {
  const [types, setTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ServiceType | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );

  const fetchServiceTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/serviceTypes`, {
        credentials: "include",
      });
      const data = await res.json();
      setTypes(data);
    } catch (err) {
      console.error("Error al cargar tipos de servicio", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    const method = selected.id ? "PUT" : "POST";
    const url = selected.id
      ? `${API_URL}/api/serviceTypes/${selected.id}`
      : "${API_URL}/api/serviceTypes";

    const body = JSON.stringify(selected);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });
      if (res.ok) {
        fetchServiceTypes();
        setSelected(null);
      } else {
        const errData = await res.json();
        console.error("Error al guardar tipo de servicio", errData);
      }
    } catch (err) {
      console.error("Error en la petición", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API_URL}/api/serviceTypes/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteId(null);
      fetchServiceTypes();
    } catch (err) {
      console.error("Error al eliminar tipo de servicio", err);
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const filtered = types.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="text-4xl">Cargando tipos de servicio...</p>
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
            <table className="min-w-full bg-white rounded shadow dark:bg-neutral-600  ">
              <thead className="bg-gray-100">
                <tr className="dark:text-black">
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Descripción</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2 text-left">{t.name}</td>
                    <td className="p-2 text-left">
                      {t.description
                        ? t.description.length > 60
                          ? `${t.description.slice(0, 60)}...`
                          : t.description
                        : "Sin descripción"}
                    </td>
                    <td className="p-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(t)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(t.id!)}
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
              {selected?.id ? "Editar Tipo" : "Nuevo Tipo de Servicio"}
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
                rows={4}
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
        <DialogContent aria-describedby="delete-type-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar tipo de servicio?</DialogTitle>
            <DialogDescription id="delete-type-description">
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
