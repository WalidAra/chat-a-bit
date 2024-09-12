import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Client } from "@/types";

type Props = {
  onClick: () => void;
  user: Client;
};

const FoundUserCard = ({ onClick, user }: Props) => {
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer duration-100"
    >
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
    </div>
  );
};

export default FoundUserCard;
