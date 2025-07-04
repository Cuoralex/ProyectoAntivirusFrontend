import { useState, useEffect } from "react";
import { Star } from "lucide-react"; // O usa react-icons si prefieres

interface StarRatingProps {
  opportunityId: number;
  userId?: number;
  comment: string,
  score: number;
  isWhiteText?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const StarRating: React.FC<StarRatingProps> = ({
  opportunityId,
  comment,
  userId,
  isWhiteText = false,
}: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [average, setAverage] = useState(0);
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/ratings/opportunity/${opportunityId}/average`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la API: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setAverage(data.Average || 0);
      })
      .catch((err) => console.error("Error al obtener la calificación:", err));
  }, [opportunityId]);
  
  const handleClick = (score: number) => {
    if (rating > 0) return;
  
    const payload = {
      opportunityId,
      score,
      userId,
      comment: comment || "Sin comentario",
    };
  
    fetch(`${API_URL}/api/v1/ratings/opportunity/${opportunityId}/average`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error en la respuesta del backend:", errorText);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log("Nuevo promedio guardado:", data.average);
          setRating(score);
          setAverage(data.average); // ✅ Actualiza el estado con el nuevo promedio
          setUserVoted(true);
        }
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
