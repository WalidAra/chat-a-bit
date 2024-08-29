console.clear();

import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";

import { configENV } from "@/config";
import router from "@/routes";
import { logger } from "@/scripts";

const PORT = configENV.port || 3000;
const swaggerDocument = YAML.load("./swagger.yaml");

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => logger(app, Number(PORT)));
