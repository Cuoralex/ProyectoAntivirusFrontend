import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "@headlessui/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useMatches, useSearchParams } from "@remix-run/react";
import Pagination from "../components/organisms/pagination";

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

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const currentUserEmail = useCurrentUserEmail();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 14
  );
  useEffect(() => {
    const newPageSize = Number(searchParams.get("pageSize")) || 14;
    setPageSize(newPageSize);
  }, [searchParams]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5055/api/v1/user", {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id: number, current: boolean) => {
    try {
      await fetch(`http://localhost:5055/api/v1/user/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isActive: !current }),
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: !current } : u))
      );
    } catch (err) {
      console.error("Error al cambiar estado", err);
    }
  };

  const confirmDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      await fetch(`http://localhost:5055/api/v1/user/${deleteUserId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  const saveUserEdits = async () => {
    if (!editUser) return;
    try {
      await fetch(`http://localhost:5055/api/v1/user/${editUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editUser),
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error al editar usuario", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    if (a.email === currentUserEmail) return -1;
    if (b.email === currentUserEmail) return 1;
    return 0;
  });
  const filteredUsers = sortedUsers.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term) ||
      user.birthdate?.toLowerCase().includes(term)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {loading ? (
        <p className="text-4xl">Cargando usuarios...</p>
      ) : (
        <>
          <div className="mb-2">
            <Input
              placeholder="Buscar usuario por cualquier campo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2"
            />
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white dark:bg-neutral-600  shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-100 text-left dark:text-black">
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Teléfono</th>
                  <th className="p-2">Rol</th>
                  <th className="p-2">Nacimiento</th>
                  <th className="p-2">Activo</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => {
                  const isCurrentUser = user.email === currentUserEmail;
                  return (
                    <tr key={user.id} className="border-t">
                      <td className="p-2">{user.fullName}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.phone ?? "-"}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        {user.birthdate?.split("T")[0] ?? ""}
                      </td>
                      <td className="p-2">
                        {!isCurrentUser && (
                          <Switch
                            checked={user.isActive}
                            onChange={() =>
                              toggleUserStatus(user.id, user.isActive)
                            }
                            className={`${
                              user.isActive ? "bg-green-500" : "bg-gray-300"
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                          >
                            <span
                              className={`${
                                user.isActive
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                          </Switch>
                        )}
                      </td>
                      <td className="p-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditUser(user)}
                        >
                          <Pencil size={16} />
                        </Button>
                        {!isCurrentUser && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={users.length}
            pageSize={pageSize}
            onPageChange={(page: number) => {
              setCurrentPage(page);
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set("page", String(page));
                return next;
              });
            }}
          />
        </>
      )}

      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent aria-describedby="edit-user-description">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription id="edit-user-description">
              Modifica los campos y guarda los cambios para este usuario.
            </DialogDescription>
          </DialogHeader>
          {editUser && (
            <form className="space-y-4">
              <div>
                <Label>Nombre completo</Label>
                <Input
                  value={editUser.fullName}
                  onChange={(e) =>
                    setEditUser((prev) => ({
                      ...prev!,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev!, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={editUser.phone ?? ""}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev!, phone: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Rol</Label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev!, role: e.target.value }))
                  }
                >
                  <option value="admin">Administrador</option>
                  <option value="user">Estudiante</option>
                </select>
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input
                  type="date"
                  value={editUser.birthdate?.split("T")[0] ?? ""}
                  onChange={(e) =>
                    setEditUser((prev) => ({
                      ...prev!,
                      birthdate: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
          )}
          <DialogFooter>
            <Button onClick={() => setEditUser(null)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={saveUserEdits}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <DialogContent aria-describedby="delete-user-description">
          <DialogHeader>
            <DialogTitle>¿Eliminar usuario?</DialogTitle>
            <DialogDescription id="delete-user-description">
              Esta acción es irreversible. ¿Deseas continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleteUserId(null)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={confirmDeleteUser} variant="destructive">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
