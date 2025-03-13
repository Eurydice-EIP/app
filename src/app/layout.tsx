import Sidebar from "@/components/molecules/SideBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-800">
        <div className="flex min-h-screen bg-white">
          <Sidebar />

          <div className="flex-1 p-4 lg:ml-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
