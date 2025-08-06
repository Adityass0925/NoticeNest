// src/app/components/ClientLayout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </SessionProvider>
  );
}
