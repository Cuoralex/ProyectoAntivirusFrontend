/* eslint-disable jsx-a11y/label-has-associated-control */
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
  opportunity: Partial<Opportunity>;
  onFilterChange: (filters: Partial<Opportunity>) => void;
}

const OpportunityFilter: React.FC<OpportunityFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Partial<Opportunity>>({});

  function handleFilterChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  }

  function resetFilters() {
    setFilters({});
    onFilterChange({});
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="w-full h-14 pt-2 text-center bg-gray-700 shadow sm:rounded-md font-bold text-3xl text-white">
        Filtro Oportunidades
      </div>

      <section className="text-gray-600 body-font m-0 p-0 relative">
        <div className="container mx-auto">
          <div className="mt-10 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-2 py-8 bg-white sm:p-6 grid grid-cols-6 gap-6">
                  {/* Tipo de Oportunidad */}
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Tipo de Oportunidad</label>
                    <select name="categoryId" onChange={handleFilterChange} className="w-full border rounded-md p-2">
                      <option value="">Seleccione una categoría</option>
                      <option value="1">Académica</option>
                      <option value="2">Becas/Ayudas</option>
                      <option value="3">Cursos</option>
                    </select>
                  </div>

                  {/* Modalidad */}
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Modalidad</label>
                    <select name="status" onChange={handleFilterChange} className="w-full border rounded-md p-2">
                      <option value="">Seleccione una modalidad</option>
                      <option value="presencial">Presencial</option>
                      <option value="virtual">Virtual</option>
                      <option value="hibrida">Híbrida</option>
                    </select>
                  </div>

                  {/* Ubicación */}
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <input type="text" name="location" placeholder="Ciudad, Departamento, País" onChange={handleFilterChange} className="w-full border rounded-md p-2" />
                  </div>

                  {/* Institución */}
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Institución</label>
                    <input type="text" name="institutionsId" placeholder="Ingrese la institución" onChange={handleFilterChange} className="w-full border rounded-md p-2" />
                  </div>

                  {/* Botones de acción */}
                  <div className="col-span-6 text-right">
                    <button type="button" className="mr-4 bg-gray-600 text-white px-4 py-2 rounded-md" onClick={resetFilters}>
                      Restablecer
                    </button>
                    <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={() => onFilterChange(filters)}>
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpportunityFilter;
