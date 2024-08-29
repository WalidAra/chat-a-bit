import { Error500 } from "@/constants";
import { Request, Response } from "express";

const checkHealth = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: true,
      message: "Server is running",
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("~> Error :", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json(Error500);
  }
};

export default checkHealth;
