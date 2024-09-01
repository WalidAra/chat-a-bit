import { login, refresh, register } from "@/core/controllers";
import express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh", refresh);

export default router;
