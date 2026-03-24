import { Task } from "@/types/entities/task";
import { Button } from "@base-ui/react";
import { Check } from "lucide-react";
import * as React from "react";
import { updateTaskStatus } from "@/lib/task";
import { Card } from "./ui/card";

export type TaskWidgetProps = {
  tasks: Task[];
  onTaskUpdate?: () => void;
};

export function TaskWidget({
  className,
  tasks,
  onTaskUpdate,
}: React.HTMLAttributes<HTMLDivElement> & TaskWidgetProps) {
  const updateTask = async (taskId: number, status: string) => {
    try {
      await updateTaskStatus(taskId, status);
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
    onTaskUpdate?.();
  };

  return (
    <Card className={`flex-1 ${className || ""}`}>
      {tasks ? (
        <ul className="flex flex-col">
          {[...tasks]
            .sort((a, b) => (a.id || 0) - (b.id || 0))
            .map((task, index) => (
              <li
                key={index}
                className="flex flex-row py-2 justify-between px-4 items-center"
              >
                <div className="flex flex-row gap-4">
                  <p className="text-lg font-medium">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <h4 className="text-lg font-medium">{task.title}</h4>
                </div>
                <div>
                  <Button
                    className={
                      "p-1 rounded-full border-2 " +
                      (task?.status === "COMPLETED"
                        ? "border-green-500"
                        : task?.status === "IN_PROGRESS"
                          ? "border-yellow-500"
                          : "border-gray-400")
                    }
                    onClick={() =>
                      updateTask(
                        task.id || 0,
                        task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
                      )
                    }
                  >
                    <Check
                      className={
                        task?.status === "COMPLETED"
                          ? "text-green-500"
                          : task?.status === "IN_PROGRESS"
                            ? "text-yellow-500"
                            : "text-gray-400"
                      }
                    />
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p>No tasks found for this project.</p>
      )}
    </Card>
  );
}
