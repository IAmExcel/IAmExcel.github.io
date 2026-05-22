import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
  lines: string[];
  delay?: number;
  onComplete?: () => void;
}

export const TerminalText = ({ lines, delay = 0, onComplete }: TerminalTextProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || currentLineIndex >= lines.length) {
      if (currentLineIndex >= lines.length && onComplete) onComplete();
      return;
    }

    const line = lines[currentLineIndex];
    if (currentText.length < line.length) {
      const timer = setTimeout(() => {
        setCurrentText(line.slice(0, currentText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentText, currentLineIndex, isTyping, lines, onComplete]);

  return (
    <div className="font-mono text-sm md:text-base space-y-1">
      {lines.slice(0, currentLineIndex).map((line, i) => (
        <div key={i} className={line.startsWith('>') ? 'text-primary' : 'text-foreground'}>
          {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <div className={lines[currentLineIndex].startsWith('>') ? 'text-primary' : 'text-foreground'}>
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
          />
        </div>
      )}
    </div>
  );
};
