"use client";
import { useState } from "react";

import ProjectOverview from "@/components/organisms/ProjectOverview";
import ProjectTasks from "@/components/organisms/ProjectTasks";
import ProjectCalendar from "@/components/organisms/ProjectCalendar";
import ProjectStats from "@/components/organisms/ProjectStats";
import RightBar from "@/components/organisms/RightBar";

type UpcomingTaskProps = {
  className?: string;
};

const UpcomingTask: React.FC<UpcomingTaskProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "calendar" | "stats"
  >("overview");

  const tabs: Array<"overview" | "tasks" | "calendar" | "stats"> = [
    "overview",
    "tasks",
    "calendar",
    "stats",
  ];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <p className="justify-center flex text-3xl font-bold text-[#515351]">
            EIP Epitech
          </p>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-10 flex space-x-6 border-b-2 border-[#B0E0E6]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-3xl font-semibold ${
                    activeTab === tab
                      ? "text-[#515351] border-b-2 border-[#515351]"
                      : "text-[#B0E0E6]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === "overview" && <ProjectOverview />}
              {activeTab === "tasks" && <ProjectTasks />}
              {activeTab === "calendar" && <ProjectCalendar />}
              {activeTab === "stats" && <ProjectStats />}
            </div>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
