import { RegisterUserDto } from "@/types/dto/register-user.dto";
import { apiFetch } from "./api";
import { LoginUserDTO } from "@/types/dto/login-user.dto";
import { AuthResponseDto } from "@/types/dto/auth-response.dto";

export const login = async (data: LoginUserDTO) => {
  return apiFetch<AuthResponseDto>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const register = async (data: RegisterUserDto) => {
  return apiFetch<AuthResponseDto>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
