import { Button } from "@/components/atoms/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/ui/card";
import { Link } from "react-router-dom";

const FindFriendsCard = () => {
  return (
    <Card className="p-4 text-center w-80">
      <CardHeader>
        <CardTitle>Find Friends</CardTitle>
        <CardDescription>
          You don't have any chats yet. Click the button below to find friends
          and start messaging.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={"/"} className="w-full">
          <Button>Find Friends</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FindFriendsCard;
