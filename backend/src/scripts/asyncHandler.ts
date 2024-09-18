import { Request, Response } from "express";

export const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
};
