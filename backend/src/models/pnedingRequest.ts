import { prisma } from "@/config";
import { userSelection } from "@/constants";

export const createPendingRequest = async (
  clientId: string,
  userId: string
) => {
  const pendingRequest = await prisma.pendingRequests.create({
    data: {
      clientId,
      userId,
    },
    include: {
      User: {
        select: userSelection,
      },
    },
  });

  return pendingRequest;
};

export const deletePendingRequest = async (id: string) => {
  const deletedPendingRequest = await prisma.pendingRequests.delete({
    where: {
      id,
    },
  });

  return deletedPendingRequest;
};
