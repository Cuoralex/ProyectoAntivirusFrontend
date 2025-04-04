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
        canvas.classList.add("w-[200px]", "h-[200px]", "object-contain");
        canvas.style.width = "150px";
        canvas.style.height = "150px";
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      ref={containerRef}
      className={`fixed top-32 -right-40 z-50 inline-block cursor-pointer ${className}`}
    >
      <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" />
    </div>
  );
}
