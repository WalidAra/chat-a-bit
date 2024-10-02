import { prisma } from "@/config";
import { userSelection } from "@/constants";
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

export const getUserChats = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const chats = await prisma.chat.findMany({
      where: {
        Member: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        Message: {
          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
        Member: {
          include: {
            user: {
              select: userSelection,
            },
          },
        },
      },
    });

    if (chats.length === 0) {
      return res.status(200).json({
        status: true,
        message: "User chats fetched successfully",
        data: [],
      });
    }

    const formattedChats = chats.map(({ Member, Message, ...chat }) => {
      const { name, ...chatDetails } = chat;

      if (chat.isGroup === false) {
        const formattedChat = {
          ...chatDetails,
          name:
            id === Member[0].userId ? Member[1].user.name : Member[0].user.name,
          image:
            id === Member[0].userId
              ? Member[1].user.image
              : Member[0].user.image,

          message: Message.length ? Message[0] : null,
        };
        return formattedChat;
      } else if (chat.isGroup === true) {
        const formattedChat = {
          ...chat,
          message: Message.length ? Message[0] : null,
        };
        return formattedChat;
      }
    });

    return res.status(200).json({
      status: true,
      message: "User chats fetched successfully",
      data: formattedChats,
    });
  }
);
export const getUserFriends = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const users = await prisma.friend.findMany({
      where: {
        clientId: id,
      },
      include: {
        User: {
          select: userSelection,
        },
      },
    });

    const formattedUsers = users.map(({ User, ...friendDetails }) => ({
      user: User,
      id: friendDetails.id,
    }));

    res.status(200).json({
      status: true,
      message: "User friends fetched successfully",
      data: formattedUsers,
    });
  }
);

export const getUserBlockedList = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const users = await prisma.blocked.findMany({
      where: {
        clientId: id,
      },
      include: {
        User: {
          select: userSelection,
        },
      },
    });

    const formattedUsers = users.map(({ User, ...blockedDetails }) => ({
      user: User,
      id: blockedDetails.id,
    }));

    res.status(200).json({
      status: true,
      message: "User blocked list fetched successfully",
      data: formattedUsers,
    });
  }
);

export const getUserFriendRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const users = await prisma.friendRequests.findMany({
      where: {
        clientId: id,
      },
      include: {
        User: {
          select: userSelection,
        },
      },
    });

    const formattedUsers = users.map(({ User, ...requestDetails }) => ({
      user: User,
      id: requestDetails.id,
    }));

    res.status(200).json({
      status: true,
      message: "User friend requests fetched successfully",
      data: formattedUsers,
    });
  }
);

export const getUserPendingRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    const users = await prisma.friendRequests.findMany({
      where: {
        userId: id,
      },
      include: {
        User: {
          select: userSelection,
        },
        Client: {
          select: userSelection,
        },
      },
    });

    const formattedUsers = users.map(({ User, Client, ...pendingDetails }) => ({
      user: User,
      id: pendingDetails.id,
      client: Client,
    }));

    res.status(200).json({
      status: true,
      message: "User pending requests fetched successfully",
      data: formattedUsers,
    });
  }
);
