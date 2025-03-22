import { MetaFunction } from "@remix-run/node";
import Header from '../components/organisms/header-general/header-general';
import Footer from '../components/organisms/footer-general/footer-general';
// import FloatingButton from "../components/FloatingButton";
// import DonateButton from "../components/DonateButton";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export const meta: MetaFunction = () => [
  { title: "¿Quiénes somos?" },
  { name: "description", content: "Conoce más sobre nuestra empresa de seguridad informática." }
];

export default function QuienesSomos() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Header />

      {/* Imagen Representativa */}
      <div className="w-full">

      </div>

      {/* Sección Quiénes Somos */}
      <div className="flex-grow p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-600">¿Quiénes somos?</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Somos una empresa dedicada a la seguridad informática, protegiendo a nuestros
          clientes de amenazas digitales con soluciones innovadoras y eficientes. Nuestro
          equipo está comprometido con la excelencia y la mejora continua.
        </p>
      </div>

      {/* Sección con Tarjetas */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">PROPÓSITO</h2>
          <p className="text-lg">Queremos que todos los niños desarrollen su potencial y se conviertan en agentes de mejoramiento de su comunidad.</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3 text-pink-500">MISIÓN</h2>
          <p className="text-lg">Mejorar el acceso y la calidad de la educación inicial con un enfoque sistémico (conectando agentes claves) y territorial (aproximación local).</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-300">ESTRATEGIA</h2>
          <p className="text-lg">Conectar actores clave para impactar conjuntamente los entornos de la primera infancia, mejorando la infraestructura, fortaleciendo capacidades y trabajando con la comunidad.</p>
        </div>
      </div>

{/* Carrusel con Texto e Imágenes */}
<div className="max-w-4xl mx-auto py-12">
  <Carousel showArrows={true} infiniteLoop autoPlay interval={3000} showThumbs={false}>
    <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-lg shadow-lg">
      <img src="/images/publico_objetivo.jpg" 
           alt="Público Objetivo" 
           className="w-full md:max-w-[40%] h-auto object-contain rounded-lg shadow-md" />
      <div className="md:ml-6 text-center md:text-left flex-1">
        <h3 className="text-xl font-bold">Público Objetivo</h3>
        <p className="text-gray-700">Trabajamos con estudiantes de carreras y programas TI de Educación Media y Postsecundaria. Enfocamos nuestra intervención en estudiantes vulnerables a la deserción.</p>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-lg shadow-lg">
      <img src="/images/teoria_cambio.jpg" 
           alt="Teoría del Cambio" 
           className="w-full md:max-w-[40%] h-auto object-contain rounded-lg shadow-md" />
      <div className="md:ml-6 text-center md:text-left flex-1">
        <h3 className="text-xl font-bold">Teoría del Cambio</h3>
        <p className="text-gray-700">Identificar estudiantes con vulnerabilidades y acompañarlos integralmente, a través de un ecosistema de estrategias centrado en lo académico, económico y socioemocional para la permanencia.</p>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-center p-6 bg-white rounded-lg shadow-lg">
      <img src="/images/prioridades.jpg" 
           alt="Prioridades" 
           className="w-full md:max-w-[40%] h-auto object-contain rounded-lg shadow-md" />
      <div className="md:ml-6 text-center md:text-left flex-1">
        <h3 className="text-xl font-bold">Prioridades</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Consolidar un modelo con procesos de identificación de vulnerabilidades, intervención e indicadores de resultados.</li>
          <li>Explorar modelos de intervención desde los colegios para aportar a reducir la deserción en educación superior.</li>
          <li>Conocer e involucrar a otros actores en el trabajo por la permanencia (Rectores, Decanos, MEN, Empresas, entre otros).</li>
          <li>Ayudar a reducir la deserción en otras universidades y programas para afinar nuestro modelo y generar ingresos que aporten a la sostenibilidad de la Fundación Antivirus.</li>
        </ul>
      </div>
    </div>
  </Carousel>
</div>



      <Footer />

      {/* Botones flotantes */}
      {/* <FloatingButton />
      <DonateButton /> */}
    </div>
  );
}
