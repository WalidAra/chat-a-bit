import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { AccountCard } from "./shared";
import { LuList } from "react-icons/lu";
import { LuGrid } from "react-icons/lu";

const Friends = () => {
  return (
    <section className="w-full flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Input className=" w-full" placeholder="Search" />

        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size="icon">
            <LuGrid className="size-5" />
          </Button>
          <Button variant={"ghost"} size="icon">
            <LuList className="size-5" />
          </Button>
        </div>
      </div>

      <AccountCard />
      <AccountCard />
      <AccountCard />
    </section>
  );
};

export default Friends;
