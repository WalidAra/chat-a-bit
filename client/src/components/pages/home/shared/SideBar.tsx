import { Button } from "@/components/atoms/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/atoms/ui/tooltip";
import { Triangle } from "lucide-react";
import { LuBell } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>

      <nav className="grid gap-1 p-2">
        <TooltipProvider delayDuration={1.5}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-lg ${isActive('/friends') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                aria-label="friends"
              >
                <LuUsers2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Friends
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-lg ${isActive('/notifications') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                aria-label="Notifications"
              >
                <LuBell className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Notifications
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-lg ${isActive('/settings') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                aria-label="Setting"
              >
                <LuSettings className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Setting
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-lg ${isActive('/profile') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                aria-label="Profile"
              >
                <LuUser2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideBar;