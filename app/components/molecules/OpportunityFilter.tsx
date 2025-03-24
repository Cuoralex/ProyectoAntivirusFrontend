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

  return (
    <div className="w-full bg-gray-100 p-6 flex flex-col">
      <h2 className="text-center text-3xl font-bold text-white bg-gray-700 py-2">Filtro Oportunidades</h2>

      <div className="bg-white p-4 rounded shadow-md">
        <form>
          {/* Palabra Clave */}
          <div>
            <label htmlFor="keyword" className="block text-gray-700 font-medium">Palabra clave</label>
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Ingrese una palabra clave"
              onChange={handleFilterChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Oportunidad */}
          <div>
            <label htmlFor="Opportunity_types" className="block text-gray-700 font-medium">Tipo de Oportunidad</label>
            <select name="opportunityTypeId" onChange={handleFilterChange} className="w-full border p-2 rounded">
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
            <select name="institutionId" onChange={handleFilterChange} className="w-full border p-2 rounded">
              <option value="">Instituciones</option>
              <option value="Universidad Nacional (Sede Medellín)">Universidad Nacional (Sede Medellín)</option>
              <option value="Universidad EAFIT">Universidad EAFIT</option>
              <option value="Universidad Pontificia Bolivariana">Universidad Pontificia Bolivariana</option>
              <option value="Institución Universitaria Pascual Bravo">Institución Universitaria Pascual Bravo</option>
              <option value="Tecnológico de Antioquia">Tecnológico de Antioquia</option>
              <option value="Institución Universitaria ITM">Institución Universitaria ITM</option>
              <option value="Politécnico Jaime Isaza Cadavid">Politécnico Jaime Isaza Cadavid</option>
              <option value="Servicio Nacional de Aprendizaje (SENA)">Servicio Nacional de Aprendizaje (SENA)</option>
              <option value="Universidad de Antioquia">Universidad de Antioquia</option>
              <option value="Universidad de Medellín">Universidad de Medellín</option>
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="localities" className="block text-gray-700 font-medium">Ubicación</label>
            <select name="location" onChange={handleFilterChange} className="w-full border p-2 rounded">
              <option value="">Seleccione ubicación</option>
              <option value="Medellín">Medellín</option>
              <option value="Bello">Bello</option>
              <option value="Envigado">Envigado</option>
              <option value="Itagüí">Itagüí</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Cali">Cali</option>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Pereira">Pereira</option>
              <option value="Armenia">Armenia</option>
              <option value="Manizales">Manizales</option>
              <option value="Ibagué">Ibagué</option>
              <option value="Pasto">Pasto</option>
              <option value="Neiva">Neiva</option>
              <option value="Villavicencio">Villavicencio</option>
              <option value="Cúcuta">Cúcuta</option>
              <option value="Valledupar">Valledupar</option>
              <option value="Santa Marta">Santa Marta</option>
              <option value="Tunja">Tunja</option>
              <option value="Sincelejo">Sincelejo</option>
              <option value="Montería">Montería</option>
              <option value="Popayán">Popayán</option>
              <option value="Yopal">Yopal</option>
              <option value="San José del Guaviare">San José del Guaviare</option>
              <option value="Leticia">Leticia</option>
              <option value="Quibdó">Quibdó</option>
              <option value="Arauca">Arauca</option>
              <option value="Inírida">Inírida</option>
              <option value="Mitú">Mitú</option>
              <option value="Puerto Carreño">Puerto Carreño</option>
              <option value="San Andrés">San Andrés</option>
            </select>
          </div>

          <div>
                {/* Rango de fechas apertura */}
                <label htmlFor="publicationDate" className="block text-gray-700 font-medium mt-4">Fecha de apertura</label>
                <input type="date" name="publicationDate" onChange={handleFilterChange} className="w-full border p-2 rounded" />
          </div>

          <div>
                {/* Rango de fechas cierre */}
                <label htmlFor="expirationDate" className="block text-gray-700 font-medium mt-4">Fecha de cierre</label>     
                <input type="date" name="expirationDate" onChange={handleFilterChange} className="w-full border p-2 rounded mt-2" />
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
