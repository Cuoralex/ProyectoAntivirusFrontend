import React, { ChangeEvent, useState, useEffect } from "react";

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
  onFilterChange: (newFilters: Partial<Opportunity>) => void;
}

const OpportunityFilter: React.FC<OpportunityFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Partial<Opportunity>>({});

  // Manejar cambios en los inputs y actualizar el estado
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(`Nombre: ${name}, Valor: ${value}`);

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || undefined, // Evitar valores vacíos en el estado
    }));
  };

  // Función para obtener oportunidades según los filtros
  const fetchOpportunities = async (currentFilters: Partial<Opportunity>) => {
    const params = new URLSearchParams();
    if (currentFilters.title) params.append("title", currentFilters.title);
    if (currentFilters.opportunityTypeId) params.append("opportunityTypeId", currentFilters.opportunityTypeId.toString());
    if (currentFilters.institutionId) params.append("institutionId", currentFilters.institutionId.toString());
    if (currentFilters.localityId) params.append("localityId", currentFilters.localityId.toString());

    try {
      const response = await fetch(`/opportunities.data?${params.toString()}`);
      const data = await response.json();
      console.log("Datos recibidos:", data);
      onFilterChange(currentFilters); // Notificar cambios al padre
    } catch (error) {
      console.error("Error al obtener oportunidades:", error);
    }
  };

  // Llamar a la API cuando los filtros cambian
  useEffect(() => {
    fetchOpportunities(filters);
  }, [filters]);

  // Restablecer filtros
  const resetFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="w-full bg-gray-100 p-6 flex flex-col">
      <h3 className="text-center text-3xl font-bold text-white bg-gray-700 py-2">
        Filtro Oportunidades
      </h3>

      <div className="bg-white p-4 rounded shadow-md">
        <form>
          {/* Palabra Clave */}
          <div>
            <label htmlFor="keyword" className="block text-gray-700 font-medium">Palabra clave</label>
            <input 
              type="text"
              name="title"
              placeholder="Buscar título" 
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Tipo de Oportunidad */}
          <div>
            <label htmlFor="Opportunity_types" className="block text-gray-700 font-medium">Tipo de Oportunidad</label>
            <select name="opportunityTypeId" onChange={handleInputChange} className="w-full border p-2 rounded">
              <option value="">Tipo de oportunidad</option>
              <option value="1">Educación Superior</option>
              <option value="2">Becas y Ayudas Financieras</option>
              <option value="3">Empleabilidad y Prácticas</option>
              <option value="4">Emprendimiento e Innovación</option>
              <option value="5">Capacitación y Desarrollo Profesional</option>
              <option value="6">Bienestar y Apoyo Estudiantil</option>
            </select>
          </div>

          {/* Instituciones */}
          <div>
            <label htmlFor="institutions" className="block text-gray-700 font-medium">Instituciones</label>
            <select name="institutionId" onChange={handleInputChange} className="w-full border p-2 rounded">
              <option value="">Instituciones</option>
              <option value="1">Universidad Nacional (Sede Medellín)</option>
              <option value="2">Universidad EAFIT</option>
              <option value="3">Universidad Pontificia Bolivariana</option>
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="localities" className="block text-gray-700 font-medium">Ubicación</label>
            <select name="localityId" onChange={handleInputChange} className="w-full border p-2 rounded">
              <option value="">Seleccione ubicación</option>
              <option value="1">Medellín</option>
              <option value="2">Bogotá</option>
              <option value="3">Cali</option>
            </select>
          </div>

          {/* Fecha de apertura */}
          <div>
            <label htmlFor="publicationDate" className="block text-gray-700 font-medium mt-4">Fecha de apertura</label>
            <input 
              type="date" 
              name="publicationDate" 
              onChange={handleInputChange} 
              className="w-full border p-2 rounded" 
            />
          </div>

          {/* Fecha de cierre */}
          <div>
            <label htmlFor="expirationDate" className="block text-gray-700 font-medium mt-4">Fecha de cierre</label>     
            <input 
              type="date" 
              name="expirationDate" 
              onChange={handleInputChange} 
              className="w-full border p-2 rounded mt-2" 
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end mt-4">
            <button type="button" className="mr-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={resetFilters}>
              Restablecer
            </button>
            <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => fetchOpportunities(filters)}>
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityFilter;
