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
          "w-36",
          "h-36",
          "sm:w-48",
          "sm:h-48",
          "md:w-56",
          "md:h-56"
        );
      }
    }, 2000);

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
      className={`z-50 cursor-pointer mx-auto mt-8 md:fixed md:top-32 md:right-12 ${className ?? ""}`}
    >
      <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" />
    </div>
  );
}
