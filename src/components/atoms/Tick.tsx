import React from "react";

type TickProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button";
  className?: string;
  fillColor?: string;
};

const Tick: React.FC<TickProps> = ({
  // children,
  onClick,
  type = "button",
  className = "",
  fillColor = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group flex items-center justify-center cursor-pointer ${className}`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${fillColor}`}
      >
        <circle cx="15" cy="15" r="14" stroke="#B5B9BC" strokeWidth="2" />
        <path
          d="M23.2362 9.70703L11.9127 21.0306L6.76562 15.8835"
          className="stroke-[#B5B9BC] group-hover:stroke-white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default Tick;
