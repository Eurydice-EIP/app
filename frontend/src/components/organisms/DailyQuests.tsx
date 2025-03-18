import React from "react";

type DailyQuestsProps = {
  children?: React.ReactNode;
  className?: string;
};

const DailyQuests: React.FC<DailyQuestsProps> = ({
  children,
  className = "",
}) => {
  return <div className={`${className}`}>{children}</div>;
};

export default DailyQuests;
