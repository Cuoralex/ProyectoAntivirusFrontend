import { useState, useEffect } from "react";
import { Star } from "lucide-react"; // O usa react-icons si prefieres

interface StarRatingProps {
  cardId: string;
  userId: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  cardId,
  userId,
}: StarRatingProps) => {
  const [rating, setRating] = useState(0); // Calificación del usuario
  const [hover, setHover] = useState(0); // Estado para el hover
  const [average, setAverage] = useState(0); // Promedio de calificaciones
  const [userVoted, setUserVoted] = useState(false); // Si el usuario ya votó

  useEffect(() => {
    // Obtener la calificación del usuario y el promedio
    fetch(
      `http://localhost:5055/api/v1/opportunities/${cardId}/rating/${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAverage(data.Average); // Promedio de calificaciones
        if (data.UserRating !== null) {
          setRating(data.UserRating); // Calificación del usuario
          setUserVoted(true); // Si el usuario ya tiene calificación
        }
      })
      .catch((err) => console.error("Error al obtener la calificación:", err));
  }, [cardId, userId]);

  const handleClick = (score: number) => {
    if (userVoted) return; // Evitar que el usuario vote más de una vez

    // Enviar la calificación al backend
    fetch(`http://localhost:5055/api/v1/opportunities/${cardId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, score }),
    })
      .then(() => {
        setRating(score); // Actualiza la calificación del usuario
        setUserVoted(true); // Marca que el usuario ya votó
      })
      .catch((err) => console.error("Error al enviar la calificación:", err));
  };

  return (
    <div className="flex items-center text-yellow-500 text-sm mt-2">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          fill={index < (hover || rating) ? "#ffcc00" : "transparent"}
          stroke="currentColor"
          className="cursor-pointer"
          onMouseEnter={() => !userVoted && setHover(index + 1)}
          onMouseLeave={() => !userVoted && setHover(0)}
          onClick={() => handleClick(index + 1)}
        />
      ))}
      <span className="text-gray-700 ml-2">({average.toFixed(1)}/5)</span>
    </div>
  );
};

export default StarRating;
