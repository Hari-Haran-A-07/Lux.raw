"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Activity, Layers, Terminal } from "lucide-react";
import { MaisonAudioEngine } from "@/services/javascript-audio-visual/ambientAudioEngine";
import Link from "next/link";

export const AudioVisualWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState("Milan Atelier");
  const [showPanel, setShowPanel] = useState(false);
  const audioRef = useRef<MaisonAudioEngine | null>(null);

  useEffect(() => {
    audioRef.current = new MaisonAudioEngine();
    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
      }
    };
  }, []);

  const toggleSound = (preset?: string) => {
    if (!audioRef.current) return;
    const targetPreset = preset || currentPreset;
    setCurrentPreset(targetPreset);

    if (isPlaying && preset === currentPreset) {
      audioRef.current.stop();
      setIsPlaying(false);
    } else {
      audioRef.current.playAtmosphere(targetPreset);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Control Panel */}
      {showPanel && (
        <div className="mb-3 w-80 bg-[#09090b]/95 backdrop-blur-xl border border-[#b59a6d]/30 p-4 shadow-2xl rounded-sm text-[#f4f3ef] animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b59a6d]" />
              <span className="text-[11px] font-editorial-caps tracking-widest text-[#f4f3ef]">
                MAISON ACOUSTIC ENGINE
              </span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#b59a6d]/15 text-[#b59a6d] border border-[#b59a6d]/30">
              JS WebAudio
            </span>
          </div>

          <p className="text-[11px] font-light text-[#a1a1aa] my-3 leading-relaxed">
            Synthesized harmonic drone frequencies calibrated to high-fashion architectural acoustics.
          </p>

          <div className="space-y-1.5">
            {["Milan Atelier", "Paris Runway", "Tokyo Monolith"].map((preset) => (
              <button
                key={preset}
                onClick={() => toggleSound(preset)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-all border ${
                  isPlaying && currentPreset === preset
                    ? "bg-[#b59a6d]/20 border-[#b59a6d] text-[#f4f3ef]"
                    : "bg-[#18181b]/60 border-[#27272a] text-[#a1a1aa] hover:border-[#b59a6d]/50 hover:text-white"
                }`}
              >
                <span className="font-editorial-caps tracking-wider text-[11px]">{preset}</span>
                {isPlaying && currentPreset === preset ? (
                  <span className="flex items-center gap-1 text-[10px] text-[#b59a6d] font-mono animate-pulse">
                    <Activity className="w-3 h-3" /> ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] text-[#71717a] font-mono">IDLE</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
            <Link
              href="/polyglot"
              className="text-[10px] font-editorial-caps text-[#b59a6d] hover:text-white flex items-center gap-1 transition-colors"
            >
              <Terminal className="w-3 h-3" />
              <span>11-ENGINE MATRIX</span>
            </Link>
            <button
              onClick={() => setShowPanel(false)}
              className="text-[10px] text-[#71717a] hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Buttons */}
      <div className="flex items-center gap-2">
        <Link
          href="/polyglot"
          className="bg-[#09090b]/90 hover:bg-[#18181b] text-[#b59a6d] border border-[#b59a6d]/40 px-3 py-2 rounded-full backdrop-blur-md text-[11px] font-editorial-caps tracking-widest flex items-center gap-2 shadow-lg transition-all hover:scale-105"
        >
          <Layers className="w-3.5 h-3.5 text-[#b59a6d]" />
          <span className="hidden sm:inline">11 LANGUAGES ACTIVE</span>
        </Link>

        <button
          onClick={() => {
            setShowPanel(!showPanel);
            if (!isPlaying && !showPanel) toggleSound();
          }}
          aria-label="Toggle Maison Soundscape"
          className={`p-3 rounded-full border backdrop-blur-md shadow-xl transition-all duration-300 ${
            isPlaying
              ? "bg-[#b59a6d] text-[#09090b] border-[#b59a6d] scale-105 shadow-[#b59a6d]/30"
              : "bg-[#09090b]/90 text-[#f4f3ef] border-[#3f3f46] hover:border-[#b59a6d]"
          }`}
        >
          {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
