"use client";

import Button from "../atoms/Button";
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

  return (
    <div
      className={`${className}`}>
        <div
          className="grid grid-cols-3 gap-4">
            <div
              className="col-span-2 flex flex-col justify-start">
                <p className="text-2xl font-bold text-[#515351]">{project}</p>
            </div>
            <div
              className="flex justify-end">
                <Button
                    className="flex-none ml-4 rounded-xl px-4 py-1 text-2xl font-bold text-[#B0E0E6] hover:text-[#A3D8C1]"
                    onClick={() => {
                    alert("Button clicked!");
                    }}
                >
                    View
                </Button>
            </div>
        </div>
        <div
            className="flex flex-row my-2">
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
        <div>
        <div className="inline-block mb-2 px-0.5 text-s font-medium text-[#515351] font-bold rounded-lg" style={{ marginLeft: `calc(${completion}% - 20px)` }}>{completion}%</div>
            <div className="flex w-full h-4 bg-[#E7F3F3] rounded-full overflow-hidden" role="progressbar" aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100}>
            <div className="flex flex-col justify-center rounded-full overflow-hidden bg-[#A3D8C1] text-xs text-white text-center whitespace-nowrap transition duration-500" style={{ width: `${completion}%` }}></div>
            </div>
        </div>
    </div>
  );
};

export default Project;
