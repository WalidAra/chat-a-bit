import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";
import { Button } from "@/components/atoms/ui/button";

type Props = {
  request: EntityWithUser;
};

const FriendContainer = ({ request }: Props) => {
  return (
    <AccountCard user={request.user}>
      <Button variant={"destructive"} size={"sm"}>
        Delete
      </Button>
    </AccountCard>
  );
};

export default FriendContainer;
