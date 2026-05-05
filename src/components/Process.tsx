"use client";

import { m } from "framer-motion";
import { processSteps } from "@/src/constants/content";

export default function Process() {
  return (
    <section className="bg-[#f0f0f0] text-black py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <m.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-4"
          >
            The_Process
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase"
          >
            HOW WE <span className="text-[#ff4d4d]">WORK.</span>
          </m.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {processSteps.map((s, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border-t-2 sm:border-t-4 border-black/20 pt-6 sm:pt-8 hover:border-[#ff4d4d] transition-colors duration-500 cursor-default"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black/10 mb-4 sm:mb-6 group-hover:text-black/20">{s.id}</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-black">{s.title}</h3>
              <p className="text-sm sm:text-base font-mono text-black/60 leading-relaxed">{s.desc}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
