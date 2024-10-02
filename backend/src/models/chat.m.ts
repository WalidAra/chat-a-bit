import { prisma } from "@/config";
import { createMembers } from "./member.m";

// don't forget to include userId from handshake from parent function/controller
export const createChat = async (
  obj: { isGroup: boolean; name: string | undefined; members: string[] },
  userId: string
) => {
  const { isGroup, members, name } = obj;

  const newChat = await prisma.chat.create({
    data: {
      isGroup,
      name,
      ownerId: isGroup ? userId : null,
    },
  });

  await createMembers(newChat.id, members);



  if(isGroup === false){


  }

  return newChat;
};
