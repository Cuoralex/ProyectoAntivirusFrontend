/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/build/",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  output: "static", // <--- CLAVE para Static Web Apps
};
