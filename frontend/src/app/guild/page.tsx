"use client";

import { useState } from "react";
import GuildQuest from "@/components/organisms/GuildQuest";
import Image from "next/image";
import ProgressBar from "@/components/molecules/ProgressBar";
import VerticalProgressBar from "@/components/molecules/VerticalProgressBar";

export default function Guild() {
  const companions = [
    {
      id: 1,
      img: "/data/profile_picture.jpg",
      name: "John",
      level: 12,
      totalTasks: 4,
      tasksDone: 2,
    },
    {
      id: 2,
      img: "/data/profile_picture.jpg",
      name: "Jihn",
      level: 15,
      totalTasks: 3,
      tasksDone: 1,
    },
    {
      id: 3,
      img: "/data/profile_picture.jpg",
      name: "Jahn",
      level: 20,
      totalTasks: 2,
      tasksDone: 2,
    },
    {
      id: 4,
      img: "/data/profile_picture.jpg",
      name: "Juhn",
      level: 18,
      totalTasks: 5,
      tasksDone: 3,
    },
  ];

  const guild = {
    name: "Epiforce",
    level: 3,
    xp: 100,
    maxXp: 1000,
    companions: companions,
    img: "/data/profile_picture.jpg",
  };

  const [selectedCompanion, setSelectedCompanion] = useState<number | null>(
    null
  );

  return (
    <div className="flex h-full flex-col">
      <h1 className="text-center text-[#515351] text-3xl font-bold mb-6">
        Guild
      </h1>
      <div className="grid grid-cols-4 gap-10 h-full">
        <div className="grid gap-4 col-span-3 grid-cols-2">
          <div className="grid gap-4 col-span-2 grid-cols-3">
            <div className="grid grid-row-2 gap-4 col-span-2">
              {/* Companions */}
              <div className="bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 overflow-hidden">
                <h2 className="text-2xl font-bold text-[#515351] mb-4">
                  Companions
                </h2>
                <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2">
                  {companions.map((companion) => (
                    <div
                      key={companion.id}
                      className="flex flex-col items-center"
                    >
                      <Image
                        src={companion.img}
                        height={144}
                        width={144}
                        alt="Profile picture"
                        className="rounded-full aspect-square object-cover"
                      />
                      <p className="text-xl font-semibold text-gray-700 mt-2">
                        {companion.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Level {companion.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guild Level */}
              <div className="bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex flex-row items-center justify-between w-full gap-4">
                  <h2 className="text-2xl font-bold text-[#515351] mb-4">
                    Guild Level
                  </h2>
                  <div className="flex bg-[#E7F3F3] rounded-2xl p-3 border-2 border-[#B0E0E6] items-center w-15 h-15 justify-center">
                    <span className="text-4xl font-bold text-[#515351]">
                      {guild.level}
                    </span>
                  </div>
                </div>
                <ProgressBar
                  className="w-full"
                  barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
                  completion={(guild.xp / guild.maxXp) * 100}
                  max_value={100}
                ></ProgressBar>
              </div>
            </div>
            {/* Guild Quests */}
            <div className="bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 col-span-1 max-h-124 overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#515351] mb-4">
                Guild Quests
              </h2>
              <GuildQuest id={1} />
              <GuildQuest id={2} />
              <GuildQuest id={3} />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 col-span-2">
            {/* Friends Stats */}
            <div className="flex flex-col bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 col-span-2">
              <h2 className="text-2xl font-bold text-[#515351] mb-4">
                Friends Stats
              </h2>
              <div className="flex flex-row h-full justify-around">
                {companions.map((companion) => (
                  <div
                    key={companion.id}
                    onClick={() => setSelectedCompanion(companion.id)}
                  >
                    <VerticalProgressBar
                      className="flex h-full"
                      barClassName="flex flex-col-reverse h-full w-5 bg-[#E7F3F3] rounded-full overflow-hidden"
                      completion={
                        (companion.tasksDone / companion.totalTasks) * 100
                      }
                      max_value={100}
                    ></VerticalProgressBar>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 col-span-3 flex flex-col items-center justify-center w-full h-full">
              {!selectedCompanion ? (
                <h2 className="text-2xl font-bold text-[#515351] mb-4">
                  Select a Friend
                </h2>
              ) : (
                <div className="grid grid-cols-20 gap-8 flex flex-row items-center">
                  <div className="grid grid-row-2 gap-4 col-span-5">
                    <Image
                      src={
                        selectedCompanion
                          ? companions.find((c) => c.id === selectedCompanion)
                              ?.img || "/data/profile_picture.jpg"
                          : "/data/profile_picture.jpg"
                      }
                      height={144}
                      width={144}
                      alt="Profile picture"
                      className="rounded-full aspect-square object-cover"
                    />
                    {selectedCompanion && (
                      <div className="flex flex-col items-center mt-4">
                        <p className="text-xl font-semibold text-gray-700">
                          {
                            companions.find((c) => c.id === selectedCompanion)
                              ?.name
                          }
                        </p>
                        <p className="text-sm text-gray-500">
                          Level{" "}
                          {
                            companions.find((c) => c.id === selectedCompanion)
                              ?.level
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Separator */}
                  <div className="border-l-2 border-[#B0E0E6] h-full col-span-1"></div>
                  <div className="col-span-2 items-center col-span-14">
                    <span className="text-xl font-semibold text-gray-700">
                      Tasks Done
                    </span>
                    <ProgressBar
                      className="w-full"
                      barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
                      completion={
                        ((companions.find((c) => c.id === selectedCompanion)
                          ?.tasksDone || 0) *
                          100) /
                        (companions.find((c) => c.id === selectedCompanion)
                          ?.totalTasks || 1)
                      }
                      max_value={100}
                    ></ProgressBar>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guild Info */}
        <div className="bg-[#F4F7F8] border-2 border-[#B0E0E6] rounded-xl p-4 col-span-1 flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <Image
              src={guild.img}
              height={144}
              width={144}
              alt="Profile picture"
              className="rounded-full aspect-square object-cover"
            />
            <h2 className="text-4xl font-bold text-[#515351] mt-4">
              {guild.name}
            </h2>
            <span className="text-2xl font-semibold text-gray-700">
              Level {guild.level}
            </span>
          </div>
          <div className="flex flex-col items-center border-2 border-[#B0E0E6] rounded-xl p-4 my-2 bg-[#E7F3F3] w-full">
            <p className="flex text-2xl font-bold text-[#515351] justify-center">
              {`Today's Progress`}
            </p>
            <ProgressBar
              className="w-full"
              barClassName="flex w-full h-5 rounded-full overflow-hidden bg-white rounded-full overflow-hidden border-2 border-gray-200"
              completion={companions.reduce(
                (acc, companion) =>
                  acc +
                  (companion.tasksDone / companion.totalTasks) *
                    (100 / companions.length),
                0
              )}
              max_value={100}
            ></ProgressBar>
          </div>
        </div>
      </div>
    </div>
  );
}
