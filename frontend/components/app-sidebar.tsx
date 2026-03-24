"use client";

import * as React from "react";
import {
  House,
  ChartNoAxesColumn,
  BookOpen,
  Settings,
  Moon,
  Map,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

const user = {
  name: "Oscar",
  email: "Oscar@test.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sidebar");

  const navMain = [
    { title: t("dashboard"), url: "/", icon: House },
    { title: t("projects"), url: "/projects", icon: BookOpen },
    { title: t("analytics"), url: "/analytics", icon: ChartNoAxesColumn },
  ];

  const navSecondary = [
    { title: t("settings"), url: "/settings", icon: Settings },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="">
                <Map className="!size-5" />
                <span className="text-base font-semibold">Eurydice</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
