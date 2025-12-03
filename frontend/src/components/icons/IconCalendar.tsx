import React from "react";

type IconProps = {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

const IconCalendar: React.FC<IconProps> = ({
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
        d="M22.6667 2.83398V8.50065M11.3333 2.83398V8.50065M4.25 14.1673H29.75M7.08333 5.66732H26.9167C28.4815 5.66732 29.75 6.93584 29.75 8.50065V28.334C29.75 29.8988 28.4815 31.1673 26.9167 31.1673H7.08333C5.51853 31.1673 4.25 29.8988 4.25 28.334V8.50065C4.25 6.93584 5.51853 5.66732 7.08333 5.66732Z"
        stroke={isSelected ? "#0FA3B1" : "#6B7280"}
        strokeWidth={isSelected ? "3" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCalendar;
