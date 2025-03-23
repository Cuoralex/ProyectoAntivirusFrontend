import { Form, useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store";
import "../styles/global.css";

interface ActionData {
  fieldErrors?: {
    fullname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  userExists?: string;
  error?: string;
}

export default function RegisterForm() {
  const actionData = useActionData<ActionData>();
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confirm_password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordLengthError, setPasswordLengthError] = useState<string | null>(
    null
  );
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const allFieldsFilled =
      formData.fullname.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.length === 10 &&
      formData.birthdate.trim() !== "" &&
      formData.password.length >= 6 &&
      formData.confirm_password.trim() !== "";

    const passwordsMatch = formData.password === formData.confirm_password;

    setPasswordError(
      !passwordsMatch && formData.confirm_password.length > 0
        ? "Las contraseñas no coinciden"
        : null
    );
    setPhoneError(
      formData.phone.length > 0 && formData.phone.length !== 10
        ? "El número debe contener 10 dígitos."
        : null
    );
    setPasswordLengthError(
      formData.password.length > 0 && formData.password.length < 6
        ? "La contraseña debe tener al menos 6 caracteres."
        : null
    );

    setIsFormValid(allFieldsFilled && passwordsMatch);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));

    if (name === "email") {
      setEmailError(null);
    }

    if (name === "email") {
      setEmailError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Ingresa un correo válido"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const requestData = {
      fullName: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirm_password,
      birthdate: new Date(formData.birthdate).toISOString().split("T")[0],
    };

    try {
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setEmailError("El correo ya está registrado.");
        } else {
          setEmailError(null);
        }
        return;
      }

      setEmailError(null);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <Form
      method="post"
      action="/auth"
      className="flex flex-col items-center text-gray-500 w-full h-full px-12 gap-6"
    >
      <div className="flex flex-col items-start w-full relative">
        <input
          type="text"
          name="fullname"
          placeholder="Nombre completo"
          autoComplete="name"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
          {actionData?.fieldErrors?.fullname || ""}
        </p>
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="email"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.email}
          onChange={handleInputChange}
        />
        {emailError && (
          <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
            {emailError}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          placeholder="Celular"
          autoComplete="tel"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
          {phoneError}
        </p>
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="date"
          name="birthdate"
          autoComplete="bday-day"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.birthdate}
          onChange={handleInputChange}
          style={{
            color: "#333",
          }}
        />
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="new-password"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.password}
          onChange={handleInputChange}
        />
        <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
          {actionData?.fieldErrors?.password || passwordLengthError || ""}
        </p>
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirme contraseña"
          autoComplete="new-password"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          value={formData.confirm_password}
          onChange={handleInputChange}
        />
        <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
          {passwordError || actionData?.fieldErrors?.confirmPassword || ""}
        </p>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={`px-4 py-2 rounded-lg w-full ${
          isFormValid
            ? "bg-[#7C78B3] text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        Enviar
      </button>
    </Form>
  );
}
