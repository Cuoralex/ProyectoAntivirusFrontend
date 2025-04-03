import { useState, useEffect } from "react";
import { Star } from "lucide-react"; // O usa react-icons si prefieres

interface StarRatingProps {
  cardId: string;
  userId: string;
  isWhiteText?: boolean; // Nueva prop opcional
}

const StarRating: React.FC<StarRatingProps> = ({
  cardId,
  userId,
  isWhiteText = false, // Valor por defecto
}: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [average, setAverage] = useState(0);
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5055/api/v1/opportunities/${cardId}/rating/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAverage(data.Average);
        if (data.UserRating !== null) {
          setRating(data.UserRating);
          setUserVoted(true);
        }
      })
      .catch((err) => console.error("Error al obtener la calificación:", err));
  }, [cardId, userId]);

  const handleClick = (score: number) => {
    if (userVoted) return;

    fetch(`http://localhost:5055/api/v1/opportunities/${cardId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, score }),
    })
      .then(() => {
        setRating(score);
        setUserVoted(true);
      })
      .catch((err) => console.error("Error al enviar la calificación:", err));
  };

  return (
    <div className="flex items-center text-sm mt-2">
      {/* Estrellas */}
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={20}
          fill={index < (hover || rating) ? "#ffcc00" : "transparent"}
          stroke="#ffcc00"
          className="cursor-pointer"
          onMouseEnter={() => !userVoted && setHover(index + 1)}
          onMouseLeave={() => !userVoted && setHover(0)}
          onClick={() => handleClick(index + 1)}
        />
      ))}
      {/* Puntaje de votación */}
      <span className={`ml-2 ${isWhiteText ? "text-white" : "text-gray-700 ml-2"}`}>
      ({(hover || rating || average).toFixed(1)}/5)
      </span>
    </div>
  );
};

export default StarRating;
