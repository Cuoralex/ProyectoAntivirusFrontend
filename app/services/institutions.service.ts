const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

console.log("URL de la API:", API_URL);

export interface InstitutionResponse {
  id: number;
  name: string;
  image: string;
  information: string;
}

const getAllInstitutions = async (): Promise<InstitutionResponse[]> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/institution`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getAllInstitutions };
