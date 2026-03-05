import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemoryCardsProps {
  onNext: () => void;
}

const cards = [
  {
    title: "December 6th",
    emoji: "👀",
    message:
      "The first time I saw you Aishuu…\nDecember 6th.\nI didn't say anything…\nbut my brain completely stopped working. 🫠",
  },
  {
    title: "That Cute Smile",
    emoji: "😊",
    message:
      "Your smile Potti…\nit's like someone hit a reset button on all my problems.\nI just forget everything. 💫",
  },
  {
    title: "When I Started Liking You",
    emoji: "💘",
    message:
      "I don't even know when it happened Bangaram…\none day you were just someone I talked to…\nthe next day you became someone I couldn't stop thinking about. ❤️\n\n— Manohar",
  },
];

const MemoryCards = ({ onNext }: MemoryCardsProps) => {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const allFlipped = flipped.every(Boolean);

  const flipCard = (i: number) => {
    setFlipped((prev) => {
      const n = [...prev];
      n[i] = true;
      return n;
    });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl md:text-4xl font-display text-glow mb-10 text-center">
        Our Little Memories 💭
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mb-10 px-2">
        {cards.map((card, i) => (
          <div key={i} className="perspective-1000" style={{ perspective: "1000px" }}>
            <motion.div
              className="relative w-full cursor-pointer"
              style={{ transformStyle: "preserve-3d", minHeight: "240px" }}
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              onClick={() => !flipped[i] && flipCard(i)}
            >
              {/* Front */}
              <div
                className="absolute inset-0 card-romantic flex flex-col items-center justify-center gap-4 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-5xl">{card.emoji}</span>
                <p className="text-lg font-display text-accent text-center">{card.title}</p>
                <p className="text-sm text-muted-foreground font-body">Tap to flip</p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 card-romantic flex items-center justify-center p-6 backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-base font-body text-foreground text-center whitespace-pre-line leading-relaxed">
                  {card.message}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allFlipped && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="btn-romantic font-display text-xl"
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue 💕
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryCards;
