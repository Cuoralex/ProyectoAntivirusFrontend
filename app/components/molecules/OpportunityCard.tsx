import React, { useState } from "react";
import { Star } from "lucide-react";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  institutionId: number;
  institutionName: string;
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

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const price = opportunity.price ?? 0;
  const discountPrice = opportunity.discountPrice ?? price;
  const [rating, setRating] = useState(opportunity.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (newRating: number) => {
    try {
      const response = await fetch(
        `http://localhost:5055/api/v1/opportunities/${opportunity.id}/rate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRating),
        }
      );

      if (!response.ok) throw new Error("Error al calificar la oportunidad.");

      const data = await response.json();
      setRating(data.newRating);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(opportunity);

  return (
    <div className="mx-auto flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full border border-gray-200">
        {/* Imagen con etiqueta de estado */}
        <div className="relative">
          <img
            src="https://www.udea.edu.co/wps/wcm/connect/udea/2117e09c-7085-4410-b53b-c8dd24da3da7/logosimbolo-horizontal.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_L8L8H8C0LODDC0A6SSS2AD2GO4-2117e09c-7085-4410-b53b-c8dd24da3da7-plcMekT"
            alt={`Imagen de ${opportunity.title}`}
            className="w-full h-64 object-cover"
          />
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {opportunity.status}
          </span>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {opportunity.title}
          </h2>
          <p className="text-sm text-gray-600">{opportunity.description}</p>

          {/* Ubicación, Categoría e Institución */}
          <div className="text-xs text-gray-500 mt-2">
            <p>
              <strong>Institución:</strong> {opportunity.institutionName}
            </p>
            <p>
              <strong>Sector:</strong> {opportunity.sectorName}
            </p>
            <p>
              <strong>Tipo de Oportunidad:</strong>{" "}
              {opportunity.opportunityTypeName}
            </p>
            <p>
              <strong>Categoría:</strong> {opportunity.categoryName}
            </p>
            <p>
              <strong>Ubicación:</strong> {opportunity.localityCity}
            </p>
            <p>
              <strong>Beneficios:</strong> {opportunity.benefits}
            </p>
            <p>
              <strong>Modalidad:</strong> {opportunity.modality}
            </p>
            <p>
              <strong>Fecha de Publicación:</strong>{" "}
              {opportunity.publicationDate}
            </p>
            <p>
              <strong>Fecha de Expiración:</strong> {opportunity.expirationDate}
            </p>
          </div>

          {/* Precios con descuento */}
          <div className="flex items-center space-x-2 my-2">
            <span className="text-green-600 font-bold text-lg">
              ${discountPrice.toFixed(2)}
            </span>
            {discountPrice < price && (
              <span className="text-gray-500 line-through text-sm">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Calificación */}
          <div className="flex items-center text-yellow-500 text-sm mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                fill={
                  index < (hoverRating || rating) ? "#ffcc00" : "transparent"
                }
                stroke="currentColor"
                className="cursor-pointer"
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(index + 1)}
              />
            ))}
            <span className="text-gray-700 ml-2">({rating.toFixed(1)}/5)</span>
          </div>

          {/* Botones */}
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 transition">
              Marcar Favorita
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 text-sm font-bold py-2 rounded-lg hover:bg-gray-300 transition">
              Más información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
