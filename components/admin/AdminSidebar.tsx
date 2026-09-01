"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Boxes,
  Tag,
  Sliders,
  BookOpen,
  LogOut,
  ExternalLink,
  Store,
} from "lucide-react";
import { useAuth } from "@/lib/store/authStore";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { name: "EXECUTIVE OVERVIEW", href: "/admin", icon: LayoutDashboard },
    { name: "PRODUCT CATALOG", href: "/admin/products", icon: Package },
    { name: "ORDERS & FULFILLMENT", href: "/admin/orders", icon: ShoppingBag },
    { name: "INVENTORY & SKUS", href: "/admin/inventory", icon: Boxes },
    { name: "HOMEPAGE CMS", href: "/admin/homepage", icon: Sliders },
    { name: "PROMOTIONS & CODES", href: "/admin/coupons", icon: Tag },
  ];

  return (
    <aside className="w-64 bg-[#0d0d0f] border-r border-[#27272a] text-[#f4f3ef] flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* Brand */}
        <div>
          <span className="font-serif tracking-[0.25em] text-lg font-light uppercase block">
            luxury.<span className="italic text-[#b59a6d]">Raw</span>
          </span>
          <span className="text-[9px] font-editorial-caps text-[#71717a] tracking-widest mt-0.5 block">
            MAISON ATELIER ADMIN
          </span>
        </div>

        {/* Links */}
        <nav className="space-y-1 text-xs font-editorial-caps">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded transition-colors ${
                  isActive
                    ? "bg-[#1f1f23] text-[#b59a6d] font-semibold border-l-2 border-[#b59a6d]"
                    : "text-[#a1a1aa] hover:bg-[#141416] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="tracking-widest">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="pt-6 border-t border-[#27272a] space-y-2 text-xs font-editorial-caps">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-[#71717a] hover:text-white py-2 px-3 transition-colors"
        >
          <span>VIEW LIVE MAISON</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={async () => {
            await logout();
            window.location.href = "/account/login";
          }}
          className="w-full flex items-center gap-2 text-rose-400 hover:text-rose-300 py-2 px-3 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>SIGN OUT ADMIN</span>
        </button>
      </div>
    </aside>
  );
};
