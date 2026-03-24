"use client";

import { Task } from "@/types/entities/task";
import * as React from "react";
import { updateTaskStatus } from "@/lib/task";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useState } from "react";

export type CalendarTasksWidgetProps = {
  tasks: Task[];
};

export function CalendarTasksWidget({
  className,
  tasks,
}: React.HTMLAttributes<HTMLDivElement> & CalendarTasksWidgetProps) {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: today,
  });

  const sampleEvents = [
    { date: new Date(new Date().getFullYear(), 1, 5), title: "Event 1" },
    { date: new Date(new Date().getFullYear(), 1, 5), title: "Event 2" },
    { date: new Date(new Date().getFullYear(), 1, 12), title: "Event 3" },
    { date: new Date(new Date().getFullYear(), 1, 20), title: "Event 4" },
    { date: new Date(new Date().getFullYear(), 1, 20), title: "Event 5" },
    { date: new Date(new Date().getFullYear(), 1, 28), title: "Event 6" },
  ];

  return (
    <Calendar
      mode="range"
      defaultMonth={today}
      selected={range}
      onSelect={setRange}
      numberOfMonths={1}
      captionLayout="dropdown"
      className={`[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)] border rounded-md w-full bg-[var(--card)] ${className || ""}`}
      formatters={{
        formatMonthDropdown: (date) => {
          return date.toLocaleString("default", { month: "long" });
        },
      }}
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const eventsForDay = sampleEvents.filter(
            (event) =>
              event.date.getFullYear() === day.date.getFullYear() &&
              event.date.getMonth() === day.date.getMonth() &&
              event.date.getDate() === day.date.getDate(),
          );
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
  );
}
