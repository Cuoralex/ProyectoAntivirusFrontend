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
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <GeneralHeader />

      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">

          <SuccessModal
            isOpen={isModalOpen}
            onClose={() => setRegistrationSuccess(false)}
          />

          {/* Avatar - solo visible en escritorio */}
          <div className="hidden lg:flex justify-center items-center">
            <img
              src="/antivirus-avatar.png"
              alt="Antivirus Avatar"
              loading="lazy"
              className="w-48 h-48 xl:w-60 xl:h-60 rounded-full object-contain"
            />
          </div>

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
