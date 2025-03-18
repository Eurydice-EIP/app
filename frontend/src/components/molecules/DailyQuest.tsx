"use client";

import Button from "../atoms/Button";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

type DailyQuestProps = {
  className?: string;
  quest?: string;
  button?: React.ReactElement;
  max?: number;
  current?: number;
};

const DailyQuest: React.FC<DailyQuestProps> = ({
  className = "",
  quest = "",
  button = <Button></Button>,
  max = 0,
  current = 0,
}) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-5 gap-4 items-center">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={38}
          height={38}
          className="rounded-full"
        />
        <div className="col-span-4 flex flex-col justify-start">
          <div className="grid grid-cols-5 flex flex-row justify-start items-baseline mb-1">
            <p className="col-span-4 text-xl font-bold text-[#515351]">
              {quest}
            </p>
            {button}
          </div>
          <div className="flex flex-row justify-start items-baseline">
            <ProgressBar
              className="relative w-full"
              barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-s-lg overflow-hidden"
              completion={current}
              max_value={max}
              percentage={false}
            ></ProgressBar>
            <Image
              src="/icons/quest.svg"
              alt="XP icon"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
