import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartGameProps {
  onNext: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  speed: number;
  y: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const HeartGame = ({ onNext }: HeartGameProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [caught, setCaught] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [complete, setComplete] = useState(false);
  const target = 5;

  useEffect(() => {
    if (complete) return;
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          speed: Math.random() * 3 + 3,
          y: -5,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, [complete]);

  useEffect(() => {
    if (complete) return;
    const interval = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed * 0.5 }))
          .filter((h) => h.y < 105)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [complete]);

  const catchHeart = useCallback(
    (id: number, x: number, y: number) => {
      if (complete) return;
      setHearts((prev) => prev.filter((h) => h.id !== id));
      setCaught((c) => {
        const newCount = c + 1;
        if (newCount >= target) setComplete(true);
        return newCount;
      });
      // Add sparkles
      const newSparkles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 60,
      }));
      setSparkles((prev) => [...prev, ...newSparkles]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
      }, 600);
    },
    [complete]
  );

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display text-glow mb-2">
          Catch My Hearts! 💕
        </h2>
        <p className="text-lg font-body text-muted-foreground">
          {caught}/{target} hearts caught
        </p>
        <div className="w-64 h-3 bg-muted rounded-full mx-auto mt-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--rose)), hsl(var(--lavender)))" }}
            animate={{ width: `${(caught / target) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-md h-[60vh] md:h-96 rounded-2xl overflow-hidden touch-manipulation" style={{ background: "hsl(var(--card) / 0.5)" }}>
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute text-4xl md:text-3xl cursor-pointer hover:scale-125 transition-transform z-10 touch-manipulation p-2"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              onClick={(e) => {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                catchHeart(heart.id, rect.left, rect.top);
              }}
              whileTap={{ scale: 1.5 }}
              exit={{ opacity: 0, scale: 2 }}
            >
              ❤️
            </motion.button>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute text-xl pointer-events-none"
              style={{ left: s.x, top: s.y }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✨
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <p className="text-2xl font-display text-glow mb-6">
              Aishuu… looks like you caught my heart too ❤️
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
    </motion.div>
  );
};

export default HeartGame;
