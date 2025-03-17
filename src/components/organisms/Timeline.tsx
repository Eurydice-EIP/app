import React from "react";

type TimelineProps = {
  children?: React.ReactNode;
  className?: string;
};

const Timeline: React.FC<TimelineProps> = ({
  children,
  className = "",
}) => {
  return (
    <ol
      className={`${className}`}>
        {children}
    </ol>
  );
};

export default Timeline;
