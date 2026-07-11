import { addFriendDTO } from "@/types/dto/add-friend-dto";
import { apiFetch } from "./api";
import { deleteFriendDTO } from "@/types/dto/delete-friend-dto";
import { searchUserDTO } from "@/types/dto/search-user-dto";

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

export const fetchUserFriends = async () => {
  try {
    return apiFetch("/users/friends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

export const addFriend = async (data: addFriendDTO) => {
  try {
    return apiFetch(`/users/friends/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export const deleteFriend = async (data: deleteFriendDTO) => {
  try {
    return apiFetch(`/users/friends/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error deleting friend:", error);
    throw error;
  }
};

export const searchUser = async (data: searchUserDTO) => {
  try {
    return apiFetch(`/users/search/${data.query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error searching user:", error);
    throw error;
  }
};
