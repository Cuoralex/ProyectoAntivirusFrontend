import express from "express";
import { createRequestHandler } from "@remix-run/express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carga dinámica del build generado por Remix
const build = await import("./build/server/index.js");

const app = express();

app.use(express.static("public"));

app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV || "development",
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${port}`);
});
