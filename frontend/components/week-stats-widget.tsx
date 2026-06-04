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

const chartData = [
  { date: "2024-04-01", thisProject: 222, allProjects: 150 },
  { date: "2024-04-02", thisProject: 97, allProjects: 180 },
  { date: "2024-04-03", thisProject: 167, allProjects: 120 },
  { date: "2024-04-04", thisProject: 242, allProjects: 260 },
];

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
  tasks: Task[];
};

export function WeekStatsWidget({
  className,
  tasks,
}: React.HTMLAttributes<HTMLDivElement> & WeekStatsWidgetProps) {
  const t = useTranslations("weekStats");
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

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
          <AreaChart data={filteredData}>
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
