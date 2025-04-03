import { createCookie } from "@remix-run/node";

export const authToken = createCookie("auth-token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 2,
});
