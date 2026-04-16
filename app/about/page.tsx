"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { stats } from "@/src/constants/content";
import { techStack } from "@/src/constants/content";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });

const coreValues = [
  { title: "Startup Agility", desc: "Expert freelance team that moves fast and adapts to your changing needs." },
  { title: "End-to-End Solutions", desc: "Design, develop, deploy — everything under one expert roof." },
  { title: "Transparent Process", desc: "Clear communication and honest timelines at every step of the journey." },
  { title: "Global Reach", desc: "Based in Jaipur, proudly serving clients and startups worldwide." },
];

export default function About() {
  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1600px] mx-auto">

        {/* Hero */}
        <div className="mb-24 border-b border-black/10 pb-14">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Who_We_Are</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-[clamp(3.5rem,15vw,7rem)] md:text-[14rem] font-black tracking-[-0.1em] leading-none uppercase text-black"
          >
            ABOUT<span className="text-[#ff4d4d]">.</span>
          </motion.h1>
        </div>

        {/* Mission statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-black mb-8"
            >
              Startup Agility.<br />
              End-to-End Mastery.<br />
              <span className="text-[#ff4d4d]">Transparent Logic.</span>
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1.2 }}
              className="h-[3px] bg-black"
            />
          </div>
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-black/70 font-medium leading-relaxed border-l-4 border-[#ff4d4d] pl-8"
            >
              THESSK is a freelance digital agency specializing in building modern websites, mobile apps and growth-driven marketing strategies.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-mono text-black/50 leading-loose uppercase tracking-tight"
            >
              Founded with a simple mission — to provide startups and growing businesses with enterprise-quality digital solutions without the enterprise price tag.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 border border-black/10 bg-white"
            >
              <span className="text-[10px] font-mono font-black text-[#00b8ff] tracking-widest uppercase block mb-3">System_Check // All_Systems_Go</span>
              <p className="text-sm font-mono text-black/50 leading-loose">
                Our architecture is built for extreme performance. Every line of code is a calculated move towards your market dominance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-12">Core_Values</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5">
            {coreValues.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 md:p-16 group hover:bg-black transition-all duration-500"
              >
                <div className="text-4xl font-black text-black/10 mb-6 group-hover:text-white/10">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-2xl font-black uppercase tracking-[-0.04em] mb-4 text-black group-hover:text-white">{v.title}</h3>
                <p className="text-sm font-mono text-black/50 leading-loose group-hover:text-white/50">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 mb-24">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white py-16 md:py-24 text-center group hover:bg-[#ff4d4d] transition-all duration-500"
            >
              <div className="text-[5rem] sm:text-[8rem] md:text-[11rem] font-black text-black group-hover:text-white tracking-tighter leading-none transition-colors">
                {s.value}
              </div>
              <div className="text-[9px] font-mono font-black text-black/30 group-hover:text-white/60 uppercase tracking-[0.5em] mt-4 transition-colors">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-white p-14 border border-black/5">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-8">Tech_Arsenal</span>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ backgroundColor: "#000", color: "#fff" }}
                className="px-5 py-2 border border-black/10 text-[10px] font-mono font-black uppercase tracking-widest text-black cursor-default transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
