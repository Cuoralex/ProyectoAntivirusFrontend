import { useState, useEffect } from "react";
import { Heart } from "lucide-react";


interface FavoriteProps {
  opportunityId: number;
  userId?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Favorite: React.FC<FavoriteProps> = ({ 
    opportunityId,
}: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    
    fetch(`${API_URL}/api/v1/favorites/${opportunityId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la API: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setIsFavorite(data.isFavorite);
      })
      .catch((err) => console.error("Error al obtener el estado de favorito:", err));
  }, [opportunityId]);

  const toggleFavorite = () => {

    const url = `${API_URL}/api/v1/favorites/${opportunityId}`;
    const method = isFavorite ? "DELETE" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la API: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        setIsFavorite(!isFavorite);
      })
      .catch((err) => console.error("Error al actualizar favorito:", err));
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
      <Heart
        size={24}
        fill={isFavorite ? "red" : "transparent"}
        stroke="red"
        className="cursor-pointer transition-transform transform hover:scale-110"
      />
    </button>
  );
};

export default Favorite;
