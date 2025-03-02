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
  onFilterChange: (filters: Partial<Opportunity>) => void; // Para pasar los filtros al padre
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
      onFilterChange(updatedFilters); // Enviar filtros al padre
      return updatedFilters;
    });
  }

  return (
    <div className="flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h1 className="block text-gray-700 font-bold mb-4 text-xl text-center">FILTROS DE OPORTUNIDADES</h1>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
            Buscar por palabra clave
          </label>
          <input
            className="w-full border rounded py-2 px-3 text-gray-700"
            name="name"
            id="search"
            type="text"
            placeholder="Ingrese palabras clave"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>

        {/* Ubicación */}
        <div className="mb-4">
          <label htmlFor="block text-gray-700 text-sm font-bold mb-2">Ubicación</label>
          <input
            className="w-full border rounded py-2 px-3 text-gray-700"
            type="text"
            name="location"
            placeholder="Ciudad, Región o País"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="block text-gray-700 text-sm font-bold mb-2">Categoría de Oportunidad</label>
          <select
            className="w-full border rounded py-2 px-3 text-gray-700"
            name="categoryId"
            value={filters.categoryId ?? ""}
            onChange={handleFilterChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="1">Educativas</option>
            <option value="2">Económicas</option>
            <option value="3">Laborales</option>
          </select>
        </div>

        {/* Estado de disponibilidad */}
        <div className="mb-4">
          <label htmlFor="block text-gray-700 text-sm font-bold mb-2">Estado de Disponibilidad</label>
          <select
            className="w-full border rounded py-2 px-3 text-gray-700"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="abierta">Abierta</option>
            <option value="proxima apertura">Próxima Apertura</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => onFilterChange(filters)}
          >
            Aplicar Filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpportunityFilter;
