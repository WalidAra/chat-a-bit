import { prisma } from "@/config";

export const createFriend = async (clientId: string, userId: string) => {
  const friend = await prisma.friend.create({
    data: {
      clientId,
      userId,
    },
  });

  return friend;
};

export const deleteFriend = async (id: string) => {
  const deletedFriend = await prisma.friend.delete({
    where: {
      id,
    },
  });

  return deletedFriend;
};