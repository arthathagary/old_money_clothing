import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 350);
          return 100;
        }
        const step = prev < 60 ? 8 : prev < 90 ? 5 : 2;
        return Math.min(100, prev + step);
      });
    }, 32);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-obsidian text-ivory px-6 py-10 select-none"
        >
          {/* Top metadata */}
          <div className="w-full max-w-7xl flex items-center justify-between text-[11px] font-mono tracking-[0.28em] uppercase text-stone-light">
            <span>OLD MONEY CLOTHING ATELIER</span>
            <span>COLOMBO • MILAN • LONDON</span>
          </div>

          {/* Centerpiece Monogram & Title */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-full border border-champagne/40 flex items-center justify-center mb-6 relative"
            >
              <div className="absolute inset-1.5 rounded-full border border-champagne/20 animate-ping" />
              <span className="font-serif text-2xl tracking-[0.2em] text-champagne">
                OM
              </span>
            </motion.div>

            <h1 className="font-serif text-3xl sm:text-5xl tracking-[0.22em] uppercase text-ivory mb-2">
              Old Money
            </h1>
            <p className="text-xs font-mono tracking-[0.35em] uppercase text-champagne/80">
              Quiet Luxury • Archive ’26
            </p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-champagne"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full flex justify-between text-[11px] font-mono tracking-[0.25em] text-stone-light">
              <span>CURATING LOOKBOOK</span>
              <span className="text-champagne">
                {String(progress).padStart(3, '0')}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
