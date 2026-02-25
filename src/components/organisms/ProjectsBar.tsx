"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "../atoms/Button";
import ProjectsSort from "../molecules/ProjectsSort";
import { Project } from "@/types/Project";
import ProjectCard from "../molecules/ProjectCard";
import ProjectCreationModal from "./ProjectCreationModal";

const sampleProjects: Project[] = [
  {
    title: "EIP",
    description: "EIP project description",
    image:
      "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    doneTasks: 3,
    totalTasks: 5,
    xp: 100,
    reward: 50,
    remainingTime: 7,
  },
  {
    title: "Website Redesign",
    image:
      "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    description: "Website Redesign project description",
    doneTasks: 2,
    totalTasks: 8,
    xp: 80,
    reward: 40,
    remainingTime: 10,
  },
  {
    title: "Mobile App aaaa",
    image:
      "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    description: "Mobile App project description",
    doneTasks: 5,
    totalTasks: 12,
    xp: 120,
    reward: 60,
    remainingTime: 15,
  },
];

export default function ProjectsBar() {
  const t = useTranslations("projects");
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  return (
    <div className="flex flex-col border border-[var(--color-widget-border)] p-8 gap-4 rounded-[30px] items-center bg-[var(--color-widget-primary)] max-w-1/4 w-full">
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
      {sampleProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
      {/* Modal */}
      <ProjectCreationModal
        isModalProjectOpen={isModalProjectOpen}
        setIsModalProjectOpen={setIsModalProjectOpen}
      />
    </div>
  );
}
