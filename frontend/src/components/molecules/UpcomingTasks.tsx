"use client";

import InlineTask from "./InlineTask";

type UpcomingTasksProps = {
  className?: string;
};

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <p className="my-2 text-2xl font-bold text-[#515351]">Upcoming tasks</p>
      <p className="text-xl font-bold text-[#949494]">Today</p>
      <hr className="my-1 border-1 rounded-xl border-[#B0E0E6]"></hr>
      <InlineTask
        task="Make the project page"
        buttonClassName="flex-none rounded-xl px-4 py-1 max-h-14 text-2xl text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
      ></InlineTask>
      <p className="text-xl font-bold text-[#949494]">Tomorrow</p>
      <hr className="my-1 border-1 rounded-xl border-[#B0E0E6]"></hr>
      <InlineTask
        className="my-2"
        task="Make the project page"
        buttonClassName="flex-none rounded-xl px-4 py-1 max-h-14 text-2xl text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
      ></InlineTask>
      <InlineTask
        className="my-2"
        task="Make the project page"
        buttonClassName="flex-none rounded-xl px-4 py-1 max-h-14 text-2xl text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
      ></InlineTask>
      <InlineTask
        className="my-2"
        task="Make the project page"
        buttonClassName="flex-none rounded-xl px-4 py-1 max-h-14 text-2xl text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
      ></InlineTask>
    </div>
  );
};

export default UpcomingTasks;
