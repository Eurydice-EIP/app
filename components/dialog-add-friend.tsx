import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Search, UserRoundPlus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { addFriend, searchUser } from "@/lib/user";
import { UserFriend } from "@/types/entities/userFriend";
import { MsgAlertDialog } from "./msg-alert-dialog";
import { useTranslations } from "next-intl";

export function DialogAddFriend({
  triggerClassName,
  onFriendAdded,
}: {
  triggerClassName: string,
  onFriendAdded?: () => void,
}) {
  const tGlob = useTranslations("");
  const tAcc = useTranslations("account");
  const [userList, setUserList] = useState([] as UserFriend[]);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [queryStr, setQueryStr] = useState("");

  const loadUsers = async (query?: string) => {
    if (!query) {
      query = queryStr;
    } else {
      setQueryStr(query);
    }

    try {
      const results = await searchUser({ query: query });
      setUserList(results as UserFriend[]);
    } catch {
      setErrorOpen(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchStr = formData.get("search-user") as string;

    if (!searchStr || searchStr.trim() === "") {
      return;
    }
    loadUsers(searchStr);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger className={triggerClassName} asChild>
        <Button variant="outline">{tAcc("addFriend")} +</Button>
      </DialogTrigger>
      <DialogContent className="min-w-1/2">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{tAcc("addFriend")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <Field className="w-1/2">
            <FieldContent className="relative flex justify-center">
              <Input
                id="search-user"
                name="search-user"
                placeholder={tAcc("enterUsername")}
                className="pr-12"
              />
              <button
                type="submit"
                className="absolute right-2 px-2 cursor-pointer"
                aria-label="Search"
              >
                <Search/>
              </button>
            </FieldContent>
          </Field>
        </form>
        <Card className="h-100 mt-4">
          <CardContent className="h-full overflow-y-auto">
            {userList.length === 0 ? (
                <p className="text-lg text-center">{tAcc("noMatchRes")}</p>
              ) :  userList?.filter((user) => !user.friendState).map((user) => {
                return (
                  <div key={user.id} className="p-2 flex gap-6 items-center rounded-lg hover:bg-muted">
                    <img
                      src={user.avatarPath ? `${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/${user.avatarPath}` : '/default-avatar.svg'}
                      alt={`${user.username} avatar`}
                      className="w-8 h-8 bg-foreground rounded-full border border-solid border-white"
                    />
                    <p className="text-lg w-full">{user.username}</p>
                    <UserRoundPlus
                      className="w-12 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                      aria-label="Add friend"
                      onClick={async () => {
                        addFriend({ friendId: user.id });
                        setConfirmOpen(true);
                        setTimeout(() => {
                          setOpen(false);
                        }, 2000);
                        loadUsers();
                        onFriendAdded?.();
                      }}
                    />
                  </div>
                );
              })
            }
          </CardContent>
        </Card>
        <MsgAlertDialog open={errorOpen} onOpenChange={setErrorOpen} title="" description={tGlob("unknownError")} />
        <MsgAlertDialog open={confirmOpen} onOpenChange={setConfirmOpen} title="" description={tAcc("confirmReqSent")} />
      </DialogContent>
    </Dialog>
  );
}
