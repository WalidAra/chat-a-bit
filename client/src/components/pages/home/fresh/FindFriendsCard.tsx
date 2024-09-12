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
    <Card className="p-2 text-center w-[90%] mx-auto md:w-[400px]">
      <CardHeader>
        <CardTitle>Find Friends</CardTitle>
        <CardDescription>
          You don't have any chats yet. Click the button below to find friends
          and start messaging.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={"/friends"} className="w-full">
          <Button className="w-64" >Find Friends</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FindFriendsCard;
