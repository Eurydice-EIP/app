export type UserFriend = {
  id: number;
  username: string;
  xp: number;
  level: number;
  avatar: string;
  friendState: "PENDING" | "REQUESTED" | "CONFIRMED" | null;
};
