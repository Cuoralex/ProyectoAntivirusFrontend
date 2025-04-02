import Spline from "@splinetool/react-spline";

export default function Hero({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center w-full h-auto ${className}`}>
      <Spline
        scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode"
      />
    </div>
  );
}


