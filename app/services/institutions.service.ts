const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

export interface InstitutionResponse {
  id: number;
  name: string;
  image: string;
  information: string;
}

const getAllInstitutions = async (): Promise<InstitutionResponse[]> => {
  if (!API_URL) {
    throw new Error("API_URL no está definida. Verifica el archivo .env");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/institution`);

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato de respuesta inválido. Se esperaba un arreglo.");
    }

    return data as InstitutionResponse[];
  } catch (error) {
    console.error("Error al obtener instituciones:", error);
    throw error;
  }
};

export { getAllInstitutions };
