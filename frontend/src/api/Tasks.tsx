import { Tasks } from "../types/Tasks";

export const fetchTasks = async () => {
  console.log("Fetching Tasks...");
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/tasks", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: Tasks) => {
  console.log("Creating Task...", task);
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
