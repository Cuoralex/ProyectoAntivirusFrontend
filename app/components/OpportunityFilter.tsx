import React, { ChangeEvent, useState } from "react";

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

interface OpportunityFilterProps {
  opportunity: Opportunity;
  onFilterChange: (filters: Partial<Opportunity>) => void;
}

const OpportunityFilter: React.FC<OpportunityFilterProps> = ({ opportunity, onFilterChange }) => {
  const [filters, setFilters] = useState<Partial<Opportunity>>({
    name: "",
    location: opportunity.location || "",
    categoryId: opportunity.categoryId || undefined,
    status: opportunity.status || "",
  });

  function handleFilterChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-lg">
        <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
        <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
        <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <h1 className="block text-gray-700 font-bold text-xl text-center">FILTROS DE OPORTUNIDADES</h1>

          <form className="mt-5">
            <div className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Buscar por palabra clave"
                value={filters.name}
                onChange={handleFilterChange}
                className="w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 px-3"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="location"
                placeholder="Ubicación"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 px-3"
              />
            </div>

            <div className="mt-4">
              <select
                name="categoryId"
                value={filters.categoryId ?? ""}
                onChange={handleFilterChange}
                className="w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 px-3"
              >
                <option value="">Seleccione una categoría</option>
                <option value="1">Educativas</option>
                <option value="2">Económicas</option>
                <option value="3">Laborales</option>
              </select>
            </div>

            <div className="mt-4">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 px-3"
              >
                <option value="">Estado de Disponibilidad</option>
                <option value="abierta">Abierta</option>
                <option value="proxima apertura">Próxima Apertura</option>
                <option value="cerrada">Cerrada</option>
              </select>
            </div>

            <div className="mt-6">
              <button
                className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                type="button"
                onClick={() => onFilterChange(filters)}
              >
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilter;
