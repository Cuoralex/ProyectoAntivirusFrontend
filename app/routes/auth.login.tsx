// routes/login.tsx
import {
  json,
  redirect,
  type ActionFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import LoginForm from "~/components/organisms/login-form/login-form";
import { authToken } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authToken.parse(cookieHeader);
  if (token) {
    return redirect("/profile");
  }
  return null;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Datos inválidos." }, { status: 400 });
  }

  const response = await fetch("http://localhost:5055/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    return json(
      { error: responseBody?.message ?? "Login fallido" },
      { status: 401 }
    );
  }

  const token = responseBody?.token;
  if (!token) {
    return json({ error: "Token no recibido del backend." }, { status: 500 });
  }

  return redirect("/profile", {
    headers: {
      "Set-Cookie": await authToken.serialize(token),
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  return <LoginForm actionData={actionData} />;
}
