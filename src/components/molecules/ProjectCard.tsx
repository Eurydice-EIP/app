"use client";
import { Project } from "@/types/Project";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import Bookmark from "../atoms/Bookmark";
import IconClipboard from "@/public/icons/clipboard.svg";
import IconAward from "@/public/icons/award.svg";
import IconZap from "@/public/icons/zap.svg";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations("projects");
  const remainingTasks = project.totalTasks - project.doneTasks || 0;

  return (
    <div
      className="flex w-full h-56 bg-[var(--color-background)] rounded-4xl overflow-visible flex-none shadow-md relative"
      onClick={onClick}
    >
      {/* LEFT CONTENT */}
      <Bookmark
        className="w-64 h-64 absolute top-[-86px] right-20 z-20"
        todo={project.totalTasks}
        done={project.doneTasks}
      ></Bookmark>
      <div className="flex flex-col justify-between p-6 w-full max-w-2/3">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--color-text)] leading-tight overflow-hidden line-clamp-1 mr-12">
            {project.title}
          </h2>
          {project.description && (
            <p className="text-[var(--color-text)] mt-2 text-sm md:text-base line-clamp-1 overflow-hidden mr-12">
              {project.description}
            </p>
          )}
        </div>

        <hr className="border-[var(--color-secondary)] my-2 border-t-1" />

        <div className="flex flex-row text-[var(--color-text)] justify-between items-center">
          {/* Remaining Tasks */}
          <div className="flex flex-row items-center">
            <p className="text-sm flex items-center">
              <IconClipboard className="w-6 h-6 stroke-[#000000]" />
              {t("toDo", { count: remainingTasks })}
            </p>
          </div>

          {/* Reward */}
          <p className="text-sm flex items-center">
            <IconAward className="w-6 h-6" />

            {project.reward}
          </p>

          {/* XP */}
          <p className="text-sm flex items-center">
            <IconZap className="w-6 h-6" />
            {project.xp} XP
          </p>
        </div>

        <hr className="border-[#EDDEA4] my-2 border-t-1" />
        <div className="flex flex-row justify-between items-center">
          <Label
            className="rounded-full px-4 py-2 bg-[#E9F2DD] text-[#7DBA8E]"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 mr-2"
              >
                <path
                  d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {t("days", { count: project.remainingTime })}
          </Label>
          <Button className="bg-[#EDDEA4] text-[#393E41] font-bold px-4 py-2 rounded-full hover:bg-[#E4D890] flex items-center">
            <span className="text-sm md:text-base">{t("see")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 ml-2"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
      <img
        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
        alt={project.title}
        className="w-1/3 bg-[#B5B9BC] rounded-r-4xl"
      />
    </div>
  );
}
