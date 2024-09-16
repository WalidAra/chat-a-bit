import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { AccountCard } from "./shared";
import { LuList } from "react-icons/lu";
import { LuGrid } from "react-icons/lu";
import { useAuth, useFetch } from "@/hooks";
import { EntityWithUser } from "@/types";

const Friends = () => {
  const { token } = useAuth();
  const { isLoading, response } = useFetch<EntityWithUser[]>({
    endpoint: "friends",
    feature: "client",
    method: "GET",
    accessToken: token,
    includeAccessToken: true,
  });

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

      {isLoading ? (
        <></>
      ) : (
        response?.status === true &&
        (response.data.length > 0 ? (
          response.data.map((friend) => <AccountCard key={friend.id} />)
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-muted-foreground">No friends found</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Friends;
