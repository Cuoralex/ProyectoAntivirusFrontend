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

interface Opportunity {
  id?: number;
  title: string;
  description: string;
  modality: string;
  status: string;
  publicationDate?: string;
  expirationDate: string;
  institutionId: number;
  opportunityTypeId: number;
  localityId: number;
  localityCity?: string;
  sectorId: number;
  requirements?: string;
  benefits?: string;
}

interface SelectItem {
  id: number;
  name: string;
}

interface Locality {
  id: number;
  city: string;
  state: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const [sectors, setSectors] = useState<SelectItem[]>([]);
  const [institutions, setInstitutions] = useState<SelectItem[]>([]);
  const [opportunityTypes, setOpportunityTypes] = useState<SelectItem[]>([]);

  useEffect(() => {
    const newPageSize = Number(searchParams.get("pageSize")) || 10;
    setPageSize(newPageSize);
  }, [searchParams]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/opportunity`, {
        credentials: "include",
      });
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error("Error al cargar oportunidades", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectData = async () => {
    const fetchList = async (url: string) => {
      const res = await fetch(url, { credentials: "include" });
      return res.ok ? res.json() : [];
    };
    setSectors(await fetchList(`${API_URL}/api/v1/sectors`));
    setInstitutions(
      await fetchList(`${API_URL}/api/v1/institution`)
    );
    setOpportunityTypes(
      await fetchList(`${API_URL}/api/v1/opportunity-type`)
    );
  };

  const [localities, setLocalities] = useState<SelectItem[]>([]);

  const fetchLocalities = async () => {
    const res = await fetch(`${API_URL}/api/v1/localities`, {
      credentials: "include",
    });
    const data: Locality[] = await res.json();
    const formatted: SelectItem[] = data.map((l) => ({
      id: l.id,
      name: `${l.city} - ${l.state}`,
    }));
    setLocalities(formatted);
  };

  const [deleteOpportunityId, setDeleteOpportunityId] = useState<number | null>(
    null
  );

  const confirmDeleteOpportunity = async () => {
    if (!deleteOpportunityId) return;
    try {
      await fetch(
        `${API_URL}/api/v1/opportunity/${deleteOpportunityId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      setDeleteOpportunityId(null);
      fetchOpportunities();
    } catch (err) {
      console.error("Error al eliminar oportunidad", err);
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    const method = selected.id ? "PUT" : "POST";
    const url = selected.id
      ? `${API_URL}/api/v1/opportunity/${selected.id}`
      : "${API_URL}/api/v1/opportunity";

    const expirationDateUtc = selected.expirationDate
      ? new Date(selected.expirationDate).toISOString()
      : "";

    const body = JSON.stringify({
      ...selected,
      expirationDate: expirationDateUtc,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });
      if (res.ok) {
        fetchOpportunities();
        setSelected(null);
      } else {
        console.error("Error al guardar oportunidad");
      }
    } catch (err) {
      console.error("Error en la petición", err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchSelectData();
    fetchLocalities();
  }, []);

  const filtered = opportunities.filter((o) =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="text-4xl">Cargando oportunidades...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() =>
                setSelected({
                  title: "",
                  description: "",
                  modality: "",
                  status: "abierta",
                  expirationDate: "",
                  institutionId: 0,
                  localityId: 0,
                  localityCity: "",
                  opportunityTypeId: 0,
                  sectorId: 0,
                  requirements: "",
                  benefits: "",
                })
              }
              className="flex gap-2 items-center"
            >
              <Plus size={18} /> Nueva
            </Button>
            <Input
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2"
            />
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow dark:bg-neutral-600">
              <thead className="bg-gray-100">
                <tr className="dark:text-black">
                  <th className="p-2 text-left">Título</th>
                  <th className="p-2">Institución</th>
                  <th className="p-2">Tipo</th>
                  <th className="p-2">Localidad</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2">Publicación</th>
                  <th className="p-2">Expiración</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-2 text-left">{o.title}</td>
                    <td className="p-2">{o.institutionId}</td>
                    <td className="p-2">{o.opportunityTypeId}</td>
                    <td className="p-2">{o.localityCity}</td>
                    <td className="p-2">{o.status}</td>
                    <td className="p-2">{o.publicationDate?.split("T")[0]}</td>
                    <td className="p-2">{o.expirationDate?.split("T")[0]}</td>
                    <td className="p-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(o)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteOpportunityId(o.id!)}
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
              {selected?.id ? "Editar Oportunidad" : "Nueva Oportunidad"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
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
                name="description"
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
              <Label htmlFor="sector">Sector</Label>
              <select
                id="sector"
                name="sector"
                value={selected?.sectorId || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    sectorId: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value={0}>Seleccionar sector</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="institution">Institución</Label>
              <select
                id="institution"
                name="institution"
                value={selected?.institutionId || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    institutionId: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value={0}>Seleccionar institución</option>
                {institutions.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="opportunityType">Tipo de Oportunidad</Label>
              <select
                id="opportunityType"
                name="opportunityType"
                value={selected?.opportunityTypeId || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    opportunityTypeId: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value={0}>Seleccionar tipo</option>
                {opportunityTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="locality">Localidad</Label>
              <select
                id="locality"
                name="locality"
                value={selected?.localityId || 0}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    localityId: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value={0}>Seleccionar localidad</option>
                {localities.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="modality">Modalidad</Label>
              <Input
                id="modality"
                name="modality"
                value={selected?.modality || ""}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    modality: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                name="status"
                value={selected?.status || "abierta"}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev!, status: e.target.value }))
                }
                className="w-full border border-gray-300 rounded p-2 bg-white"
              >
                <option value="abierta">Abierta</option>
                <option value="cerrada">Cerrada</option>
              </select>
            </div>
            <div>
              <Label htmlFor="expirationDate">Fecha de expiración</Label>
              <Input
                id="expirationDate"
                name="expirationDate"
                type="date"
                value={selected?.expirationDate?.split("T")[0] || ""}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    expirationDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requisitos</Label>
              <Input
                id="requirements"
                name="requirements"
                value={selected?.requirements || ""}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    requirements: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="benefits">Beneficios</Label>
              <Input
                id="benefits"
                name="benefits"
                value={selected?.benefits || ""}
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev!,
                    benefits: e.target.value,
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
      <Dialog
        open={!!deleteOpportunityId}
        onOpenChange={() => setDeleteOpportunityId(null)}
      >
        <DialogContent aria-describedby="delete-opportunity-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar oportunidad?</DialogTitle>
            <DialogDescription id="delete-opportunity-description">
              Esta acción es irreversible. ¿Deseas continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setDeleteOpportunityId(null)}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button onClick={confirmDeleteOpportunity} variant="destructive">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
