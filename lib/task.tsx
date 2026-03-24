import { CreateTaskDTO } from "@/types/dto/create-task.dto";
import { apiFetch } from "./api";

export const createTask = async (data: CreateTaskDTO) => {
  try {
    return apiFetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    return apiFetch("/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: number, status: string) => {
  console.log("Updating task status:", { taskId, status });

  try {
    return apiFetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
