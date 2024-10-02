import { redisClient } from "@/helpers";
import { asyncHandler } from "@/scripts/asyncHandler";
import { Request, Response } from "express";

export const getUserLastChat = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;
    const lastChat = await redisClient.hGet("lastChat", id);

    if (!lastChat) {
      return res.status(404).json({
        status: false,
        message: "No chat found",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "Last chat found",
      data: lastChat,
    });
  }
);

export const setUserLastChat = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;
    const { chatId } = req.body;

    await redisClient.hSet("lastChat", id, chatId);
  }
);
