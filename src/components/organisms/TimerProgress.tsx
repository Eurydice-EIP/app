"use client";

import ProgressBar from "../molecules/ProgressBar";

type TimerProgressProps = {
  className?: string;
  project?: string;
  task?: string;
  timer?: string;
  completion?: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({
  className = "",
  project = "",
  task = "",
  timer = "",
  completion = 0,
}) => {
  return (
    <div className={`${className}`}>
      <div className="col-span-3 flex flex-col items-center">
        <p className="text-xl font-bold text-[#515351]">{project}</p>
        <p className="text-2xl font-bold text-[#515351]">{task}</p>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-1 flex flex-col items-end">
          <p className="col-span-3 text-7xl ont-bold text-[#A3D8C1] justify-self-end">
            {timer}
          </p>
          <p className="text-2xl mb-1 font-bold text-[#A3D8C1]">left</p>
        </div>
        <hr className="my-2 border-1 rounded-xl border-[#B0E0E6]"></hr>
        <p className="flex text-2xl font-bold text-[#515351] justify-center">
          {`Today's Progress`}
        </p>
        <ProgressBar
          className="my-2"
          barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
          completion={completion}
          max_value={100}
        ></ProgressBar>
      </div>
    </div>
  );
};

export default TimerProgress;
