import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authToken } from "~/utils/session.server";
import { userRole } from "~/utils/session-role.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authToken.parse(cookieHeader);
  const role = await userRole.parse(cookieHeader);

  if (!token || role !== "admin") {
    return redirect("/auth/login");
  }

  return null;
}
