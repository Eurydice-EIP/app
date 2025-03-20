"use client";
import { useState } from "react";

import ProjectOverview from "@/components/organisms/ProjectOverview";
import ProjectTasks from "@/components/organisms/ProjectTasks";
import ProjectCalendar from "@/components/organisms/ProjectCalendar";
import ProjectStats from "@/components/organisms/ProjectStats";
import RightBar from "@/components/organisms/RightBar";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "calendar" | "stats"
  >("overview");

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-3">
        <p className="justify-center flex text-3xl font-bold text-[#515351]">
          EIP Epitech
        </p>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-10 flex space-x-6 border-b-2 border-[#B0E0E6]">
            {["overview", "tasks", "calendar", "stats"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-3xl font-semibold ${
                  activeTab === tab
                    ? "text-[#515351] border-b-2 border-[#515351]"
                    : "text-[#B0E0E6]"
                }`}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab as any)}
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
        <RightBar></RightBar>
      </div>
    </div>
  );
}
