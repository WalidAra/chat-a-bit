import { Input } from "@/components/atoms/ui/input";
import { useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import { useAuth, useFetch } from "@/hooks";
import ChatsContainer from "./ChatsContainer";
import { Chat, Client, Message } from "@/types";

const ChatPanel = () => {
  const { token } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const { isLoading, response } = useFetch<
    (Chat & { message: Message & { sender: Client } })[]
  >({
    endpoint: "chats",
    method: "GET",
    feature: "client",
    accessToken: token,
    includeAccessToken: true,
  });

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
