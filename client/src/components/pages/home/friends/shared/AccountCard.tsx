import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { defaultPfp } from "@/constants";
import { Client } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/ui/dialog";


const AccountCard = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Client;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-full flex items-center hover:bg-gray-50 cursor-pointer duration-200 justify-between p-2 border-input rounded-md border">
          <div className="flex items-center gap-3 shrink">
            <Avatar className="border w-10 h-10">
              <AvatarImage src={user.image || defaultPfp} alt="Image" />
              <AvatarFallback> {user.name} </AvatarFallback>
            </Avatar>

            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none"> {user.name} </p>
              <div className="w-full flex gap-1 items-center text-xs text-muted-foreground ">
                <p className="line-clamp-1">Online</p>
              </div>
            </div>
          </div>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AccountCard;
