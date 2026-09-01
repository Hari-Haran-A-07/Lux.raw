"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await register(name, email, password, phone);
    if (res.success) {
      router.push("/account");
    } else {
      setErrorMsg(res.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-36 pb-28 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            JOIN THE MAISON
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            Create Client Account
          </h1>
          <p className="text-xs text-[#a1a1aa] font-light">
            Receive private runway invites, order tracking, and complimentary white-glove atelier privileges.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">FULL NAME *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Madame Vivienne Laurent"
              className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">EMAIL ADDRESS *</label>
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
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PASSWORD (MIN 6 CHARACTERS) *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">TELEPHONE (OPTIONAL)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (212) 555-0188"
              className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f4f3ef] text-[#09090b] py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors pt-3"
          >
            <span>{loading ? "ENROLLING CLIENT..." : "CREATE ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#71717a] pt-4 border-t border-[#27272a]">
          <span>Already registered? </span>
          <Link href="/account/login" className="text-[#b59a6d] hover:underline font-editorial-caps">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
