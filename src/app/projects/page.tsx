"use client";

import { fetchTasks } from "@/api/Tasks";
import React, { useEffect, useState } from "react";
// import { Tasks } from "@/types/Tasks";
import Button from "@/components/atoms/Button";
import ProjectsBar from "@/components/organisms/ProjectsBar";
import TaskWidget from "@/components/organisms/TaskWidget";
import TimeTrackerWidget from "@/components/molecules/TimeTrackerWidget";
import { useTranslations } from "next-intl";
import TaskCreationModal from "@/components/organisms/TaskCreationModal";

export default function Projects() {
  // const [tasks, setTasks] = useState<Tasks[] | null>(null);
  const t = useTranslations("projects");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await fetchTasks();
        console.log("Fetched tasks:", result);
        if (!mounted) return;
        // setTasks(result);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        // if (mounted) setTasks(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

  return (
    <div className="flex flex-row h-full gap-10 px-8 py-4 text-black">
      <ProjectsBar></ProjectsBar>
      <div className="flex w-full h-full flex-col gap-y-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-[var(--color-text)] font-bold text-4xl">
            Nom Du Projet
          </h2>
          <Button
            className="border-[#B5B9BC] border-1 rounded-full bg-[#F5F3EE] px-6 py-2 text-[#343534]"
            onClick={() => setIsModalTaskOpen(true)}
          >
            {t("newTask")}
          </Button>
        </div>

        <div className="flex flex-row w-full">
          <TaskWidget className="flex flex-col w-3/5 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4"></TaskWidget>
          <div className="flex flex-col gap-y-[27px] gap-x-[48px] ml-[48px] w-2/5">
            <div className="border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534] h-full">
              {t("calendar")}
            </div>
            <TimeTrackerWidget
              className="border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4"
              task="EIP"
            ></TimeTrackerWidget>
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className="flex w-3/5 h-full border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4">
            {t("wip")}
          </div>
          <div className="flex w-2/5 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534] ml-[48px]">
            {t("stats")}
          </div>
        </div>
      </div>
      {/* Modal */}
      <TaskCreationModal
        isModalTaskOpen={isModalTaskOpen}
        setIsModalTaskOpen={setIsModalTaskOpen}
      />
    </div>
  );
}
