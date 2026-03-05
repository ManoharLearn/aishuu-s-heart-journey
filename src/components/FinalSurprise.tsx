import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FinalSurprise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = Math.min(window.innerWidth, 600);
    canvas.height = 200;

    const text = "Aishuu ❤️";
    ctx.font = "bold 60px 'Dancing Script', cursive";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, 120);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const points: { x: number; y: number }[] = [];

    for (let y = 0; y < imageData.height; y += 4) {
      for (let x = 0; x < imageData.width; x += 4) {
        const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
        if (alpha > 128) {
          points.push({ x, y });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let drawn = 0;
    const batchSize = 8;

    const drawStars = () => {
      if (drawn >= points.length) {
        setTimeout(() => setShowMessage(true), 500);
        return;
      }

      for (let i = 0; i < batchSize && drawn < points.length; i++, drawn++) {
        const p = points[drawn];
        const brightness = 0.5 + Math.random() * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + Math.random(), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, ${brightness})`;
        ctx.fill();
      }
      requestAnimationFrame(drawStars);
    };

    setTimeout(drawStars, 500);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="mb-8" />

      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-display text-glow">
            I'm lucky I met you. 💕
          </p>
          <motion.p
            className="text-base font-body text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Since December 6th… 3 months of knowing you. 💫
          </motion.p>
          <motion.p
            className="text-base font-body text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            And every single day has been worth it.
          </motion.p>
          <motion.p
            className="text-base font-body text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            — Made with ❤️ by Manohar, just for you Aishuu
          </motion.p>
          <motion.p
            className="text-sm font-body text-muted-foreground mt-4 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3 }}
          >
            psst... try typing "aishuu" on your keyboard 🤫
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FinalSurprise;
