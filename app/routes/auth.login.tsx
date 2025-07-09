import {
  json,
  redirect,
  type ActionFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import LoginForm from "~/components/organisms/login-form/login-form";
import { authToken } from "~/utils/session.server";
import { userRole } from "~/utils/session-role.server";
import { userEmail } from "~/utils/session-email.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authToken.parse(cookieHeader);
  if (token) {
    return redirect("/admin");
  }
  return null;
}

const API_URL = process.env.API_URL || import.meta.env.VITE_NEXT_PUBLIC_API_URL;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Datos inválidos." }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    return json({ error: "Respuesta inválida del servidor." }, { status: 500 });
  }

  if (!response.ok) {
    return json(
      {
        error:
          data?.message || data?.error || "Login fallido. Verifica tus datos.",
      },
      { status: response.status }
    );
  }

  const destination =
    data?.role === "admin" ? "/admin/index" : "/user-dashboard";

  const headers = new Headers();
  headers.append("Set-Cookie", await authToken.serialize(data.token));
  headers.append("Set-Cookie", await userRole.serialize(data.role));
  headers.append("Set-Cookie", await userEmail.serialize(data.email));

  return redirect(destination, { headers });
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  return <LoginForm actionData={actionData} />;
}
