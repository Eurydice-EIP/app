import React from "react";

import Button from "../atoms/Button";
import MiniProfile from "./MiniProfile";
import DailyQuests from "./DailyQuests";
import DailyQuest from "../molecules/DailyQuest";
import TimerProgress from "./TimerProgress";
import MiniStats from "../molecules/MiniStats";

type RightBarProps = {
  className?: string;
};

const RightBar: React.FC<RightBarProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <MiniStats
        className="px-2"
        achievements={9}
        streak={42}
        money={843}
      ></MiniStats>
      <MiniProfile
        className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
        name="John Doe"
        guild="Epiforce"
        level={21}
        xp={180}
        max_xp={200}
      ></MiniProfile>
      <DailyQuests className="my-4   rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2">
        <p className="justify-start flex text-2xl font-bold text-[#515351]">
          Daily Quests
        </p>
        <DailyQuest
          className="my-4"
          quest="Earn 10 XP"
          max={10}
          current={2}
        ></DailyQuest>
        <hr className="mt-2 border-1 rounded-xl border-[#B0E0E6]"></hr>
        <DailyQuest
          className="my-4"
          quest="Earn 10 XP"
          max={10}
          current={2}
          button={
            <Button
              className="flex-none ml-6 rounded-xl max-h-14 text-l font-bold text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
              onClick={() => {
                alert("+1 !");
              }}
            >
              +1
            </Button>
          }
        ></DailyQuest>
      </DailyQuests>
      <TimerProgress
        className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
        project="EIP Epitech"
        task="Work on Mockup"
        timer="25:37"
        completion={68}
      ></TimerProgress>
    </div>
  );
};

export default RightBar;
