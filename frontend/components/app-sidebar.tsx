"use client";

import * as React from "react";
import {
  House,
  ChartNoAxesColumn,
  BookOpen,
  Settings,
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
import { fetchUser } from "@/lib/user";
import { User } from "@/types/entities/user";
import { useEffect } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sidebar");
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await fetchUser();
        setUser(result as User);
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
      }
    };

    loadUser();
  }, []);

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
        <NavUser user={user || null} />
      </SidebarFooter>
    </Sidebar>
  );
}
