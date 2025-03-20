"use client";

import Image from "next/image";

type DoneRecentlyProps = {
  className?: string;
};

const DoneRecently: React.FC<DoneRecentlyProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <p className="my-2 text-2xl font-bold text-[#515351]">Done recently</p>
      <div className="flex flex-row">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={38}
          height={38}
          className="rounded-full"
        />
        <p className="ml-3 my-3 text-2xl font-bold text-[#515351]">
          Get project approved
        </p>
      </div>
      <div className="flex flex-row">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={38}
          height={38}
          className="rounded-full"
        />
        <p className="ml-3 my-3 text-2xl font-bold text-[#515351]">
          Make Home mockup
        </p>
      </div>
      <div className="flex flex-row">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={38}
          height={38}
          className="rounded-full"
        />
        <p className="ml-3 my-3 text-2xl font-bold text-[#515351]">
          Update slide deck
        </p>
      </div>
      <div className="flex flex-row">
        <Image
          src="/icons/xp.svg"
          alt="XP icon"
          width={38}
          height={38}
          className="rounded-full"
        />
        <p className="ml-3 my-3 text-2xl font-bold text-[#515351]">
          Survive first week
        </p>
      </div>
    </div>
  );
};

export default DoneRecently;
