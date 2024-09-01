import express from "express";
const router = express.Router();

router.use("/auth", require("./auth").default);

export default router;
