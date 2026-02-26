import { Login, Register } from "../types/Auth";
import Cookies from "js-cookie";

export const postUser = async (auth: Register) => {
  console.log("Registering user...", auth);
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (auth: Login) => {
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    if (!response.ok) {
      throw new Error("Failed to login user");
    }
    const data = await response.json();
    Cookies.set("accessToken", data.accessToken, { expires: 7 });

    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
