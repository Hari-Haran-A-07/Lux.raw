"use client";

import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  altTitle: string;
}

export function ResponsiveImageGallery({ images, altTitle }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 relative group">
        {images[selectedIdx] && (
          <img
            src={images[selectedIdx]}
            alt={`${altTitle} - View ${selectedIdx + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
              selectedIdx === i ? "border-amber-400" : "border-neutral-800 opacity-60"
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
