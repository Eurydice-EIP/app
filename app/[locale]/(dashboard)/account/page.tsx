"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-toggle";
import { addFriend, deleteFriend, fetchUser, fetchUserFriends } from "@/lib/user";
import { useEffect, useState } from "react";
import { User } from "@/types/entities/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Swords, Users, Award, Settings, PlusCircle, Copy, CircleCheck, CircleX, Ban } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserFriend } from "@/types/entities/userFriend";
import { DialogAddFriend } from "@/components/dialog-add-friend";
import { ConfirmAlertDialog } from "@/components/confirm-alert-dialog";
import { DialogUpdateUser } from "@/components/dialog-update-user";

export default function AccountPage() {
  const t = useTranslations("account");
  const tCom = useTranslations("common");
  const [user, setUser] = useState<User | null>(null);
  const [userFriends, setUserFriends] = useState<UserFriend[] | null>(null);
  const [activeTab, setActiveTab] = useState("inventory");
  const [cancelReqOpen, setCancelReqOpen] = useState(false);
  const [rmFriendOpen, setRmFriendOpen] = useState(false);
  const avatarUrl = user?.avatarPath
    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/${user.avatarPath}`
    : undefined;

  const loadUser = async () => {
    const userData = await fetchUser();
    setUser(userData as User);

    const userFriendsData = await fetchUserFriends();
    setUserFriends(userFriendsData as UserFriend[]);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleCopyUsername = async () => {
    if (!user?.username) {
      return;
    }

    try {
      await navigator.clipboard.writeText(user.username);
    } catch (err) {
      console.error("Failed to copy username:", err);
    }
  };

  const xpPercentage = user ? (user.xp / 1246) * 100 : 0;

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await fetchUser();
      setUser(updatedUser as User);
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <div className="bg-muted rounded-2xl shadow-lg p-4 sm:p-6 relative">
        {/* Tabs */}
        <div className="flex justify-end mb-4 -mt-10">
          <button
            className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "inventory" ? "bg-muted" : "bg-secondary"}`}
            onClick={() => setActiveTab("inventory")}
          >
            <Swords size={20} />
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "friends" ? "bg-muted" : "bg-secondary"}`}
            onClick={() => setActiveTab("friends")}
          >
            <Users size={20} />
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "achievements" ? "bg-muted" : "bg-secondary"}`}
            onClick={() => setActiveTab("achievements")}
          >
            <Award size={20} />
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === "settings" ? "bg-muted" : "bg-secondary"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-0">
          {/* Binder Rings */}
          <div className="hidden lg:flex flex-col justify-around items-center px-2 bg-muted">
            <div className="w-4 h-8 bg-secondary-foreground rounded-full -mr-4 z-10"></div>
            <div className="w-4 h-8 bg-secondary-foreground rounded-full -mr-4 z-10"></div>
            <div className="w-4 h-8 bg-secondary-foreground rounded-full -mr-4 z-10"></div>
            <div className="w-4 h-8 bg-secondary-foreground rounded-full -mr-4 z-10"></div>
            <div className="w-4 h-8 bg-secondary-foreground rounded-full -mr-4 z-10"></div>
          </div>

          {activeTab === "inventory" ? (
            <>
              {/* Left Page */}
              <div className="flex-1 bg-card p-6 rounded-l-2xl relative">
                {!user ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {t("charClass")}
                        </p>
                        <p className="font-bold">Archer</p>
                        <Avatar className="h-20 w-20 mt-2 border-4 border-primary">
                          <AvatarImage src={avatarUrl} alt={user.username} />
                          <AvatarFallback>
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted p-2 rounded-md relative">
                          <p className="text-xl font-bold flex items-center">
                            {user.username}
                            <Copy size={16} className="ml-1 cursor-pointer" onClick={handleCopyUsername} />
                          </p>
                          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-muted transform rotate-45"></div>
                          <DialogUpdateUser
                            user={user}
                            onUserUpdated={handleUpdateUser}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center">
                        <p className="text-4xl font-bold mr-2">{user.level}</p>
                        <div>
                          <p className="text-sm font-semibold">{t("level")}</p>
                          <Progress value={xpPercentage} className="h-2 w-48" />
                        </div>
                        <p className="text-xs text-muted-foreground ml-auto">
                          {user.xp} / 1246 XP ({xpPercentage.toFixed(1)}%)
                        </p>
                      </div>
                    </div>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>{t("health")}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">21</span>
                            <button className="bg-primary text-primary-foreground rounded-md p-1">
                              <PlusCircle size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>{t("attack")}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">5</span>
                            <button className="bg-primary text-primary-foreground rounded-md p-1">
                              <PlusCircle size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>{t("damages")}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">4</span>
                            <button className="bg-primary text-primary-foreground rounded-md p-1">
                              <PlusCircle size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>{t("defense")}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">4</span>
                            <button className="bg-primary text-primary-foreground rounded-md p-1">
                              <PlusCircle size={16} />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="absolute bottom-4 right-4 opacity-10">
                      {/* Faint bow and arrow image */}
                      <p className="text-9xl">🏹</p>
                    </div>
                  </>
                )}
              </div>

              {/* Right Page */}
              <div className="flex-1 bg-card p-6 rounded-r-2xl mt-4 lg:mt-0">
                <div className="relative text-center mb-6">
                  <div className="bg-secondary inline-block px-8 py-2">
                    <h2 className="text-xl font-bold">{t("inventory")}</h2>
                  </div>
                  <div className="absolute left-0 top-1/2 w-full h-px bg-secondary -z-10"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center">
                    <Swords size={32} className="text-primary" />
                  </div>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-20 bg-muted rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === "friends" ? (
            <div className="flex-1 bg-card p-6 rounded-l-2xl relative w-full h-120">
              <div className="relative w-full h-full flex gap-10 justify-center">
                <DialogAddFriend
                  triggerClassName="absolute items-center m-auto"
                  onFriendAdded={loadUser}
                />
                <div className="w-1/2">
                  <div className="w-1/2 bg-secondary px-8 py-2 m-auto">
                    <h2 className="text-xl font-bold text-center">{t("friendList")}</h2>
                  </div>
                  <Card className="h-4/5 my-8">
                    <CardContent className="h-full overflow-y-auto">
                      {userFriends?.filter((friend) => friend.friendState === "CONFIRMED").map((friend) => {
                        return (
                          <div key={friend.id} className="p-2 flex gap-6 items-center rounded-lg hover:bg-muted">
                            <img
                              src={friend.avatar ?? '/default-avatar.svg'}
                              width={32}
                              height={32}
                              alt={`${friend.username} avatar`}
                              className="bg-foreground rounded-full border border-solid border-white"
                            />
                            <p className="text-lg w-full">{friend.username}</p>
                            <Ban
                              className="w-8 min-w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                              aria-label="Remove friend"
                              onClick={() => setRmFriendOpen(true)}
                            />
                            <ConfirmAlertDialog
                              open={rmFriendOpen}
                              onOpenChange={setRmFriendOpen}
                              title={t("removeFriend")}
                              description={t("rmFriendDesc")}
                              actionLabel={tCom("confirm")}
                              action={async () => {
                                await deleteFriend({ friendId: friend.id });
                                loadUser();
                              }}
                            />
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
                <div className="w-1/2">
                  <div className="w-1/2 bg-secondary px-8 py-2 m-auto">
                    <h2 className="text-xl font-bold text-center">{t("friendRequests")}</h2>
                  </div>
                  <Card className="h-4/5 my-8">
                    <CardContent className="h-full overflow-y-auto">
                      {userFriends?.filter((friend) => friend.friendState?.match(/REQUESTED|PENDING/))
                        .sort((a, b) => {
                          if (a.friendState === "PENDING" && b.friendState === "REQUESTED") {
                            return 1;
                          }
                          return -1;
                        })
                        .map((friend) => {
                          return (
                            <div key={friend.id} className="p-2 flex gap-6 items-center rounded-lg hover:bg-muted">
                              <img
                                src={friend.avatar ?? '/default-avatar.svg'}
                                width={32}
                                height={32}
                                alt={`${friend.username} avatar`}
                                className="bg-foreground rounded-full border border-solid border-white"
                              />
                              <p className="text-lg w-full">{friend.username}</p>
                              {friend.friendState === "REQUESTED" ? (
                                  <div className="flex gap-2 items-center justify-between">
                                    <CircleCheck
                                      className="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                                      aria-label="Accept friend request"
                                      onClick={async () => {
                                        await addFriend({ friendId: friend.id });
                                        loadUser();
                                      }}
                                    />
                                    <CircleX
                                      className="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                                      aria-label="Deny friend request"
                                      onClick={async () => {
                                        await deleteFriend({ friendId: friend.id });
                                        loadUser();
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex gap-2 items-center justify-between">
                                    <p className="text-xs w-28">{t("requestSent")}</p>
                                    <Ban
                                      className="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                                      aria-label="Cancel friend request"
                                      onClick={() => setCancelReqOpen(true)}
                                    />
                                    <ConfirmAlertDialog
                                      open={cancelReqOpen}
                                      onOpenChange={setCancelReqOpen}
                                      title={t("cancelFriendReq")}
                                      description={t("cancelFriendReqDesc")}
                                      actionLabel={tCom("confirm")}
                                      action={async () => {
                                        await deleteFriend({ friendId: friend.id });
                                        loadUser();
                                      }}
                                    />
                                  </div>
                                )
                              }
                            </div>
                          );
                        })
                      }
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : activeTab === "achievements" ? (
            <Card className="w-full h-64 flex items-center justify-center">
              <CardContent>
                <p className="text-muted-foreground">
                  {t("userSidebarPlaceholder")}
                </p>
              </CardContent>
            </Card>
          ) : activeTab === "settings" ? (
            <div className="flex h-full w-full flex-col gap-8 p-8 bg-card rounded-2xl">
              <h1 className="text-2xl font-semibold">{t("title")}</h1>

              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("language")}
                </h2>
                <LanguageSwitcher />
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {t("theme")}
                </h2>
                <ThemeToggle />
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
