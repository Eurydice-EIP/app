import React from "react";

type LabelProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
};

const Label: React.FC<LabelProps> = ({
  children,
  icon = null,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-left w-fit min-w-[118px] ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="icon" role="img" aria-label="icon">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="icon" role="img" aria-label="icon">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Label;
