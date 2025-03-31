export interface OurServiceResponse {
  id: number;
  isActive: true;
  serviceTypeId: number;
  serviceTypeName: string;
  title: string;
  description: string;
  image: string;
}

const getAllOurServices = async (): Promise<OurServiceResponse[]> => {
  try {
    const response = await fetch("http://localhost:5055/api/v1/services");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getAllOurServices };
