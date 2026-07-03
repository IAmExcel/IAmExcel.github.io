import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { DecodeText } from './DecodeText';

interface SectionProps {
  id: string;
  title: string;
  /** Section index shown in the header rail, e.g. "01" */
  index?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, index, children, className = '' }: SectionProps) => {
  return (
    <section id={id} className={`py-24 px-6 max-w-6xl mx-auto scroll-mt-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="font-heading text-xl md:text-2xl mb-12 flex items-center gap-4">
          {index && (
            <span className="font-mono text-xs text-secondary/70 tracking-widest shrink-0">[{index}]</span>
          )}
          <span className="text-primary terminal-glow whitespace-nowrap">
            <DecodeText text={title} />
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </h2>
        {children}
      </motion.div>
    </section>
  );
};
