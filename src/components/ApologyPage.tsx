import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ApologyPageProps {
  onNext: () => void;
}

const ApologyPage = ({ onNext }: ApologyPageProps) => {
  const [response, setResponse] = useState<string | null>(null);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center max-w-lg">
        <motion.h2
          className="text-3xl md:text-4xl font-display text-glow mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Okay Potti… I have to admit something.
        </motion.h2>

        <motion.p
          className="text-lg font-body text-muted-foreground mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I'm sorry for annoying you sometimes. 🥺
        </motion.p>

        {!response && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="btn-romantic font-body"
              onClick={() => setResponse("yes")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              YES YOU DO 😤
            </motion.button>
            <motion.button
              className="btn-romantic font-body"
              style={{ background: "linear-gradient(135deg, hsl(var(--lavender)), hsl(var(--secondary)))" }}
              onClick={() => setResponse("no")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NO YOU DON'T 😌
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <p className="text-2xl font-display text-glow mb-8">
                {response === "yes"
                  ? "Okay fine… but Bangaram still likes me. 😏❤️"
                  : "See Potti? You know me best! 🥰💕"}
              </p>
              <motion.button
                className="btn-romantic font-display text-xl"
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue 💕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ApologyPage;
