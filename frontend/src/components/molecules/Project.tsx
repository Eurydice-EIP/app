"use client";

import Button from "../atoms/Button";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

type ProjectProps = {
  className?: string;
  project?: string;
  xp?: number;
  money?: number;
  completion?: number;
};

const Project: React.FC<ProjectProps> = ({
  className = "",
  project = "",
  xp = 0,
  money = 0,
  completion = 0,
}) => {
  const handleRedirect = (text: string) => {
    if (window) {
      window.location.href = `/${text}`;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 justify-start">
          <p className="text-2xl font-bold text-[#515351]">{project}</p>
        </div>
        <div className="flex justify-end">
          <Button
            className="flex-none ml-4 rounded-xl py-1 text-2xl font-bold text-[#B0E0E6] hover:text-[#A3D8C1]"
            onClick={() => handleRedirect("projects/project")}
          >
            View
          </Button>
        </div>
      </div>
      <div className="flex flex-row">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="text-xl font-bold text-[#515351] mx-2 mr-12">{xp} XP</p>
        <Image
          src="/icons/moula.svg"
          alt="Moula icon"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="text-xl font-bold text-[#515351] mx-2">{money}</p>
      </div>
      <ProgressBar
        className="mt-6"
        barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
        completion={completion}
        max_value={100}
      ></ProgressBar>
    </div>
  );
};

export default Project;
