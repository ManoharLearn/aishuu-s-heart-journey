import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  lines: string[];
  onComplete?: () => void;
  className?: string;
  speed?: number;
  pauseBetween?: number;
}

const TypingText = ({ lines, onComplete, className = "", speed = 50, pauseBetween = 800 }: TypingTextProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      onComplete?.();
      return;
    }

    if (currentChar < lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = (newLines[currentLine] || "") + lines[currentLine][currentChar];
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, pauseBetween);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, speed, pauseBetween, onComplete]);

  return (
    <div className={className}>
      {displayedLines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3"
        >
          {line}
          {i === currentLine && !done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </motion.p>
      ))}
    </div>
  );
};

export default TypingText;
