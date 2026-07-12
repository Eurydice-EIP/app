"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useTranslations } from "next-intl";
import { Task } from "@/types/entities/task";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  thisProject: {
    label: "This Project",
    color: "var(--chart-1)",
  },
  allProjects: {
    label: "All Projects",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export type WeekStatsWidgetProps = {
  projectTasks: Task[];
  allTasks: Task[];
};

export function WeekStatsWidget({
  className,
  projectTasks,
  allTasks,
}: React.HTMLAttributes<HTMLDivElement> & WeekStatsWidgetProps) {
  const t = useTranslations("weekStats");
  const today = new Date((new Date()).setHours(0, 0, 0, 0));

  const filterTask = (task: Task) => {
    const sixDays = 6 * 24 * 3600 * 1000;

    if (task.status !== "COMPLETED" || !task.completedAt) {
      return false;
    }

    const taskCompletionDate = new Date((new Date(task.completedAt)).setHours(0, 0, 0, 0));

    if (today.getTime() - taskCompletionDate.getTime() <= sixDays) {
      return true;
    }
    return false;
  };

  const filteredProjTasks = projectTasks
    .filter(filterTask)
    .map((task) => task.completedAt ? new Date((new Date(task.completedAt)).setHours(0, 0, 0, 0)) : null);
  const filteredAllTasks = allTasks
    .filter(filterTask)
    .map((task) => task.completedAt ? new Date((new Date(task.completedAt)).setHours(0, 0, 0, 0)) : null);

  const chartData: {
    date: string,
    thisProject: number,
    allProjects: number,
  }[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    chartData.unshift({
      date: `${yyyy}-${mm}-${dd}`,
      thisProject: filteredProjTasks.filter((task) => task && task.getTime() === date.getTime()).length,
      allProjects: filteredAllTasks.filter((task) => task && task.getTime() === date.getTime()).length,
    });
  }

  return (
    <Card className="pt-0 rounded-md bg-[var(--widget-background)]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b p-4 sm:flex-row [.border-b]:py-2">
        <div className="grid flex-1 gap-1">
          <CardTitle>{t("title")}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-thisProject)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-thisProject)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-allProjects)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-allProjects)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="allProjects"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-allProjects)"
              stackId="a"
            />
            <Area
              dataKey="thisProject"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-thisProject)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
