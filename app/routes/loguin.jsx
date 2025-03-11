import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [jump, setJump] = useState(false);

  useEffect(() => {
    setJump(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="flex bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        
        {/* Lado Izquierdo - Imagen Javi5 con animación */}
        <div className="w-1/2 hidden md:flex justify-center items-center bg-gray-100 p-4 rounded-l-lg">
          <motion.img 
            src="/images/Javi5.png" 
            alt="Javi5" 
            className="w-3/4 drop-shadow-lg"
            animate={jump ? { y: [0, -10, 0] } : {}}
            transition={{ repeat: 3, duration: 0.6 }}
          />
        </div>

        {/* Lado Derecho - Formulario de Inicio de Sesión */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Banco de Oportunidades</h2>

          {isAuthenticated ? (
            <>
              <p className="text-center text-gray-700">Hola, {user.name}!</p>
              <motion.button 
                className="w-full bg-red-500 text-white py-2 rounded-md mt-4 hover:bg-red-600 transition"
                onClick={() => logout({ returnTo: window.location.origin })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar sesión
              </motion.button>
              <motion.img 
                src="/images/Javi5.png" 
                alt="Javi5" 
                className="w-3/4 drop-shadow-lg hidden md:block mx-auto mt-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 2, duration: 0.5 }}
              />
            </>
          ) : (
            <>
              <input type="email" placeholder="Correo electrónico" className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              <input type="password" placeholder="Contraseña" className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

              <div className="flex gap-2">
                <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-yellow-500 transition">Iniciar sesión</button>
                <button className="w-full border py-2 rounded-md hover:bg-gray-100 transition">Registrarse</button>
              </div>

              <p className="text-sm text-blue-600 text-center mt-3 cursor-pointer hover:underline">¿Olvidaste tu contraseña?</p>

              {/* Inicio de Sesión con Redes Sociales */}
              <div className="flex flex-col gap-3 mt-6">
                <button 
                  onClick={() => loginWithRedirect({ connection: "google-oauth2" })} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md bg-yellow-400 text-white hover:bg-yellow-600 transition"
                >
                  <img src="/images/google.png" alt="Google" className="w-6 h-6" />
                  <span>Ingresa con Google</span>
                </button>
                <button 
                  onClick={() => loginWithRedirect({ connection: "facebook" })} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md bg-blue-900 text-white hover:bg-blue-950 transition"
                >
                  <img src="/images/facebook.png" alt="Facebook" className="w-6 h-6" />
                  <span>Ingresa con Facebook</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
