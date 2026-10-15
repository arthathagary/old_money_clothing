import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const CustomCursor: React.FC = () => {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 420, damping: 32, mass: 0.4 });
  const cursorY = useSpring(0, { stiffness: 420, damping: 32, mass: 0.4 });

  const ringX = useSpring(0, { stiffness: 180, damping: 24, mass: 0.6 });
  const ringY = useSpring(0, { stiffness: 180, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!isFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, select, textarea, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute('data-cursor') || '';
        setCursorLabel(label);
      } else {
        setIsHovered(false);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isFinePointer, cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <>
      {/* Center Precision Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          opacity: cursorLabel ? 0 : 1,
        }}
        className="fixed top-0 left-0 z-[95] w-2 h-2 rounded-full bg-champagne pointer-events-none mix-blend-difference"
      />

      {/* Outer Atelier Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorLabel ? 72 : isHovered ? 48 : 32,
          height: cursorLabel ? 72 : isHovered ? 48 : 32,
          backgroundColor: cursorLabel
            ? 'rgba(197, 160, 89, 0.92)'
            : isHovered
            ? 'rgba(197, 160, 89, 0.14)'
            : 'rgba(197, 160, 89, 0)',
          borderColor: isHovered
            ? 'rgba(197, 160, 89, 0.85)'
            : 'rgba(197, 160, 89, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="fixed top-0 left-0 z-[94] rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
      >
        {cursorLabel && (
          <span className="text-[9px] font-mono font-semibold tracking-[0.2em] uppercase text-obsidian">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </>
  );
};
