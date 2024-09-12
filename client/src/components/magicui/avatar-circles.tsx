import { cn } from "@/lib/utils";
import { Client } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/ui/avatar";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Client[];
}

const AvatarCircles = ({ className, avatarUrls }: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((user) => (
        <Avatar
          key={user.id}
          className="border w-10 h-10 border-white dark:border-gray-800"
        >
          <AvatarImage src={user.image || ""} alt="Image" />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default AvatarCircles;
