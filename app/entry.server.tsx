import { PassThrough } from "node:stream";

import type { EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const acceptHeader = request.headers.get("Accept");
  const isJsonRequest = acceptHeader?.includes("application/json");

  if (isJsonRequest) {
    return handleJsonRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
  }

  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleJsonRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={5000}
      />,
      {
        async onShellReady() {
          shellRendered = true;

          try {
            if (responseStatusCode === 409) {
              responseHeaders.set("Content-Type", "application/json");

              resolve(
                new Response(
                  JSON.stringify({ error: "El correo ya está registrado." }),
                  {
                    headers: responseHeaders,
                    status: 409,
                  }
                )
              );
              return;
            }

            const responseBody = await request.text().catch(() => null);

            if (responseStatusCode >= 400) {
              responseHeaders.set("Content-Type", "application/json");

              resolve(
                new Response(
                  responseBody ||
                    JSON.stringify({ error: `Error ${responseStatusCode}` }),
                  {
                    headers: responseHeaders,
                    status: responseStatusCode,
                  }
                )
              );
              return;
            }
          } catch (error) {
            console.error("Error al procesar la respuesta JSON:", error);
          }

          resolve(
            new Response(null, {
              headers: responseHeaders,
              status: responseStatusCode || 200,
            })
          );
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          console.error("Error en la solicitud JSON:", error);

          if (shellRendered) {
            responseHeaders.set("Content-Type", "application/json");

            resolve(
              new Response(
                JSON.stringify({ error: "Error inesperado en el servidor" }),
                {
                  headers: responseHeaders,
                  status: 500,
                }
              )
            );
          }
        },
      }
    );

    setTimeout(abort, 5000);
  });
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
