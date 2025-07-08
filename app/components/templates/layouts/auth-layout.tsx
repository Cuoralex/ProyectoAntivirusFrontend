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
    <div className="min-h-screen flex flex-col justify-between">
      <GeneralHeader />

      <main className="flex-grow flex justify-center items-start pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl w-full flex flex-col lg:flex-row items-center gap-10 relative">

          <SuccessModal
            isOpen={isModalOpen}
            onClose={() => setRegistrationSuccess(false)}
          />

          {/* Imagen solo visible en escritorio */}
          <img
            src="/antivirus-avatar.png"
            alt="Antivirus Avatar"
            loading="lazy"
            className="hidden lg:block w-52 h-auto rounded-full object-contain"
          />

          {/* Formulario */}
          <div className="bg-white shadow-lg flex flex-col items-center gap-4 rounded-lg w-full max-w-md p-8 z-10">
            <h1 className="text-center text-3xl text-black font-semibold">
              {isRegistering ? "Registrarme" : "Acceder"}
            </h1>

            <Outlet />

            <div className="flex justify-center mt-4 space-x-4 w-full">
              <Link
                to="/auth/register"
                className={`px-4 py-2 w-full rounded-lg text-center ${
                  isRegistering ? "bg-[#7C78B3] text-white" : "bg-gray-300"
                }`}
              >
                Registrarme
              </Link>
              <Link
                to="/auth/login"
                className={`w-full px-4 py-2 rounded-lg text-center ${
                  !isRegistering ? "bg-[#7C78B3] text-white" : "bg-gray-300"
                }`}
              >
                Acceder
              </Link>
            </div>

            <p className="text-black font-medium text-lg">Continuar con</p>
            <div className="flex gap-5">
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

            <Link to="/" className="underline text-black mt-4">
              Ir a inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
