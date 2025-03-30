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

const OpportunityFilter: React.FC<OpportunityFilterProps> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<Partial<Opportunity>>({});

  // Manejar cambios en los inputs y actualizar el estado
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(`Nombre: ${name}, Valor: ${value}`);

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value || undefined };
      onFilterChange(updatedFilters); // Aplicar cambios directamente
      return updatedFilters;
    });    
  };

  // Función para obtener oportunidades según los filtros
  const fetchOpportunities = async (currentFilters: Partial<Opportunity>) => {
    const params = new URLSearchParams();
    if (currentFilters.title) params.append("title", currentFilters.title);
    if (typeof currentFilters.opportunityTypeId === "number")
      params.append(
        "opportunityTypeId",
        String(currentFilters.opportunityTypeId)
      );
    if (typeof currentFilters.institutionId === "number")
      params.append("institutionId", String(currentFilters.institutionId));
    if (typeof currentFilters.localityId === "number")
      params.append("localityId", String(currentFilters.localityId));
    if (currentFilters.expirationDate)
      params.append(
        "expirationDate",
        new Date(currentFilters.expirationDate).toISOString().split("T")[0]
      );

    if (currentFilters.publicationDate)
      params.append(
        "publicationDate",
        new Date(currentFilters.publicationDate).toISOString().split("T")[0]
      );

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
    <div>
      <h4 className="text-center text-3xl font-bold text-white bg-gray-700 py-2">
        Filtro Oportunidades
      </h4>

      <div className="bg-white p-4 rounded shadow-md h-full sticky top-0">
        <form>
          {/* Palabra Clave */}
          <div>
            <label
              htmlFor="keyword"
              className="block text-gray-700 font-medium"
            >
              Palabra clave
            </label>
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
            <label
              htmlFor="Opportunity_types"
              className="block text-gray-700 font-medium"
            >
              Tipo de Oportunidad
            </label>
            <select
              name="opportunityTypeId"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
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
            <label
              htmlFor="institutions"
              className="block text-gray-700 font-medium"
            >
              Instituciones
            </label>
            <select
              name="institutionId"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Instituciones</option>
              <option value="1">Universidad de Antioquia</option>
              <option value="2">Universidad Nacional (Sede Medellín)</option>
              <option value="3">Universidad de Medellín</option>
              <option value="4">Universidad EAFIT</option>
              <option value="5">Universidad Pontificia Bolivariana</option>
              <option value="6">Institución Universitaria Pascual Bravo</option>
              <option value="7">Tecnológico de Antioquia</option>
              <option value="8">Institución Universitaria ITM</option>
              <option value="9">Politécnico Jaime Isaza Cadavid</option>
              <option value="10">
                Servicio Nacional de Aprendizaje (SENA)
              </option>
            </select>
          </div>

          {/* Sectores */}
          <div>
            <label
              htmlFor="sectors"
              className="block text-gray-700 font-medium"
            >
              Sectores
            </label>
            <select
              name="sectorsId"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Sectores</option>
              <option value="1">Administrativo</option>
              <option value="2">Energía</option>
              <option value="3">Social</option>
              <option value="4">Agropecuario</option>
              <option value="5">Formación</option>
              <option value="6">Transporte</option>
              <option value="7">Alimentos</option>
              <option value="8">Industria</option>
              <option value="9">Tecnología</option>
              <option value="10">Turismo</option>
              <option value="11">Comercio</option>
              <option value="12">Moda y Belleza</option>
              <option value="13">Salud</option>
              <option value="14">Construcción</option>
              <option value="15">Servicio al Cliente</option>
              <option value="16">Sustentabilidad</option>
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label
              htmlFor="localities"
              className="block text-gray-700 font-medium"
            >
              Ubicación
            </label>
            <select
              name="localityId"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Ubicación</option>
              <option value="1">Medellín</option>
              <option value="2">Bello</option>
              <option value="3">Envigado</option>
              <option value="4">Itagüí</option>
              <option value="5">Bogotá</option>
              <option value="6">Cali</option>
              <option value="7">Barranquilla</option>
              <option value="8">Cartagena</option>
              <option value="9">Bucaramanga</option>
              <option value="10">Pereira</option>
              <option value="11">Armenia</option>
              <option value="12">Manizales</option>
              <option value="13">Ibagué</option>
              <option value="14">Pasto</option>
              <option value="15">Neiva</option>
              <option value="16">Villavicencio</option>
              <option value="17">Cúcuta</option>
              <option value="18">Valledupar</option>
              <option value="19">Santa Marta</option>
              <option value="20">Tunja</option>
              <option value="21">Sincelejo</option>
              <option value="22">Montería</option>
              <option value="23">Popayán</option>
              <option value="24">Yopal</option>
              <option value="25">San José del Guaviare</option>
              <option value="26">Leticia</option>
              <option value="27">Quibdó</option>
              <option value="28">Arauca</option>
              <option value="29">Inírida</option>
              <option value="30">Mitú</option>
              <option value="31">Puerto Carreño</option>
              <option value="32">San Andrés</option>
            </select>
          </div>

          {/* Fecha de apertura */}
          <div>
            <label
              htmlFor="publicationDate"
              className="block text-gray-700 font-medium"
            >
              Fecha de apertura
            </label>
            <input
              type="date"
              name="publicationDate"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Fecha de cierre */}
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-gray-700 font-medium"
            >
              Fecha de cierre
            </label>
            <input
              type="date"
              name="expirationDate"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-4 bg-gray-600 text-white px-4 py-2 rounded"
              onClick={resetFilters}
            >
              Restablecer
            </button>
            <button
              type="button"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={() => fetchOpportunities(filters)}
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityFilter;
