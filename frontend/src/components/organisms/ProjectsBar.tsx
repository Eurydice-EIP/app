"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "../atoms/Button";
import ProjectsSort from "../molecules/ProjectsSort";
import { Project } from "@/types/Project";
import ProjectCard from "../molecules/ProjectCard";
import ProjectCreationModal from "./ProjectCreationModal";

type ProjectsBarProps = {
  projects: Project[];
  onProjectCreated: () => Promise<void>;
  setSelectedProject: (project: Project) => void;
};

export default function ProjectsBar({
  projects,
  onProjectCreated,
  setSelectedProject,
}: ProjectsBarProps) {
  const t = useTranslations("projects");
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  return (
    <div className="flex flex-col border border-[var(--color-widget-border)] p-8 gap-4 rounded-[30px] items-center bg-[var(--color-widget-primary)] max-w-1/4 w-full ">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-[var(--color-text)] font-bold text-4xl">
          {t("title")}
        </h2>
        <Button
          className="bg-[#EDDEA4] text-[#393E41] font-bold px-4 py-2 my-2 rounded-full hover:bg-[#E4D890] text-sm"
          onClick={() => setIsModalProjectOpen(true)}
        >
          {t("newProject")}
        </Button>
      </div>
      <ProjectsSort />
      <div
        className="flex flex-col gap-2 w-full overflow-y-auto"
        style={{
          maxHeight: "calc((160px * 4) + (2 * 3 * 1rem))",
        }}
      >
        {projects &&
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
      </div>
      {/* Modal */}
      <ProjectCreationModal
        isModalProjectOpen={isModalProjectOpen}
        setIsModalProjectOpen={setIsModalProjectOpen}
        onProjectCreated={onProjectCreated}
      />
    </div>
  );
}
