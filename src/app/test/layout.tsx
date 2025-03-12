import React from "react";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4">
        <h1 className="text-center text-2xl font-bold">Test Layout</h1>
      </header>
      <main className="flex-1 w-full bg-black">{children}</main>
      <footer className="w-full bg-blue-600 text-white py-2 text-center">
        &copy; Footer Layout
      </footer>
    </div>
  );
}
