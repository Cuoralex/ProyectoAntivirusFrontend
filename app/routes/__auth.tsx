// routes/auth.tsx
import AuthLayout from "../components/templates/layouts/auth-layout";
import { Outlet } from "@remix-run/react";

export default function AuthRouteLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
