import { useState, useEffect } from "react";

interface StarRatingProps {
  cardId: string;
  userId: string;
}

const StarRating: React.FC<StarRatingProps> = ({ cardId, userId }: StarRatingProps) => {
  const [rating, setRating] = useState(0); // Calificación del usuario
  const [hover, setHover] = useState(0); // Estado para el hover
  const [average, setAverage] = useState(0); // Promedio de calificaciones
  const [userVoted, setUserVoted] = useState(false); // Si el usuario ya votó

  useEffect(() => {
    // Obtener la calificación del usuario y el promedio
    fetch(`http://localhost:5055/api/v1/opportunities/${cardId}/rating/${userId}`)
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
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          role="button"
          tabIndex={0}
          className={`text-3xl cursor-pointer ${
            userVoted
              ? "text-yellow-500"
              : hover >= star || rating >= star
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
          onMouseEnter={() => !userVoted && setHover(star)}
          onMouseLeave={() => !userVoted && setHover(0)}
          onClick={() => handleClick(star)}
          onKeyDown={(e) => e.key === "Enter" && handleClick(star)}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-lg font-semibold">
        {average.toFixed(1)}/5
      </span>
    </div>
  );
};

export default StarRating;
