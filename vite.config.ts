import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      // 🔥 AQUÍ es donde va la configuración de rutas personalizadas
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index.tsx", { index: true });
          route("about-us", "routes/about-us.tsx");

          // Layout de autenticación
          route("auth", "routes/__auth.tsx", () => {
            route("login", "routes/auth.login.tsx");
            route("register", "routes/auth.register.tsx");
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
