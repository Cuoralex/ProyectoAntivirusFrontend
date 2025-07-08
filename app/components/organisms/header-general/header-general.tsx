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
      className={`h-[80px] fixed flex items-center justify-between px-4 md:px-6 lg:px-10 w-full shadow-lg transition-all duration-300 z-50 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
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
            <Link to="/#OurTeam" className="hover:text-gray-500">
              Nuestro equipo
            </Link>
          </li>
          <li>
            <Link to="#contact-form" className="hover:text-gray-500">
              Contáctanos
            </Link>
          </li>
          <li>
            {isLoggedIn && (
              <li>
                <Link to="/opportunities">Oportunidades</Link>
              </li>
            )}
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
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {darkMode ? (
            <img src={IconSun} alt="Modo Claro" className="cursor-pointer" />
          ) : (
            <img src={IconMoon} alt="Modo Oscuro" className="cursor-pointer" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 xl:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-inherit focus:outline-none"
        >
          {isMenuOpen ? (
            <X size={30} className="text-inherit" />
          ) : (
            <Menu size={30} className="text-inherit" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-[80px] left-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col gap-4 xl:hidden transition-all duration-300 z-40`}
        >
          <nav className="flex flex-col gap-3 text-sm">
            <Link to="/#about-us" onClick={() => setIsMenuOpen(false)}>
              ¿Quiénes somos?
            </Link>
            <Link to="/#institutions" onClick={() => setIsMenuOpen(false)}>
              Instituciones
            </Link>
            <Link to="/#our-services" onClick={() => setIsMenuOpen(false)}>
              Servicios
            </Link>
            <Link to="/#OurTeam" onClick={() => setIsMenuOpen(false)}>
              Nuestro equipo
            </Link>
            <Link to="#contact-form" onClick={() => setIsMenuOpen(false)}>
              Contáctanos
            </Link>
            <Link to="/opportunities" onClick={() => setIsMenuOpen(false)}>
              Oportunidades
            </Link>
          </nav>

          <div className="border-t border-gray-300 pt-4 mt-2">
            {isLoggedIn ? (
              <>
                <Button
                  onClick={() =>
                    navigate(
                      role === "admin" ? "/admin/index" : "/user-dashboard"
                    )
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
          </div>
        </div>
      )}
    </header>
  );
}
