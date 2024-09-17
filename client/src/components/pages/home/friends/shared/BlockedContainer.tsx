import { Button } from "@/components/atoms/ui/button";
import AccountCard from "./AccountCard";
import { EntityWithUser } from "@/types";

type Props = {
  request: EntityWithUser;
};

const BlockedContainer = ({ request }: Props) => {
  return (
    <AccountCard user={request.user}>
      <Button size={"sm"}>unblock</Button>
    </AccountCard>
  );
};

export default BlockedContainer;
