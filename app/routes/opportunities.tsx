// Opportunities.tsx
import { useLoaderData, Link } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
// routes/Opportunities.tsx
import { getOpportunities } from "../utils/ProyectAntivirusFrontend";

import OpportunityCard  from  "./../components/OpportunityCard";
 
// Definimos la interfaz de Opportunity
interface Opportunity {
  id: number;
  name: string;
  // Agrega más propiedades según sea necesario
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Oportunidades</h1>
      <ul>
        {opportunities.map((opportunity) => (
          <li key={opportunity.id} className="mt-2">
            <Link to={`/opportunities/${opportunity.id}`} className="text-blue-600">
              {opportunity.name}
            </Link>
            <OpportunityCard opportunity={opportunity} title={""} description={""} link={""} />
          </li>
        ))}
      </ul>
    </div>
  );
}
