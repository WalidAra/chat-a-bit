import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";
import { Button } from "@/components/atoms/ui/button";
import { useSocket } from "@/hooks";

type Props = {
  request: EntityWithUser;
};

const PendingCard = ({ request }: Props) => {
  const socket = useSocket();

  return (
    <AccountCard user={request.client}>
      <Button
        onClick={() => {
          if (socket) {
            socket.emit("cancelFriendRequest", {
              requestId: request.id,
            });
          }
        }}
        variant={"secondary"}
        size={"sm"}
      >
        Cancel
      </Button>
    </AccountCard>
  );
};

export default PendingCard;
