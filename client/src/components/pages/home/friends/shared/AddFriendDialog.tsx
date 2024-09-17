/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/ui/dialog";
import { Input } from "@/components/atoms/ui/input";
import { useState, useCallback } from "react";
import { LuLoader2, LuSearch } from "react-icons/lu";
import { useAuth, useAxios } from "@/hooks";
import { Client } from "@/types";
import FoundUserCard from "./FoundUserCard";

const AddFriendDialog = () => {
  const { token } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    users: [] as Client[],
    isLoading: false,
  });

  const findUser = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormState((prev) => ({ ...prev, isLoading: true }));

      try {
        const res = await useAxios<Client[]>({
          endpoint: `/search?q=${formState.name}`,
          method: "GET",
          feature: "client",
          accessToken: token,
          includeAccessToken: true,
        });

        if (res.status === true) {
          setFormState((prev) => ({
            ...prev,
            users: res.data,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Error finding user:", error);
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState.name, token]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add new friend</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new friend</DialogTitle>
          <DialogDescription>
            Search for a user by their username and add them as a friend.
          </DialogDescription>

          <div className="flex flex-col gap-4 pt-2">
            <form onSubmit={findUser} className="flex items-center gap-2">
              <Input
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
                id="username-input"
                type="text"
                placeholder="Enter a username"
                className="w-full text-sm outline-none bg-transparent"
                aria-describedby="username-description"
              />
              <Button
                type="submit"
                size="icon"
                variant="default"
                className="shrink-0"
              >
                <LuSearch className="size-5" />
              </Button>
            </form>

            <div className="w-full flex flex-col max-h-96 overflow-auto">
              {formState.isLoading ? (
                <div className="flex items-center justify-center">
                  <LuLoader2 className="animate-spin size-5" />
                </div>
              ) : formState.users.length > 0 ? (
                formState.users.map((user) => (
                  <FoundUserCard user={user} key={user.id} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  No users found
                </p>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
