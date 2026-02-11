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
        d="M17.0007 2.83398L21.3782 11.7023L31.1673 13.1332L24.084 20.0323L25.7557 29.779L17.0007 25.1748L8.24565 29.779L9.91732 20.0323L2.83398 13.1332L12.6232 11.7023L17.0007 2.83398Z"
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

export default IconBook;
