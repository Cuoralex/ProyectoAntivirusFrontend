import { json, type ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import AuthLayout from "../components/templates/layouts/auth-layout";
import { useAuthStore } from "../store";

export default function AuthPage() {
  const actionData = useActionData<typeof action>();
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  useEffect(() => {
    if (actionData?.success) {
      console.log("✅ Registro exitoso, activando modal");
      setRegistrationSuccess(true);
    }
  }, [actionData, setRegistrationSuccess]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <AuthLayout />
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("application/json")) {
      return json(
        { error: "Solicitud inválida. Se esperaba JSON." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, password, confirmPassword, birthdate } =
      body;

    const fieldErrors: Record<string, string> = {};

    if (!fullName) fieldErrors.fullname = "El nombre es obligatorio.";
    if (!email) fieldErrors.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      fieldErrors.email = "Correo inválido.";
    if (!password) fieldErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      fieldErrors.password = "Debe tener al menos 6 caracteres.";
    if (!confirmPassword)
      fieldErrors.confirmPassword = "Confirma la contraseña.";
    else if (password !== confirmPassword)
      fieldErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!birthdate)
      fieldErrors.birthdate = "La fecha de nacimiento es obligatoria.";
    else {
      try {
        const parsedDate = new Date(birthdate);
        if (isNaN(parsedDate.getTime())) {
          fieldErrors.birthdate = "Fecha de nacimiento inválida.";
        } else {
          body.birthdate = parsedDate.toISOString();
        }
      } catch (error) {
        fieldErrors.birthdate = "Fecha de nacimiento inválida.";
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return json({ fieldErrors }, { status: 400 });
    }

    const requestData = {
      fullName,
      email,
      phone,
      role: "user",
      password,
      birthdate: body.birthdate,
    };

    const response = await fetch("http://localhost:5055/api/v1/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const responseBody = await response.json();
    const statusCode = response.status;

    if (statusCode === 201) {
      return json({ success: true }, { status: 201 });
    }

    return json(responseBody, { status: statusCode });
  } catch (error) {
    console.error("Error inesperado en el servidor:", error);
    return json(
      { error: "Error en el servidor. Intenta más tarde." },
      { status: 500 }
    );
  }
};
