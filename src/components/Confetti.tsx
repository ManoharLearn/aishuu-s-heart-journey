import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const emojis = ["❤️", "💕", "✨", "💖", "💗", "🎉", "💝", "🌸"];

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

const Confetti = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 1.5 + 0.5,
      });
    }
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, fontSize: `${p.scale}rem` }}
          initial={{ y: -50, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: p.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 1,
            ease: "easeIn",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
