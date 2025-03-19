import React from "react";
import { Check } from "lucide-react";

type CheckBoxProps = {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ id, checked, onChange }: CheckBoxProps) => {
  return (
    <div className="relative h-6 w-6">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        aria-label="test-checkbox"
        className="appearance-none h-full w-full border-2 border-[#B0E0E6] rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#B0E0E6] hover:border-[#B0E0E6] hover:ring-[#B0E0E6]"
      />
      {checked && (
        <Check
          className="absolute inset-0 h-5 w-5 text-black m-auto pointer-events-none"
          aria-label="test-check-icon"
        />
      )}
    </div>
  );
};

export default CheckBox;
