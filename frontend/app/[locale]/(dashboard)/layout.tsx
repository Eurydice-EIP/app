"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";
import { getTokenExpiration, isTokenValid } from "@/lib/auth";
import { MsgAlertDialog } from "@/components/msg-alert-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorOpen, setErrorOpen] = useState(false);
  const tCommon = useTranslations("common");
  const tSessionExpired = useTranslations("sessionExpired");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    setIsLoading(false);

    const expirationTime = getTokenExpiration(token);
    if (!expirationTime) {
      return;
    }

    const remaining = expirationTime - Date.now();
    if (remaining <= 0) {
      localStorage.removeItem("token");
      setErrorOpen(true);
      return;
    }

    const timer = window.setTimeout(() => {
      localStorage.removeItem("token");
      setErrorOpen(true);
    }, remaining);

    return () => window.clearTimeout(timer);
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
      <MsgAlertDialog open={errorOpen} onOpenChange={setErrorOpen} title={tSessionExpired("title")} description={tSessionExpired("message")} actionLabel={tSessionExpired("actionLabel")} action={() => router.push("/login")} />
    </SidebarProvider>
  );
}
