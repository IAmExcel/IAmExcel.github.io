import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const SCRAMBLE = '!<>-_\\/[]{}—=+*^?#01';

/**
 * Text that scrambles into place the first time it scrolls into view.
 * Renders the final text immediately under prefers-reduced-motion.
 */
export const DecodeText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text : ''
  );

  useEffect(() => {
    if (!inView || display === text) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = Math.min(text.length * 2 + 8, 40);
    const interval = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * text.length);
      const out = text
        .split('')
        .map((ch, i) => {
          if (i < revealed || ch === ' ') return ch;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        })
        .join('');
      setDisplay(out);
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display || ' '}</span>
    </span>
  );
};
