import { CreateProjectDTO } from "@/types/dto/create-project.dto";
import { apiFetch } from "./api";

export const createProject = async (data: CreateProjectDTO) => {
  try {
    return apiFetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const fetchProjects = async () => {
  console.log(localStorage.getItem("token"));

  try {
    return apiFetch("/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchProjectTasks = async (projectId: number) => {
  try {
    return apiFetch(`/projects/${projectId}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
