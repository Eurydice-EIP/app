import { ProjectCreationData } from "../types/Project";
import Cookies from "js-cookie";

export const fetchProjects = async () => {
  console.log("Fetching Projects...");
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch projects");
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (project: ProjectCreationData) => {
  try {
    const response = await fetch("http://213.32.31.107:4000/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
