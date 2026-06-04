import { apiFetch } from "./api";

export const fetchUser = async () => {
  try {
    return apiFetch("/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
