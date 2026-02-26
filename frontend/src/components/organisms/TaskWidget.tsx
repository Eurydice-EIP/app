"use client";

import { Tasks } from "@/types/Tasks";
import InlineTask from "../molecules/InlineTask";
import { useTranslations } from "next-intl";

type TasksWidgetProps = {
  className?: string;
  tasks?: Tasks[];
};

const TasksWidget: React.FC<TasksWidgetProps> = ({
  className = "",
  tasks = [],
}) => {
  const t = useTranslations("projects");

  return (
    <div className={`${className}`}>
      <p className="font-medium text-[#343534] text-[36px]">{t("tasks")}</p>
      {tasks.map((task, index) => (
        <InlineTask
          key={index}
          taskNumber={`${index + 1}`.padStart(2, "0")}
          task={task.title}
        ></InlineTask>
      ))}
    </div>
  );
};

export default TasksWidget;
