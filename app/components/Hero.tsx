import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-center text-center w-full pb-14 bg-white dark:bg-[#0f1629]">
      <div className="xl:ml-28 w-full md:w-2/3 p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1D1856] pt-8 md:pt-16 mb-4 md:mb-8 mt-10 md:mt-20 dark:text-[#12a6e8]">
          Bienvenido a la Fundación Antivirus
        </h1>
        <p className="text-base md:text-lg mb-4 dark:text-[#a8afc4]">
          Juntos ayudamos a combatir la deserción escolar
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-8 justify-center">
          <a href="#footer" className="bg-blue-600 text-white py-2 px-6 rounded-lg">
            Contáctanos
          </a>
          <a href="https://www.behance.net/gallery/167826187/Branding-de-agencia"
            className="border border-blue-600 text-blue-600 py-2 px-6 rounded-lg">
            Conócenos
          </a>
        </div>
      </div>

      {/* Aquí agregamos la animación 3D de Spline */}
      <div className="w-full h-64 md:h-96 mt-8 flex justify-center items-center xl:h-[510px] xl:pr-20">
        <Spline scene="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode" className="w-full" />
      </div>
    </div>
  );
}
