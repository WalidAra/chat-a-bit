import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Link } from "react-router-dom";
import { LuCheckCheck } from "react-icons/lu";
import { Chat, Client, Message } from "@/types";
import { defaultPfp } from "@/constants";

type Props = {
  chat: Chat & { message: Message & { sender: Client } };
};

const ChatCard = ({ chat }: Props) => {
  const {
    message: { sender, content, createdAt },
  } = chat;

  return (
    <Link
      to={`/chats/${chat.id}`}
      className="flex justify-between items-center gap-4 p-2 rounded-lg border hover:bg-muted border-border"
    >
      <div className="flex flex-1 items-center gap-4">
        <Avatar className="border w-10 h-10">
          <AvatarImage src={sender.image || defaultPfp} alt="Image" />
          <AvatarFallback> {sender.name} </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none"> {sender.name} </p>
          <div className="w-full flex gap-1 items-center text-xs text-muted-foreground ">
            <p className="line-clamp-1">{content}</p>
            <p>2h</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {createdAt.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="text-green-600">
        <LuCheckCheck />
      </div>
    </Link>
  );
};
export default ChatCard;
