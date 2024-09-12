import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Link } from "react-router-dom";

const ChatCard = () => {
  return (
    <Link
      to={"/"}
      className="flex justify-between items-center gap-4 p-2 rounded-lg border hover:bg-muted border-border"
    >
      <div className="flex flex-1 items-center gap-4">
        <Avatar className="border w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <div className="w-full flex gap-1 items-center text-xs text-muted-foreground ">
            <p className="line-clamp-1">hey what&apos;s going on? &middot;</p>
            <p>2h</p>
          </div>
          <p className="text-xs text-muted-foreground">4:30AM</p>
        </div>
      </div>
      <div className=""></div>
    </Link>
  );
};

export default ChatCard;
