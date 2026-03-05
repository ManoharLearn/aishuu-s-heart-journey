import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./TypingText";

interface EmotionalRevealProps {
  onNext: () => void;
}

const EmotionalReveal = ({ onNext }: EmotionalRevealProps) => {
  const [clicked, setClicked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textDone, setTextDone] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setShowText(true), 1500);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!clicked && (
        <motion.div className="text-center">
          <motion.p
            className="text-lg font-body text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Click the heart...
          </motion.p>
          <motion.button
            className="text-8xl animate-heart-beat cursor-pointer heart-glow"
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.5 }}
          >
            ❤️
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {clicked && !showText && (
          <motion.div className="text-center">
            {/* Heart explosion particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {["❤️", "💕", "✨", "💖"][i % 4]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {showText && (
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <TypingText
            lines={[
              "Aishwarya…",
              "Somewhere between the conversations…",
              "the laughs…",
              "and the random moments…",
              "",
              "I started liking you more than I expected. ❤️",
            ]}
            className="text-xl md:text-2xl font-display text-glow"
            speed={45}
            pauseBetween={700}
            onComplete={() => setTextDone(true)}
          />

          {textDone && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="btn-romantic font-display text-xl mt-10"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue 💕
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmotionalReveal;
