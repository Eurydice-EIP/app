"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon, Square } from "lucide-react";
import { Card } from "./ui/card";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { DialogStartTimer } from "./dialog-start-timer";
import { startTimer, stopTimer } from "@/lib/timer";

export type TimeTrackerWidgetProps = {
  projectTitle: string;
  projectTasks: { id: number, title: string }[];
};

export function TimeTrackerWidget({
  className,
  projectTitle,
  projectTasks,
}: React.HTMLAttributes<HTMLDivElement> & TimeTrackerWidgetProps) {
  const t = useTranslations("timeTracker");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<number>();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleToggle = () => {
    if (!isRunning) {
      setOpen(true);
      return;
    }

    if (!activeTask) {
      return;
    }
    setIsRunning(false);
    stopTimer(activeTask);
  };

  return (
    <Card
      className={`flex flex-row items-center justify-center bg-[var(--widget-background)] ${className || ""}`}
    >
      <div className="flex flex-col gap-2 max-w-4/7">
        <h3 className="text-lg font-medium">{t("title")}</h3>
        {isRunning || time > 0 ? (
          <p className="text-2xl font-bold">{formatTime(time)}</p>
        ) : (
          <p className="text-sm text-gray-500">
            {t("startWorking", { projectTitle })}
          </p>
        )}
      </div>
      <Button
        className="ml-4 p-2 rounded-full border-2 border-gray-400 hover:border-gray-600"
        onClick={handleToggle}
      >
        {isRunning ? (
          <Square className="w-8 h-8" fill="currentColor" />
        ) : (
          <PlayIcon className="w-8 h-8" fill="currentColor" />
        )}
      </Button>
      <DialogStartTimer
        open={open}
        onOpenChange={setOpen}
        tasks={projectTasks}
        onTimerStarted={(taskId: number) => {
          if (activeTask !== taskId) {
            setTime(0);
          }
          startTimer(taskId);
          setIsRunning(true);
          setActiveTask(taskId);
        }}
      />
    </Card>
  );
}
