"use client";

import { useState } from "react";
import { Project } from "@/types/entities/project";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DialogNewProject } from "./dialog-new-project";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Award,
  Zap,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { fetchProjectTasks } from "@/lib/project";
import { Task } from "@/types/entities/task";

export type ProjectWidgetProps = {
  projects: Project[];
  onProjectUpdate?: () => void;
  setSelectedProject?: (project: Project) => void;
};

export function ProjectWidget({
  className,
  projects,
  onProjectUpdate,
  setSelectedProject,
}: React.HTMLAttributes<HTMLDivElement> & ProjectWidgetProps) {
  const tProj = useTranslations("projects");
  const tCom = useTranslations("common");
  const [collapsed, setCollapsed] = useState(false);

  function getRemainingTime(dueAt: string): string {
    let timeDiff = new Date(dueAt).valueOf() - Date.now();

    if (timeDiff < 0) {
      timeDiff = 0;
    }

    const days = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.round((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.round((timeDiff / (1000 * 60)) % 60);

    if (days > 0) {
      return `${days} ${tCom("days")}`;
    } else if (hours > 0) {
      return `${hours} ${tCom("hours")}`;
    } else {
      return `${minutes} ${tCom("minutes")}`;
    }
  }

  return (
    <Card
      className={`
        mb-4 lg:mb-8 mx-0 lg:mx-8 border rounded-md
        transition-all duration-300 ease-in-out
        bg-[var(--widget-background)] gap-2
        ${collapsed ? "w-14 shrink-0" : "w-full lg:w-1/3 shrink-0"}
        ${className || ""}
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between relative ${!collapsed ? "p-4" : ""}`}
      >
        {!collapsed && <h2 className="text-4xl">Projects</h2>}

        <div className="flex items-center gap-2">
          {!collapsed && (
            <DialogNewProject onProjectCreated={onProjectUpdate} />
          )}
          <Button
            variant="outline"
            className="absolute top-4 -right-8 border-l-0 h-12 w-8 rounded-md rounded-l-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-opacity duration-200 ${collapsed ? "opacity-100" : "opacity-100"}`}
      >
        {projects?.length ? (
          collapsed ? (
            <div className="flex flex-col items-center gap-4 p-2">
              <DialogNewProject onProjectCreated={onProjectUpdate} />
              <ul className="flex flex-col overflow-auto max-h-[calc(100vh-10rem)] pb-4 gap-4 w-full">
                {projects.map((project, index) => (
                  <li key={index} className="flex justify-center">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                      alt={project.title}
                      className="rounded-md w-12 h-12 object-cover cursor-pointer border border-gray-200"
                      onClick={() => setSelectedProject?.(project)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col overflow-auto max-h-[calc(100vh-12rem)] pb-4">
              {projects.map((project, index) => (
                <li key={index} className="flex">
                  <Card
                    className="w-full flex flex-row p-0 relative mt-4 min-h-[180px] mx-4 rounded-2xl shadow-lg border-transparent bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject?.(project)}
                  >
                    <div className="flex flex-col flex-1 p-4">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xl font-bold">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {project.description || tProj("noDescription")}
                        </CardDescription>
                      </CardHeader>

                      <div className="border-t my-3"></div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <ClipboardList size={16} />
                          <span>{project.totalTasks} {tProj("toDo")}</span>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <Award size={16} />
                          <span>290</span>
                        </div> */}
                        <div className="flex items-center gap-1">
                          <Zap size={16} />
                          <span>{project.xp}</span>
                        </div>
                      </div>

                      <CardFooter className="p-0 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 text-red-500 bg-red-100 px-2 py-1 rounded-full text-xs">
                          <Clock size={14} />
                          <span>{getRemainingTime(project.dueAt)}</span>
                        </div>
                        {project.id === 0 ? (<></>) : (
                          <DialogNewProject
                            project={project}
                            onProjectCreated={onProjectUpdate}
                          />
                        )}
                      </CardFooter>
                    </div>

                    <div className="absolute top-0 right-12 bg-yellow-200 text-yellow-800 px-2 py-1 text-sm font-semibold rounded-b-lg shadow-md">
                      <span className="border-b border-yellow-600">{project.completedTasks}</span>
                      <span>/</span>
                      <span>{project.totalTasks}</span>
                    </div>

                    <div className="w-1/3">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                        alt={project.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="p-4">{tProj("noProjects")}</p>
        )}
      </div>
    </Card>
  );
}
