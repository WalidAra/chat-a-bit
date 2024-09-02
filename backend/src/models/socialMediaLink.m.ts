import { prisma } from "@/config";

export const createSocialMediaLink = async (
  type: "FACEBOOK" | "DISCORD" | "GITHUB" | "INSTAGRAM",
  url: string,
  isGroup: boolean,
  userId?: string,
  chatId?: string
) => {
  if (isGroup === true) {
    return await prisma.socialMediaLinks.create({
      data: {
        chatId: chatId as string,
        type: type,
        url: url,
      },
    });
  } else {
    return await prisma.socialMediaLinks.create({
      data: {
        userId: userId as string,
        type: type,
        url: url,
      },
    });
  }
};

export const createManySocialMediaLink = async (links: Array<{
  type: "FACEBOOK" | "DISCORD" | "GITHUB" | "INSTAGRAM",
  url: string,
  isGroup: boolean,
  userId?: string,
  chatId?: string
}>) => {
  return await prisma.socialMediaLinks.createMany({
    data: links.map(link => ({
      type: link.type,
      url: link.url,
      userId: link.isGroup ? undefined : link.userId,
      chatId: link.isGroup ? link.chatId : undefined,
    })),
  });
};

export const readSocialMediaLink = async (id: string) => {
  return await prisma.socialMediaLinks.findUnique({
    where: { id },
  });
};

export const updateSocialMediaLink = async (
  id: string,
  data: {
    type?: "FACEBOOK" | "DISCORD" | "GITHUB" | "INSTAGRAM",
    url?: string,
  }
) => {
  return await prisma.socialMediaLinks.update({
    where: { id },
    data,
  });
};

export const deleteSocialMediaLink = async (id: string) => {
  return await prisma.socialMediaLinks.delete({
    where: { id },
  });
};