import { prisma } from "@/config";
import { userSelection } from "@/constants";

export const createFriendRequest = async (clientId: string, userId: string) => {
  const friendRequest = await prisma.friendRequests.create({
    data: {
      clientId,
      userId,
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

  const { User, Client, ...requestDetails } = friendRequest;
  return { user: User, client: Client, id: requestDetails.id };
};

export const deleteFriendRequest = async (id: string) => {
  const deletedFriendRequest = await prisma.friendRequests.delete({
    where: {
      id,
    },
  });

  return deletedFriendRequest;
};
