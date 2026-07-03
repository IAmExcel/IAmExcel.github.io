import { motion } from 'framer-motion';

export const SkillBadge = ({ name }: { name: string }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="px-3 py-1.5 border border-primary/30 rounded-sm bg-primary/5 text-xs md:text-sm font-mono cursor-default hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
  >
    {name}
  </motion.div>
);

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export const ExperienceCard = ({ title, company, period, location, description }: ExperienceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Timeline rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-primary/5 group-last:bottom-8" />

      {/* Node */}
      <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] border border-primary bg-background group-hover:bg-primary transition-colors rotate-45" />

      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg md:text-xl font-heading text-secondary terminal-glow-cyan">{title}</h3>
          <span className="text-xs md:text-sm font-mono text-primary/70 tabular-nums">{period}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-mono text-foreground/80">
          <span className="text-primary">&gt;</span>
          <span>{company}</span>
          <span className="text-primary/40">|</span>
          <span className="text-foreground/60">{location}</span>
        </div>

        <ul className="space-y-2 mt-4">
          {description.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm md:text-base text-foreground/70 leading-relaxed">
              <span className="text-primary mt-1.5 shrink-0 select-none">↳</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
