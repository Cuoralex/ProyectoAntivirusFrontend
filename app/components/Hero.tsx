import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";

export default function HeroSpline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/register");
  };

  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) return;

    canvas.classList.add(
      "rounded-full",
      "object-cover",
      "transition-all",
      "duration-300"
    );

    // Aplica estilos directamente por tamaño de pantalla
    const resizeCanvas = () => {
      if (window.innerWidth < 768) {
        canvas.style.display = "none"; // Oculta en móviles
      } else if (window.innerWidth < 1024) {
        canvas.style.width = "96px";
        canvas.style.height = "96px";
      } else if (window.innerWidth < 1440) {
        canvas.style.width = "128px";
        canvas.style.height = "128px";
      } else {
        canvas.style.width = "160px";
        canvas.style.height = "160px";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className={`absolute top-24 right-4 z-30 cursor-pointer hidden md:block ${className ?? ""}`}
    >
      <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" />
    </div>
  );
}
