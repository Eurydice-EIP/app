import { Task } from "@/types/entities/task";
import { Button } from "@base-ui/react";
import { Ban, Check } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { deleteTask, updateTask } from "@/lib/task";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { DialogNewTask } from "./dialog-new-task";
import { ConfirmAlertDialog } from "./confirm-alert-dialog";

export type TaskWidgetProps = {
  tasks: Task[];
  onTaskUpdate?: () => void;
  showDetails?: boolean;
};

export function TaskWidget({
  className,
  tasks,
  onTaskUpdate,
  showDetails,
}: React.HTMLAttributes<HTMLDivElement> & TaskWidgetProps) {
  const t = useTranslations("");
  const tCom = useTranslations("common");
  const tTask = useTranslations("task");

  const [rmTaskOpen, setRmTaskOpen] = useState(false);

  const updateTask1 = async (taskId: number, status: string) => {
    try {
      await updateTask({
        id: taskId,
        status,
      } as Task);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
    onTaskUpdate?.();
  };

  return (
    <Card className={`flex-1 ${className || ""}`}>
      {tasks ? (
        <ul className="flex flex-col">
          {[...tasks]
            .sort((a, b) => {
              if (a.status === "COMPLETED" && b.status !== "COMPLETED") {
                return 1;
              }
              return (a.id || 0) - (b.id || 0)
            })
            .map((task, index) => (
              <li
                key={index}
                className="flex flex-row py-2 justify-between px-4 items-center"
              >
                <div className="flex flex-row gap-4">
                  <p className="text-lg font-medium">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <div className="flex flex-row items-center gap-2">
                    <h4 className="text-lg font-medium">{task.title}</h4>
                    {showDetails && (
                      <span className="text-sm text-muted-foreground">
                        {task.description}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <DialogNewTask
                    onTaskCreated={() => {
                      onTaskUpdate?.();
                      toast.success(t("taskUpdated"));
                    }}
                    task={task}
                  />
                  <Ban
                    className="w-8 min-w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-input"
                    aria-label="Remove task"
                    onClick={() => setRmTaskOpen(true)}
                  />
                  <ConfirmAlertDialog
                    open={rmTaskOpen}
                    onOpenChange={setRmTaskOpen}
                    title={tTask("removeTask")}
                    description={tTask("rmTaskDesc")}
                    actionLabel={tCom("confirm")}
                    action={async () => {
                      await deleteTask(task.id);
                      onTaskUpdate?.();
                    }}
                  />
                  <div>
                    <Button
                      className={
                        "p-1 rounded-full border-2 cursor-pointer hover:bg-muted " +
                        (task?.status === "COMPLETED"
                          ? "border-green-500"
                          : task?.status === "IN_PROGRESS"
                            ? "border-yellow-500"
                            : "border-gray-400")
                      }
                      onClick={() => {
                        const nextStatus =
                          task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

                        updateTask1(task.id || 0, nextStatus);

                        if (
                          task.status === "PENDING" &&
                          nextStatus === "COMPLETED"
                        ) {
                          toast.success(t("taskUpdated"));
                        }
                      }}
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
