import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certs', href: '#certs' },
  { name: 'Contact', href: '#contact' },
];

const useClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const time = useClock();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/85 backdrop-blur-md border-b border-primary/15">
      {/* Status strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 border-b border-primary/10 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          sys.status: operational
        </span>
        <span className="tabular-nums">NYC {time} EST</span>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <a href="#" className="font-heading text-xl text-primary terminal-glow glitch-hover" aria-label="Back to top">
          EK<span className="text-secondary">://</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => {
            const active = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`group font-mono text-xs uppercase tracking-wider transition-all hover:text-primary ${
                  active ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                <span className={`mr-1 ${active ? 'text-secondary' : 'text-primary/40 group-hover:text-secondary'}`}>
                  0{i + 1}.
                </span>
                {link.name}
                <span
                  className={`block h-px mt-0.5 bg-primary transition-transform origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-primary/15 overflow-hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-sm uppercase tracking-wider py-3 px-2 border-l-2 transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-foreground/60 border-transparent'
                  }`}
                >
                  <span className="text-primary/50 mr-2">0{i + 1}.</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
