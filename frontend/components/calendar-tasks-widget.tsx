"use client";

import { Task } from "@/types/entities/task";
import * as React from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskWidget } from "@/components/task-widget";
import { useTranslations, useLocale } from "next-intl";

export type CalendarTasksWidgetProps = {
  tasks: Task[];
};

export function CalendarTasksWidget({
  className,
  tasks,
}: React.HTMLAttributes<HTMLDivElement> & CalendarTasksWidgetProps) {
  const t = useTranslations("task");
  const locale = useLocale();
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState<{
    date: Date;
    tasks: Task[];
  } | null>(null);

  const handleSelectDay = (selectedDate: Date | DateRange | undefined) => {
    if (!selectedDate) return;

    // Extract the single date
    const dateToCheck =
      selectedDate instanceof Date ? selectedDate : selectedDate.from;

    if (!dateToCheck) return;

    // Get tasks for this day
    const eventsForDay = tasks.filter((event) => {
      const eventDate = new Date(event.dueAt);
      return (
        eventDate.getFullYear() === dateToCheck.getFullYear() &&
        eventDate.getMonth() === dateToCheck.getMonth() &&
        eventDate.getDate() === dateToCheck.getDate()
      );
    });

    setSelectedDateInfo({
      date: dateToCheck,
      tasks: eventsForDay,
    });
    setDialogOpen(true);
  };

  return (
    <>
      <Calendar
        mode="range"
        defaultMonth={today}
        selected={range}
        onSelect={handleSelectDay}
        numberOfMonths={1}
        captionLayout="dropdown"
        className={`[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)] border rounded-md w-full bg-[var(--card)] ${className || ""}`}
        formatters={{
          formatMonthDropdown: (date) => {
            return date.toLocaleString(locale, { month: "long" });
          },
        }}
        components={{
          DayButton: ({ children, modifiers, day, ...props }) => {
            const eventsForDay = tasks.filter((event) => {
              const eventDate = new Date(event.dueAt);
              return (
                eventDate.getFullYear() === day.date.getFullYear() &&
                eventDate.getMonth() === day.date.getMonth() &&
                eventDate.getDate() === day.date.getDate()
              );
            });

            return (
              <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                {children}
                {!modifiers.outside && eventsForDay.length > 0 && (
                  <span className="flex gap-0.5 mt-1 justify-center">
                    {eventsForDay.map((_, i) => (
                      <span
                        key={i}
                        className="inline-block w-2 h-2 rounded-full bg-blue-500"
                        aria-label="Event dot"
                      />
                    ))}
                  </span>
                )}
              </CalendarDayButton>
            );
          },
        }}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDateInfo?.tasks.length ?? 0}
              {(selectedDateInfo?.tasks.length ?? 0) > 1
                ? t("tasksFor")
                : t("taskFor")}
              {selectedDateInfo?.date.toLocaleDateString(locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </DialogTitle>
          </DialogHeader>
          {selectedDateInfo && selectedDateInfo.tasks.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              <TaskWidget
                tasks={selectedDateInfo.tasks}
                className="border rounded-md w-full bg-[var(--widget-background)]"
                showDetails={true}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No tasks for this day.
            </p>
          )}
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
