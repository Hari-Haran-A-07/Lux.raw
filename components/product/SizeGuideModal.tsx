"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";
import { useUI } from "@/lib/store/uiStore";

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, closeSizeGuide } = useUI();
  const [tab, setTab] = useState<"clothing" | "shoes">("clothing");

  if (!sizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0d0d0f] border border-[#27272a] max-w-2xl w-full p-6 sm:p-8 text-[#f4f3ef] shadow-2xl relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={closeSizeGuide}
          aria-label="Close size guide"
          className="absolute top-6 right-6 text-[#a1a1aa] hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#b59a6d] mb-2">
          <Ruler className="w-4 h-4" />
          <span className="text-[10px] font-editorial-caps">MAISON ATELIER SIZING</span>
        </div>
        <h3 className="font-serif text-2xl font-light">International Size & Proportion Guide</h3>
        <p className="text-xs text-[#a1a1aa] mt-1 font-light">
          Each luxury.Raw garment is constructed based on classical European anatomical tailoring.
        </p>

        {/* Tab switch */}
        <div className="flex gap-4 border-b border-[#27272a] mt-6 mb-6">
          <button
            onClick={() => setTab("clothing")}
            className={`pb-2 text-xs font-editorial-caps border-b-2 transition-colors ${
              tab === "clothing" ? "border-[#b59a6d] text-[#b59a6d]" : "border-transparent text-[#71717a]"
            }`}
          >
            READY-TO-WEAR & TAILORING
          </button>
          <button
            onClick={() => setTab("shoes")}
            className={`pb-2 text-xs font-editorial-caps border-b-2 transition-colors ${
              tab === "shoes" ? "border-[#b59a6d] text-[#b59a6d]" : "border-transparent text-[#71717a]"
            }`}
          >
            FOOTWEAR CONVERSION
          </button>
        </div>

        {/* Tables */}
        {tab === "clothing" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps">
                  <th className="py-2.5">IT / MAISON</th>
                  <th className="py-2.5">US</th>
                  <th className="py-2.5">UK</th>
                  <th className="py-2.5">FR</th>
                  <th className="py-2.5">CHEST (CM)</th>
                  <th className="py-2.5">WAIST (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
                <tr><td className="py-3 font-medium text-white">38 (XS)</td><td>2</td><td>6</td><td>34</td><td>82-85</td><td>62-65</td></tr>
                <tr><td className="py-3 font-medium text-white">40 (S)</td><td>4</td><td>8</td><td>36</td><td>86-89</td><td>66-69</td></tr>
                <tr><td className="py-3 font-medium text-white">42 (M)</td><td>6</td><td>10</td><td>38</td><td>90-93</td><td>70-73</td></tr>
                <tr><td className="py-3 font-medium text-white">44 (L)</td><td>8</td><td>12</td><td>40</td><td>94-97</td><td>74-77</td></tr>
                <tr><td className="py-3 font-medium text-white">46 (XL)</td><td>10</td><td>14</td><td>42</td><td>98-102</td><td>78-82</td></tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps">
                  <th className="py-2.5">EU / IT</th>
                  <th className="py-2.5">US WOMEN</th>
                  <th className="py-2.5">US MEN</th>
                  <th className="py-2.5">UK</th>
                  <th className="py-2.5">FOOT LENGTH (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
                <tr><td className="py-3 font-medium text-white">36</td><td>6</td><td>-</td><td>3.5</td><td>23.0</td></tr>
                <tr><td className="py-3 font-medium text-white">37</td><td>7</td><td>-</td><td>4.5</td><td>23.7</td></tr>
                <tr><td className="py-3 font-medium text-white">38</td><td>8</td><td>6</td><td>5.5</td><td>24.4</td></tr>
                <tr><td className="py-3 font-medium text-white">39</td><td>9</td><td>7</td><td>6.5</td><td>25.1</td></tr>
                <tr><td className="py-3 font-medium text-white">41</td><td>-</td><td>8</td><td>7.5</td><td>26.5</td></tr>
                <tr><td className="py-3 font-medium text-white">42</td><td>-</td><td>9</td><td>8.5</td><td>27.2</td></tr>
                <tr><td className="py-3 font-medium text-white">43</td><td>-</td><td>10</td><td>9.5</td><td>27.9</td></tr>
                <tr><td className="py-3 font-medium text-white">44</td><td>-</td><td>11</td><td>10.5</td><td>28.6</td></tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#27272a] flex items-center justify-between text-xs text-[#71717a]">
          <span>Need custom tailoring advice?</span>
          <button
            onClick={closeSizeGuide}
            className="text-[#b59a6d] hover:underline font-editorial-caps"
          >
            CONTACT CONCIERGE
          </button>
        </div>
      </div>
    </div>
  );
};
