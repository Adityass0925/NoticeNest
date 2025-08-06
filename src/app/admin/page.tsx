"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const adminEmail = "admin@example.com"; // ⬅️ Use same admin email

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.email !== adminEmail) {
      router.push("/");
    }
  }, [session, status, router]);

  if (!session || session.user?.email !== adminEmail) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>You have admin access. You can post or manage announcements here.</p>

      {/* Add admin post form/components here later */}
    </main>
  );
}
    