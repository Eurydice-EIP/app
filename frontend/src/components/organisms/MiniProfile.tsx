"use client";

import Image from "next/image";
import ProgressBar from "../molecules/ProgressBar";

type MiniProfileProps = {
  className?: string;
  name?: string;
  guild?: string;
  level?: number;
  xp?: number;
  max_xp?: number;
};

const MiniProfile: React.FC<MiniProfileProps> = ({
  className = "",
  name = "",
  guild = "",
  level = 0,
  xp = 0,
  max_xp = 0,
}) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col justify-start">
          <Image
            src="/data/profile_picture.jpg"
            height={60}
            width={60}
            alt="Profile picture"
            className="rounded-full aspect-square object-cover"
          />
        </div>
        <div className="col-span-3 flex flex-col justify-start">
          <p className="text-2xl font-bold text-[#515351]">{name}</p>
          <p className="text-xl font-bold text-[#A3D8C1]">Guild : {guild}</p>
        </div>
      </div>
      <div className="mt-4 mb-2">
        <div className="grid grid-cols-2 gap-4 items-center">
          <p className="text-2xl font-bold text-[#515351]">Level : {level}</p>
          <p className="text-l flex justify-end text-[#515351]">
            {xp} / {max_xp} XP
          </p>
        </div>
        <ProgressBar
          barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
          completion={xp}
          max_value={max_xp}
          percentage={false}
          display={false}
        ></ProgressBar>
      </div>
    </div>
  );
};

export default MiniProfile;
