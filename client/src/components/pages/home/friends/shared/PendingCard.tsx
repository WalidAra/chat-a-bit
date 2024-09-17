import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";
import { Button } from "@/components/atoms/ui/button";

type Props = {
  request: EntityWithUser;
};

const PendingCard = ({ request }: Props) => {
  return (
    <AccountCard user={request.user}>
      <Button variant={"secondary"} size={"sm"}>
        Cancel
      </Button>
    </AccountCard>
  );
};

export default PendingCard;
