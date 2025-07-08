import { createCookie } from "@remix-run/node";

export const userEmail = createCookie("userEmail", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  encode: (value: string) => value,
  decode: (value: string) => value,
});
