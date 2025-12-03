import Sidebar from "@/components/molecules/SideBar";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-[#F9F7F3] text-gray-800">
        <div className="flex min-h-screen bg-[#F9F7F3]">
          <Sidebar />
          <div className="flex-1 flex flex-col p-4">
            <div className="flex-1 ml-[72px]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
