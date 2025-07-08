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
          "duration-300",
          "w-24",
          "h-24",
          "sm:w-32",
          "sm:h-32",
          "md:w-48",
          "md:h-48"
        );
        canvas.style.margin = "0 auto";
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
      className={`fixed top-4 right-4 z-30 cursor-pointer ${className ?? ""}`}
    >
      <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" />
    </div>
  );
}
