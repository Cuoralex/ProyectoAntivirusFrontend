import { redirect, type LoaderFunction } from "@remix-run/node";
import { authToken } from "../utils/session.server";

export const loader: LoaderFunction = async () => {
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await authToken.serialize("", {
        maxAge: 0,
      }),
    },
  });
};
