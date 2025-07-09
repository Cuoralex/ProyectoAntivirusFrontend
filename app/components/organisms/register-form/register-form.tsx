// components/organisms/register-form/register-form.tsx
import { Form, useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store";
import "../../../styles/global.css";

interface ActionData {
  fieldErrors?: {
    fullname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  userExists?: string;
  error?: string;
  success?: boolean;
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
  const [passwordLengthError, setPasswordLengthError] = useState<string | null>(null);
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

  useEffect(() => {
    if (actionData?.success) {
      setRegistrationSuccess(true);
    }
  }, [actionData, setRegistrationSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));

    if (name === "email") {
      setEmailError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Ingresa un correo válido"
      );
    }
  };

  return (
    <Form
      method="post"
      action="/auth/register"
      className="flex flex-col items-center text-gray-500 w-full h-full px-12 gap-6"
    >
      <input type="hidden" name="role" value="user" />

      {/* Fullname */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="text"
          name="fullname"
          placeholder="Nombre completo"
          autoComplete="name"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs absolute top-9">
          {actionData?.fieldErrors?.fullname}
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="email"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.email}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs absolute top-9">
          {emailError || actionData?.fieldErrors?.email}
        </p>
      </div>

      {/* Phone */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          placeholder="Celular"
          autoComplete="tel"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs absolute top-9">{phoneError}</p>
      </div>

      {/* Birthdate */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="date"
          name="birthdate"
          autoComplete="bday"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.birthdate}
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="new-password"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.password}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs absolute top-9">
          {actionData?.fieldErrors?.password || passwordLengthError}
        </p>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirme contraseña"
          autoComplete="new-password"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full focus:ring-2 focus:ring-[#7C78B3]"
          value={formData.confirm_password}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs absolute top-9">
          {passwordError || actionData?.fieldErrors?.confirmPassword}
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
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
