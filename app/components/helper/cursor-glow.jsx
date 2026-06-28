'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf;
    let x = 0, y = 0;
    let cx = 0, cy = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full"
      style={{
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
