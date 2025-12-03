"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/public/icons/logo.svg";
import IconHome from "../icons/IconHome";
import IconBook from "../icons/IconBook";
import IconCalendar from "../icons/IconCalendar";
import IconChart from "../icons/IconChart";
import IconMap from "../icons/IconMap";
import IconStar from "../icons/IconStar";
import IconUser from "../icons/IconUser";
import IconNight from "../icons/IconNight";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 h-screen w-[72px] p-2 flex flex-col justify-between items-center border-r-2 border-[#B5B9BC] bg-[#F5F3EE] overflow-auto">
      <div className="flex flex-col items-center gap-4">
        {/* keep your Logo / other icons as before */}
        <Logo
          onClick={() => router.push("/")}
          className="hover:cursor-pointer"
        />
        <IconHome
          onClick={() => router.push("/")}
          isSelected={pathname === "/"}
        />
        <IconBook
          onClick={() => router.push("/projects")}
          isSelected={pathname === "/projects"}
        />
        <IconChart
          onClick={() => router.push("/analytics")}
          isSelected={pathname === "/analytics"}
        />
        <IconCalendar
          onClick={() => router.push("/calendar")}
          isSelected={pathname === "/calendar"}
        />
        <IconMap
          onClick={() => router.push("/map")}
          isSelected={pathname === "/map"}
        />
        <IconStar
          onClick={() => router.push("/favorites")}
          isSelected={pathname === "/favorites"}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <IconUser
          onClick={() => router.push("/profile")}
          isSelected={pathname === "/profile"}
        />
        <IconNight
          onClick={() => {
            /* Implement theme toggle logic here */
          }}
          isSelected={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
