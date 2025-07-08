// ✅ Archivo: app/routes/logout.tsx
import { redirect, type LoaderFunction } from "@remix-run/node";
import { authToken } from "~/utils/session.server";
import { userRole } from "~/utils/session-role.server";
import { userEmail } from "~/utils/session-email.server";

export const loader: LoaderFunction = async () => {
  const headers = new Headers();
  headers.append("Set-Cookie", await authToken.serialize("", { maxAge: 0 }));
  headers.append("Set-Cookie", await userRole.serialize("", { maxAge: 0 }));
  headers.append("Set-Cookie", await userEmail.serialize("", { maxAge: 0 }));

  return redirect("/auth/login", { headers });
};
