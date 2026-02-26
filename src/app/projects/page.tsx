"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import ProjectsBar from "@/components/organisms/ProjectsBar";
import TaskWidget from "@/components/organisms/TaskWidget";
import TimeTrackerWidget from "@/components/molecules/TimeTrackerWidget";
import { useTranslations } from "next-intl";
import TaskCreationModal from "@/components/organisms/TaskCreationModal";
import { fetchProjects, fetchProjectTasks } from "@/api/Projects";
import { Project } from "@/types/Project";
import { Tasks } from "@/types/Tasks";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [tasks, setTasks] = useState<Tasks[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = useTranslations("projects");

  const loadProjects = async () => {
    try {
      const result = await fetchProjects();
      console.log("Fetched projects:", result);
      setProjects(result);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setProjects(null);
    }
  };

  const loadTasks = async () => {
    try {
      const projectId =
        selectedProject?.id !== undefined && selectedProject?.id !== null
          ? Number(selectedProject.id)
          : 0;
      const result = await fetchProjectTasks(projectId);
      console.log("Fetched tasks:", result);
      setTasks(result);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setTasks(null);
    }
  };

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks();
    }
  }, [selectedProject]);

  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

  return (
    <div className="flex flex-row h-full gap-10 px-8 pt-4 pb-2 text-black">
      <ProjectsBar
        projects={projects || []}
        onProjectCreated={loadProjects}
        setSelectedProject={(project) => {
          setSelectedProject(project);
        }}
      />
      <div className="flex w-full h-full flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-[var(--color-text)] font-bold text-4xl">
            {selectedProject?.title || "Nom Du Projet"}
          </h2>
          <Button
            className="border-[#B5B9BC] border-1 rounded-full bg-[#F5F3EE] px-6 py-2 text-[#343534]"
            onClick={() => setIsModalTaskOpen(true)}
          >
            {t("newTask")}
          </Button>
        </div>

        <div className="flex flex-row w-full">
          <TaskWidget
            className="flex flex-col w-3/5 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4"
            tasks={tasks || []}
          />
          <div className="flex flex-col gap-y-[27px] gap-x-[48px] ml-[48px] w-2/5">
            <div className="border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534] h-full">
              {t("calendar")}
            </div>
            <TimeTrackerWidget
              className="border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4"
              task="EIP"
            ></TimeTrackerWidget>
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className="flex w-3/5 h-full border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4">
            {t("wip")}
          </div>
          <div className="flex w-2/5 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534] ml-[48px]">
            {t("stats")}
          </div>
        </div>
      </div>
      {/* Modal */}
      <TaskCreationModal
        selectedProject={selectedProject}
        projects={projects || []}
        isModalTaskOpen={isModalTaskOpen}
        setIsModalTaskOpen={setIsModalTaskOpen}
        onTaskCreated={loadTasks}
      />
    </div>
  );
}
