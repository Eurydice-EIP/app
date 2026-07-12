import { apiFetch } from "./api";

export const startTimer = async (taskId: number) => {
  try {
    return apiFetch(`/timer/start/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error starting timer:", error);
    throw error;
  }
};

export const stopTimer = async (taskId: number) => {
  try {
    return apiFetch(`/timer/stop/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error stopping timer:", error);
    throw error;
  }
};
