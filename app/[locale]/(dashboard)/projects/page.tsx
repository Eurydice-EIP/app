"use client";

import { useState, useEffect } from "react";
import { fetchProjects, fetchProjectTasks } from "@/lib/project";
import { Project } from "@/types/entities/project";
import { fetchTasks } from "@/lib/task";
import { Task } from "@/types/entities/task";
import { ProjectWidget } from "@/components/project-widget";
import { TaskWidget } from "@/components/task-widget";
import { DialogNewTask } from "@/components/dialog-new-task";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { TimeTrackerWidget } from "@/components/time-tracker-widget";
import { WeekStatsWidget } from "@/components/week-stats-widget";
import { CalendarTasksWidget } from "@/components/calendar-tasks-widget";

import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    if (selectedProject) {
      try {
        const result = await fetchProjectTasks(selectedProject?.id || 0);
        setTasks(result as Task[]);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setTasks(null);
      }
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedProject]);

  useEffect(() => {
    loadProjects();
  }, []);

  const [calendarTasks, setCalendarTasks] = useState<Task[]>([]);

  return (
    <div className="flex flex-col lg:flex-row h-full p-4 overflow-auto">
      <ProjectWidget
        projects={projects || []}
        onProjectUpdate={loadProjects}
        setSelectedProject={setSelectedProject}
      />
      <div className="flex-1 min-w-0 lg:ml-4 h-full">
        {selectedProject ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold ml-2 sm:ml-4 truncate">
                {selectedProject.title}
              </h2>
              <DialogNewTask
                onTaskCreated={loadTasks}
                projects={projects || []}
              />
            </div>
            <div className="flex flex-col xl:flex-row w-full h-full mb-8 gap-4">
              <div className="flex flex-col gap-4 w-full min-w-0">
                <TaskWidget
                  tasks={tasks || []}
                  className="border rounded-md w-full h-full bg-[var(--widget-background)]"
                />
                <WeekStatsWidget />
              </div>
              <div className="flex flex-col items-center gap-4 w-full xl:w-[360px] shrink-0">
                <CalendarTasksWidget
                  tasks={calendarTasks}
                  className="w-full bg-[var(--widget-background)]"
                />
                <TimeTrackerWidget
                  projectTitle={selectedProject.title}
                  className="border rounded-md w-full py-4"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full py-16 lg:py-0">
            <p className="text-gray-500">{t("selectProject")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
