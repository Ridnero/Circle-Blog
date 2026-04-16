"use client";

import "./globals.css";
import Providers from "../component/Providers";
import Navbar from "../component/Navbar";

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900 min-h-screen">
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto py-10 px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}