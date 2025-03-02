import React from "react";

interface Opportunity {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  institutionId: number;
  location: string;
  requirements: string;
  benefits: string;
  createdAt: string;
  expiration: string;
  ownerId: number;
  status: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full">
        {/* Imagen de referencia */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/400x300"
            alt={`Imagen de ${opportunity.name}`}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {opportunity.name}
          </h2>
          <p className="text-sm text-gray-600">{opportunity.description}</p>

          <div className="py-2">
            <p className="text-sm font-bold text-blue-600">
              Ubicación: {opportunity.location}
            </p>
            <p className="text-sm text-gray-500">
              Estado: {opportunity.status}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            <strong>Requisitos:</strong> {opportunity.requirements}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            <strong>Beneficios:</strong> {opportunity.benefits}
          </p>

          {/* Botón para más detalles */}
          <button
            className="block bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200 text-center"
            onClick={() => console.log("Acción ejecutada")}
          >
            Acción
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
