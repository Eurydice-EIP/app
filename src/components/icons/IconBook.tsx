import React from "react";

type IconProps = {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

const IconBook: React.FC<IconProps> = ({
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
        d="M17.0007 9.91667C17.0007 8.41377 16.4036 6.97243 15.3409 5.90973C14.2782 4.84702 12.8369 4.25 11.334 4.25H2.83398V25.5H12.7507C13.8778 25.5 14.9588 25.9478 15.7559 26.7448C16.5529 27.5418 17.0007 28.6228 17.0007 29.75M17.0007 9.91667V29.75M17.0007 9.91667C17.0007 8.41377 17.5977 6.97243 18.6604 5.90973C19.7231 4.84702 21.1644 4.25 22.6673 4.25H31.1673V25.5H21.2507C20.1235 25.5 19.0425 25.9478 18.2454 26.7448C17.4484 27.5418 17.0007 28.6228 17.0007 29.75"
        stroke={isSelected ? "#0FA3B1" : "#6B7280"}
        strokeWidth={isSelected ? "3" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconBook;
