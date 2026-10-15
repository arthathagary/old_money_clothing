import React from 'react';
import { BRAND_META } from '../assets/brandMeta';

export const MarqueeStrip: React.FC = () => {
  const repeatedItems = [...BRAND_META.marqueeItems, ...BRAND_META.marqueeItems];

  return (
    <div className="relative z-40 w-full bg-heritage-green text-ivory border-b border-champagne/25 py-2.5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-[11px] font-mono tracking-[0.26em] uppercase text-ivory/95">
              {item}
            </span>
            <span className="ml-12 text-champagne text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
