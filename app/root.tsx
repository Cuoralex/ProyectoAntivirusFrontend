import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import "./styles/variables.css";
import "./tailwind.css";
import "./styles/global.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { LAYOUT_FOR_ROUTES } from "./utils/constants/routes";
import NotFoundPage from "./routes/404";
import { authToken } from "./utils/session.server";
import { json, type LoaderFunctionArgs, LinksFunction } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authToken.parse(cookieHeader);
  return json({ isLoggedIn: !!token });
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  let errorMessage = "Ocurrió un error inesperado.";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-red-600">¡Ups! Algo salió mal</h1>
      <p className="text-xl mt-4 text-gray-600">{errorMessage}</p>
    </div>
  );
}

// 🔹 Manejo de rutas no encontradas (404)
export function CatchBoundary() {
  return <NotFoundPage />;
}

export default function App() {
  const matches = useMatches();

  const matchedLayout = LAYOUT_FOR_ROUTES.find((data) =>
    data.routes.some((route) =>
      matches[matches.length - 1]?.pathname?.startsWith(route)
    )
  );

  const LayoutComponent = matchedLayout
    ? matchedLayout.layout
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
}
