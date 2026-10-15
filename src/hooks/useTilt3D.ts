import { useState, useCallback, MouseEvent } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
  isHovered: boolean;
}

/**
 * Custom hook that calculates 3D perspective tilt and radial glow coordinates on hover.
 */
export function useTilt3D(maxTilt = 10) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      setTilt({
        rotateX,
        rotateY,
        glowX,
        glowY,
        isHovered: true,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glowX: 50,
      glowY: 50,
      isHovered: false,
    });
  }, []);

  return {
    tilt,
    handleMouseMove,
    handleMouseLeave,
  };
}
