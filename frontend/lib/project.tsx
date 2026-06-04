import { CreateProjectDTO } from "@/types/dto/create-project.dto";
import { apiFetch } from "./api";
import { Project } from "@/types/entities/project";

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

export const fetchProjects = async (): Promise<Project[]> => {
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

export const fetchProjectById = async (projectId: number) => {
  try {
    return apiFetch(`/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
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
    console.error("Error fetching project tasks:", error);
    throw error;
  }
};

export const updateProject = async (project: Project) => {
  try {
    return apiFetch(`/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(project),
    });
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    return apiFetch(`/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
