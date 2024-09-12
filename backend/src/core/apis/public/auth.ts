import { login, LogOut, refresh, register } from "@/core/controllers";
import express from "express";
const router = express.Router();

router.get("/refresh", refresh);
router.get("/logout", LogOut);
router.post("/login", login);
router.post("/register", register);

export default router;
