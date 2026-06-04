"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const tCommon = useTranslations("common");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
        <span className="ml-2">{tCommon("loading")}</span>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full min-h-0">
        <AppSidebar className="min-h-0" />
        <main className="flex-1 min-h-0 flex flex-col">
          <SidebarTrigger />
          {/* Désactivable */}
          {children}
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
