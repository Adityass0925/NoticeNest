"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
          Welcome to NoticeNest
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Connect with your community, stay updated, and join events!
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/home" })}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-purple-400 text-white font-bold py-3 rounded-xl shadow hover:scale-105 transition-transform duration-200 mb-6"
        >
          <svg width="24" height="24" viewBox="0 0 48 48" className="mr-2">
            <g>
              <path
                fill="#4285F4"
                d="M44.5 20H24v8.5h11.7C34.7 33.6 30.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.2-6.2C34.5 6.7 29.6 4.5 24 4.5 13.5 4.5 5 13 5 24s8.5 19.5 19 19.5c9.5 0 17.5-7.7 17.5-17.5 0-1.2-.1-2.3-.3-3.5z"
              />
              <path
                fill="#34A853"
                d="M6.7 14.7l7 5.1C15.7 16.1 19.5 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.2-6.2C34.5 6.7 29.6 4.5 24 4.5c-7.2 0-13.3 4.1-16.3 10.2z"
              />
              <path
                fill="#FBBC05"
                d="M24 44.5c5.7 0 10.5-1.9 14.1-5.2l-6.5-5.3c-2 1.4-4.6 2.2-7.6 2.2-6.7 0-12.3-4.5-14.3-10.6l-7 5.4C7.1 39.9 14.9 44.5 24 44.5z"
              />
              <path
                fill="#EA4335"
                d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.8-2l-7 5.4C17.7 41.9 20.7 44.5 24 44.5c5.7 0 10.5-1.9 14.1-5.2l-6.5-5.3c-2 1.4-4.6 2.2-7.6 2.2-6.7 0-12.3-4.5-14.3-10.6l-7 5.4C7.1 39.9 14.9 44.5 24 44.5z"
              />
            </g>
          </svg>
          Sign in with Google
        </button>
        <div className="mt-2 text-gray-400 text-xs text-center">
          Secure login powered by Google
        </div>
      </div>
    </div>
  );
}
