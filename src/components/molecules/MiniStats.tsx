"use client";

import Image from "next/image";

type MiniStatsProps = {
  className?: string;
  achievements?: number;
  streak?: number;
  money?: number;
};

const MiniStats: React.FC<MiniStatsProps> = ({
  className = "",
  achievements = 0,
  streak = 0,
  money = 0,
}) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-row justify-start">
          <Image
            src="/icons/achievement.svg"
            height={25}
            width={25}
            alt="Achievement icon"
            className="mr-3"
          />
          <p className="text-xl font-bold text-[#515351]">{achievements}</p>
        </div>
        <div className="col-span-1 flex flex-row justify-center">
          <Image
            src="/icons/streak.svg"
            height={25}
            width={25}
            alt="Streak icon"
            className="mr-3"
          />
          <p className="text-xl font-bold text-[#515351]">{streak}</p>
        </div>
        <div className="col-span-1 flex flex-row justify-end">
          <Image
            src="/icons/moula.svg"
            height={25}
            width={25}
            alt="Money icon"
            className="mr-3"
          />
          <p className="text-xl font-bold text-[#515351]">{money}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniStats;
