"use client";

import IconUser from "@/public/icons/User.svg";

const sampleUser = {
  name: "John Doe",
  level: 5,
  xp: 1200,
  nextLevelXp: 1500,
  stats: {
    health: 3,
    attack: 5,
    defense: 4,
    mana: 6,
  },
};

export default function UserSidebarInfo() {
  return (
    <div className="flex flex-col items-center w-1/6 border border-[var(--color-widget-border)] p-4 bg-[var(--color-widget-primary)] fixed right-0 top-0 h-full">
      <IconUser className="stroke-[#000000]" />
      <div className="flex flex-row justify-center items-center gap-2 mt-4">
        <p className="text-6xl font-bold text-[#000000]">{sampleUser.level}</p>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p>Level</p>
            <p className="text-md text-[var(--color-primary)] ml-2">
              {(sampleUser.xp / sampleUser.nextLevelXp) * 100}%
            </p>
          </div>
          <progress
            className="
          progress w-56 h-4 bg-[#B9E3E7]
          [&::-webkit-progress-value]:bg-[#36B2BE]
          [&::-moz-progress-bar]:bg-[#36B2BE]
          "
            value={sampleUser.xp}
            max={sampleUser.nextLevelXp}
          />
        </div>
      </div>
      {/* Stats */}
      <div className="w-3/4 h-px bg-[var(--color-widget-border)] my-4"></div>
      <div className="grid grid-cols-2 w-full items-center gap-4">
        {Object.entries(sampleUser.stats).map(([statName, statValue]) => (
          <div
            key={statName}
            className="flex flex-col justify-center items-center h-20 border border-[var(--color-widget-border)] rounded-xl"
          >
            <p className="text-md font-bold">
              {statName.charAt(0).toUpperCase() + statName.slice(1)}
            </p>
            <p
              className="text-lg font-bold
            text-[var(--color-primary)]"
            >
              {statValue}
            </p>
          </div>
        ))}
      </div>
      <div className="w-3/4 h-px bg-[var(--color-widget-border)] my-4"></div>
      <p className="text-md font-bold text-[#000000]">CURRENT BATTLE</p>
    </div>
  );
}
