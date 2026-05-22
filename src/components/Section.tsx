import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, children, className = '' }: SectionProps) => {
  return (
    <section id={id} className={`py-20 px-6 max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-xl md:text-2xl mb-12 flex items-center gap-3">
          <span className="text-primary terminal-glow">{title}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-6 bg-primary"
          />
        </h2>
        {children}
      </motion.div>
    </section>
  );
};
