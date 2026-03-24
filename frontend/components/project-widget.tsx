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
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [collapsed, setCollapsed] = useState(false);

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
            <ul className="flex flex-col overflow-auto max-h-[calc(100vh-10rem)] pb-4">
              {projects.map((project, index) => (
                <li key={index} className="flex">
                  <Card
                    className="w-full flex flex-row py-0 relative mt-4 min-h-[180px] mx-4"
                    onClick={() => setSelectedProject?.(project)}
                  >
                    <div className="flex flex-col flex-1 h-full">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.description || "No description provided."}
                        </CardDescription>
                      </CardHeader>

                      <CardFooter className="flex-col gap-2 mt-auto">
                        Footer
                      </CardFooter>
                    </div>

                    <img
                      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                      alt={project.title}
                      className="absolute z-20 aspect-video w-1/3 object-cover h-full right-0 top-0"
                    />
                  </Card>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="p-4">No projects found.</p>
        )}
      </div>
    </Card>
  );
}
