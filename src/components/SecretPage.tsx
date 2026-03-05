import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";

const SecretPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <FloatingHearts count={30} />

      <div className="text-center max-w-lg relative z-10">
        <motion.div
          className="text-7xl mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💝
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-display text-glow mb-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          You found the secret, Bangaram ❤️
        </motion.h1>

        <motion.p
          className="text-xl font-display text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Just like I found you. 💕
        </motion.p>

        <motion.p
          className="text-base font-body text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          You really are special, Aishuu. Never forget that. ✨
        </motion.p>

        <motion.p
          className="text-sm font-body text-muted-foreground mt-6 opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5 }}
        >
          3 months since Dec 6th… and counting. 💕
          <br />
          — Manohar
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SecretPage;
