"use client";

import InlineTask from "../molecules/InlineTask";
import { useTranslations } from "next-intl";

type TasksWidgetProps = {
  className?: string;
};

const TasksWidget: React.FC<TasksWidgetProps> = ({ className = "" }) => {
  const t = useTranslations("home");

  return (
    <div className={`${className}`}>
      <p className="font-medium text-[#343534] text-[36px]">{t("tasks")}</p>
      <InlineTask taskNumber="01" task="Faire une tartiflette"></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="02"
        task="Faire une autre tartiflette"
      ></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="03"
        task="Faire encore une tartiflette"
      ></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask taskNumber="04" task="Refaire une tartiflette"></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="05"
        task="Faire une dernière tartiflette"
      ></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="06"
        task="Faire une dernière pour de vrai tartiflette"
      ></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="07"
        task="Faire une tartiflette parce que je le mérite"
      ></InlineTask>
      <hr className="border-[#C9CACC]" />
      <InlineTask
        taskNumber="08"
        task="Bon, faire une dernière tartiflette"
      ></InlineTask>
    </div>
  );
};

export default TasksWidget;
