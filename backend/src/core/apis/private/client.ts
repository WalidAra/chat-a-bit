import { deleteUser, getUserProfile } from "@/core/controllers";
import express from "express";
const router = express.Router();

router.get("/profile", getUserProfile);
router.delete("/delete", deleteUser);

export default router;
