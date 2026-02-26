import React from "react";

type IconProps = {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

const IconArrowRight: React.FC<IconProps> = ({
  onClick,
  isSelected = false,
  className = "",
}) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <path
        d="M7.08398 17.0007H26.9173M26.9173 17.0007L17.0007 7.08398M26.9173 17.0007L17.0007 26.9173"
        stroke="var(--background)"
        strokeWidth={isSelected ? "3" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrowRight;
