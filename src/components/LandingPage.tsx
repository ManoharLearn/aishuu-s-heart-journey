import { useState } from "react";
import { motion } from "framer-motion";
import TypingText from "./TypingText";

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage = ({ onNext }: LandingPageProps) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center max-w-lg">
        <TypingText
          lines={[
            "Hey Aishuu...",
            "I made something for you.",
            "My little Potti should click the button below 💕",
          ]}
          className="text-2xl md:text-3xl font-display text-glow text-foreground"
          speed={60}
          pauseBetween={1000}
          onComplete={() => setShowButton(true)}
        />

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="btn-romantic mt-12 text-xl font-display animate-pulse-glow"
            onClick={onNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter My Heart ❤️
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default LandingPage;
