import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  icon = null,
  iconPosition = "left",
  className = "",
  isDisabled = false,
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center transition-colors duration-150";
  const enabledClasses = "cursor-pointer hover:opacity-90";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${
        isDisabled ? disabledClasses : enabledClasses
      } ${className}`}
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {icon && iconPosition === "left" && (
        <span className="icon mr-2" role="img" aria-label="icon">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="icon ml-2" role="img" aria-label="icon">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
