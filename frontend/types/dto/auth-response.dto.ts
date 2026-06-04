import { User } from "@/types/entities/user";

export type AuthResponseDto = {
  accessToken: string;
  user: User;
};
