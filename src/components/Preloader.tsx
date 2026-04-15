"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Controlled randomized progress for a more "organic" loading feel
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    };

    interval = setInterval(updateProgress, 150 + Math.random() * 200);
    
    return () => clearInterval(interval);
  }, []);

  // Lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  const letters = "THESSK".split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden"
        >
          {/* THE LOGO FILL EFFECT */}
          <div className="relative flex flex-col items-center">
            
            {/* LARGE TEXT CONTAINER */}
            <div className="relative overflow-hidden">
                {/* BASE LAYER (STROKE) */}
                <div className="flex">
                {letters.map((char, i) => (
                    <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className="text-[12vw] sm:text-[15vw] font-black uppercase tracking-tighter text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                    >
                    {char}
                    </motion.span>
                ))}
                <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-[12vw] sm:text-[15vw] font-black text-[#ff4d4d]"
                >
                    .
                </motion.span>
                </div>

                {/* FILL LAYER (CLIPPED BY PROGRESS) */}
                <div 
                    className="absolute inset-0 flex transition-all duration-300"
                    style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                >
                {letters.map((char, i) => (
                    <span
                    key={i}
                    className="text-[12vw] sm:text-[15vw] font-black uppercase tracking-tighter text-white"
                    >
                    {char}
                    </span>
                ))}
                 <span className="text-[12vw] sm:text-[15vw] font-black text-[#ff4d4d]">.</span>
                </div>
            </div>

            {/* PROGRESS BAR & COUNTER */}
            <div className="mt-12 w-full max-w-sm flex items-center gap-8">
                <div className="h-px flex-1 bg-white/10 relative overflow-hidden">
                    <motion.div 
                        className="absolute h-full left-0 top-0 bg-[#ff4d4d]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="font-mono text-white text-xl sm:text-2xl font-black w-20 text-right">
                    {Math.round(progress)}%
                </div>
            </div>
          </div>

          {/* BOTTOM DECORATION */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase">Status: Initializing</span>
                <span className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase">Core: V2.4.0</span>
            </div>
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-[1em] rotate-90 origin-right whitespace-nowrap hidden sm:block">
                // CREATIVE_ENGINE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
