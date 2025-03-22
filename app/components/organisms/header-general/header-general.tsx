import { useState, useRef } from "react";
import Button from "~/components/atoms/button/button";
import Logo from "../../../assets/images/logo-fundacion-antivirus.png";
import IconSearch from "../../../assets/icons/icon-search.png";
import IconSun from "../../../assets/icons/icon-sun.png";
import IconMoon from "../../../assets/icons/icon-moon.png";



export default function HeaderGeneral() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Cancela el cierre si el usuario vuelve rápido
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Agrega un pequeño retraso de 200ms antes de cerrar
  };

  return (
    <header
      id="header-general"
      className="bg-white text-black h-[80px] flex flex-wrap items-center justify-between px-[40px] relative"
    >
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Logo Fundación Antivirus"
          className="w-[55px] h-[55px] object-contain"
        />
        <ul className="hidden lg:flex gap-[20px] ml-[40px]">
          {/* Menú desplegable mejorado */}
          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#!" className="hover:text-gray-500">
              ¿Quiénes somos?
            </a>
            {isDropdownOpen && (
              <ul
                className="absolute left-0 mt-2 w-[180px] bg-white border border-gray-300 shadow-lg rounded-lg"
                onMouseEnter={handleMouseEnter} // Mantiene abierto si el cursor está dentro del dropdown
                onMouseLeave={handleMouseLeave} // Lo cierra al salir
              >
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="que-queremos">Qué queremos</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="nuestro_equipo">Nuestro equipo</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#!">Instituciones</a>
          </li>
          <li>
            <a href="#!">Servicios</a>
          </li>
          <li>
            <a href="#!">Oportunidades</a>
          </li>
          <li>
            <a href="contact-us">Contáctanos</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-end gap-[20px]">
        <form
          action="#!"
          className="hidden lg:flex items-center border-[1.5px] border-gray px-[12px] py-[5px] rounded-[15px]"
        >
          <img
            src={IconSearch}
            alt="Ícono Buscar"
            className="w-[18px] h-[18px]"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-white outline-none pl-2"
          />
        </form>
        <Button
          text="Iniciar sesión"
          backgroundColor="#7C78B3"
          textColor="white"
          customClass="hidden lg:block"
        />
        <Button
          text="Registrarme"
          borderWidth={1.5}
          customClass="hidden lg:block"
        />
        <div className="flex items-center gap-2">
          <img
            src={IconSun}
            alt="Ícono Sol"
            className="w-[24px] h-[24px] cursor-pointer"
          />
          <img
            src={IconMoon}
            alt="Ícono Luna"
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
