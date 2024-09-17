import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";
import { Button } from "@/components/atoms/ui/button";

type Props = {
  request: EntityWithUser;
};

const RequestCard = ({ request }: Props) => {
  return (
    <AccountCard user={request.user}>
      <div className="flex items-center gap-2">
        <Button size={"sm"} variant={"outline"}>
          Accept
        </Button>
        <Button size={"sm"} variant={"destructive"}>
          Decline
        </Button>
      </div>
    </AccountCard>
  );
};

export default RequestCard;
