"use client";

import Image from "next/image";

type AdvancementProps = {
  className?: string;
  xp?: number;
  max_xp?: number;
  money?: number;
  max_money?: number;
  tasks?: number;
  max_tasks?: number;
  streak?: number;
  days?: number;
};

const Advancement: React.FC<AdvancementProps> = ({
  className = "",
  xp = 0,
  max_xp = 0,
  money = 0,
  max_money = 0,
  tasks = 0,
  max_tasks = 0,
  streak = 0,
  days = 0,
}) => {
  return (
    <div className={`${className} min-h-60`}>
      <p className="text-2xl font-bold text-[#515351]">Advancement</p>
      <div className="flex flex-row mt-3">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="text-xl font-bold text-[#515351] mx-2 mr-12">
          {xp} / {max_xp}
        </p>
        <Image
          src="/icons/moula.svg"
          alt="Moula icon"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="text-xl font-bold text-[#515351] mx-2">
          {money} / {max_money}
        </p>
      </div>
      <div className="flex flex-row mt-3">
        <Image
          src="/icons/streak.svg"
          alt="XP icon"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="text-xl font-bold text-[#515351] mx-2">{streak}</p>
      </div>
      <p className="text-xl font-bold text-[#515351] mt-3">
        Tasks : {tasks} / {max_tasks}
      </p>
      <div className="flex flex-row mt-3">
        <p className="text-xl font-bold text-[#515351]">Ahead of</p>
        <p className="text-xl font-bold text-[#A3D8C1] mx-2">{days} days</p>
        <p className="text-xl font-bold text-[#515351]">from estimation</p>
      </div>
    </div>
  );
};

export default Advancement;
