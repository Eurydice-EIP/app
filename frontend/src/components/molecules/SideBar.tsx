"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleRedirect = (text: string) => {
    if (window) {
      window.location.href = `/${text}`;
    }
  };

  return (
    <div
      className={`relative h-screen ${
        isOpen ? "w-64" : "w-24"
      } transition-all duration-300`}
    >
      <div
        className={`fixed top-0 left-0 h-full ${
          isOpen ? "w-64" : "w-24"
        } bg-[#E7F3F3] border-r-2 border-[#A3D8C1] rounded-r-3xl transition-all duration-300`}
      >
        <div className="p-4 flex flex-col items-center">
          <Button
            className="absolute top-4 right-[-20px] bg-[#A3D8C1] p-2 rounded-full shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>

          {isOpen ? (
            <>
              <h2 className="text-2xl font-bold text-[#A3D8C1]">Eurydice</h2>
              <nav className="flex flex-col items-center mt-8 w-full">
                <Button
                  className="rounded-lg px-4 py-2 text-black font-black w-full"
                  onClick={() => handleRedirect("")}
                >
                  Home
                </Button>
                <Button
                  className="rounded-lg px-4 py-2 text-black font-black w-full"
                  onClick={() => handleRedirect("profile")}
                >
                  Profile
                </Button>
              </nav>
            </>
          ) : (
            <Image
              src="/logo-black.png"
              alt="Eurydice"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
