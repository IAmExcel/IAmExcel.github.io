import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '[  OK  ] EK-SEC BIOS v2.0 — initializing',
  '[  OK  ] Mounting /dev/portfolio',
  '[  OK  ] Loading kernel modules: recon.ko net_mon.ko siem.ko',
  '[  OK  ] Verifying integrity....... SHA-256 MATCH',
  '[  OK  ] Establishing encrypted channel (TLS 1.3)',
  '[  OK  ] Threat feed synced — 0 active threats',
  '[ EXEC ] ./eric_koch --mode=operator',
];

const SEEN_KEY = 'ek-booted';

/**
 * Full-screen boot log shown once per session. Fast (~2s), and any
 * click/keypress skips it immediately. Skipped entirely for
 * prefers-reduced-motion users.
 */
export const BootSequence = ({ onDone }: { onDone?: () => void }) => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  });
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }

    const finish = () => {
      sessionStorage.setItem(SEEN_KEY, '1');
      setVisible(false);
      onDone?.();
    };

    if (lineCount >= BOOT_LINES.length) {
      const t = setTimeout(finish, 350);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setLineCount(c => c + 1), 170 + Math.random() * 130);

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [visible, lineCount, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center px-6"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="w-full max-w-xl font-mono text-xs md:text-sm space-y-1.5">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <div key={i} className={line.startsWith('[ EXEC') ? 'text-secondary' : 'text-foreground/80'}>
                <span className="text-primary">{line.slice(0, 8)}</span>
                {line.slice(8)}
              </div>
            ))}
            <div className="pt-4 flex items-center gap-3">
              <div className="h-1 flex-1 bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(lineCount / BOOT_LINES.length) * 100}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>
              <span className="text-primary/60 tabular-nums text-[10px]">
                {Math.round((lineCount / BOOT_LINES.length) * 100)}%
              </span>
            </div>
            <p className="pt-2 text-[10px] uppercase tracking-widest text-foreground/30">
              Press any key to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
