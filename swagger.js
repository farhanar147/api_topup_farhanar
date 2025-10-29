import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TestAPI Nutech - Farhan Ar rasyid",
      version: "1.0.0",
      description:
        "API untuk registrasi, login, cek saldo, topup, dan transaksi",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // path absolut biar pasti kebaca
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs: http://localhost:3000/api-docs");
};
