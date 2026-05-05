"use client";

import { m } from "framer-motion";
import { projects } from "@/src/constants/content";

export default function Works() {
  return (
    <section className="bg-white text-black py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-black/20 pb-12">
          <div>
            <m.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-4"
            >
              Selected_Work
            </m.span>
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase"
            >
              WORKS<span className="text-black/10">.</span>
            </m.h2>
          </div>
          <span className="text-[10px] md:text-xs font-mono text-black/40 font-black tracking-widest uppercase mb-4">2024–25</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10">
          {projects.map((p, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 sm:p-14 md:p-20 group hover:bg-black transition-all duration-500 cursor-default"
            >
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
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
