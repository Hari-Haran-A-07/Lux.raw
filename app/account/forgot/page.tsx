"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, KeyRound, Mail, ArrowRight, CheckCircle2, Lock, HelpCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dispatchedCode, setDispatchedCode] = useState("");

  const companyRecoveryEmail = "suryaharan786@gmail.com";

  // Step 1: Request Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          email,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Recovery code generated successfully.");
        if (data.recoveryCode) {
          setDispatchedCode(data.recoveryCode);
          setCode(data.recoveryCode);
        }
        setStep("reset");
      } else {
        setErrorMsg(data.error || "Unable to locate an account with this email.");
      }
    } catch {
      setErrorMsg("Network error occurred while communicating with recovery servers.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email,
          code,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStep("success");
      } else {
        setErrorMsg(data.error || "Password reset failed. Please check the code.");
      }
    } catch {
      setErrorMsg("Network error during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-36 pb-28 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-[0.3em]">
            MAISON ACCOUNT RESTORATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
            Recover Account Access
          </h1>
          <p className="text-xs text-[#a1a1aa] font-light max-w-md mx-auto">
            Restore credentials for your private Maison client or administrator dossier.
          </p>
        </div>

        {/* Company Recovery Banner */}
        <div className="p-4 bg-[#141416] border border-[#b59a6d]/40 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#b59a6d] font-editorial-caps text-[10px]">
              <Shield className="w-3.5 h-3.5" />
              <span>OFFICIAL COMPANY RECOVERY DESK</span>
            </div>
            <span className="text-[10px] text-[#71717a] font-mono">PRIORITY 24/7</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#27272a]">
            <div>
              <span className="text-[11px] text-[#a1a1aa] block font-light">
                Direct Company Recovery Email:
              </span>
              <a
                href={`mailto:${companyRecoveryEmail}?subject=Maison%20Account%20Recovery%20Inquiry&body=Account%20Recovery%20Request%20for:%20${encodeURIComponent(
                  email || "[Your Email Here]"
                )}`}
                className="text-xs text-[#b59a6d] hover:underline font-mono"
              >
                {companyRecoveryEmail}
              </a>
            </div>

            <a
              href={`mailto:${companyRecoveryEmail}?subject=Maison%20Account%20Recovery%20Priority%20Assistance&body=Maison%20luxury.Raw%20Account%20Recovery%20Request%0A%0AEmail:%20${encodeURIComponent(
                email || ""
              )}%0APlease%20assist%20with%20restoring%20my%20account%20access.`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#18181b] hover:bg-[#27272a] border border-[#b59a6d]/50 text-[10px] font-editorial-caps text-[#f4f3ef] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#b59a6d]" />
              <span>EMAIL RECOVERY DESK</span>
            </a>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 bg-[#b59a6d]/10 border border-[#b59a6d]/50 text-[#f4f3ef] text-xs">
            {successMsg}
          </div>
        )}

        {/* Step 1: Request Code */}
        {step === "request" && (
          <form onSubmit={handleRequestCode} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                ACCOUNT EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxuryraw.com or suryaharan786@gmail.com"
                className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
              />
              <p className="text-[10px] text-[#71717a] font-light">
                Enter the email address tied to your client profile or Maison administrator account.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f4f3ef] text-[#09090b] py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
            >
              <span>{loading ? "DISPATCHING CODE..." : "SEND RECOVERY CODE"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Enter Code and New Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
            <div className="p-3 bg-[#18181b] border border-[#27272a] space-y-1 text-[11px] text-[#a1a1aa]">
              <span className="text-[#b59a6d] font-editorial-caps text-[10px] block">
                VERIFICATION SENT
              </span>
              <p>
                A security code was generated for <strong className="text-white">{email}</strong>.
              </p>
              {dispatchedCode && (
                <p className="text-[#b59a6d] font-mono text-xs pt-1">
                  Security Code: <strong className="tracking-widest">{dispatchedCode}</strong>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                6-DIGIT RECOVERY CODE
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full bg-[#121214] border border-[#27272a] p-3 font-mono tracking-widest text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                NEW PASSWORD
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-[#121214] border border-[#27272a] p-3 text-[#f4f3ef] placeholder-[#52525b] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("request")}
                className="w-1/3 border border-[#27272a] text-[#a1a1aa] py-3.5 text-xs font-editorial-caps hover:text-white hover:border-white transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-[#f4f3ef] text-[#09090b] py-3.5 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? "UPDATING..." : "RESTORE ACCESS"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="text-center py-8 space-y-6 bg-[#111114] border border-[#27272a] p-8">
            <CheckCircle2 className="w-12 h-12 text-[#b59a6d] mx-auto stroke-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#f4f3ef] font-light">
                Credentials Restored
              </h3>
              <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto">
                Your password has been successfully updated. You may now sign in to access your private client suite or admin portal.
              </p>
            </div>

            <Link
              href="/account/login"
              className="inline-flex items-center justify-center gap-2 bg-[#f4f3ef] text-[#09090b] px-8 py-3.5 text-xs font-editorial-caps hover:bg-[#b59a6d] transition-colors"
            >
              <span>PROCEED TO SIGN IN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Navigation & Help Links */}
        <div className="flex items-center justify-between text-xs text-[#71717a] pt-4 border-t border-[#27272a]">
          <Link href="/account/login" className="hover:text-white flex items-center gap-1 font-editorial-caps">
            <ArrowLeft className="w-3 h-3" />
            <span>RETURN TO SIGN IN</span>
          </Link>

          <Link href="/client-services/contact" className="hover:text-[#b59a6d] flex items-center gap-1 font-editorial-caps">
            <HelpCircle className="w-3 h-3" />
            <span>ATELIER CONCIERGE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
