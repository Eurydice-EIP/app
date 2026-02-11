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
        d="M28.3327 29.75V26.9167C28.3327 25.4138 27.7357 23.9724 26.673 22.9097C25.6102 21.847 24.1689 21.25 22.666 21.25H11.3327C9.82979 21.25 8.38845 21.847 7.32574 22.9097C6.26304 23.9724 5.66602 25.4138 5.66602 26.9167V29.75M22.666 9.91667C22.666 13.0463 20.129 15.5833 16.9993 15.5833C13.8697 15.5833 11.3327 13.0463 11.3327 9.91667C11.3327 6.78705 13.8697 4.25 16.9993 4.25C20.129 4.25 22.666 6.78705 22.666 9.91667Z"
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
