import express from "express";
const router = express.Router();

router.use("/auth", require("./auth").default);
router.use("/oauth", require("./oauth").default);

export default router;
