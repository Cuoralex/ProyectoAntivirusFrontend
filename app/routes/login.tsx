import { Form } from "@remix-run/react";

export default function LoginForm() {
  return (
    <Form
      method="post"
      action="/auth"
      className="flex flex-col items-center text-gray-500 w-full h-full px-12 gap-6"
    >
      <div className="flex flex-col items-start w-full relative">
        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="email"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          /*   value={formData.fullname}
          onChange={handleInputChange} */
        />
        <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
          {/*  {actionData?.fieldErrors?.fullname || ""} */}
        </p>
      </div>

      <div className="flex flex-col items-start w-full relative">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          className="outline-none rounded-lg bg-white border border-gray-400 px-3 py-1 w-full 
             appearance-auto focus:outline-none focus:ring-2 focus:ring-[#7C78B3] 
             text-gray-700 placeholder-gray-500"
          /*  value={formData.email}
          onChange={handleInputChange} */
        />
        {/*  {emailError && (
          <p className="text-red-500 absolute top-9 text-[10px] md:top-8 md:text-base">
            {emailError}
          </p>
        )} */}
      </div>

      <button
        type="button"
        /*  onClick={handleSubmit}
        className={`px-4 py-2 rounded-lg w-full ${
          isFormValid
            ? "bg-[#7C78B3] text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        disabled={!isFormValid} */
      >
        Ingresar
      </button>
    </Form>
  );
}
