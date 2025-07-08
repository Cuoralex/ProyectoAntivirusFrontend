import { Outlet, Link, useLocation } from "@remix-run/react";
import "/app/styles/global.css";
import SuccessModal from "../../organisms/success-modal/sucess-modal";
import { useAuthStore } from "../../../store";
import GeneralHeader from "../../organisms/header-general/header-general";
import Footer from "../../organisms/footer-general/footer-general";

export default function AuthLayout() {
  const location = useLocation();
  const isRegistering = location.pathname.includes("register");

  const isModalOpen = useAuthStore((state) => state.registrationSuccess);
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  return (
    <div className="min-h-screen flex flex-col">
      <GeneralHeader />

      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 max-w-6xl w-full">
          {/* Muñeco */}
          <img
            src="/antivirus-avatar.png"
            alt="Antivirus Avatar"
            className="w-48 h-auto md:w-64 lg:w-80 hidden sm:block"
          />

          {/* Formulario */}
          <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
            <SuccessModal
              isOpen={isModalOpen}
              onClose={() => setRegistrationSuccess(false)}
            />

            <h1 className="text-center text-3xl text-black font-semibold mb-6">
              {isRegistering ? "Registrarme" : "Acceder"}
            </h1>

            <Outlet />

            {/* Botones */}
            <div className="flex justify-center mt-4 space-x-4 w-full">
              <Link
                to="/auth/register"
                className={`px-4 py-2 w-full rounded-lg text-center transition ${
                  isRegistering ? "bg-[#7C78B3] text-white" : "bg-gray-300"
                }`}
              >
                Registrarme
              </Link>
              <Link
                to="/auth/login"
                className={`w-full px-4 py-2 rounded-lg text-center transition ${
                  !isRegistering ? "bg-[#7C78B3] text-white" : "bg-gray-300"
                }`}
              >
                Acceder
              </Link>
            </div>

            {/* Continuar con */}
            <p className="text-black font-medium text-lg text-center mt-6">
              Continuar con
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <img
                src="/icons/google.png"
                alt="Google"
                className="w-8 h-8"
              />
              <img
                src="/icons/facebook.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </div>

            <Link
              to="/"
              className="underline text-black text-center block mt-4"
            >
              Ir a inicio
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
