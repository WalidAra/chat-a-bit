import { prisma } from "@/config";
import { getUserByID, searchUsersByName } from "@/models";
import { asyncHandler } from "@/scripts/asyncHandler";
import { Request, Response } from "express";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const user = await getUserByID(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "User profile fetched successfully",
      data: user,
    });
  }
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = (req as any).user;

  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!deletedUser) {
    return res.status(404).json({
      status: false,
      message: "User not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const username = req.query.q;
  const users = await searchUsersByName(username as string);

  res.status(200).json({
    status: true,
    message: "Users fetched successfully",
    data: users,
  });
});
