"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@/types/entities/project";
import { useEffect, useState } from "react";
import { fetchProjects, fetchProjectTasks } from "@/lib/project";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { type DateRange } from "react-day-picker";
import * as React from "react";
import { Task } from "@/types/entities/task";
import { TaskWidget } from "@/components/task-widget";
import { CalendarTasksWidget } from "@/components/calendar-tasks-widget";

import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const loadProjects = async () => {
    try {
      const result = await fetchProjects();
      setProjects(result as Project[]);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setProjects(null);
    }
  };

  const loadTasks = async () => {
    try {
      const result = await fetchProjectTasks(selectedProject?.id ?? 0);
      setTasks(result as Task[]);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setTasks(null);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks();
    }
  }, [selectedProject?.id]);

  const [calendarTasks, setCalendarTasks] = useState<Task[]>([]);

  return (
    <div className="flex flex-col w-full pl-20 lg:pr-80 pr-20">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: projects?.length || 0 }).map((_, index) => {
            const isSelected =
              selectedProject &&
              selectedProject.title === projects?.[index]?.title;
            return (
              <CarouselItem
                key={index}
                className={`w-full basis-full sm:basis-1/2 lg:basis-1/3 transition-transform duration-200 ${isSelected ? "" : ""}`}
              >
                <div className="p-1">
                  <ProjectCard
                    project={projects?.[index] || ({} as Project)}
                    onClick={() =>
                      setSelectedProject(projects?.[index] || null)
                    }
                    selected={isSelected || false}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div>
        {selectedProject && (
          <Card className="flex flex-row p-4 bg-[var(--widget-background)] mt-2">
            <Card className="mx-auto w-fit p-0">
              <CardContent className="p-0">
                <CalendarTasksWidget tasks={calendarTasks} className="w-full" />
              </CardContent>
            </Card>
            <TaskWidget
              tasks={tasks || []}
              className="flex-1"
              onTaskUpdate={loadTasks}
            />
          </Card>
        )}
      </div>
      {/* user right sidebar */}
      <div className="hidden lg:flex flex-col lg:w-[250px] border-l bg-[var(--sidebar)] border-[var(--sidebar-border)] p-4 shadow absolute right-0 top-0 h-full">
        <h2 className="mb-4 text-lg font-semibold">{t("userSidebar")}</h2>
        <p>{t("userSidebarPlaceholder")}</p>
      </div>
    </div>
  );
}
