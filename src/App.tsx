import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, User, Globe, Shield, ExternalLink, Award, BookOpen, Terminal } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { CyberGlobe } from './components/CyberGlobe';
import { TerminalText } from './components/TerminalText';
import { Section } from './components/Section';
import { SkillBadge, ExperienceCard } from './components/ExperienceCard';
import { MatrixRain } from './components/MatrixRain';
import { BootSequence } from './components/BootSequence';
import { HudCorners } from './components/HudCorners';

const StatCard = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <div className="relative p-4 border border-primary/20 bg-primary/5 rounded-sm">
    <HudCorners />
    <motion.div
      // CRT-style flicker: mostly on, with brief irregular dips. Linear easing keeps the dips snappy.
      animate={{ opacity: [1, 1, 1, 0.25, 1, 1, 0.7, 1, 1, 1, 0.4, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay, times: [0, 0.18, 0.22, 0.24, 0.27, 0.5, 0.52, 0.55, 0.7, 0.82, 0.84, 1] }}
      className="text-2xl md:text-3xl font-heading text-primary mb-1 terminal-glow"
    >
      {value}
    </motion.div>
    <div className="text-xs md:text-sm font-mono text-foreground/60">{label}</div>
  </div>
);

type ProjectCardProps = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const ProjectCard = ({ index, title, subtitle, description, bullets, tags, githubUrl, liveUrl }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="relative group term-window rounded-sm scan-sweep hover:border-primary/60 transition-colors"
  >
    {/* Titlebar */}
    <div className="term-titlebar flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
        </span>
        <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest truncate">
          ~/projects/{title.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}
        </span>
      </div>
      <span className="font-mono text-[10px] text-secondary/60 tracking-widest shrink-0">[{index}]</span>
    </div>

    <div className="relative z-10 p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-heading text-secondary mb-1 group-hover:terminal-glow-cyan transition-all">{title}</h3>
          <p className="text-sm font-mono text-primary/60">{subtitle}</p>
        </div>
        <div className="flex gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View source on GitHub"
              aria-label={`${title} on GitHub`}
              className="p-2 border border-primary/20 rounded-sm hover:border-primary hover:bg-primary/10 transition-colors block text-primary"
            >
              <Globe size={18} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open live demo"
              aria-label={`${title} live demo`}
              className="p-2 border border-primary/20 rounded-sm hover:border-primary hover:bg-primary/10 transition-colors block text-primary"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{description}</p>
          <ul className="space-y-2 text-sm text-foreground/70">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary mt-1 select-none">↳</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 md:border-l md:border-primary/10 md:pl-6">
          <div className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">Stack</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-[10px] font-mono border border-primary/20 text-primary/80 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const SystemMonitor = () => {
  const [cpu, setCpu] = useState(12.4);
  const [uptime, setUptime] = useState(99.98);
  const [threats, setThreats] = useState(0);
  const [threatGlow, setThreatGlow] = useState(false);

  useEffect(() => {
    // CPU: drifts every ~900ms inside a plausible 8–34% range
    const cpuInterval = setInterval(() => {
      setCpu(prev => {
        const delta = (Math.random() - 0.5) * 6;
        return Math.max(7.8, Math.min(34.2, prev + delta));
      });
    }, 900);

    // Uptime: creeps upward slowly, resets if it ever hits 99.99
    const uptimeInterval = setInterval(() => {
      setUptime(prev => {
        const next = prev + Math.random() * 0.003;
        return next > 99.99 ? 99.92 + Math.random() * 0.04 : next;
      });
    }, 4000);

    // THREATS: occasional brief blip to simulate detected-and-mitigated activity
    const threatInterval = setInterval(() => {
      const detected = Math.floor(Math.random() * 3) + 1; // 1–3
      setThreats(detected);
      setThreatGlow(true);
      const clearAt = 900 + Math.random() * 700;
      setTimeout(() => {
        setThreats(0);
        setThreatGlow(false);
      }, clearAt);
    }, 14000 + Math.random() * 10000);

    return () => {
      clearInterval(cpuInterval);
      clearInterval(uptimeInterval);
      clearInterval(threatInterval);
    };
  }, []);

  return (
    <div className="relative p-4 border border-primary/15 bg-black/50 space-y-2 w-48 backdrop-blur-sm">
      <HudCorners size="w-2 h-2" />
      <p className="text-primary/60 border-b border-primary/10 pb-1 mb-2 uppercase">System Monitor</p>
      <div className="flex justify-between">
        <span>CPU:</span>
        <span className="text-primary/80 tabular-nums">{cpu.toFixed(1)}%</span>
      </div>
      <div className="flex justify-between">
        <span>THREATS:</span>
        <span className={`text-destructive tabular-nums ${threatGlow ? 'terminal-glow-red' : ''}`}>
          {threats} ACTIVE
        </span>
      </div>
      <div className="flex justify-between">
        <span>UPTIME:</span>
        <span className="tabular-nums">{uptime.toFixed(2)}%</span>
      </div>
    </div>
  );
};

const CertCard = ({ name, detail, isNew = false }: { name: string; detail?: string; isNew?: boolean }) => (
  <div className={`relative p-4 border rounded-sm flex items-start gap-4 transition-colors group scan-sweep ${
    isNew ? 'border-secondary/60 bg-secondary/5 hover:border-secondary box-glow' : 'border-primary/30 bg-primary/5 hover:border-primary'
  }`}>
    {isNew && (
      <span className="absolute -top-2 right-3 px-1.5 py-0.5 bg-secondary text-secondary-foreground font-mono text-[9px] uppercase tracking-widest">
        New
      </span>
    )}
    <div className={`p-2 rounded-sm group-hover:scale-110 transition-transform ${isNew ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
      <Award size={20} />
    </div>
    <div>
      <div className="text-sm font-heading mb-1">{name}</div>
      {detail && <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">{detail}</div>}
    </div>
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative">
      <BootSequence />

      {/* Global Overlays */}
      <div className="scanlines fixed inset-0 z-50 pointer-events-none opacity-[0.03]" />
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-[0.02]" />
      <MatrixRain className="fixed inset-0 z-0 w-full h-full opacity-[0.22]" />
      <div className="bg-grid fixed inset-0 z-0 pointer-events-none" />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left" style={{ scaleX }} />

      <Navigation />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-24">
          {/* Ambient green glow that lights the whole hero */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 65% at 50% 50%, hsl(153 100% 50% / 0.16) 0%, hsl(153 100% 50% / 0.06) 35%, transparent 70%)',
            }}
          />

          {/* R3F Globe Background */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
                <CyberGlobe />
              </Canvas>
            </Suspense>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block p-1 border border-primary/30 bg-primary/5 rounded-sm">
                <div className="flex items-center gap-2 px-3 py-1">
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary terminal-glow"
                  />
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Secure Connection Active</span>
                </div>
              </div>

              {/* Name with chromatic glitch layers */}
              <h1 className="glitch-layers font-heading text-4xl md:text-6xl leading-none text-foreground">
                Eric Koch
                <span className="glitch-layer" aria-hidden="true">Eric Koch</span>
                <span className="glitch-layer" aria-hidden="true">Eric Koch</span>
              </h1>

              {/* Terminal window */}
              <div className="term-window rounded-sm box-glow max-w-md">
                <div className="term-titlebar flex items-center gap-3 px-4 py-2">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                  </span>
                  <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">eric@ek-sec: ~</span>
                </div>
                <div className="p-4">
                  <TerminalText
                    lines={[
                      '> whoami',
                      'Eric Koch',
                      '> role',
                      'Cybersecurity Engineer & Researcher',
                      '> status',
                      '[ONLINE] - Available for opportunities'
                    ]}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#projects" className="px-6 py-3 border border-primary bg-primary/10 text-primary font-heading text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all terminal-glow">
                  View Projects
                </a>
                <a href="#contact" className="px-6 py-3 border border-secondary text-secondary font-heading text-sm uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition-all terminal-glow-cyan">
                  Initiate Contact
                </a>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-6 text-[10px] font-mono text-primary/40 text-right">
              <div>
                <p>LAT: 40.8448° N</p>
                <p>LONG: 73.8648° W</p>
                <p>LOC: THE BRONX, NY</p>
              </div>
              <SystemMonitor />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Scroll to Access</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </section>

        {/* About Section */}
        <Section id="about" index="01" title="> cat about.md">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans">
                Cybersecurity-focused Computer Science professional with hands-on experience in vulnerability assessment, penetration testing, and secure system design. Proven ability to develop custom security tools, respond to incidents, and improve system resilience through technical audits and automation.
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans">
                Strong communicator with a collaborative mindset and a passion for protecting systems, solving problems, and continuously learning in high-impact environments.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="10+" label="Vulns found/cycle" delay={0} />
              <StatCard value="60%" label="Unauthorized drop" delay={1.1} />
              <StatCard value="50%" label="Faster IR time" delay={2.4} />
              <StatCard value="5" label="Active certs" delay={3.7} />
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" index="02" title="> ls ./skills">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-6 border border-primary/20 bg-primary/5 rounded-sm">
              <HudCorners />
              <h3 className="font-heading text-primary mb-6 flex items-center gap-2">
                <Shield size={18} aria-hidden="true" />
                Offense & Defense
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Vulnerability Assessment', 'Penetration Testing', 'Network Traffic Analysis',
                  'Incident Response & Forensics', 'Security Auditing & Compliance',
                  'Cryptography', 'Threat Intelligence & CVE Research', 'Threat Hunting (KQL)'
                ].map(skill => <SkillBadge key={skill} name={skill} />)}
              </div>
            </div>
            <div className="relative p-6 border border-secondary/20 bg-secondary/5 rounded-sm">
              <HudCorners color="border-secondary/60" />
              <h3 className="font-heading text-secondary mb-6 flex items-center gap-2">
                <Terminal size={18} aria-hidden="true" />
                Engineering & Ops
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'Secure Coding', 'Python Automation', 'Firewalls', 'Endpoint Hardening',
                  'SIEM & Log Analysis', 'Splunk', 'Microsoft Sentinel', 'Defender XDR'
                ].map(skill => <SkillBadge key={skill} name={skill} />)}
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" index="03" title="> ./projects --featured">
          <div className="space-y-8">
            <ProjectCard
              index="P-01"
              title="Unika — AI-Powered Phishing Detection"
              subtitle="2026 | Manhattan University Senior Capstone"
              description="Designed and developed a desktop application that analyzes emails for phishing indicators using a fine-tuned large language model, providing users with clear safe-or-suspicious verdicts."
              bullets={[
                'Built an AI-driven VTuber character interface (Unika) that guides users through analysis.',
                'Developed front-end using Electron and integrated real-time LLM backend.',
                'Architected backend on AWS with PostgreSQL for scalable email ingestion.',
              ]}
              tags={['Electron', 'LLM', 'AWS', 'PostgreSQL', 'Python']}
            />

            <ProjectCard
              index="P-02"
              title="PortHawk — Async TCP Port Scanner"
              subtitle="2025 | Offensive Security Tool"
              description="Fast, lightweight TCP port scanner written in pure Python. Uses asyncio to scan hundreds of ports concurrently, grabs service banners from open ports, and cross-references versions against a local CVE signature database to flag potentially exploitable services."
              bullets={[
                'Implemented bounded asyncio concurrency to scan the full 1–1024 range in seconds without overwhelming the host or local socket table.',
                'Built a banner-grabbing routine with an HTTP HEAD probe for service fingerprinting and version extraction.',
                'Designed a JSON-driven signature engine that correlates banners with CVEs and severity ratings, exporting results for downstream tooling.',
              ]}
              tags={['Python', 'asyncio', 'TCP', 'CVE', 'JSON']}
              githubUrl="https://github.com/IAmExcel/porthawk"
            />

            <ProjectCard
              index="P-03"
              title="WebProbe — HTTP Security Posture Auditor"
              subtitle="2025 | Offensive Recon & Hardening"
              description="HTTP security auditor that inspects response headers, cookie attributes, TLS/HTTPS enforcement, and information-disclosure surfaces, then assigns a weighted A–F grade with prioritized remediation advice. CI-friendly exit codes let it gate a deployment pipeline."
              bullets={[
                'Implemented weighted scoring across 13+ checks (HSTS, CSP, X-Frame-Options, cookie flags, version disclosure) producing an actionable A–F grade.',
                'Audits HTTPS enforcement by probing the plaintext variant to verify the upgrade redirect; flags cookies missing Secure / HttpOnly / SameSite.',
                'Exports structured JSON for SIEM and dashboard ingestion and returns non-zero exit codes on failing grades for CI/CD gating.',
              ]}
              tags={['Python', 'HTTP', 'TLS', 'OWASP', 'CI/CD']}
              githubUrl="https://github.com/IAmExcel/webprobe"
            />

            <ProjectCard
              index="P-04"
              title="LogSentry — SSH Brute-Force Detection Engine"
              subtitle="2025 | Defensive Security / Blue Team"
              description="Defensive log-analysis tool that parses Linux auth.log / OpenSSH events, correlates failed login attempts per source IP using a sliding time window, detects brute-force attacks, and escalates any successful login that follows an attack as a likely compromise."
              bullets={[
                'Engineered a two-pointer sliding-window algorithm that flags slow drips and short bursts that simple counters miss.',
                'Auto-escalates alerts to CRITICAL when an Accepted login follows the attack window, naming the affected account for immediate review.',
                'Exports IOCs to JSON or CSV by extension for firewall blocklists, SIEM ingestion, or cron-driven alerting pipelines.',
              ]}
              tags={['Python', 'Regex', 'SIEM', 'IOC', 'OpenSSH']}
              githubUrl="https://github.com/IAmExcel/logsentry"
            />
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" index="04" title="> git log --experience">
          <div className="space-y-8 max-w-4xl">
            <ExperienceCard
              title="Cybersecurity Intern"
              company="HeadStarter"
              period="May 2024 – August 2024"
              location="Bronx, NY"
              description={[
                "Developed Python-based vulnerability assessment tools to automate port scanning, reducing manual effort by 40%.",
                "Conducted penetration testing using Nmap and Metasploit, identifying 10+ vulnerabilities per cycle.",
                "Built real-time network traffic analysis tools with Scapy, reducing incident response time by 50%.",
                "Designed AES-encrypted secure file transfer protocols for internal test data.",
                "Set up malware sandbox environments and documented behavioral signatures."
              ]}
            />
            <ExperienceCard
              title="Freelance Security Researcher"
              company="Self-Employed"
              period="January 2023 – Present"
              location="Bronx, NY"
              description={[
                "Conduct independent vulnerability research and develop proof-of-concept exploits for web applications and network services.",
                "Build custom Python scripts for port scanning, brute-force detection, and traffic analysis.",
                "Perform malware behavior analysis to study IOCs, persistence methods, and evasion techniques.",
                "Document CTF and real-world findings to contribute to the security community."
              ]}
            />
            <ExperienceCard
              title="Cybersecurity Intern"
              company="Best Value NY INC."
              period="February 2022 – Present"
              location="Bronx, NY"
              description={[
                "Implemented encryption protocols and firewall configurations, reducing unauthorized access attempts by 60%.",
                "Conducted endpoint investigations and incident analyses, leading to a 30% drop in malware reoccurrence.",
                "Performed quarterly security audits, uncovering 15+ misconfigurations and improving hardening scores by 25%.",
                "Maintained a zero-infection rate during active monitoring periods."
              ]}
            />
          </div>
        </Section>

        {/* Education & Certs */}
        <div className="bg-primary/5 border-y border-primary/10 py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
            <div className="space-y-12">
              <Section id="education" index="05" title="> cat education.txt" className="py-0 px-0">
                <div className="space-y-6">
                  <div className="relative p-6 border border-primary/20 bg-background rounded-sm">
                    <HudCorners />
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-sm text-primary">
                        <BookOpen size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg">Manhattan University</h3>
                        <p className="text-sm font-mono text-foreground/60">M.S. Computer Science | Expected 2027</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-sm text-primary invisible">
                        <BookOpen size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg">Manhattan University</h3>
                        <p className="text-sm font-mono text-foreground/60">B.S. Computer Science | 2026</p>
                        <p className="text-xs font-mono text-primary/60 mt-1 uppercase">Concentration: Cybersecurity</p>
                      </div>
                    </div>
                  </div>

                  <details className="group cursor-pointer">
                    <summary className="font-mono text-sm text-primary hover:terminal-glow list-none flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform" aria-hidden="true">▶</span>
                      RELEVANT COURSEWORK
                    </summary>
                    <div className="mt-4 p-4 border-l-2 border-primary/20 font-mono text-xs text-foreground/70 leading-relaxed uppercase">
                      Data Structures & Algorithms · Operating Systems · Computer Networks · Cryptography & Security · Computer Security · Web Security · Cyber Security Lab · Database Systems · Parallel Computing.
                    </div>
                  </details>
                </div>
              </Section>
            </div>

            <div className="space-y-12">
              <Section id="certs" index="06" title="> ./certs --list" className="py-0 px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CertCard name="MS: Security Operations Analyst (SC-200)" detail="Earned July 2026" isNew />
                  <CertCard name="Security+ CE (SY0-701)" detail="Expires July 2028" />
                  <CertCard name="CySA+ CE (CS0-003)" detail="Expires July 2028" />
                  <CertCard name="MS: Security, Compliance, Identity" />
                  <CertCard name="MS: Dynamics 365 Fundamentals" />
                </div>
              </Section>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Section id="contact" index="07" title="> ./connect">
          <div className="max-w-xl mx-auto text-center space-y-12">
            <div className="term-window rounded-sm box-glow text-left w-full">
              <div className="term-titlebar flex items-center gap-3 px-4 py-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                </span>
                <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">secure_channel — open</span>
              </div>
              <div className="p-8 font-mono">
                <div className="space-y-2 text-sm md:text-base">
                  <p><span className="text-primary">&gt;</span> Eric Koch</p>
                  <p><span className="text-primary">&gt;</span> <a href="mailto:esk10228@gmail.com" className="hover:text-primary transition-colors">esk10228@gmail.com</a></p>
                  <p><span className="text-primary">&gt;</span> <a href="tel:+19172143568" className="hover:text-primary transition-colors">917-214-3568</a></p>
                  <p><span className="text-primary">&gt;</span> <a href="https://www.linkedin.com/in/eric-koch0101/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">linkedin.com/in/eric-koch0101</a></p>
                  <p><span className="text-primary">&gt;</span> <a href="https://github.com/IAmExcel" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github.com/IAmExcel</a></p>
                  <p><span className="text-primary">&gt;</span> The Bronx, NY</p>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-3 h-6 bg-primary mt-4"
                />
              </div>
            </div>

            <div className="flex justify-center gap-8">
              <a href="mailto:esk10228@gmail.com" title="Email" aria-label="Email" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/eric-koch0101/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
                <User size={24} />
              </a>
              <a href="https://github.com/IAmExcel" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
                <Globe size={24} />
              </a>
            </div>
          </div>
        </Section>

        <footer className="border-t border-primary/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] text-foreground/40 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              EK-SEC v2.0 — all systems nominal
            </span>
            <span className="flex items-center gap-2">
              <span>&gt; system.shutdown() // built with caffeine and curiosity © 2026 Eric Koch</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-3 bg-primary/40"
              />
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
