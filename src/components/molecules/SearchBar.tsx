"use client";

import { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "../atoms/Button";

type SearchBarProps = {
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ className = "" }) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  return (
    <div className={`${className}`}>
      <form className="mx-auto">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F4F7F8] rounded-s-lg border-[#B0E0E6] border-2 focus:outline-none"
              placeholder="Search Projects"
              required
            />
            <Button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#B0E0E6] border border-[#B0E0E6] hover:bg-[#A3D8C1]"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </Button>
          </div>

          <Dropdown
            buttonClassName="w-full z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#515351] bg-[#F4F7F8] border-[#B0E0E6] border-y-2 border-e-2 hover:bg-gray-200"
            menuClassName="absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 z-50 border border-[#B0E0E6] border-2"
            label="Sort by"
            options={[
              "Oldest",
              "Newest",
              "Opened Recently",
              "Highest completion",
              "Lowest completion",
            ]}
            isOpen={isSortDropdownOpen}
            setIsOpen={(open) => {
              setIsSortDropdownOpen(open);
              setIsFilterDropdownOpen(false);
            }}
            onSelect={(option) => console.log("Sort selected:", option)}
          />

          <Dropdown
            buttonClassName="w-full z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#515351] bg-[#F4F7F8] border-[#B0E0E6] border-y-2 border-e-2 rounded-e-lg hover:bg-gray-200"
            menuClassName="absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 z-50 border border-[#B0E0E6] border-2"
            label="Filter"
            options={["Ending soon", "Finished", "Not Finished"]}
            isOpen={isFilterDropdownOpen}
            setIsOpen={(open) => {
              setIsFilterDropdownOpen(open);
              setIsSortDropdownOpen(false);
            }}
            onSelect={(option) => console.log("Filter selected:", option)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
