import GeneralLayout from "~/components/templates/layouts/general-layout";
import AuthLayout from "~/components/templates/layouts/auth-layout";
import DashboardLayout from "~/components/templates/layouts/dashboard-layout";

const LAYOUT_FOR_ROUTES = [
  {
    routes: ["/", "/opportunities", "/about-us", "/404"],
    layout: GeneralLayout,
  },
  {
    routes: ["/auth", "/auth/login", "/auth/register", "/auth_index"],
    layout: AuthLayout,
  },
  {
    routes: [
      "/admin",
      "/admin/index",
      "/admin/users",
      "/admin/users/:id",
      "/admin/opportunities",
      "/admin/institutions",
      "/admin/services",
      "/admin/service-types",
      "/admin/opportunity-types",
      "/admin/config",
    ],
    layout: DashboardLayout,
  },
];

export { LAYOUT_FOR_ROUTES };
