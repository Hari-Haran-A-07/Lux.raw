"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetSeconds?: number;
}

export function CountdownTimer({ targetSeconds = 3600 }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(targetSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="inline-flex items-center space-x-2 font-mono text-sm tracking-widest text-amber-300">
      <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
        {String(hours).padStart(2, "0")}h
      </span>
      <span>:</span>
      <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
        {String(minutes).padStart(2, "0")}m
      </span>
      <span>:</span>
      <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
        {String(seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}
