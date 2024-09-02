import express from "express";
const router = express.Router();

router.use("/client" , require("./client").default);

export default router;
