/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { LuList } from "react-icons/lu";
import { LuGrid } from "react-icons/lu";
import { useAuth, useFetch, useSocket } from "@/hooks";
import { EntityWithUser } from "@/types";
import { useEffect } from "react";
import PendingCard from "./shared/PendingCard";

const Pending = () => {
  const { token } = useAuth();
  const { isLoading, response, setResponse } = useFetch<EntityWithUser[]>({
    endpoint: "pending",
    feature: "client",
    method: "GET",
    accessToken: token,
    includeAccessToken: true,
  });

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("pending", (data: EntityWithUser) => {
        setResponse((prev) =>
          prev ? { ...prev, data: [...prev.data, data] } : null
        );
      });
    }
  }, [socket]);

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
          response.data.map((user) => (
            <PendingCard request={user} key={user.id} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-muted-foreground">Pending list is empty</p>
          </div>
        ))
      )}
    </section>
  );
};

export default Pending;
