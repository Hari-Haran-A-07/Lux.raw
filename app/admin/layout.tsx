"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/lib/store/authStore";
import { Shield } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN"))) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-xs font-editorial-caps text-[#b59a6d]">
        AUTHENTICATING ADMIN PRIVILEGES...
      </div>
    );
  }

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f3ef] flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Admin Top bar */}
        <div className="bg-[#0d0d0f] border-b border-[#27272a] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-editorial-caps text-[#b59a6d]">
            <Shield className="w-4 h-4" />
            <span>AUTHENTICATED MAISON EXECUTIVE CONSOLE</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#a1a1aa]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Central SQLite DB Connected</span>
            <span>•</span>
            <span className="text-white font-medium">{user.name}</span>
          </div>
        </div>

        {/* Content Area */}
        <main className="p-6 sm:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
