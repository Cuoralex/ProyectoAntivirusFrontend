import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useState } from "react";
import { getOpportunities } from "../utils/ProyectAntivirusFrontend";
import OpportunityCard from "../components/molecules/OpportunityCard";
import OpportunityFilter from "../components/molecules/OpportunityFilter";
import Bottom from "../components/organisms/bottom";
import HeaderGeneral from "~/components/organisms/header-general/header-general";
import FooterGeneral from "~/components/organisms/footer-general/footer-general";
import ButtonDonateWompi from "~/components/organisms/button-donate-wompi/button-donate-wompi";
import ButtonGoUp from "~/components/organisms/button-go-up/button-go-up";

// Definimos la interfaz de Opportunity
interface Opportunity {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  institutionsId: number;
  sectorsId: number;
  location: string;
  requirements: string;
  benefits: string;
  createdAt: string;
  expiration: string;
  ownerId: number;
  status: string;
  price: number;
  discountPrice: number;
  rating: number;
  stock: boolean;
  freeShipping: boolean;
  opportunity_TypesId: number;
}

// Definimos el tipo de datos que el loader devolverá
type LoaderData = {
  opportunities: Opportunity[];
};

// Implementamos el loader
export const loader: LoaderFunction = async () => {
  const opportunities = await getOpportunities();
  return json<LoaderData>({ opportunities });
};

// Componente principal
export default function Opportunities() {
  const { opportunities } = useLoaderData<LoaderData>();
  const [filters, setFilters] = useState<Partial<Opportunity>>({
    name: "",
    location: "",
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
      (!filters.name ||
        opportunity.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.location ||
        opportunity.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.categoryId || opportunity.categoryId === filters.categoryId) &&
      (!filters.institutionsId || opportunity.institutionsId === filters.institutionsId) &&
      (!filters.status || opportunity.status === filters.status) &&
      (!filters.expiration || new Date(opportunity.expiration) >= new Date(filters.expiration)) &&
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
      <Bottom />
      <ButtonDonateWompi />
      <ButtonGoUp />
      <FooterGeneral />
    </div>
  );
}
