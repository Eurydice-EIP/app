import React from "react";

type IconProps = {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

const IconMap: React.FC<IconProps> = ({
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
        d="M11.3327 25.5007L1.41602 31.1673V8.50065L11.3327 2.83398M11.3327 25.5007L22.666 31.1673M11.3327 25.5007V2.83398M22.666 31.1673L32.5827 25.5007V2.83398L22.666 8.50065M22.666 31.1673V8.50065M22.666 8.50065L11.3327 2.83398"
        stroke={
          isSelected
            ? "var(--color-icon-sidebar-selected)"
            : "var(--color-icon-sidebar-unselected)"
        }
        strokeWidth={isSelected ? "3" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconMap;
