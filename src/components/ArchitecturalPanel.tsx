"use client";

import { m, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, memo } from "react";
import Link from "next/link";
import ServiceVisualEffect from "./ServiceVisualEffect";

interface ArchitecturalPanelProps {
  service: any;
  index: number;
}

const ArchitecturalPanel = memo(({ service, index }: ArchitecturalPanelProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yMain      = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yHeader    = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yDesc      = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const yStats     = useTransform(scrollYProgress, [0, 1], [60, -60]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.99, 1, 1, 0.99]);

  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center relative overflow-hidden px-[5vw] sm:px-12 md:px-24 py-16 lg:py-24"
    >
      <div className={`flex w-full h-full items-center relative gap-4 lg:gap-12 xl:gap-20 justify-center ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"}`}>
        <ServiceVisualEffect service={service} index={index} progress={scrollYProgress} />

        <m.div
          style={{ y: yMain, opacity, scale }}
          className="w-full max-w-[500px] lg:max-w-none lg:w-[480px] xl:w-[500px] 2xl:w-[650px] relative z-10"
        >
          <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-sm">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            
            <m.div 
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-0 top-0 w-1.5"
              style={{ backgroundColor: service.color }}
            />

            <div className="flex justify-between items-center px-6 sm:px-10 pt-10 pb-6 border-b border-black/5">
              <m.span 
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="text-[10px] sm:text-xs font-mono font-black tracking-[0.5em] uppercase text-black/40"
              >
                {service.tag}
              </m.span>
              <span className="text-sm font-mono text-black/10 font-bold tracking-widest">{String(index + 1).padStart(2, "0")}</span>
            </div>

            <div className="px-6 sm:px-10 py-12 sm:py-16 relative">
              <m.h2
                style={{ y: yHeader }}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="text-[clamp(1.75rem,8vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.85] text-black mb-10"
              >
                {service.titleFull.split(' ').map((word: string, i: number) => (
                  <span 
                    key={i} 
                    className="inline-block mr-[0.3em] whitespace-nowrap"
                    style={{ color: i === 1 ? service.color : "inherit" }}
                  >
                    {word}
                  </span>
                ))}
              </m.h2>

              <m.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
                className="h-[2px] bg-black/5 mb-10 w-20" 
              />

              <m.p
                style={{ y: yDesc }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-black/70 font-medium leading-relaxed mb-12"
              >
                {service.desc}
              </m.p>

              <m.div 
                style={{ y: yStats }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-12"
              >
                {service.details.map((d: string, j: number) => (
                  <m.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + j * 0.1 }}
                    className="flex items-center gap-4 text-[10px] sm:text-xs font-mono font-black uppercase tracking-[0.2em] text-black/40"
                  >
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" 
                         style={{ backgroundColor: service.color }} />
                    <span className="lg:whitespace-nowrap">{d}</span>
                  </m.div>
                ))}
              </m.div>

              <m.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <Link href={`/services/${service.slug}`}>
                  <m.button
                    whileHover={{ x: 5, color: service.color }}
                    className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.4em] text-black transition-colors"
                  >
                    <span>View Details</span>
                    <span className="w-8 h-px bg-current" />
                  </m.button>
                </Link>

                {service.externalLink && (
                  <a
                    href={service.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <m.button
                      whileHover={{ scale: 1.05, backgroundColor: service.color, color: "#fff", borderColor: service.color }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 border border-black text-black font-mono font-black text-[9px] tracking-[0.3em] uppercase transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Explore Web Platform</span>
                      <span className="text-[11px] font-sans">↗</span>
                    </m.button>
                  </a>
                )}
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
});

ArchitecturalPanel.displayName = "ArchitecturalPanel";
export default ArchitecturalPanel;
