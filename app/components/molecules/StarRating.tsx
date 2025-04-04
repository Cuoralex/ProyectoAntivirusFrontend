import { useState, useEffect } from "react";
import { Star } from "lucide-react"; // O usa react-icons si prefieres

interface StarRatingProps {
  opportunityId: number;
  userId?: number;
  comment: string,
  score: number;
  isWhiteText?: boolean; // Nueva prop opcional
}

const StarRating: React.FC<StarRatingProps> = ({
  opportunityId,
  comment,
  userId,
  isWhiteText = false, // Valor por defecto
}: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [average, setAverage] = useState(0);
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5055/api/v1/ratings/opportunity/${opportunityId}/average`)
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
      comment: comment || "Sin comentario", // Evita null o undefined
    };
  
    console.log("📤 Enviando JSON:", JSON.stringify(payload, null, 2));
  
    fetch(`http://localhost:5055/api/v1/ratings/opportunity/${opportunityId}/average`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId, userId, score, comment}),
    })
      .then(async (res) => {
        console.log("Headers del backend:", res.headers);
        console.log("Estado HTTP:", res.status);
    
        const contentType = res.headers.get("Content-Type");
        
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.warn("Respuesta no JSON:", text);
          return;
        }
    
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log("Respuesta JSON:", data);
          setRating(score);
          setUserVoted(true);
        }
      })
      .catch(async (err) => {
        console.error("Error al enviar la calificación:", err);
        
        if (err.response) {
          const errorText = await err.response.text();
          console.error("Respuesta del backend:", errorText);
        }});
      }
     
  
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
