import express from "express";
const router = express.Router();
import publicRoutes from "./public";
import privateRoutes from "./private";
import { checkAuth } from "@/middlewares";

router.use("/public", publicRoutes);
router.use("/private", checkAuth as express.RequestHandler, privateRoutes);

export default router;
