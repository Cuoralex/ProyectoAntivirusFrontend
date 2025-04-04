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
import { Switch } from "@headlessui/react";
import { useSearchParams } from "@remix-run/react";

interface Service {
  id?: number;
  isActive: boolean;
  serviceTypeId: number;
  serviceTypeName?: string;
  title: string;
  description: string;
  image: string;
}

interface ServiceType {
  id: number;
  name: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5055/api/v1/services", {
        credentials: "include",
      });
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Error al cargar servicios", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const res = await fetch("http://localhost:5055/api/serviceTypes", {
        credentials: "include",
      });
      const data = await res.json();
      setServiceTypes(data);
    } catch (err) {
      console.error("Error al cargar tipos de servicio", err);
    }
  };

  const toggleServiceStatus = async (id: number, current: boolean) => {
    try {
      await fetch(`http://localhost:5055/api/v1/services/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isActive: !current }),
      });
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: !current } : s))
      );
    } catch (err) {
      console.error("Error al cambiar estado", err);
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    const method = selected.id ? "PUT" : "POST";
    const url = selected.id
      ? `http://localhost:5055/api/v1/services/${selected.id}`
      : "http://localhost:5055/api/v1/services";

    const body = JSON.stringify({
      serviceTypeId: selected.serviceTypeId,
      title: selected.title,
      description: selected.description,
      image: selected.image,
      isActive: selected.isActive,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });
      if (res.ok) {
        fetchServices();
        setSelected(null);
      } else {
        const errData = await res.json();
        console.error("Error al guardar servicio", errData);
      }
    } catch (err) {
      console.error("Error en la petición", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`http://localhost:5055/api/v1/services/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteId(null);
      fetchServices();
    } catch (err) {
      console.error("Error al eliminar servicio", err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
  }, []);

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="text-4xl">Cargando servicios...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() =>
                setSelected({
                  title: "",
                  description: "",
                  image: "",
                  serviceTypeId: 0,
                  isActive: true,
                })
              }
              className="flex gap-2 items-center"
            >
              <Plus size={18} /> Nuevo
            </Button>
            <Input
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2"
            />
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Título</th>
                  <th className="p-2 text-left">Tipo</th>
                  <th className="p-2 text-left">Estado</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2 text-left">{s.title}</td>
                    <td className="p-2 text-left">{s.serviceTypeName}</td>
                    <td className="p-2 text-left">
                      <Switch
                        checked={s.isActive}
                        onChange={() => toggleServiceStatus(s.id!, s.isActive)}
                        className={`${
                          s.isActive ? "bg-green-500" : "bg-gray-300"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            s.isActive ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
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
        <DialogContent className="max-h-[90vh] overflow-auto max-w-[40rem]">
          <DialogHeader>
            <DialogTitle>
              {selected?.id ? "Editar Servicio" : "Nuevo Servicio"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selected?.title || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, title: e.target.value }))
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

            <div>
              <Label htmlFor="image">Imagen (URL)</Label>
              <Input
                id="image"
                value={selected?.image || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, image: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="serviceType">Tipo de Servicio</Label>
              <select
                id="serviceType"
                value={selected?.serviceTypeId || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    serviceTypeId: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value={0}>Seleccionar tipo</option>
                {serviceTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="isActive">Activo</Label>
              <Switch
                checked={selected?.isActive ?? true}
                onChange={() =>
                  setSelected((prev) => ({
                    ...prev!,
                    isActive: !prev!.isActive,
                  }))
                }
                className={`${
                  selected?.isActive ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    selected?.isActive ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
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
        <DialogContent aria-describedby="delete-service-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar servicio?</DialogTitle>
            <DialogDescription id="delete-service-description">
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
