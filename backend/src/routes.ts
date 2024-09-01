import express from "express";
import { checkHealth } from "./middlewares";
const router = express.Router();
import api from "./core/apis";

router.get("/health", checkHealth);
router.use("/api", api);

export default router;
