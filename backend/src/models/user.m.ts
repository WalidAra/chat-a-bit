import { prisma } from "@/config";
import { userSelection } from "@/constants";

export const getUserByID = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: userSelection,
  });
};
