import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const HeartCursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMove = (e: MouseEvent) => {
      id++;
      const newTrail = { id, x: e.clientX, y: e.clientY };
      setTrails((prev) => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.8, scale: 1, x: trail.x - 8, y: trail.y - 8 }}
            animate={{ opacity: 0, scale: 0, y: trail.y - 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-sm"
            style={{ left: 0, top: 0 }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartCursorTrail;
