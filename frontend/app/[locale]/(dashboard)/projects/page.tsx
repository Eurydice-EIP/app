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
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [refreshProjects, setRefreshProjects] = useState(0);
  const [refreshTasks, setRefreshTasks] = useState(0);

  const loadTasks = () => setRefreshTasks((prev) => prev + 1);
  const loadProjects = () => setRefreshProjects((prev) => prev + 1);

  useEffect(() => {
    const fetch = async () => {
      if (selectedProject) {
        try {
          if (selectedProject?.id === 0) {
            const result = await fetchTasks() as Task[];
            setTasks(result.filter((task) => !task.projectId));
            return;
          }
          const result = await fetchProjectTasks(selectedProject.id || 0);
          setTasks(result as Task[]);
        } catch (err) {
          console.error("Failed to load tasks:", err);
          setTasks(null);
        }
      }
    };

    fetch();
  }, [selectedProject, refreshTasks]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let noProjRes = await fetchTasks() as Task[];
        noProjRes = noProjRes.filter((task) => !task.projectId);

        const result = await fetchProjects();
        if (noProjRes.length !== 0) {
          result.unshift({
            id: 0,
            title: t("noProjTasksTitle"),
            dueAt: new Date().toString(),
            type: "",
            importance: 0,
            estimatedTime: 0,
            status: "",
            totalTasks: noProjRes.length,
            completedTasks: noProjRes.filter((task) => task.status === "COMPLETED").length,
            image: "",
            xp: 0,
            reward: 0,
            tasks: noProjRes,
          });
        }
        setProjects(result as Project[]);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setProjects(null);
      }
    };

    fetch();
  }, [refreshProjects]);

  const [calendarTasks, setCalendarTasks] = useState<Task[]>([]);

  return (
    <div className="flex flex-col lg:flex-row h-full p-4 overflow-auto">
      {!projects ? (
        <div className="w-full lg:w-64 xl:w-80 shrink-0 p-4 space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <ProjectWidget
          projects={projects || []}
          onProjectUpdate={loadProjects}
          setSelectedProject={setSelectedProject}
        />
      )}
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
                {!tasks ? (
                  <div className="border rounded-md w-full h-full bg-[var(--widget-background)] p-4">
                    <Skeleton className="h-8 w-32 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ) : (
                  <TaskWidget
                    tasks={tasks || []}
                    className="border rounded-md w-full h-full bg-[var(--widget-background)]"
                    onTaskUpdate={() => {
                      loadTasks();
                      loadProjects();
                    }}
                  />
                )}
                <WeekStatsWidget
                  projectTasks={tasks || []}
                  allTasks={projects?.map((project) => project.tasks).flat(1) || []}
                  className="border rounded-md w-full h-full bg-[var(--widget-background)]"
                />
              </div>
              <div className="flex flex-col items-center gap-4 w-full xl:w-[360px] shrink-0">
                <CalendarTasksWidget
                  tasks={tasks || []}
                  className="w-full bg-[var(--widget-background)]"
                />
                <TimeTrackerWidget
                  projectTitle={selectedProject.title}
                  projectTasks={tasks?.map((task) => ({ id: task.id, title: task.title })) || []}
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
