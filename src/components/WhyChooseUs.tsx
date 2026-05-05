"use client";

import { m } from "framer-motion";
import { whyUs } from "@/src/constants/content";

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <m.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-white/30 block mb-4"
          >
            Why_Choose_Us
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase"
          >
            Built for <span className="text-[#ff4d4d]">Results.</span>
          </m.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20">
          {whyUs.map((item, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-10 sm:p-12 md:p-16 group hover:bg-[#ff4d4d] transition-colors duration-500 cursor-default"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white/10 mb-6 group-hover:text-white/30">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-white">{item.title}</h3>
              <p className="text-sm sm:text-base text-white/50 font-mono leading-relaxed group-hover:text-white/90 transition-colors">{item.desc}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
