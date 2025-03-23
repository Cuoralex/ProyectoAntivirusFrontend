/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent } from "react";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  institutionId: number;
  institutionName: string;
  institutionsImage: string;
  institutionInformation: string;
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

interface OpportunityFilterProps {
  onFilterChange: (newfilters: Partial<Opportunity>) => void;
}

const OpportunityFilter: React.FC<OpportunityFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Partial<Opportunity>>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  function handleFilterChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: type === "checkbox" ? checked : value,
      };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  }

  function resetFilters() {
    setFilters({});
    onFilterChange({});
  }

  function toggleSection(section: string) {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <div className="w-full bg-gray-100 p-6 flex flex-col">
      <h2 className="text-center text-3xl font-bold text-white bg-gray-700 py-2">Filtro Oportunidades</h2>

      <div className="bg-white p-4 rounded shadow-md">
        <form>
          {/* Oportunidad */}
          <div>
            <label className="block text-gray-700 font-medium">Tipo de Oportunidad</label>
            <select name="categoryId" onChange={handleFilterChange} className="w-full border p-2 rounded">
              <option value="">Seleccione una categoría</option>
              <option value="1">Académica</option>
              <option value="2">Becas/Ayudas</option>
              <option value="3">Cursos</option>
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-gray-700 font-medium">Ubicación</label>
            <select name="location" onChange={handleFilterChange} className="w-full border p-2 rounded">
              <option value="">Seleccione ubicación</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-gray-700 font-medium">Modalidad</label>
            <div className="flex gap-4">
              {['presencial', 'virtual', 'hibrida'].map((mod) => (
                <label key={mod} className="flex items-center">
                  <input type="checkbox" name="status" value={mod} onChange={handleFilterChange} />
                  <span className="ml-2 capitalize">{mod}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtros Avanzados */}
          <div>
            <button type="button" onClick={() => toggleSection('advanced')} className="text-blue-600 underline mt-2">
              {expanded.advanced ? "Ocultar filtros avanzados" : "Mostrar filtros avanzados"}
            </button>
            {expanded.advanced && (
              <div className="mt-4">
                {/* Nivel Educativo */}
                <label className="block text-gray-700 font-medium">Nivel Educativo</label>
                <div className="flex gap-4">
                  {['Pregrado', 'Posgrado', 'Técnico', 'Tecnológico'].map((nivel) => (
                    <label key={nivel} className="flex items-center">
                      <input type="checkbox" name="nivel" value={nivel} onChange={handleFilterChange} />
                      <span className="ml-2 capitalize">{nivel}</span>
                    </label>
                  ))}
                </div>

                {/* Rango de Fechas */}
                <label className="block text-gray-700 font-medium mt-4">Fecha de inscripción/cierre</label>
                <input type="date" name="createdAt" onChange={handleFilterChange} className="w-full border p-2 rounded" />
                <input type="date" name="expiration" onChange={handleFilterChange} className="w-full border p-2 rounded mt-2" />
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end mt-4">
            <button type="button" className="mr-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={resetFilters}>
              Restablecer
            </button>
            <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => onFilterChange(filters)}>
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityFilter;
