"use client";

import { useTranslations } from "next-intl";
import Button from "../atoms/Button";
import ProjectsSort from "../molecules/ProjectsSort";
import { Project } from "@/types/Project";
import ProjectCard from "../molecules/ProjectCard";

const sampleProjects: Project[] = [
  {
    title: "EIP",
    description: "EIP project description",
    doneTasks: 3,
    totalTasks: 5,
    xp: 100,
    reward: 50,
    remainingTime: 7,
  },
  {
    title: "Website Redesign",
    description: "Website Redesign project description",
    doneTasks: 2,
    totalTasks: 8,
    xp: 80,
    reward: 40,
    remainingTime: 10,
  },
  {
    title: "Mobile App aaaa",
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

  return (
    <div className="flex flex-col border border-[#B5B9BC] p-8 gap-4 rounded-[30px] items-center bg-[#F5F3EE] max-w-1/4 w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-[#393E41] font-bold text-4xl">{t("title")}</h2>
        <Button className="bg-[#EDDEA4] text-[#393E41] font-bold px-4 py-2 my-2 rounded-full hover:bg-[#E4D890] text-sm">
          {t("new")}
        </Button>
      </div>
      <ProjectsSort />
      {sampleProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
