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

interface Institution {
  id?: number;
  name: string;
  image: string;
  link: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminInstitutions() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );

  const [selected, setSelected] = useState<Institution | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/institution`, {
        credentials: "include",
      });
      const data = await res.json();
      setInstitutions(data);
    } catch (err) {
      console.error("Error al cargar instituciones", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    const method = selected.id ? "PUT" : "POST";
    const url = selected.id
      ? `${API_URL}/api/v1/institution`
      : "${API_URL}/api/v1/institution";

    const body = JSON.stringify(selected);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });
      if (res.ok) {
        fetchInstitutions();
        setSelected(null);
      } else {
        console.error("Error al guardar institución");
      }
    } catch (err) {
      console.error("Error en la petición", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API_URL}/api/v1/institution/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteId(null);
      fetchInstitutions();
    } catch (err) {
      console.error("Error al eliminar institución", err);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const filtered = institutions.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="text-4xl">Cargando instituciones...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setSelected({ name: "", image: "", link: "" })}
              className="flex gap-2 items-center"
            >
              <Plus size={18} /> Nueva
            </Button>
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2"
            />
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white dark:bg-neutral-600 rounded shadow">
              <thead className="bg-gray-100">
                <tr className="dark:text-black">
                  <th className="p-2 text-left w-1/3">Nombre</th>
                  <th className="p-2 text-left w-1/3">Link</th>
                  <th className="p-2 text-right w-1/3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((i) => (
                  <tr key={i.id} className="border-t">
                    <td className="p-2 text-left w-1/6">{i.name}</td>
                    <td
                      className="p-2 text-left w-1/3 truncate max-w-[250px]"
                      title={i.link}
                    >
                      {i.link}
                    </td>
                    <td className="p-2 text-right w-1/3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelected(i)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(i.id!)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
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
        <DialogContent className="max-h-[90vh] overflow-auto max-w-[40rem]">
          <DialogHeader>
            <DialogTitle>
              {selected?.id ? "Editar Institución" : "Nueva Institución"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={selected?.name || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                name="image"
                value={selected?.image || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, image: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                value={selected?.link || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, link: e.target.value }))
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
        <DialogContent aria-describedby="delete-institution-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar institución?</DialogTitle>
            <DialogDescription id="delete-institution-description">
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
