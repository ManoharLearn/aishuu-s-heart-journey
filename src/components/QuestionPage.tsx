import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionPageProps {
  onNext: () => void;
}

const QuestionPage = ({ onNext }: QuestionPageProps) => {
  const [popup, setPopup] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);

  const handleWrong = (msg: string) => {
    setPopup(msg);
    setTimeout(() => setPopup(null), 2000);
  };

  const handleCorrect = () => {
    setCorrect(true);
    setTimeout(onNext, 1500);
  };

  const options = [
    { label: "Some random girl 🤷‍♀️", action: () => handleWrong("Seriously Potti? 😒 Try again!") },
    { label: "Nobody 😐", action: () => handleWrong("Try again Potti 😌") },
    { label: "Aishuu ❤️", action: handleCorrect },
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-lg">
        <motion.h2
          className="text-2xl md:text-3xl font-display text-glow mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Before entering my heart...
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl font-body text-muted-foreground mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Who is the cutest girl in the universe?
        </motion.p>

        <div className="space-y-4">
          {options.map((opt, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className="w-full card-romantic text-lg font-body hover:border-rose transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ borderColor: correct && i === 2 ? "hsl(var(--rose))" : undefined }}
              onClick={opt.action}
              whileTap={{ scale: 0.95 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 card-romantic text-lg font-display text-accent"
            >
              {popup}
            </motion.div>
          )}
          {correct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-3xl font-display text-glow"
            >
              That's right! 💕✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionPage;
