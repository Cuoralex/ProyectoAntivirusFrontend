import { Link } from "@remix-run/react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="container flex flex-col md:flex-row items-center justify-center text-gray-700 max-w-6xl mx-auto">
        {/* Contenido del texto */}
        <div className="w-full md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-6xl md:text-7xl text-green-500 font-extrabold mb-6">
            404
          </h1>
          <p className="text-lg md:text-2xl font-light leading-relaxed mb-6">
            ¡Error 404! Esta ruta no está en el plan de estudios. Vuelve a
            explorar.
          </p>
          <Link
            to="/"
            className="px-6 py-3 text-sm md:text-base font-medium shadow-md text-white rounded-lg bg-green-600 active:bg-red-600 hover:bg-red-700 transition duration-300"
          >
            Vuelve a inicio
          </Link>
        </div>

        {/* Imagen */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end p-6">
          <img
            src="/Javi-8.png"
            alt="Page not found"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
