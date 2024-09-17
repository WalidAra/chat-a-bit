import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Button } from "@/components/atoms/ui/button";
import { useSocket } from "@/hooks";
import { Client } from "@/types";
import { useState } from "react";

type Props = {
  user: Client;
};

const FoundUserCard = ({ user }: Props) => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const socket = useSocket();

  return (
    <div className="w-full flex items-center justify-between p-2 hover:bg-muted/60 rounded cursor-pointer duration-100">
      <div className="flex items-center gap-2">
        <Avatar className="border w-10 h-10">
          <AvatarImage src={user.image || ""} alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-xs font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground leading-none">
            {user.email}
          </p>
        </div>
      </div>

      <Button
        onClick={() => {
          setIsSent(true);
          if (socket) {
            socket.emit("sendFriendRequest", { receiverId: user.id });
          }
        }}
        variant={"outline"}
        size={"sm"}
      >
        {isSent ? "Friend request sent" : "Send friend request"}
      </Button>
    </div>
  );
};

export default FoundUserCard;
