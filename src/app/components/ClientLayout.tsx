// src/app/components/ClientLayout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? ""; // fallback to empty string
  
  // Hide Navbar for all /auth pages
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <SessionProvider>
      {!hideNavbar && <Navbar />}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </SessionProvider>
  );
}
