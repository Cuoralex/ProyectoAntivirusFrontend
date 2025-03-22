import { useState } from "react";
import Button from "~/components/atoms/button/button";
import Logo from "../../../assets/images/logo-fundacion-antivirus.png";
import IconSearch from "../../../assets/icons/icon-search.png";
import IconSun from "../../../assets/icons/icon-sun.png";
import IconMoon from "../../../assets/icons/icon-moon.png";
import { Menu, X } from "lucide-react";

export default function HeaderGeneral() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`h-[80px] flex items-center justify-between px-4 md:px-6 lg:px-10 w-full relative transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    `}
    >
      {/* Logo y menú de navegación */}
      <div className="flex items-center w-full md:w-auto">
        <img
          src={Logo}
          alt="Logo Fundación Antivirus"
          className="w-[50px] h-[50px] object-contain"
        />

        {/* Menú en pantallas grandes */}
        <ul className="hidden lg:flex gap-6 ml-6">
          <li>
            <a href="#!" className="hover:text-gray-500">
              ¿Quiénes somos?
            </a>
          </li>
          <li>
            <a href="#!" className="hover:text-gray-500">
              Instituciones
            </a>
          </li>
          <li>
            <a href="#!" className="hover:text-gray-500">
              Servicios
            </a>
          </li>
          <li>
            <a href="#!" className="hover:text-gray-500">
              Oportunidades
            </a>
          </li>
          <li>
            <a href="contact-us" className="hover:text-gray-500">
              Contáctanos
            </a>
          </li>
        </ul>
      </div>

      {/* Botones y buscador */}
      <div className="hidden md:flex items-center gap-3">
        {/* Formulario de búsqueda */}
        <form className="hidden md:flex items-center border border-gray-400 px-3 py-1 rounded-full">
          <img
            src={IconSearch}
            alt="Ícono Buscar"
            className="w-[18px] h-[18px]"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent outline-none pl-2 w-[120px]"
          />
        </form>

        {/* Botones de sesión */}
        <Button
          text="Iniciar sesión"
          backgroundColor="#7C78B3"
          textColor="white"
        />
        <Button text="Registrarme" borderWidth={1.5} />
      </div>

      {/* Modo oscuro/claro */}
      <div className="flex items-center gap-2">
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {darkMode ? (
            <img
              src={IconSun}
              alt="Modo Claro"
              className="w-[24px] h-[24px] cursor-pointer"
            />
          ) : (
            <img
              src={IconMoon}
              alt="Modo Oscuro"
              className="w-[24px] h-[24px] cursor-pointer"
            />
          )}
        </button>

        {/* Menú hamburguesa en tablets/móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-black dark:text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menú móvil/tablet */}
      {isMenuOpen && (
        <div
          className={`absolute top-[80px] left-0 w-full ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } shadow-md flex flex-col items-center py-4 space-y-4 lg:hidden transition-all duration-300`}
        >
          <a href="#!" className="hover:text-gray-400">
            ¿Quiénes somos?
          </a>
          <a href="#!" className="hover:text-gray-400">
            Instituciones
          </a>
          <a href="#!" className="hover:text-gray-400">
            Servicios
          </a>
          <a href="#!" className="hover:text-gray-400">
            Oportunidades
          </a>
          <a href="contact-us" className="hover:text-gray-400">
            Contáctanos
          </a>
          <Button
            text="Iniciar sesión"
            backgroundColor="#7C78B3"
            textColor="white"
          />
          <Button text="Registrarme" borderWidth={1.5} />
        </div>
      )}
    </header>
  );
}
