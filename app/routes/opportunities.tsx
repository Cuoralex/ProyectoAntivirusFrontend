import { useLoaderData, Link } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useState } from "react";
import { getOpportunities } from "../utils/ProyectAntivirusFrontend";
import OpportunityCard from "./../components/OpportunityCard";
import OpportunityFilter from "./../components/OpportunityFilter";

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
    opportunity_Types: number;
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
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (newFilters: Partial<Opportunity>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...Object.fromEntries(
        Object.entries(newFilters).map(([key, value]) => [key, String(value)])
      ),
    }));
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    return (
      (!filters.search || opportunity.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.tipo || opportunity.categoryId.toString() === filters.tipo) &&
      (!filters.ubicacion || opportunity.location.toLowerCase().includes(filters.ubicacion.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Oportunidades</h1>
      <ul>
        {filteredOpportunities.map((opportunity) => (
          <li key={opportunity.id} className="mt-2">
            <Link to={`/opportunities/${opportunity.id}`} className="text-blue-600">
              {opportunity.name}
            </Link>
            <OpportunityCard opportunity={opportunity} />
            <OpportunityFilter opportunity={opportunity} onFilterChange={handleFilterChange} />
          </li>
        ))}
      </ul>
    </div>
  );
}
