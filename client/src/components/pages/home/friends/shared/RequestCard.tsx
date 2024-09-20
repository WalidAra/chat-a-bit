import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";
import { Button } from "@/components/atoms/ui/button";
import { useSocket } from "@/hooks";

type Props = {
  request: EntityWithUser;
};

const RequestCard = ({ request }: Props) => {
  const socket = useSocket();

  return (
    <AccountCard user={request.user}>
      <div className="flex items-center gap-2">
        <Button size={"sm"} variant={"outline"}>
          Accept
        </Button>
        <Button
          onClick={() => {
            if (socket) {
              socket.emit("cancelFriendRequest", {
                requestId: request.id,
              });
            }
          }}
          size={"sm"}
          variant={"destructive"}
          className="z-20"
        >
          Decline
        </Button>
      </div>
    </AccountCard>
  );
};

export default RequestCard;
