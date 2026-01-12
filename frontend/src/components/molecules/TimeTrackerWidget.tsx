"use client";

import Button from "../atoms/Button";
import { useTranslations } from "next-intl";

type TimeTrackerWidgetProps = {
  className?: string;
  task?: string;
};

const TimeTrackerWidget: React.FC<TimeTrackerWidgetProps> = ({
  className = "",
  task = "",
}) => {
  const t = useTranslations("timeTracker");

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* <div className="flex items-center justify-center"> */}
      <div className="flex-auto">
        <p className="text-[28px] font-medium text-[#393E41] leading-8">
          {t("title")}
        </p>
        <p className="text-[20px] font-normal text-[#9A9D9F]">
          {t("startWorking", { task })}
        </p>
      </div>
      <Button
        onClick={() => {
          alert("Started timing");
        }}
        className="group rounded-[100%] w-[70px] h-[70px] bg-[#0FA3B1]"
        icon={
          <svg
            width="43"
            height="44"
            viewBox="0 0 43 44"
            className="fill-[#F5F3EE] stroke-[#F5F3EE] group-hover:fill-[#0FA3B1] transition-colors ml-3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.95898 5.5L34.0423 22L8.95898 38.5V5.5Z"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      ></Button>
      {/* </div> */}
    </div>
  );
};

export default TimeTrackerWidget;
