import Sidebar from "@/components/molecules/SideBar";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Sidebar />
            <div className="flex-1 flex flex-col p-4">
              <div className="flex-1 ml-[72px]">{children}</div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
