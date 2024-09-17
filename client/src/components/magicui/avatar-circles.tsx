import { cn } from "@/lib/utils";
import { Client } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/ui/avatar";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Client[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<Client[]>>;
}

const AvatarCircles = ({
  className,
  avatarUrls,
  setSelectedUsers,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((user) => (
        <Avatar
          onClick={() => {
            const index = avatarUrls.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              avatarUrls.splice(index, 1);
              setSelectedUsers(avatarUrls);
            }
          }}
          key={user.id}
          className="border w-10 hover:scale-105 cursor-pointer duration-200 hover:border-red-500 relative h-10 border-white dark:border-gray-800"
        >
          <AvatarImage src={user.image || ""} alt="Image" />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default AvatarCircles;
