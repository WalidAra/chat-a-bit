import ChatCard from "./ChatCard";
import React from "react";
import { ChatProps } from "./ChatPanel";

type Props = {
  chats: ChatProps[];
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
