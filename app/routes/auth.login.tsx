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
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return json({ error: data?.message ?? "Login fallido" }, { status: 401 });
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
