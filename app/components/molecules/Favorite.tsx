import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

// Definir tipos para las oportunidades y favoritos
interface Opportunity {
    IdOpportunity: number;
    Title: string;
    Description: string;
}

interface Favorite {
    IdOpportunity: number;
}

export const loader = async () => {
    try {
        const API_URL = "http://localhost:5055/api/v1";

        const opportunitiesResponse = await fetch(`${API_URL}/oportunities`);
        const favoritesResponse = await fetch(`${API_URL}/favorites`);

        return {
            opportunities: await opportunitiesResponse.json(),
            favorites: await favoritesResponse.json(),
        };
    } catch (error) {
        console.error("Error cargando datos:", error);
        return { opportunities: [], favorites: [] };
    }
};

export default function Oportunidades() {
    const { opportunities, favorites: initialFavorites } = useLoaderData<{ opportunities: Opportunity[]; favorites: Favorite[] }>();
    
    // Estado local para los favoritos (permite actualizaciones sin recargar)
    const [favorites, setFavorites] = useState<Favorite[]>(initialFavorites);

    const handleMarcarFavorito = async (opportunity: Opportunity) => {
        try {
            const API_URL = "http://localhost:5055/api/v1";
            
            const response = await fetch(`${API_URL}/favorites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    IdUser: 1, // Este ID debe venir del usuario autenticado
                    IdOpportunity: opportunity.IdOpportunity,
                }),
            });

            if (response.ok) {
                setFavorites([...favorites, { IdOpportunity: opportunity.IdOpportunity }]); // Actualiza el estado local
            }
        } catch (error) {
            console.error("Error al marcar como favorito:", error);
        }
    };

    return (
        <div>
            {opportunities.map((opportunity) => (
                <div key={opportunity.IdOpportunity}>
                    <h2>{opportunity.Title}</h2>
                    <p>{opportunity.Description}</p>

                    {favorites.some((fav) => fav.IdOpportunity === opportunity.IdOpportunity) ? (
                        <button disabled>Marcado como favorito</button>
                    ) : (
                        <button onClick={() => handleMarcarFavorito(opportunity)}>Marcar como favorito</button>
                    )}
                </div>
            ))}
        </div>
    );
}
