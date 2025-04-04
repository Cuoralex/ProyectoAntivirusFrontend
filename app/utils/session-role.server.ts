import { createCookie } from "@remix-run/node";

export const userRole = createCookie("userRole", {
  httpOnly: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 2,
});
