"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/admin/dashboard"); // or wherever you want to redirect
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="w-full max-w-md space-y-6 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded hover:shadow"
        >
          Sign in with Google
        </button>

        <div className="relative text-center text-gray-400 text-sm">
          <span className="px-2 bg-white">OR</span>
          <div className="absolute top-1/2 left-0 w-full border-t border-gray-300 -z-10" />
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign in as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
