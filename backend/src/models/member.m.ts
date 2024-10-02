import { prisma } from "@/config";

export const createMembers = async (chatId: string, members: string[]) => {
  const membersData = members.map((member) => ({
    chatId,
    userId: member,
  }));

  await prisma.member.createMany({
    data: membersData,
  });
};
