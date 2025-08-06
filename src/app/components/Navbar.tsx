"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const adminEmail = "admin@example.com"; // ⬅️ Replace this with actual admin email

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-purple-600">
        NoticeNest
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {status === "loading" ? (
          <span className="text-gray-500 text-sm">Loading...</span>
        ) : session ? (
          <>
            {/* Only visible when logged in */}
            <Link
              href="/announcements"
              className="font-bold text-yellow-500 text-lg hover:text-yellow-400 hover:underline transition-colors"
            >
              Announcements
            </Link>
            <Link
              href="/events"
              className="font-bold text-yellow-500 text-lg hover:text-yellow-400 hover:underline transition-colors"
            >
              Events
            </Link>
            <Link
              href="/marketplace"
              className="font-bold text-yellow-500 text-lg hover:text-yellow-400 hover:underline transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/about"
              className="font-bold text-yellow-500 text-lg hover:text-yellow-400 hover:underline transition-colors"
            >
              About
            </Link>

            {/* Admin Panel Link */}
            {session.user?.email === adminEmail && (
              <Link
                href="/admin"
                className="hover:underline text-red-600 font-semibold"
              >
                Admin
              </Link>
            )}

            <span className="text-sm text-gray-600">
              Hello, {session.user?.name?.split(" ")[0] || "User"}
            </span>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  );
}
