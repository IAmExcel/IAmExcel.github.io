import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mail, User, Globe, Shield, MapPin, Phone, ExternalLink, Award, BookOpen, Terminal, Fingerprint } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { CyberGlobe } from './components/CyberGlobe';
import { TerminalText } from './components/TerminalText';
import { Section } from './components/Section';
import { SkillBadge, ExperienceCard } from './components/ExperienceCard';

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="p-4 border border-primary/20 bg-primary/5 rounded-sm">
    <div className="text-2xl md:text-3xl font-heading text-primary mb-1 terminal-glow">{value}</div>
    <div className="text-xs md:text-sm font-mono text-foreground/60">{label}</div>
  </div>
);

const ProjectCard = () => (
  <div className="relative group p-6 md:p-8 border border-primary/30 bg-primary/5 rounded-sm overflow-hidden">
    {/* Binary background effect placeholder */}
    <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-[10px] select-none overflow-hidden leading-tight">
      {Array(20).fill('01101001 01101110 01101111 01101011 01100001 ').map((s, i) => <div key={i}>{s.repeat(5)}</div>)}
    </div>
    
    <div className="relative z-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-heading text-secondary mb-1">Unika — AI-Powered Phishing Detection</h3>
          <p className="text-sm font-mono text-primary/60">2026 | Manhattan College Senior Capstone</p>
        </div>
        <div className="flex gap-3">
          <span className="p-2 border border-primary/20 rounded-sm hover:border-primary transition-colors">
            <Globe size={18} />
          </span>
          <span className="p-2 border border-primary/20 rounded-sm hover:border-primary transition-colors">
            <ExternalLink size={18} />
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            Designed and developed a desktop application that analyzes emails for phishing indicators using a fine-tuned large language model, providing users with clear safe-or-suspicious verdicts.
          </p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex gap-2">
              <span className="text-primary mt-1">↳</span>
              <span>Built an AI-driven VTuber character interface (Unika) that guides users through analysis.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1">↳</span>
              <span>Developed front-end using Electron and integrated real-time LLM backend.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1">↳</span>
              <span>Architected backend on AWS with PostgreSQL for scalable email ingestion.</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <div className="font-heading text-sm text-primary mb-2">Technological Stack</div>
          <div className="flex flex-wrap gap-2">
            {['Electron', 'LLM', 'AWS', 'PostgreSQL', 'Python'].map(tag => (
              <span key={tag} className="px-2 py-1 text-[10px] font-mono border border-primary/20 text-primary/80 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CertCard = ({ name, expires }: { name: string; expires?: string }) => (
  <div className="p-4 border border-primary/30 bg-primary/5 rounded-sm flex items-start gap-4 hover:border-primary transition-colors group">
    <div className="p-2 bg-primary/10 rounded-sm text-primary group-hover:scale-110 transition-transform">
      <Award size={20} />
    </div>
    <div>
      <div className="text-sm font-heading mb-1">{name}</div>
      {expires && <div className="text-[10px] font-mono text-foreground/40 italic uppercase">{expires}</div>}
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
      {/* Global Overlays */}
      <div className="scanlines fixed inset-0 z-50 pointer-events-none opacity-[0.03]" />
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-[0.02]" />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left" style={{ scaleX }} />

      <Navigation />

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden pt-16">
        {/* R3F Globe Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
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

            <div className="space-y-2">
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

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="px-6 py-3 border border-primary bg-primary/10 text-primary font-heading text-sm uppercase tracking-wider hover:bg-primary hover:text-background transition-all terminal-glow">
                View Projects
              </a>
              <button className="px-6 py-3 border border-secondary text-secondary font-heading text-sm uppercase tracking-wider hover:bg-secondary hover:text-background transition-all terminal-glow-cyan">
                Download Resume
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-6 text-[10px] font-mono text-primary/40 text-right">
            <div>
              <p>LAT: 40.8448° N</p>
              <p>LONG: 73.8648° W</p>
              <p>LOC: THE BRONX, NY</p>
            </div>
            <div className="p-4 border border-primary/10 bg-black/40 space-y-2 w-48">
              <p className="text-primary/60 border-b border-primary/10 pb-1 mb-2 uppercase">System Monitor</p>
              <div className="flex justify-between">
                <span>CPU:</span>
                <span className="text-primary/80">12.4%</span>
              </div>
              <div className="flex justify-between">
                <span>THREATS:</span>
                <span className="text-destructive">0 ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME:</span>
                <span>99.98%</span>
              </div>
            </div>
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
      <Section id="about" title="> cat about.md">
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
            <StatCard value="10+" label="Vulns found/cycle" />
            <StatCard value="60%" label="Unauthorized drop" />
            <StatCard value="50%" label="Faster IR time" />
            <StatCard value="4" label="Active certs" />
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="> ls ./skills">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-primary/20 bg-primary/5 rounded-sm">
            <h3 className="font-heading text-primary mb-6 flex items-center gap-2">
              <Shield size={18} />
              Security
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Vulnerability Assessment', 'Penetration Testing', 'Network Traffic Analysis',
                'Incident Response & Forensics', 'Security Auditing & Compliance',
                'Cryptography', 'Threat Intelligence & CVE Research'
              ].map(skill => <SkillBadge key={skill} name={skill} />)}
            </div>
          </div>
          <div className="p-6 border border-secondary/20 bg-secondary/5 rounded-sm">
            <h3 className="font-heading text-secondary mb-6 flex items-center gap-2">
              <Terminal size={18} />
              Engineering
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Secure Coding', 'Python Automation', 'Firewalls', 'Endpoint Hardening',
                'SIEM & Log Analysis', 'Splunk'
              ].map(skill => <SkillBadge key={skill} name={skill} />)}
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="> ./projects/featured">
        <ProjectCard />
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="> git log --experience">
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
      <div className="bg-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <Section id="education" title="> cat education.txt" className="py-0 px-0">
              <div className="space-y-6">
                <div className="p-6 border border-primary/20 bg-background rounded-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-sm text-primary">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg">Manhattan University</h3>
                      <p className="text-sm font-mono text-foreground/60">M.S. Computer Science | Expected 2027</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-sm text-primary invisible">
                      <BookOpen size={24} />
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
                    <span className="group-open:rotate-90 transition-transform">▶</span>
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
            <Section id="certs" title="> ./certs --list" className="py-0 px-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CertCard name="Security+ CE (SY0-701)" expires="Expires May 2027" />
                <CertCard name="CySA+ CE (CS0-003)" expires="Expires July 2027" />
                <CertCard name="MS: Security, Compliance, Identity" />
                <CertCard name="MS: Dynamics 365 Fundamentals" />
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <Section id="contact" title="> ./connect">
        <div className="max-w-xl mx-auto text-center space-y-12">
          <div className="p-8 border-2 border-primary/30 bg-black/40 rounded-sm font-mono text-left inline-block w-full">
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

          <div className="flex justify-center gap-8">
            <a href="mailto:esk10228@gmail.com" title="Email" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/eric-koch0101/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
              <User size={24} />
            </a>
            <a href="https://github.com/IAmExcel" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-4 border border-primary/20 rounded-full hover:bg-primary/10 hover:border-primary transition-all text-primary terminal-glow">
              <Globe size={24} />
            </a>
          </div>
        </div>
      </Section>

      <footer className="py-12 border-t border-primary/10 text-center">
        <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <span>&gt; system.shutdown() // built with caffeine and curiosity © 2026 Eric Koch</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary/40" 
          />
        </div>
      </footer>
    </div>
  );
}
