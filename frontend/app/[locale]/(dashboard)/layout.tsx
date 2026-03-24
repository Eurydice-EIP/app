import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full min-h-0">
        <AppSidebar className="min-h-0" />
        <main className="flex-1 min-h-0 flex flex-col">
          <SidebarTrigger />
          {/* Désactivable */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
