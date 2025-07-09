import { json, type ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { useAuthStore } from "~/store";
import RegisterForm from "~/components/organisms/register-form/register-form";


const API_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const fullName = formData.get("fullname");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");
  const birthdate = formData.get("birthdate");
  const role = formData.get("role") ?? "user";

  const fieldErrors: Record<string, string> = {};

  if (!fullName) fieldErrors.fullname = "El nombre es obligatorio.";
  if (!email) fieldErrors.email = "El correo es obligatorio.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string))
    fieldErrors.email = "Correo inválido.";
  if (!password) fieldErrors.password = "La contraseña es obligatoria.";
  else if ((password as string).length < 6)
    fieldErrors.password = "Debe tener al menos 6 caracteres.";
  if (!confirmPassword)
    fieldErrors.confirmPassword = "Confirma la contraseña.";
  else if (password !== confirmPassword)
    fieldErrors.confirmPassword = "Las contraseñas no coinciden.";
  if (!birthdate)
    fieldErrors.birthdate = "La fecha de nacimiento es obligatoria.";

  if (Object.keys(fieldErrors).length > 0) {
    return json({ fieldErrors }, { status: 400 });
  }

  const requestData = {
    fullName,
    email,
    phone,
    role,
    password,
    birthdate,
  };

  try {
    const response = await fetch(`${API_URL}/api/v1/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      return json(responseBody, { status: response.status });
    }

    return json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error del servidor:", error);
    return json({ error: "Error inesperado del servidor" }, { status: 500 });
  }
};

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  useEffect(() => {
    if (actionData?.success) {
      setRegistrationSuccess(true);
    }
  }, [actionData, setRegistrationSuccess]);

  return <RegisterForm />;
}
