import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";

export default function Hero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/register");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const canvas = containerRef.current?.querySelector("canvas");

      if (canvas) {
        canvas.classList.add(
          "rounded-full",
          "object-cover",
          "transition-all",
          "duration-300"
        );

        // Tamaño adaptativo
        canvas.style.width = "64px"; // móvil base
        canvas.style.height = "64px";

        if (window.innerWidth >= 640) {
          canvas.style.width = "96px";
          canvas.style.height = "96px";
        }

        if (window.innerWidth >= 1024) {
          canvas.style.width = "128px";
          canvas.style.height = "128px";
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
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
      className={`absolute top-6 right-6 z-30 cursor-pointer ${className ?? ""}`}
      style={{ pointerEvents: "auto" }}
    >
      <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" />
    </div>
  );
}
