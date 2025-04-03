// components/organisms/login-form/login-form.tsx
import { Form } from "@remix-run/react";
import { useState } from "react";

interface LoginFormProps {
  actionData?: {
    fieldErrors?: {
      email?: string;
      password?: string;
    };
    error?: string;
  };
}

export default function LoginForm({ actionData }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      method="post"
      className="flex flex-col items-center text-gray-500 w-full h-full px-12 gap-6"
    >
      <div className="flex flex-col items-start w-full relative">
        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
            appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
            text-gray-700 placeholder-gray-500"
        />
        {actionData?.fieldErrors?.email && (
          <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
            {actionData.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
            appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
            text-gray-700 placeholder-gray-500"
        />
        {actionData?.fieldErrors?.password && (
          <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
            {actionData.fieldErrors.password}
          </p>
        )}
      </div>

      <div className="h-2">
        {actionData?.error && (
          <p className="text-red-500 text-sm">{actionData.error}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-lg w-full bg-[#7C78B3] text-white"
      >
        Ingresar
      </button>
    </Form>
  );
}
