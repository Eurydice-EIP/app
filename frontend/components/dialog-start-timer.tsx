import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function DialogStartTimer({
  open,
  onOpenChange,
  tasks,
  onTimerStarted,
}: {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  tasks: { id: number, title: string }[],
  onTimerStarted: (taskId: number) => any,
}) {
  const tCom = useTranslations("common");
  const tTimer = useTranslations("timer");
  const [task, setTask] = useState<string>("");
  const [taskError, setTaskError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const taskId = parseInt(task);

    if (isNaN(taskId) || taskId === 0) {
      setTaskError(true);
      return;
    }
    setTaskError(false);
    onTimerStarted(taskId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-1/2">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{tTimer("startTitle")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10">
          <Field className="w-1/2">
            <FieldContent className="w-full flex items-center gap-4">
              <FieldLabel htmlFor="task-select">{tTimer("selectTask")}</FieldLabel>
              <Select value={task} onValueChange={setTask}>
                <SelectTrigger className="w-full" id="task-select" name="task-select">
                  <SelectValue placeholder={tTimer("selectTask")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{tTimer("tasksLabel")}</SelectLabel>
                    {tasks.map((task) => {
                      return (
                        <SelectItem key={task.id} value={task.id.toString()}>{task.title}</SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {taskError && <FieldError>{tTimer("taskError")}</FieldError>}
            </FieldContent>
          </Field>
          <FieldGroup className="w-1/2 flex flex-row justify-evenly">
            <DialogClose asChild>
              <Button type="button" variant="outline">{tCom("cancel")}</Button>
            </DialogClose>
            <Button type="submit">{tTimer("startButton")}</Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
