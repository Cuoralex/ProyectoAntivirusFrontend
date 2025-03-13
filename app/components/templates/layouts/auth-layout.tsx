import { useState, useEffect } from "react";
import RegisterPage from "/app/routes/register";
import LoginPage from "/app/routes/login";
import { Link, useSearchParams } from "@remix-run/react";
import "/app/styles/global.css";
import SuccessModal from "/app/components/organisms/success-modal/sucess-modal";
import { useAuthStore } from "/app/store.ts";

export default function AuthLayout() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalOpen = useAuthStore((state) => state.registrationSuccess);
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  useEffect(() => {
    if (searchParams.get("mode") === "login") {
      setIsRegistering(false);
    }
  }, [searchParams]);

  return (
    <div className="h-screen min-h-screen bg-white w-screen flex justify-center items-center gap-2 px-8 lg:gap-0 xl:gap-32 relative">
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setRegistrationSuccess(false);
          setSearchParams({ mode: "login" });
        }}
      />

      <img
        src="/app/assets/images/antivirus_avatar.png"
        alt="Antivirus Avatar"
        loading="lazy"
        className="hidden lg:block lg:max-w-[514px] h-auto"
      />
      <div className="bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.2)] flex justify-start flex-col items-center gap-4 lg:gap-4 rounded-lg w-[488px] h-auto pb-8 relative z-10">
        <h1 className="text-center text-3xl text-black font-semibold mt-12">
          {isRegistering ? "Registrarme" : "Iniciar sesión"}
        </h1>

        {isRegistering ? <RegisterPage /> : <LoginPage />}

        <div className="flex justify-center mt-4 space-x-4 px-14 w-full">
          <button
            onClick={() => setIsRegistering(true)}
            className={`px-4 py-2 w-full rounded-lg ${
              isRegistering ? "bg-[#7C78B3] text-white" : "bg-gray-300"
            }`}
          >
            Registrarme
          </button>
          <button
            onClick={() => setIsRegistering(false)}
            className={`w-full px-4 py-2 h-auto rounded-lg ${
              !isRegistering
                ? "bg-[#7C78B3] text-white"
                : "bg-white text-black border border-gray-400"
            }`}
          >
            Acceder
          </button>
        </div>
        <p className="text-black font-medium text-lg">Continuar con</p>
        <div className="flex gap-5">
          <img
            src="/app/assets/icons/google.png"
            alt="Google"
            loading="lazy"
            className="max-w-8 h-auto"
          />
          <img
            src="/app/assets/icons/facebook.png"
            alt="Facebook"
            loading="lazy"
            className="max-w-8 h-auto"
          />
        </div>
        <Link to="/" className="underline text-black">
          Ir a inicio
        </Link>
      </div>
    </div>
  );
}
