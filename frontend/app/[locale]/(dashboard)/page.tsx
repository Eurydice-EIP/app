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
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/entities/task";
import { User } from "@/types/entities/user";
import { TaskWidget } from "@/components/task-widget";
import { CalendarTasksWidget } from "@/components/calendar-tasks-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { fetchUser } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchTasks } from "@/lib/task";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const p = useTranslations("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projTasks, setProjTasks] = useState<Task[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const avatarUrl = user?.avatarPath
    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/${user.avatarPath}`
    : undefined;

  const loadProjects = async () => {
    try {
      let noProjRes = await fetchTasks() as Task[];
      noProjRes = noProjRes.filter((task) => !task.projectId);

      const result = await fetchProjects();
      if (noProjRes.length !== 0) {
        result.unshift({
          id: 0,
          title: p("noProjTasksTitle"),
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

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await fetchUser();
        setUser(result as User);
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
      }
    };

    loadProjects();
    loadUser();
  }, []);

  const loadTasks = async () => {
    try {
      if (selectedProject?.id === 0) {
        const result = await fetchTasks() as Task[];
        setProjTasks(result.filter((task) => !task.projectId));
        return;
      }
      const result = await fetchProjectTasks(selectedProject?.id ?? 0);
      setProjTasks(result as Task[]);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setProjTasks(null);
    }
  };
  useEffect(() => {

    if (selectedProject) {
      loadTasks();
    }
  }, [selectedProject?.id]);

  return (
    <div className="flex flex-col w-full pl-20 lg:pr-80 pr-20">
      <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {!projects
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="w-full basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Skeleton className="h-[114px] w-full" />
                  </div>
                </CarouselItem>
              ))
            : Array.from({ length: projects?.length || 0 }).map((_, index) => {
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
      {projects?.length === 0 && (
        <div className="text-center p-8">
          <p>{p("noProjects")}</p>
          <Button asChild className="mt-4">
            <Link href="/projects">{p("createProject")}</Link>
          </Button>
        </div>
      )}
      <div>
        {selectedProject && (
          <Card className="flex flex-row p-4 bg-[var(--widget-background)] mt-2">
            <Card className="mx-auto w-fit p-0">
              <CardContent className="p-0">
                <CalendarTasksWidget tasks={projTasks || []} className="w-full" />
              </CardContent>
            </Card>
            {!projTasks ? (
              <div className="flex-1 p-4">
                <Skeleton className="h-8 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ) : (
              <TaskWidget
                tasks={projTasks || []}
                className="flex-1"
                onTaskUpdate={() => {
                  loadTasks();
                  loadProjects();
                  // loadUser();
                }}
              />
            )}
          </Card>
        )}
      </div>
      {/* user right sidebar */}
      <div className="hidden lg:flex flex-col lg:w-[250px] border-l bg-[var(--sidebar)] border-[var(--sidebar-border)] p-4 shadow absolute right-0 top-0 h-full">
        {!user ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-lg mb-2" />
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <Avatar className="h-24 w-24 rounded-lg mb-2">
              <AvatarImage src={avatarUrl} alt={user?.username} />
              <AvatarFallback>
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-md font-medium">{user?.username || "User"}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {user?.email || "Email"}
            </p>

            <Card className="w-full mb-4 bg-background/30">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{t("level")}</span>
                  <span className="text-lg font-bold">{user?.level || 1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">XP</span>
                  <span className="text-sm font-bold">{user?.xp || 0}</span>
                </div>
                <Progress
                  value={
                    (((user?.xp || 0) -
                      ((user?.level - 1) * (user?.level - 1) * 100 || 0)) /
                      ((user?.level * user?.level * 100 || 1) -
                        ((user?.level - 1) * (user?.level - 1) * 100 || 0))) *
                    100
                  }
                  className="h-2 mt-1"
                />
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {user?.xp || 0} / {user.level * user.level * 100} {t("toNextLvl")}
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-4 w-full text-center">
              <Card className="bg-background/30 flex-1">
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">{t("projects")}</p>
                  <p className="text-2xl font-bold">{!projects || projects.length === 0 ? 0 : (projects[0].id === 0 ? projects.length - 1 : projects.length)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
