import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { Button } from "@/components/atoms/ui/button";
import { LuMoreVertical } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { Link } from "react-router-dom";

const AccountCard = () => {
  return (
    <Link
      to={"/"}
      className="w-full flex items-center hover:bg-gray-50 cursor-pointer duration-200 justify-between p-2 border-input rounded-md border"
    >
      <div className="flex items-center gap-3 shrink">
        <Avatar className="border w-10 h-10">
          <AvatarImage src="/placeholder-user.jpg" alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <div className="w-full flex gap-1 items-center text-xs text-muted-foreground ">
            <p className="line-clamp-1">Online</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* <Button
          variant={"secondary"}
          className="rounded-full text-muted-foreground hover:text-foreground"
          size={"icon"}
        >
          <LuMessageCircle className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"secondary"}
              className="rounded-full text-muted-foreground hover:text-foreground"
              size={"icon"}
            >
              <LuMoreVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 cursor-pointer">
              Block
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </Link>
  );
};

export default AccountCard;
