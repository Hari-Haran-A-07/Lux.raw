"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowLeft, Plus } from "lucide-react";
import { useAuth } from "@/lib/store/authStore";

export default function AccountAddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  return (
    <div className="bg-[#09090b] text-[#f4f3ef] pt-32 sm:pt-40 pb-24 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs font-editorial-caps text-[#71717a] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CLIENT SUITE</span>
        </Link>

        <div className="border-b border-[#27272a] pb-6 mb-12 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
              SAVED DESTINATIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f3ef] font-light">
              Delivery Address Book
            </h1>
          </div>
        </div>

        {addresses.length === 0 ? (
          <div className="p-8 bg-[#111114] border border-[#27272a] text-center space-y-4 max-w-md mx-auto">
            <MapPin className="w-8 h-8 text-[#71717a] mx-auto stroke-1" />
            <h3 className="font-serif text-xl font-light">Default Address</h3>
            <p className="text-xs text-[#a1a1aa] font-light">
              750 Park Avenue, Apt 14B, New York, NY 10021, United States
            </p>
            <span className="inline-block bg-[#18181b] border border-[#b59a6d]/40 text-[#b59a6d] text-[10px] font-editorial-caps px-3 py-1">
              PRIMARY RESIDENCE
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-6 bg-[#111114] border border-[#27272a] space-y-3 text-xs font-light"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">{addr.fullName}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-editorial-caps text-[#b59a6d]">DEFAULT</span>
                  )}
                </div>
                <p className="text-[#a1a1aa]">
                  {addr.street} {addr.suite && `, ${addr.suite}`}
                </p>
                <p className="text-[#a1a1aa]">
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-[#a1a1aa]">{addr.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
