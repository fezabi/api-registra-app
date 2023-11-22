import express from "express";
import morgan from "morgan";
// Routes
import usuarioRoutes from "./routes/usuario.route";

import config from "./config";

// Accede a las variables de entorno
const port = config.APP.PORT;

const urlBase = config.APP.URL_BASE;

const app = express();

// Settings
app.set("port", port);

// Middlewares
app.use(morgan("dev"));
// app.use(express.json());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use(`${urlBase}usuario`, usuarioRoutes);

export default app;
