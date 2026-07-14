export type UserFriend = {
  id: number;
  username: string;
  xp: number;
  level: number;
  avatarPath: string;
  friendState: "PENDING" | "REQUESTED" | "CONFIRMED" | null;
};
