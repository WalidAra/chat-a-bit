import {
//   createChat,
  getUserLastChat,
  setUserLastChat,
} from "@/core/controllers";
import express from "express";
const router = express.Router();

router.get("/last", getUserLastChat).post("/last", setUserLastChat);
// router.post("/", createChat);

export default router;
