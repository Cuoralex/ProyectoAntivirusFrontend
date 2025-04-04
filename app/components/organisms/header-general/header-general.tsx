import { useState } from "react";
import Button from "../../atoms/button/button";
import Logo from "../../../assets/images/logo-fundacion-antivirus.png";
import IconSearch from "../../../assets/icons/icon-search.png";
import IconSun from "../../../assets/icons/icon-sun.png";
import IconMoon from "../../../assets/icons/icon-moon.png";
import { Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useMatches } from "@remix-run/react";

export default function HeaderGeneral() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, role } = useRootLoaderData() ?? {
    isLoggedIn: false,
    role: null,
  };

  function useRootLoaderData(): { isLoggedIn: boolean; role: string | null } {
    const matches = useMatches();
    const rootMatch = matches.find((m) => m.id === "root");
    return rootMatch?.data as { isLoggedIn: boolean; role: string | null };
  }

  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleRegister = () => {
    navigate("/auth/register");
  };
  const handleStart = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`h-[80px] fixed flex items-center justify-between px-4 md:px-6 lg:px-10 w-full  transition-all duration-300 z-50 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    `}
    >
      <div className="flex items-center w-full md:w-auto">
        <button onClick={handleStart}>
          <img
            src={Logo}
            alt="Logo Fundación Antivirus"
            className="w-[50px] h-[50px] object-contain"
          />
        </button>

        <ul className="hidden xl:flex gap-6 ml-6">
          <li className="relative">
            <button
              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
              className="hover:text-gray-500"
            >
              <Link to="/#about-us">¿Quiénes somos?</Link>
            </button>
          </li>
          <li>
            <Link to="/#institutions" className="hover:text-gray-500">
              Instituciones
            </Link>
          </li>
          <li>
            <Link to="/#our-services" className="hover:text-gray-500">
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/opportunities" className="hover:text-gray-500">
              Oportunidades
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="hover:text-gray-500">
              Contáctanos
            </Link>
          </li>
          <li>
            <Link to="/#OurTeam" className="hover:text-gray-500">
              Nuestro equipo
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex items-center gap-3">
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

        {isLoggedIn ? (
          <>
            <Button
              onClick={() =>
                navigate(role === "admin" ? "/admin/index" : "/user-dashboard")
              }
              text="Mi perfil"
              backgroundColor="#7C78B3"
              textColor="white"
            />
            <Button
              onClick={() => navigate("/logout")}
              text="Cerrar sesión"
              backgroundColor="#ef4444"
              textColor="white"
            />
          </>
        ) : (
          <>
            <Button
              onClick={handleLogin}
              text="Iniciar sesión"
              backgroundColor="#7C78B3"
              textColor="white"
            />
            <Button
              onClick={handleRegister}
              text="Registrarme"
              borderWidth={1.5}
            />
          </>
        )}

        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? (
              <img src={IconSun} alt="Modo Claro" className="cursor-pointer" />
            ) : (
              <img
                src={IconMoon}
                alt="Modo Oscuro"
                className="cursor-pointer"
              />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-black dark:text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="text-inherit" size={30} />
            ) : (
              <Menu className="text-inherit" size={30} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
