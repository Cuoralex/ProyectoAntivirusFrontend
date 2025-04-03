import { MetaFunction } from "@remix-run/node";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const meta: MetaFunction = () => [
  { title: "Nuestro Equipo" },
  {
    name: "description",
    content: "Conoce a las personas que hacen posible nuestra misión.",
  },
];

const teamMembers = [
  {
    name: "Carlos Vásquez Restrepo",
    role: "Presidente",
    image: "/images/carlos_vasquez.jpg",
  },
  {
    name: "Astrid Franco",
    role: "Coordinadora Área Social",
    image: "/images/astrid_franco.jpg",
  },
  {
    name: "Luis Fernando Sánchez",
    role: "Director",
    image: "/images/luis_sanchez.jpg",
  },
  {
    name: "Karen González",
    role: "Coordinadora Área de Tecnología y Dato",
    image: "/images/karen_gonzalez.jpg",
  },
  {
    name: "Víctor Manuel Valencia",
    role: "Subdirector",
    image: "/images/victor_valencia.jpg",
  },
  {
    name: "David Santiago Botero",
    role: "Coordinador Área Legal",
    image: "/images/david_botero.jpg",
  },
  {
    name: "Manuela Correa Quintero",
    role: "Coordinador de comunicaciones",
    image: "/images/manuela_correa.jpg",
  },
  {
    name: "Luis Fernando González",
    role: "Coordinador Área Administrativa y Financiera",
    image: "/images/luis_gonzalez.jpg",
  },
];

export default function NuestroEquipo() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <div className="fmax-w-4xl mx-auto text-center mb-4">
        <h2 className="text-[black] text-[40px] font-bold text-center">
          Nuestro Equipo
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Conoce a las personas que hacen posible nuestra misión, trabajando con
          compromiso y dedicación.
        </p>
      </div>
      <div className="max-w-full mx-auto px-6 py-4 mt-[-20px]">
        <Carousel
          showArrows
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showStatus={false}
          emulateTouch
          dynamicHeight={false}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6"
            >
              <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-green-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
              <p className="text-gray-700 italic">{member.role}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}