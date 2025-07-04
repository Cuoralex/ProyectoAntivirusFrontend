const API_URL = "https://antivirus-backend-gcacfcfxbqfhgzdj.centralus-01.azurewebsites.net/api/v1";

export async function getOpportunities() {
  const response = await fetch(`${API_URL}/opportunity`);
  if (!response.ok) {
    throw new Error("Error al obtener oportunidades");
  }
  return response.json();
}

export async function getOpportunityById(id) {
  const response = await fetch(`${API_URL}/opportunity/${id}`);
  if (!response.ok) {
    throw new Error("Oportunidad no encontrada");
  }
  return response.json();
}

export async function createOpportunity(data) {
  const response = await fetch(`${API_URL}/opportunity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al crear oportunidad");
  }
  return response.json();
}

export async function updateOpportunity(id, data) {
  const response = await fetch(`${API_URL}/opportunity/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar oportunidad");
  }
}

export async function deleteOpportunity(id) {
  const response = await fetch(`${API_URL}/opportunity/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar oportunidad");
  }
}
