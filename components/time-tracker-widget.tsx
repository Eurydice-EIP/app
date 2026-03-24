"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { Card } from "./ui/card";
import { useTranslations } from "next-intl";

export type TimeTrackerWidgetProps = {
  projectTitle: string;
};

export function TimeTrackerWidget({
  className,
  projectTitle,
}: React.HTMLAttributes<HTMLDivElement> & TimeTrackerWidgetProps) {
  const t = useTranslations("timeTracker");
  return (
    <Card
      className={`flex flex-row items-center justify-center bg-[var(--widget-background)] ${className || ""}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-gray-500">
          {t("startWorking", { projectTitle })}
        </p>
      </div>
      <Button className="ml-4 p-2 rounded-full border-2 border-gray-400 hover:border-gray-600">
        <PlayIcon className="w-8 h-8" fill="currentColor" />
      </Button>
    </Card>
  );
}
