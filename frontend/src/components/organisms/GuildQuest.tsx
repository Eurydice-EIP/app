"use client";

import { useState, useEffect } from "react";
import CheckBox from "../atoms/CheckBox";
import ProgressBar from "../molecules/ProgressBar";

const quests = [
  {
    id: 1,
    name: "Manger 2 Repas",
    finishedBy: [1, 2],
    allPeople: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Faire son Duolingo",
    finishedBy: [4],
    allPeople: [1, 2, 3, 4],
  },
  {
    id: 3,
    name: "Respirer",
    finishedBy: [1, 2, 3, 4],
    allPeople: [1, 2, 3, 4],
  },
];

type GuildQuestProps = {
  id: number;
};

const GuildQuest: React.FC<GuildQuestProps> = ({ id }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [quest, setQuest] = useState<{
    id: number;
    name: string;
    finishedBy: number[];
    allPeople: number[];
  } | null>(null);

  useEffect(() => {
    const foundQuest = quests.find((quest) => quest.id === id);
    if (foundQuest) {
      setQuest(foundQuest);
      setIsChecked(foundQuest.finishedBy.includes(id));
    }
  }, [id]);

  if (!quest) return null;

  return (
    <div className="flex flex-col items-center border-2 border-[#B0E0E6] rounded-xl p-4 my-2 bg-[#E7F3F3]">
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <span className="text-2xl font-bold text-[#515351]">{quest.name}</span>
        <CheckBox
          id={quest.name}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <span className="text-sm font-semibold text-gray-700 mt-2">
          {quest.finishedBy.length}/{quest.allPeople.length}
        </span>
      </div>
      <ProgressBar
        className="w-full"
        barClassName="flex w-full h-5 rounded-full overflow-hidden bg-white rounded-full overflow-hidden border-2 border-gray-200"
        completion={(quest.finishedBy.length / quest.allPeople.length) * 100}
        max_value={100}
        display={false}
      ></ProgressBar>
    </div>
  );
};

export default GuildQuest;
