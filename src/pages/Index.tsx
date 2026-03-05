import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import FloatingHearts from "@/components/FloatingHearts";
import HeartCursorTrail from "@/components/HeartCursorTrail";
import LandingPage from "@/components/LandingPage";
import QuestionPage from "@/components/QuestionPage";
import HeartGame from "@/components/HeartGame";
import MemoryCards from "@/components/MemoryCards";
import ApologyPage from "@/components/ApologyPage";
import EmotionalReveal from "@/components/EmotionalReveal";
import LoveConfession from "@/components/LoveConfession";
import FinalSurprise from "@/components/FinalSurprise";
import SecretPage from "@/components/SecretPage";

const pages = [
  "landing",
  "question",
  "game",
  "memories",
  "apology",
  "emotional",
  "confession",
  "final",
  "secret",
] as const;

type Page = (typeof pages)[number];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const goTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  // Secret page: listen for "aishuu" typed on keyboard
  useEffect(() => {
    let buffer = "";
    const handler = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-10);
      if (buffer.includes("aishuu")) {
        goTo("secret");
        buffer = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  return (
    <div className="min-h-screen bg-romantic-gradient sparkle-cursor overflow-hidden">
      <StarBackground />
      <FloatingHearts count={10} />
      <HeartCursorTrail />

      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <LandingPage key="landing" onNext={() => goTo("question")} />
        )}
        {currentPage === "question" && (
          <QuestionPage key="question" onNext={() => goTo("game")} />
        )}
        {currentPage === "game" && (
          <HeartGame key="game" onNext={() => goTo("memories")} />
        )}
        {currentPage === "memories" && (
          <MemoryCards key="memories" onNext={() => goTo("apology")} />
        )}
        {currentPage === "apology" && (
          <ApologyPage key="apology" onNext={() => goTo("emotional")} />
        )}
        {currentPage === "emotional" && (
          <EmotionalReveal key="emotional" onNext={() => goTo("confession")} />
        )}
        {currentPage === "confession" && (
          <LoveConfession key="confession" onNext={() => goTo("final")} />
        )}
        {currentPage === "final" && <FinalSurprise key="final" />}
        {currentPage === "secret" && <SecretPage key="secret" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
