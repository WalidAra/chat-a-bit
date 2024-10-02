import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Link } from "react-router-dom";
import { LuCheckCheck } from "react-icons/lu";
import { defaultPfp } from "@/constants";
import { ChatProps } from "./ChatPanel";

type Props = {
  chat: ChatProps;
};

const ChatCard = ({ chat }: Props) => {
  const { message, id, image, name } = chat;

  return (
    <Link
      to={`/chats/${id}`}
      className="flex justify-between items-center gap-4 p-2 rounded-lg border hover:bg-muted border-border"
    >
      <div className="flex flex-1 items-center gap-4">
        <Avatar className="border w-10 h-10">
          <AvatarImage src={image || defaultPfp} alt="Image" />
          <AvatarFallback> {name} </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none"> {name} </p>
          <div className="w-full flex gap-1 items-center text-xs text-muted-foreground ">
            <p className="line-clamp-1">
              {message ? message.content : "it's fresh chat"}
            </p>
            <p>2h</p>
          </div>
          {message && (
            <p className="text-xs text-muted-foreground">
              {message.createdAt.toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <div className="text-green-600">
        <LuCheckCheck />
      </div>
    </Link>
  );
};
export default ChatCard;
