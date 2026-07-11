import { RegisterUserDto } from "@/types/dto/register-user.dto";
import { apiFetch } from "./api";
import { LoginUserDTO } from "@/types/dto/login-user.dto";
import { AuthResponseDto } from "@/types/dto/auth-response.dto";

export const login = async (data: LoginUserDTO) => {
  const res = await apiFetch<AuthResponseDto>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res) {
    throw new Error("Invalid API response");
  }
  return res;
};

export const register = async (data: RegisterUserDto) => {
  const res = await apiFetch<AuthResponseDto>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res) {
    throw new Error("Invalid API response");
  }
  return res;
};

export function isTokenValid(token = localStorage.getItem("token")): boolean {
  if (!token) {
    return false;
  }

  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return false;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized));

    if (!decoded.exp) {
      return true;
    }
    return Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
}

export function getTokenExpiration(token = localStorage.getItem("token")): number|null {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalized));

    if (typeof decoded.exp === "number") {
      return decoded.exp * 1000;
    }
    return null;
  } catch {
    return null;
  }
}
