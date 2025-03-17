import Sidebar from "@/components/molecules/SideBar";
import "./globals.css";

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="font-sans antialiased bg-white text-gray-800">
        <div className="flex min-h-screen bg-[#F4F7F8]">
          <Sidebar />

          <div className="flex-1 p-4 lg:ml-4 lg:mr-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
