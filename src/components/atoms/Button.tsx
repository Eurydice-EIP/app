import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  icon = null,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center cursor-pointer ${className}`}
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
    </button>
  );
};

export default Button;
