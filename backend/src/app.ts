console.clear();

import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";
import router from "@/routes";

import { createServer } from "http";
import { configENV, passport, socketInitializer } from "@/config";
import { logger } from "@/scripts";

const PORT = configENV.port || 3000;
const swaggerDocument = YAML.load("./swagger.yaml");

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const httpServer = createServer(app);
socketInitializer(httpServer);

app.use("/", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

httpServer.listen(PORT, () => logger(app, Number(PORT)));
