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
      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted"
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="grid grid-cols-1frauto items-center gap-2">
        <div className="flex flex-col">
          <h2 className="font-medium text-foreground">Ezio</h2>
          <div className="text-muted-foreground text-sm flex flex-col">
            <p className="line-clamp-1">hey , what's going on there ?</p>
            <p className="text-xs">4:30AM</p>
          </div>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default ChatCard;
