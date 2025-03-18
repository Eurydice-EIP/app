import React, { useEffect, useRef } from "react";
import Button from "../atoms/Button";

type DropdownMenuProps = {
  buttonClassName?: string;
  menuClassName?: string;
  label?: string;
  options: string[];
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (option: string) => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  buttonClassName = "",
  menuClassName = "",
  label = "",
  options,
  isOpen = false,
  setIsOpen,
  onSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} className="relative min-w-40">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`${buttonClassName}`}
        type="button"
      >
        {label}
      </button>
      {isOpen && (
        <div className={`${menuClassName}`}>
          <ul className="py-1 text-sm text-[#515351]">
            {options.map((option) => (
              <li key={option}>
                <Button
                  type="button"
                  className="justify-start w-full px-4 py-2 hover:bg-[#F4F7F8]"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
