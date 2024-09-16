import express from "express";
const router = express.Router();

router.use("/client", require("./client").default);
router.use("/chats", require("./chat").default);

export default router;
