import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  institutionId: number;
  institutionName: string;
  institutionImage: string;
  institutionLink: string;
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
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Devuelve "YYYY-MM-DD"
  };

  const handleMarkFavorite = async () => {
    try {
      const response = await fetch("/api/v1/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // Debes reemplazar esto con el ID del usuario autenticado
          opportunityId: opportunity.id,
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error al marcar como favorita:", error);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await fetch(`/api/v1/favorites?userId=1`);
        const favorites = await response.json();
        setIsFavorite(
          favorites.some(
            (favorite: { opportunityId: number }) =>
              favorite.opportunityId === opportunity.id
          )
        );
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };

    checkFavorite();
  }, [opportunity.id]);

  return (
    <div className="mx-auto flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full border border-gray-200">
        {/* Cara A */}
        {!showDetails ? (
          <div
            className={`p-4 ${
              [2, 8, 9].includes(opportunity.institutionId)
                ? "bg-gradient-to-r from-[#7C76B5] to-[#ffffff]"
                : "bg-white"
            }`}
          >
            {/* Imagen con etiqueta de estado */}
            <div className="relative w-full h-32 overflow-hidden">
              <img
                src={opportunity.institutionImage}
                alt={`Logo de ${opportunity.institutionName}`}
                className="w-full h-full object-contain"
              />
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                {opportunity.status}
              </span>
            </div>

            {/* Contenido de la tarjeta */}
            <h2 className="text-lg font-semibold text-gray-900">
              {opportunity.title}
            </h2>

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
                <strong>Ubicación:</strong> {opportunity.localityCity}
              </p>
              <p>
                <strong>Fecha de Publicación:</strong>{" "}
                {formatDate(opportunity.publicationDate)}
              </p>
              <p>
                <strong>Fecha de Expiración:</strong>{" "}
                {formatDate(opportunity.expirationDate)}
              </p>
            </div>

            {/* Precio con descuento */}
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
            <StarRating
              cardId={opportunity.id.toString()}
              userId={opportunity.id.toString()}
            />

            {/* Botones */}
            <div className="mt-4 flex space-x-2">
              <button
                className={`flex-1 text-white text-sm font-bold py-2 rounded-lg transition ${
                  isFavorite
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleMarkFavorite}
                disabled={isFavorite}
              >
                {isFavorite ? "Marcada como Favorita" : "Marcar Favorita"}
              </button>

              <button
                className="flex-1 bg-gray-200 text-gray-700 text-sm font-bold py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowDetails(true)}
              >
                Más información
              </button>
            </div>
          </div>
        ) : (
          /* Cara B */
          <div className="p-4 bg-yellow-400 text-gray-900">
            <h2 className="text-lg font-semibold">{opportunity.title}</h2>
            <p className="text-sm">{opportunity.description}</p>

            <div className="text-xs mt-2">
              <p>
                <strong>Categoría:</strong> {opportunity.categoryName}
              </p>
              <p>
                <strong>Beneficios:</strong> {opportunity.benefits}
              </p>
              <p>
                <strong>Modalidad:</strong> {opportunity.modality}
              </p>
              <p>
                <strong>Fecha de Expiración:</strong>{" "}
                {opportunity.expirationDate}
              </p>
            </div>

            {/* Botones */}
            <div className="mt-4 flex space-x-2">
              <button
                className="flex-1 bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setShowDetails(false)}
              >
                Volver
              </button>
              <button
                className="flex-1 bg-gray-800 text-white text-sm font-bold py-2 rounded-lg hover:bg-gray-900 transition"
                onClick={() =>
                  window.open(opportunity.institutionLink, "_blank")
                }
              >
                Postularme
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OpportunityCard;
