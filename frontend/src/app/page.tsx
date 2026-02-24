"use client";

import { Project } from "@/types/Project";
import TasksWidget from "@/components/organisms/TaskWidget";
import { useState } from "react";
import UserSidebarInfo from "@/components/organisms/UserSidebarInfo";

export default function Home() {
  const sampleProjects: Project[] = [
    {
      title: "EIP",
      image:
        "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
      description: "EIP project description",
      doneTasks: 3,
      totalTasks: 5,
      xp: 100,
      reward: 50,
      remainingTime: 7,
    },
    {
      title: "Website Redesign",
      image:
        "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
      description: "Website Redesign project description",
      doneTasks: 2,
      totalTasks: 8,
      xp: 80,
      reward: 40,
      remainingTime: 10,
    },
    {
      title: "Mobile App aaaa",
      description: "Mobile App project description",
      image:
        "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
      doneTasks: 5,
      totalTasks: 12,
      xp: 120,
      reward: 60,
      remainingTime: 15,
    },
    {
      title: "EIP",
      image:
        "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
      description: "EIP project description",
      doneTasks: 3,
      totalTasks: 5,
      xp: 100,
      reward: 50,
      remainingTime: 7,
    },
    {
      title: "Website Redesign",
      image:
        "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
      description: "Website Redesign project description",
      doneTasks: 2,
      totalTasks: 8,
      xp: 80,
      reward: 40,
      remainingTime: 10,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex-1 flex-row pl-8 pr-[400px] py-4">
      <div className="flex flex-col">
        <h2 className="text-[var(--color-text)] font-bold text-4xl my-4">
          Dashboard
        </h2>
        <div ref={null} className="w-full overflow-x-auto">
          <div className="flex gap-4 carousel">
            {sampleProjects.map((project, index) => (
              <div
                key={index}
                className={`shrink-0 carousel-item ${
                  selectedIndex === index
                    ? "w-1/3 h-64 mb-4" // Increase both width and height for the selected card
                    : "w-1/4 h-56 opacity-70" // Default dimensions for unselected cards
                } transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedIndex(index)}
              >
                {/* Alternative Project Card */}
                <div
                  className="
            flex flex-col w-full h-full bg-[#FFFFFF] rounded-4xl overflow-visible shadow-md relative mb-4"
                >
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover rounded-t-2xl mb-4 h-1/2"
                  />
                  {/* Title & Description */}
                  <div className="flex flex-row p-4 justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">
                        {project.description}
                      </p>
                    </div>
                    {/* Play Btn */}
                    <div className="bg-[#B2C85C] w-10 h-10 flex items-center justify-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row border-[var(--color-widget-border)] border-1 rounded-[40px] bg-[var(--color-widget-primary)] px-8 my-4 w-full">
          <div className="flex flex-row w-1/2 h-full items-center">
            <h3 className="text-2xl font-bold text-[var(--color-text)]">
              {sampleProjects[selectedIndex].title}
            </h3>
          </div>
          <TasksWidget className="w-1/2"></TasksWidget>
        </div>
      </div>
      {/* Right Sidebar */}
      <UserSidebarInfo></UserSidebarInfo>
    </div>
  );
}
