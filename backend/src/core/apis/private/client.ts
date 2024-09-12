import { deleteUser, getUserProfile, searchUsers } from "@/core/controllers";
import express from "express";
const router = express.Router();

router.get("/profile", getUserProfile);
router.delete("/delete", deleteUser);
router.get("/search", searchUsers);


export default router;
