"use client";

import Button from "../atoms/Button";
import Image from "next/image";

type TaskProps = {
  className?: string;
  task?: string;
  description?: string;
  xp?: number;
  money?: number;
};

const Task: React.FC<TaskProps> = ({
  className = "",
  task = "",
  description = "",
  xp = 0,
  money = 0,
}) => {

  return (
    <div
      className={`${className}`}>
        <div
          className="grid grid-cols-3 gap-4">
            <div
              className="col-span-2 flex flex-col justify-start">
                <p className="text-2xl font-bold text-[#343534]">{task}</p>
                <p className="text-xl text-[#343534]">{description}</p>
            </div>
            <div
              className="flex justify-end">
                <Button
                    className="flex-none ml-4 rounded-xl px-4 py-1 text-2xl text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
                    onClick={() => {
                    alert("Button clicked!");
                    }}
                >
                    Done
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
            <p className="text-xl font-bold text-[#343534] mx-2 mr-12">{xp} XP</p>
            <Image
                src="/icons/moula.svg"
                alt="Moula icon"
                width={25}
                height={25}
                className="rounded-full"
            />
            <p className="text-xl font-bold text-[#343534] mx-2">{money}</p>
        </div>
    </div>
  );
};

export default Task;
