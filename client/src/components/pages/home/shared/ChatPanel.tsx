/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/atoms/ui/input";
import { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { useAuth, useFetch, useSocket } from "@/hooks";
import ChatsContainer from "./ChatsContainer";
import { Chat, Message } from "@/types";

export type ChatProps = Chat & { message: Message | null };

const ChatPanel = () => {
  const { token } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const { isLoading, response, setResponse } = useFetch<ChatProps[]>({
    endpoint: "chats",
    method: "GET",
    feature: "client",
    accessToken: token,
    includeAccessToken: true,
  });

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const refetchData = async (obj: ChatProps) => {
        setResponse((prev) => {
          if (prev && prev.data) {
            return {
              ...prev,
              data: [obj, ...prev.data],
            };
          }
          return prev;
        });
      };

      socket.on("new-chat", refetchData);

      return () => {
        socket.off("new-chat", refetchData);
      };
    }
  }, [socket]);

  return (
    <div className="xl:w-80 md-[250px] overflow-auto h-full hidden md:flex flex-col gap-4 border-r border-border p-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2 ">
          <div className="font-medium text-sm">Messenger</div>
          <LuPenSquare className="size-5" />
        </div>

        <div className="relative w-full">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>

      {isLoading === true ? (
        <></>
      ) : (
        <ChatsContainer chats={response?.data || []} />
      )}
    </div>
  );
};

export default ChatPanel;
