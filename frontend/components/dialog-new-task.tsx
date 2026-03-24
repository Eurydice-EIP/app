"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { CalendarIcon, StarIcon } from "lucide-react";
import { CreateTaskDTO } from "@/types/dto/create-task.dto";
import { createTask } from "@/lib/task";
import { useTranslations } from "next-intl";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DialogNewTask({
  onTaskCreated,
  projects,
}: {
  onTaskCreated?: () => void;
  projects?: { id: number; title: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>(date);
  const [dateValue, setDateValue] = useState(formatDate(date));

  const [importance, setImportance] = useState<number>(0);
  const [hoverImportance, setHoverImportance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [hoverEstimatedTime, setHoverEstimatedTime] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [projectError, setProjectError] = useState(false);
  const [importanceError, setImportanceError] = useState(false);
  const [estimatedTimeError, setEstimatedTimeError] = useState(false);
  const [project, setProject] = useState<number | null>(null);
  const t = useTranslations("task");
  const tCommon = useTranslations("common");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const projectValue = project;

    // Validate fields
    let hasError = false;
    if (!title || title.trim() === "") {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }
    if (!isValidDate(date)) {
      setDateError(true);
      hasError = true;
    } else {
      setDateError(false);
    }
    if (projectValue === null) {
      setProjectError(true);
      hasError = true;
    } else {
      setProjectError(false);
    }
    if (!(importance >= 1 && importance <= 5)) {
      setImportanceError(true);
      hasError = true;
    } else {
      setImportanceError(false);
    }
    if (!(estimatedTime >= 1 && estimatedTime <= 5)) {
      setEstimatedTimeError(true);
      hasError = true;
    } else {
      setEstimatedTimeError(false);
    }

    if (hasError) return;

    const data: CreateTaskDTO = {
      title,
      dueAt: date ? date.toISOString() : new Date().toISOString(),
      projectId: projectValue!,
      importance,
      estimatedTime,
    };

    try {
      setOpen(false);
      alert("Submitted data: " + JSON.stringify(data, null, 2));
      await createTask(data);
      setDate(undefined);
      setDateValue("");
      setProject(null);
      setImportance(0);
      setEstimatedTime(0);
      onTaskCreated?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t("new")}</Button>
      </DialogTrigger>

      <DialogContent className="min-w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{t("createTitle")}</DialogTitle>
          </DialogHeader>

          <FieldGroup className="gap-2">
            <Field className="gap-2">
              <FieldLabel htmlFor="title">
                {tCommon("title")} <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder={tCommon("title")}
                aria-invalid={titleError}
              />
              {titleError && <FieldError>{tCommon("enterTitle")}</FieldError>}
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="dueDate">
                {tCommon("dueDate")} <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="date-required"
                  value={dateValue}
                  placeholder={tCommon("selectDate")}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setDateValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setDateOpen(true);
                    }
                  }}
                  aria-invalid={dateError}
                />
                <InputGroupAddon align="inline-end">
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <InputGroupButton
                        id="date-picker"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Select date"
                      >
                        <CalendarIcon />
                        <span className="sr-only">Select date</span>
                      </InputGroupButton>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                          setDate(date);
                          setDateValue(formatDate(date));
                          setDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
              {dateError && <FieldError>{tCommon("enterDueDate")}</FieldError>}
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="type">
                {t("project")} <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                value={project?.toString() || ""}
                onValueChange={(value) => setProject(Number(value))}
              >
                <SelectTrigger className="gap-2" id="type" name="type">
                  <SelectValue placeholder={t("selectProject")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("projects")}</SelectLabel>
                    {projects?.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id.toString()}
                      >
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {projectError && (
                <FieldError>{t("selectProjectError")}</FieldError>
              )}
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="Importance">
                {tCommon("importance")}{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="flex flex-row w-full items-center justify-between">
                <p className="text-sm font-light text-gray-500 text-center w-1/4">
                  {tCommon("notImportant")}
                </p>
                <div className="flex gap-1 w-full justify-between max-w-xs mx-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      className="transition-transform hover:scale-110"
                      key={star}
                      onClick={() => setImportance(star)}
                      onMouseEnter={() => setHoverImportance(star)}
                      onMouseLeave={() => setHoverImportance(0)}
                      type="button"
                      aria-label={`Set importance to ${star}`}
                    >
                      <StarIcon
                        className={cn(
                          "h-8 w-8 transition-colors",
                          (hoverImportance || importance) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground",
                        )}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm font-light text-gray-500 text-center w-1/4">
                  {tCommon("veryImportant")}
                </p>
              </div>
              {importanceError && (
                <FieldError>{tCommon("selectImportance")}</FieldError>
              )}
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="estimatedTime">
                {tCommon("estimatedDuration")}{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="flex flex-row w-full items-center justify-between">
                <p className="text-sm font-light text-gray-500 text-center w-1/4">
                  {tCommon("littleTime")}
                </p>
                <div className="flex gap-1 w-full justify-between max-w-xs mx-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      className="transition-transform hover:scale-110"
                      key={star}
                      onClick={() => setEstimatedTime(star)}
                      onMouseEnter={() => setHoverEstimatedTime(star)}
                      onMouseLeave={() => setHoverEstimatedTime(0)}
                      type="button"
                      aria-label={`Set estimated time to ${star}`}
                    >
                      <StarIcon
                        className={cn(
                          "h-8 w-8 transition-colors",
                          (hoverEstimatedTime || estimatedTime) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground",
                        )}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm font-light text-gray-500 text-center w-1/4">
                  {tCommon("lotsOfTime")}
                </p>
              </div>
              {estimatedTimeError && (
                <FieldError>{tCommon("selectEstimatedTime")}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {tCommon("cancel")}
              </Button>
            </DialogClose>

            <Button type="submit">{t("create")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
