import express from "express";
const router = express.Router();
import publicRoutes from "./public";
import privateRoutes from "./private";

router.use("/public", publicRoutes);
router.use("/private", privateRoutes);

export default router ;
