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
      <body className="antialiased bg-white text-gray-800">
        <div className="flex min-h-screen bg-[#F4F7F8]">
          <Sidebar />

          <div className="flex-1 flex flex-col p-4 lg:ml-4 lg:mr-4">
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
