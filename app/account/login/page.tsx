"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await login(email, password);
    if (res.success) {
      if (res.user?.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } else {
      setErrorMsg(res.error || "Login failed");
    }
    setLoading(false);
  };

  const handleDemoFill = (type: "client" | "admin") => {
    if (type === "client") {
      setEmail("client@luxuryraw.com");
      setPassword("LuxuryRaw@2026");
    } else {
      setEmail("suryaharan786@gmail.com");
      setPassword("LuxuryRaw@2026");
    }
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-36 pb-28 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            CLIENT PRIVILEGE ACCESS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            Sign In to the Maison
          </h1>
          <p className="text-xs text-[#a1a1aa] font-light">
            Access your private order archive, saved creations, and boutique appointments.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-4 bg-[#141416] border border-[#b59a6d]/40 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#b59a6d] font-editorial-caps text-[10px]">
            <Shield className="w-3.5 h-3.5" />
            <span>ONE-CLICK DEMO LOGIN COURTESY</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoFill("client")}
              className="p-2 border border-[#27272a] hover:border-[#b59a6d] text-left text-[11px] text-[#d4d4d8] transition-colors"
            >
              <strong className="block text-white">VIP Client</strong>
              client@luxuryraw.com
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="p-2 border border-[#27272a] hover:border-[#b59a6d] text-left text-[11px] text-[#d4d4d8] transition-colors"
            >
              <strong className="block text-white">Maison Admin / Recovery</strong>
              suryaharan786@gmail.com
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@luxuryraw.com"
              className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PASSWORD</label>
              <Link href="/account/forgot" className="text-[10px] text-[#71717a] hover:text-[#b59a6d]">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f4f3ef] text-[#09090b] py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors pt-3"
          >
            <span>{loading ? "AUTHENTICATING..." : "SIGN IN"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#71717a] pt-4 border-t border-[#27272a]">
          <span>Do not have a maison client account? </span>
          <Link href="/account/register" className="text-[#b59a6d] hover:underline font-editorial-caps">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
}
