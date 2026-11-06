"use client";

import React, { useState, useEffect, useRef } from "react";

interface SoundscapeTrack {
  id: string;
  title: string;
  atelier: string;
  frequencyHz: number;
}

const TRACKS: SoundscapeTrack[] = [
  { id: "monolith", title: "Atelier Monolith Reverie", atelier: "Paris Haute Couture", frequencyHz: 432 },
  { id: "vendome", title: "Place Vendôme Nocturne", atelier: "Place Vendôme Flagship", frequencyHz: 528 },
  { id: "runway", title: "Monochrome Runway Pulse", atelier: "Milan Fashion Week", frequencyHz: 639 },
];

export function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.35);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);

  const activeTrack = TRACKS[currentTrackIndex];

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      audioContextRef.current = ctx;
      gainNodeRef.current = gain;
    }
  };

  const startTone = (freq: number) => {
    initAudio();
    if (audioContextRef.current && gainNodeRef.current) {
      if (oscNodeRef.current) {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
      }
      const osc = audioContextRef.current.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
      osc.connect(gainNodeRef.current);
      osc.start();
      oscNodeRef.current = osc;
    }
  };

  const stopTone = () => {
    if (oscNodeRef.current) {
      try {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
      } catch {
        // no-op
      }
      oscNodeRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopTone();
      setIsPlaying(false);
    } else {
      startTone(activeTrack.frequencyHz);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      startTone(TRACKS[nextIdx].frequencyHz);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioContextRef.current.currentTime, 0.05);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/90 p-1.5 shadow-2xl backdrop-blur-xl">
        <button
          onClick={togglePlay}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
            isPlaying
              ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20"
              : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
          }`}
          aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
        >
          {isPlaying ? (
            <span className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-neutral-950 animate-pulse" />
              <span className="w-0.5 h-2 bg-neutral-950 animate-bounce" />
              <span className="w-0.5 h-3.5 bg-neutral-950 animate-pulse" />
            </span>
          ) : (
            <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-2 text-left"
        >
          <div className="hidden sm:block">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 truncate max-w-[120px]">
              {isPlaying ? activeTrack.title : "Soundscape"}
            </p>
            <p className="text-[9px] font-mono text-neutral-600">
              {isPlaying ? `${activeTrack.frequencyHz}Hz Ambient` : "Atelier Acoustic"}
            </p>
          </div>
          <span className="text-neutral-500 text-[10px]">
            {isExpanded ? "▾" : "▴"}
          </span>
        </button>

        {isExpanded && (
          <div className="absolute bottom-12 right-0 mb-2 w-64 rounded-xl border border-neutral-800 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Acoustic Architecture
              </span>
              <button
                onClick={handleNext}
                className="text-[10px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider"
              >
                Next ↻
              </button>
            </div>

            <div className="mt-3 space-y-1">
              {TRACKS.map((track, i) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(i);
                    if (isPlaying) startTone(track.frequencyHz);
                  }}
                  className={`w-full text-left rounded p-2 text-xs transition-colors flex justify-between items-center ${
                    i === currentTrackIndex
                      ? "bg-neutral-900 text-amber-300 font-medium"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                  }`}
                >
                  <span className="truncate">{track.title}</span>
                  <span className="font-mono text-[9px] text-neutral-500">{track.frequencyHz}Hz</span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900">
              <div className="flex justify-between text-[9px] font-mono text-neutral-500 mb-1">
                <span>Intensity</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 h-1 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
