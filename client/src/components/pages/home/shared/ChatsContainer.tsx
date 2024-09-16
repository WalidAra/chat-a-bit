import { Chat, Client, Message } from "@/types";
import ChatCard from "./ChatCard";
import React from "react";

type Props = {
  chats: (Chat & { message: Message & { sender: Client } })[];
};

const ChatsContainer = ({ chats }: Props) => {
  return (
    <div className="grid gap-1 relative ">
      {chats.length > 0 ? (
        chats.map((chat) => <ChatCard chat={chat} key={chat.id} />)
      ) : (
        <div className=" text-center w-full">There is no chats</div>
      )}
    </div>
  );
};

export default React.memo(ChatsContainer);
