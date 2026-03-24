import { RegisterUserDto } from "@/types/dto/register-user.dto";
import { apiFetch } from "./api";
import { LoginUserDTO } from "@/types/dto/login-user.dto";

export const login = async (data: LoginUserDTO) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const register = async (data: RegisterUserDto) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
