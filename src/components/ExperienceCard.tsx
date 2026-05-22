import { motion } from 'framer-motion';

export const SkillBadge = ({ name }: { name: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="px-3 py-1.5 border border-primary/30 rounded-sm bg-primary/5 text-xs md:text-sm font-mono cursor-default glitch-hover hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
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
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20 group-last:bottom-8" />
      
      {/* Timeline Dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary terminal-glow group-hover:scale-150 transition-transform" />
      
      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-lg md:text-xl font-heading text-secondary terminal-glow-cyan">{title}</h3>
          <span className="text-xs md:text-sm font-mono text-primary/60">{period}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm font-mono text-foreground/80">
          <span className="text-primary">&gt;</span>
          <span>{company}</span>
          <span className="text-primary/40">|</span>
          <span>{location}</span>
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
    </div>
  );
};
