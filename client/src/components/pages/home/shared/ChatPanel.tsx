/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/atoms/ui/input";
import { useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import ChatCard from "./ChatCard";

const ChatPanel = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [chats, setChats] = useState<any>([]);

  return (
    <div className="xl:w-80 md-[250px] overflow-auto h-full flex flex-col gap-2 border-r border-border p-4">
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2 ">
          <h1 className="font-semibold capitalize ">Messenger</h1>
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

      <div className="grid gap-1 relative ">
        {chats.length > 0 ? (
          chats.map((chat: any, index: number) => <ChatCard key={index} />)
        ) : (
          <div className="absolute top-0 text-center w-full" >There is no chats</div>
        )}
      </div>
    </div>
  );
};
export default ChatPanel;
