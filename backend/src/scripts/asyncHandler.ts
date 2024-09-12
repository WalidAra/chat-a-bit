import { Request, Response } from "express";

export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res); 
    } catch (error) {
      if (error instanceof Error) {
        console.error("~> Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
      res.status(500).json({
        status: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
};
