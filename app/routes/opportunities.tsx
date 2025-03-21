import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useState } from "react";
import { getOpportunities } from "../utils/ProyectAntivirusFrontend";
import OpportunityCard from "../components/molecules/OpportunityCard";
import OpportunityFilter from "../components/molecules/OpportunityFilter";
import ButtonWhatsapp from "../components/organisms/button-whatsapp";
import HeaderGeneral from "~/components/organisms/header-general/header-general";
import FooterGeneral from "~/components/organisms/footer-general/footer-general";
import ButtonDonateWompi from "~/components/organisms/button-donate-wompi/button-donate-wompi";
import ButtonGoUp from "~/components/organisms/button-go-up/button-go-up";

// Definimos la interfaz de Opportunity
interface Opportunity {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  institutionId: number;
  institutionName: string;
  opportunityTypeId: number;
  opportunityTypeName: string;
  sectorId: number;
  sectorName: string;
  localityId: number;
  localityCity: string;
  requirements: string;
  benefits: string;
  modality: string;
  publicationDate: string;
  expirationDate: string;
  createdAt: string;
  ownerId: number;
  status: string;
  price: number;
  discountPrice: number;
  rating: number;
  ratingCount: number;  
  stock: boolean;
  freeShipping: boolean;
}

// Definimos el tipo de datos que el loader devolverá
type LoaderData = {
  opportunities: Opportunity[];
};

// Implementamos el loader
export const loader: LoaderFunction = async () => {
  const opportunities = await getOpportunities();
  console.log(opportunities);
  return json<LoaderData>({ opportunities });
};

// Componente principal
export default function Opportunities() {
  const { opportunities } = useLoaderData<LoaderData>();
  const [filters, setFilters] = useState<Partial<Opportunity>>({
    title: "",
    localityCity: "",
    categoryId: undefined,
    status: "",
  });

  // Manejo de filtros
  const handleFilterChange = (newFilters: Partial<Opportunity>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Filtrar oportunidades basadas en los filtros aplicados
  const filteredOpportunities = opportunities.filter((opportunity) => {
    return (
      (!filters.title || opportunity.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.description || opportunity.description.toLowerCase().includes(filters.description.toLowerCase())) &&
      (!filters.localityCity || opportunity.localityCity.toLowerCase().includes(filters.localityCity.toLowerCase())) &&
      (!filters.categoryId || opportunity.categoryId === filters.categoryId) &&
      (!filters.institutionId || opportunity.institutionId === filters.institutionId) &&
      (!filters.status || opportunity.status === filters.status) &&
      (!filters.expirationDate || new Date(opportunity.expirationDate) >= new Date(filters.expirationDate)) &&
      (!filters.price || opportunity.price <= filters.price)
    );
  });  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header al inicio de la página */}
      <HeaderGeneral />

      <div className="flex-grow flex flex-col md:flex-row p-6 gap-4">
        {/* Filtro fijo en móviles y sticky en pantallas grandes */}
        <div className="w-full md:w-1/4 p-4 bg-white shadow-lg rounded-xl md:sticky md:top-4 h-fit">
          <OpportunityFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Contenedor de tarjetas con ajuste responsivo */}
        <div className="w-full md:w-3/4 p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 justify-center">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          ) : (
            <p className="text-gray-600">No se encontraron oportunidades.</p>
          )}
        </div>
      </div>

      {/* Footer al final de la página */}
      <ButtonWhatsapp />
      <ButtonDonateWompi />
      <ButtonGoUp />
      <FooterGeneral />
    </div>
  );
}
