import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";
import FloatingHearts from "./FloatingHearts";

interface LoveConfessionProps {
  onNext: () => void;
}

const LoveConfession = ({ onNext }: LoveConfessionProps) => {
  const [response, setResponse] = useState<string | null>(null);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={25} />

      {response === "love" && <Confetti />}

      <div className="text-center max-w-lg relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-display text-glow mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          I Love You Aishuu ❤️
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-body text-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You are my little <span className="text-accent font-display text-2xl">Potti</span>
          <br />
          my <span className="text-accent font-display text-2xl">Bangaram</span>
          <br />
          and one of the most special people in my life. 💕
          <br />
          <span className="text-muted-foreground text-base mt-2 block">
            — Your Manohar ❤️
          </span>
        </motion.p>

        {!response && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="btn-romantic font-display text-xl"
              onClick={() => setResponse("love")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              I Love You Too ❤️
            </motion.button>
            <motion.button
              className="btn-romantic font-body text-lg"
              style={{ background: "linear-gradient(135deg, hsl(var(--lavender)), hsl(var(--secondary)))" }}
              onClick={() => setResponse("think")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let Me Think 🤔
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {response === "love" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <p className="text-3xl font-display text-glow animate-heart-beat">
                You just made me the happiest person! 🥰💕✨
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="btn-romantic font-display text-xl mt-8"
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
              >
                One last surprise... ✨
              </motion.button>
            </motion.div>
          )}
          {response === "think" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="mt-8 card-romantic"
            >
              <p className="text-xl font-display text-accent">
                ⚠️ System Error: Wrong answer detected 😂
              </p>
              <p className="text-base font-body text-muted-foreground mt-2">
                There's only one correct answer, Potti! 💕
              </p>
              <motion.button
                className="btn-romantic font-body text-base mt-4"
                onClick={() => setResponse(null)}
                whileHover={{ scale: 1.05 }}
              >
                Try again 😌
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoveConfession;
