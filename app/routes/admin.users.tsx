import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "@headlessui/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useMatches } from "@remix-run/react";

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
        method: "PUT",
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Nombre</th>
                <th className="p-2">Email</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Activo</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isCurrentUser = user.email === currentUserEmail;
                return (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.fullName}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
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
                              user.isActive ? "translate-x-6" : "translate-x-1"
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
      )}

      {/* Modal Editar Usuario */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
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
                <Label>Rol</Label>
                <Input
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev!, role: e.target.value }))
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

      {/* Modal Confirmar Eliminación */}
      <Dialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar usuario?</DialogTitle>
          </DialogHeader>
          <p>Esta acción es irreversible. ¿Deseas continuar?</p>
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
