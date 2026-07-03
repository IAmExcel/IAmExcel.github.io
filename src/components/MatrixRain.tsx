import { useEffect, useRef } from 'react';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/\\{}[]#$%&';

/**
 * Canvas digital-rain background. Renders at very low opacity so it reads
 * as texture, not decoration. Skips entirely under prefers-reduced-motion
 * and pauses while the tab is hidden.
 */
export const MatrixRain = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      // ~18fps is plenty for rain and keeps main-thread cost trivial
      if (t - last < 55) return;
      last = t;

      ctx.fillStyle = 'rgba(4, 12, 9, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y > 0) {
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          // Head glyph brighter than the trail
          ctx.fillStyle = Math.random() > 0.975 ? 'rgba(0, 255, 136, 0.9)' : 'rgba(0, 255, 136, 0.35)';
          ctx.fillText(glyph, i * fontSize, y);
        }
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        } else {
          drops[i]++;
        }
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
};
