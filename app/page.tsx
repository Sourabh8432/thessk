"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { stats, servicesContent, projects, processSteps, techStack, whyUs } from "@/src/constants/content";
import Link from "next/link";
import { useScroll, useTransform, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { MotionValue } from "framer-motion";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-[#f0f0f0]" />,
});

import SmoothScroll from "@/src/components/SmoothScroll";

interface ServiceVisualEffectProps {
  service: any;
  index: number;
  progress: MotionValue<number>;
}

const ServiceVisualEffect = memo(({ service, index, progress }: ServiceVisualEffectProps) => {
  const yParallax = useTransform(progress, [0, 1], [150, -150]);
  const opacity = useTransform(progress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const rotateX = useTransform(progress, [0, 1], [15, -15]);
  const rotateY = useTransform(progress, [0, 1], [-20, 20]);

  const renderEffect = () => {
    switch (service.title) {
      case "WEB_PROTOCOLS":
        return (
          <div className="relative w-full h-full flex items-center justify-center pt-20" style={{ perspective: "1200px" }}>
            {/* 3D BROWSER WIREFRAME */}
            <motion.div 
              style={{ rotateX, rotateY }}
              className="w-[clamp(280px,90vw,450px)] h-[clamp(200px,65vw,300px)] border border-black/10 bg-white/5 backdrop-blur-sm rounded-lg relative overflow-hidden shadow-2xl"
            >
              <div className="h-6 w-full border-b border-black/10 flex items-center px-3 gap-1.5 bg-black/5">
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
              </div>
              <div className="p-6 space-y-4">
                 <div className="w-1/2 h-3 bg-black/5 rounded" />
                 <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-black/5 rounded" />
                    <div className="h-20 bg-black/5 rounded" />
                    <div className="h-20 bg-black/5 rounded" />
                 </div>
                 <div className="w-full h-20 bg-black/5 rounded" />
              </div>
              {/* SCANLINE EFFECT */}
              <motion.div 
                animate={{ y: [0, 300] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-px bg-black/[0.05] shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              />
            </motion.div>

            {/* FLOWING CODE FRAGMENTS (DEEPER PARALLAX) */}
            {[...Array(12)].map((_: any, i: number) => (
              <motion.div
                key={i}
                style={{ 
                  y: useTransform(progress, [0, 1], [100 * (i+1), -100 * (i+1)]),
                  top: `${10 * i}%`, 
                  left: index % 2 === 0 ? `-10%` : `70%`,
                  opacity: 0.4
                }}
                className="absolute text-[10px] font-mono text-black/10 whitespace-nowrap pointer-events-none"
              >
                {"0x" + ((i + 1) * 1357924).toString(16).toUpperCase().padStart(8, '0')} // FETCH_BLOCK_ACK
              </motion.div>
            ))}
          </div>
        );

      case "MOBILE_SYNAPSE":
        return (
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
            {/* EXPLODED UI LAYERS */}
            <div className="relative w-[clamp(200px,60vw,256px)] h-[clamp(350px,80vh,450px)]">
               {/* BACK LAYER (CHASSIS) */}
               <motion.div 
                 style={{ rotateY: -30, rotateX: 20, z: -50 }}
                 className="absolute inset-0 border-2 border-black/5 bg-black/[0.02] rounded-[3rem]"
               />
               
               {/* UI LAYER 1 (WIDGETS) */}
               <motion.div 
                 style={{ 
                   rotateY: -30, rotateX: 20, z: 50,
                   y: useTransform(progress, [0, 1], [40, -40])
                 }}
                 className="absolute inset-4 border border-black/10 bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl"
               >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 mb-6" />
                  <div className="space-y-4">
                     <div className="w-full h-8 bg-black/5 rounded-xl" />
                     <div className="w-3/4 h-8 bg-black/5 rounded-xl" />
                  </div>
               </motion.div>

               {/* UI LAYER 2 (FLOATING ICONS) */}
               {[...Array(4)].map((_: any, i: number) => (
                 <motion.div
                   key={i}
                    style={{ 
                      rotateY: -30, rotateX: 20, z: 120 + i*30,
                      y: useTransform(progress, [0, 1], [80 + i*20, -80 - i*20]),
                      top: `${20 + i*20}%`,
                      left: i % 2 === 0 ? "80%" : "-15%"
                    }}
                    className="absolute w-12 h-12 rounded-xl bg-white shadow-lg border border-black/5 flex items-center justify-center text-[10px] font-bold opacity-80"
                 >
                   {["App", "Log", "Dev", "UI"][i]}
                 </motion.div>
               ))}
            </div>
          </div>
        );

      case "MARKET_MATRIX":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* KINETIC DATA ORBITS */}
            <div className="relative w-[clamp(250px,80vw,384px)] h-[clamp(250px,80vw,384px)] flex items-center justify-center">
               {[...Array(3)].map((_: any, i: number) => (
                 <motion.div
                   key={i}
                   animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                   transition={{ duration: 20 + i*10, repeat: Infinity, ease: "linear" }}
                   className="absolute border border-dashed border-black/[0.08] rounded-full"
                   style={{ width: `${100 - i*25}%`, height: `${100 - i*25}%` }}
                 >
                    {/* ORBITING NODES */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-black/10 rounded-full shadow-sm flex items-center justify-center">
                       <div className="w-1 h-1 rounded-full bg-black/40" />
                    </div>
                 </motion.div>
               ))}
               
               <motion.div 
                 style={{ scale: useTransform(progress, [0, 0.5, 1], [1, 1.2, 1]) }}
                 className="w-24 h-24 rounded-full bg-white border border-black/5 shadow-2xl flex flex-col items-center justify-center gap-1"
               >
                  <span className="text-[10px] font-mono font-black text-black/30">ROI</span>
                  <span className="text-xl font-black text-black">98%</span>
               </motion.div>

               {/* DATA STREAMS */}
               <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-20">
                  <motion.path 
                    d="M -100 200 Q 100 100 200 200 T 500 200"
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    style={{ pathLength: progress }}
                  />
               </svg>
            </div>
          </div>
        );

      case "VISUAL_IDENTITY":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* MORPHING VECTOR CANVAS */}
            <div className="relative w-[clamp(280px,85vw,500px)] h-[clamp(280px,85vw,500px)] flex items-center justify-center">
               <motion.div 
                 animate={{ 
                   borderRadius: ["20%", "50%", "10%", "20%"],
                   rotate: [0, 90, 180, 270, 360],
                   scale: [1, 0.9, 1.1, 1]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                 className="w-[70%] h-[70%] bg-white/5 border-2 border-black/5 backdrop-blur-sm relative"
               >
                  {/* ANCHOR POINTS */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-black shadow-sm" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-black shadow-sm" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-black shadow-sm" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-black shadow-sm" />
                  
                  {/* INNER GEOMETRY */}
                  <div className="absolute inset-8 border border-black/[0.03] grid grid-cols-4 grid-rows-4">
                     {[...Array(16)].map((_: any, i: number) => <div key={i} className="border-[0.5px] border-black/[0.02]" />)}
                  </div>
               </motion.div>

               {/* FLOATING DESIGN TOKENS */}
               {[...Array(5)].map((_: any, i: number) => (
                 <motion.div
                   key={i}
                   style={{ 
                     y: useTransform(progress, [0, 1], [50 * (i+1), -50 * (i+1)]),
                     top: `${15 + i*15}%`,
                     left: i % 2 === 0 ? "5%" : "75%" 
                   }}
                   className="absolute px-4 py-2 bg-white/80 border border-black/5 shadow-md rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-black/40"
                 >
                   {["Typography", "Color_Palette", "Grid_System", "Component", "Motion"][i]}
                 </motion.div>
               ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute top-1/2 -translate-y-1/2 w-[95%] lg:w-[42%] xl:w-[55%] h-[350px] sm:h-[500px] lg:h-[550px] xl:h-[700px] pointer-events-none z-0 ${
        index % 2 === 0 ? "lg:left-auto lg:right-[-2%] left-1/2 -translate-x-1/2 lg:translate-x-0" : "lg:right-auto lg:left-[-2%] right-1/2 translate-x-1/2 lg:translate-x-0"
      }`}
    >
      {/* MOBILE ATMOSPHERIC GLOW */}
      <div className="absolute inset-0 flex items-center justify-center lg:hidden">
        <div 
          className="w-64 h-64 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: service.color }}
        />
      </div>
      
      <div className="hidden lg:block w-full h-full">
        {renderEffect()}
      </div>
    </motion.div>
  );
});

ServiceVisualEffect.displayName = "ServiceVisualEffect";

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

  const yMain      = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yHeader    = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yDesc      = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const yStats     = useTransform(scrollYProgress, [0, 1], [90, -90]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.99, 1, 1, 0.99]);

  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center relative overflow-hidden px-[5vw] sm:px-12 md:px-24 py-16 lg:py-24"
    >
      <div className={`flex w-full h-full items-center relative gap-4 lg:gap-12 xl:gap-20 justify-center ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"}`}>
        
        {/* SERVICE VISUAL EFFECT */}
        <ServiceVisualEffect service={service} index={index} progress={scrollYProgress} />

        {/* MAIN PANEL */}
        <motion.div
          style={{ y: yMain, opacity, scale }}
          className="w-full max-w-[500px] lg:max-w-none lg:w-[480px] xl:w-[500px] 2xl:w-[650px] relative z-10 group"
        >
          {/* GLASS PANEL (REFINED WIDTH) */}
          <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.02)] pointer-events-auto transition-all duration-700 hover:bg-white/20 rounded-xs">
            
            {/* BLUEPRINT GRID PATTERN */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
            
            {/* ACCENT BAR */}
            <motion.div 
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-0 top-0 w-1.5"
              style={{ backgroundColor: service.color }}
            />

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 sm:px-10 pt-10 pb-6 border-b border-black/5">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="text-[10px] sm:text-xs font-mono font-black tracking-[0.5em] uppercase text-black/40"
              >
                {service.tag}
              </motion.span>
              <span className="text-sm font-mono text-black/10 font-bold tracking-widest">{String(index + 1).padStart(2, "0")}</span>
            </div>

            {/* CONTENT */}
            <div className="px-6 sm:px-10 py-12 sm:py-16 relative">
              <motion.h2
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
              </motion.h2>

              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
                className="h-[2px] bg-black/5 mb-10 w-20" 
              />

              <motion.p
                style={{ y: yDesc }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-black/70 font-medium leading-relaxed mb-12"
              >
                {service.desc}
              </motion.p>

              <motion.div 
                style={{ y: yStats }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-12"
              >
                {service.details.map((d: string, j: number) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + j * 0.1 }}
                    className="flex items-center gap-4 text-[10px] sm:text-xs font-mono font-black uppercase tracking-[0.2em] text-black/40 group/item hover:text-black transition-colors"
                  >
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0 shadow-sm transition-transform group-hover/item:scale-125" 
                         style={{ backgroundColor: service.color }} />
                    <span className="lg:whitespace-nowrap">{d}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <motion.button
                    whileHover={{ x: 10, color: service.color }}
                    className="flex items-center gap-4 text-[10px] font-mono font-black uppercase tracking-[0.4em] text-black transition-colors"
                  >
                    <span>View Details</span>
                    <span className="w-8 h-px bg-current" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* BACKGROUND DECORATIVE TEXT (SLIMMED & RESPONSIVE) */}
          <div className="absolute -bottom-10 -right-10 text-[clamp(4rem,18vw,10rem)] font-black text-black/[0.012] pointer-events-none select-none uppercase tracking-tighter leading-none whitespace-nowrap hidden xl:block max-w-full overflow-hidden">
            {service.title}
          </div>
        </motion.div>

      </div>
    </section>
  );
});

ArchitecturalPanel.displayName = "ArchitecturalPanel";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full bg-[#f0f0f0] overflow-x-hidden">
      {/* ── 3D FIXED BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeBackground />
      </div>

      {/* ── MAIN CONTENT (Native Scroll) ── */}
      <div className="relative z-10 w-full">
        {/* HERO */}
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 md:pt-32">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] animate-pulse" />
                <span className="text-[10px] md:text-sm font-mono font-black text-black/40 tracking-[0.5em] uppercase">
                  Freelance Digital Agency · Jaipur, India
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="text-[clamp(2.2rem,12vw,14rem)] font-black text-black leading-[0.8] sm:leading-none tracking-tighter uppercase mb-2"
              >
                THESSK<span className="text-[#ff4d4d]">.</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
                className="w-full max-w-4xl h-px bg-black/20 mb-6"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-lg font-mono text-black/60 tracking-[0.25em] uppercase mb-12"
              >
                Digital Solutions for Your Online Growth
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pointer-events-auto mb-16 w-full sm:w-auto"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: "#ff4d4d" }}
                    whileTap={{ scale: 0.96 }}
                    className="px-9 py-4 bg-black text-white font-mono font-black text-xs tracking-[0.5em] uppercase transition-colors duration-300 shadow-xl"
                  >
                    Free Consultation
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.04, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.96 }}
                    className="px-9 py-4 border-2 border-black text-black font-mono font-black text-xs tracking-[0.5em] uppercase transition-all duration-300"
                  >
                    Our Services
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-14 md:gap-24 pointer-events-auto"
              >
                {stats.map((s, i) => (
                  <div key={i} className="text-center group cursor-default">
                    <div className="text-4xl sm:text-6xl md:text-8xl font-black text-black tracking-tighter group-hover:text-[#ff4d4d] transition-colors duration-500">
                      {s.value}
                    </div>
                    <div className="text-[10px] md:text-xs font-mono text-black/40 font-black uppercase tracking-[0.4em] mt-3">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>


            </section>
        
        {/* SERVICES */}
        <div className="relative z-10">
          {servicesContent.map((service, i) => (
            <ArchitecturalPanel key={i} service={service} index={i} />
          ))}
        </div>
        {/* WHY CHOOSE US */}
        <section className="bg-black text-white py-32 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-white/30 block mb-4">Why_Choose_Us</span>
              <h2 className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase">
                Built for <span className="text-[#ff4d4d]">Results.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20">
              {whyUs.map((item, i) => (
                <div key={i} className="bg-black p-10 sm:p-12 md:p-16 group hover:bg-[#ff4d4d] transition-colors duration-500 cursor-default">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white/10 mb-6 group-hover:text-white/30">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/50 font-mono leading-relaxed group-hover:text-white/90 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKS */}
        <section className="bg-white text-black py-32 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16 border-b border-black/20 pb-12">
              <div>
                <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-4">Selected_Work</span>
                <h2 className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase">WORKS<span className="text-black/10">.</span></h2>
              </div>
              <span className="text-[10px] md:text-xs font-mono text-black/40 font-black tracking-widest uppercase mb-4">2024–25</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10">
              {projects.map((p, i) => (
                <div key={i} className="bg-white p-10 sm:p-14 md:p-20 group hover:bg-black transition-all duration-500 cursor-default">
                  <div className="text-[9px] sm:text-[10px] font-mono font-black tracking-[0.5em] uppercase text-black/30 group-hover:text-white/30 mb-10 sm:mb-14">
                    PROJ_{String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-black group-hover:text-white transition-colors mb-6">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center pt-6 border-t border-black/20 group-hover:border-white/20 text-[9px] sm:text-[10px] md:text-xs font-mono font-black uppercase tracking-widest">
                    <span className="text-black/50 group-hover:text-white/50 transition-colors">{p.type}</span>
                    <span className="text-[#ff4d4d]">{p.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-[#f0f0f0] text-black py-32 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-4">The_Process</span>
              <h2 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase">
                HOW WE <span className="text-[#ff4d4d]">WORK.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {processSteps.map((s, i) => (
                <div key={i} className="group border-t-2 sm:border-t-4 border-black/20 pt-6 sm:pt-8 hover:border-[#ff4d4d] transition-colors duration-500 cursor-default">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black/10 mb-4 sm:mb-6 group-hover:text-black/20">{s.id}</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-black">{s.title}</h3>
                  <p className="text-sm sm:text-base font-mono text-black/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </div>
      </main>
    </SmoothScroll>
  );
}
