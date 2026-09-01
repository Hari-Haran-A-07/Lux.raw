"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Sparkles, Sliders } from "lucide-react";

export default function AdminHomepageCMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");

  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubtitle, setCampaignSubtitle] = useState("");
  const [campaignImage, setCampaignImage] = useState("");
  const [campaignCtaText, setCampaignCtaText] = useState("");
  const [campaignCtaLink, setCampaignCtaLink] = useState("");

  const [activeAnnouncement, setActiveAnnouncement] = useState("");

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/admin/homepage");
        if (res.ok) {
          const data = await res.json();
          const c = data.config;
          setHeroTitle(c.heroTitle);
          setHeroSubtitle(c.heroSubtitle);
          setHeroImage(c.heroImage);
          setHeroCtaText(c.heroCtaText);
          setHeroCtaLink(c.heroCtaLink);

          setCampaignTitle(c.campaignTitle);
          setCampaignSubtitle(c.campaignSubtitle);
          setCampaignImage(c.campaignImage);
          setCampaignCtaText(c.campaignCtaText);
          setCampaignCtaLink(c.campaignCtaLink);

          setActiveAnnouncement(c.activeAnnouncement);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroTitle,
          heroSubtitle,
          heroImage,
          heroCtaText,
          heroCtaLink,
          campaignTitle,
          campaignSubtitle,
          campaignImage,
          campaignCtaText,
          campaignCtaLink,
          activeAnnouncement,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-editorial-caps text-[#b59a6d]">
        RETRIEVING HOMEPAGE EDITORIAL CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="border-b border-[#27272a] pb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            VISUAL CMS CONTROLLER
          </span>
          <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
            Homepage Visual Monograph CMS
          </h1>
        </div>

        {success && (
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-4 py-2 text-xs font-editorial-caps">
            <Check className="w-4 h-4" />
            <span>CHANGES PERSISTED TO LIVE MAISON</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Announcement Bar */}
        <div className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-4">
          <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
            1. TOP GLOBAL ANNOUNCEMENT BROADCAST
          </h3>
          <div className="space-y-1.5 text-xs">
            <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
              BROADCAST TEXT
            </label>
            <input
              type="text"
              value={activeAnnouncement}
              onChange={(e) => setActiveAnnouncement(e.target.value)}
              className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
            />
          </div>
        </div>

        {/* 100vh Hero Banner */}
        <div className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-6">
          <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
            2. FULL-VIEWPORT HERO CINEMATIC BANNER
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                HERO HEADLINE TITLE
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-serif text-lg focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                HERO SUBTITLE / SEASON BADGE
              </label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                HERO CTA BUTTON TEXT
              </label>
              <input
                type="text"
                value={heroCtaText}
                onChange={(e) => setHeroCtaText(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                HERO BACKGROUND IMAGE URL
              </label>
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            {/* Preview image */}
            {heroImage && (
              <div className="sm:col-span-2 relative aspect-[21/9] w-full overflow-hidden bg-[#18181b] border border-[#27272a]">
                <Image src={heroImage} alt="Hero Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Featured Campaign Banner */}
        <div className="bg-[#111114] border border-[#27272a] p-6 sm:p-8 space-y-6">
          <h3 className="font-editorial-caps text-xs tracking-widest text-[#b59a6d] border-b border-[#27272a] pb-3">
            3. FEATURED EDITORIAL CAMPAIGN SECTION
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                CAMPAIGN TITLE
              </label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] font-serif text-lg focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                CAMPAIGN DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={campaignSubtitle}
                onChange={(e) => setCampaignSubtitle(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">
                CAMPAIGN IMAGE URL
              </label>
              <input
                type="url"
                value={campaignImage}
                onChange={(e) => setCampaignImage(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#f4f3ef] text-[#09090b] py-4 text-xs font-editorial-caps flex items-center justify-center gap-2 hover:bg-[#b59a6d] transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>{saving ? "PERSISTING CMS CHANGES..." : "SAVE & PUBLISH TO LIVE MAISON"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
