"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { servicesContent } from "@/src/constants/content";
import Link from "next/link";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });

export default function Services() {
  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury">
      {/* Subtle 3D background */}
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1600px] mx-auto">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-black/10 pb-14">
          <div>
            <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Capabilities_Matrix</span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-[clamp(3rem,12vw,6rem)] md:text-[14rem] font-black tracking-[-0.1em] leading-none uppercase text-black"
            >
              SERVICES<span className="text-[#00b8ff]">.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-mono text-black/40 max-w-xs leading-loose mb-2"
          >
            We build powerful websites, mobile apps and digital marketing strategies that scale your business.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 mb-24">
          {servicesContent.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-white p-14 md:p-20 group hover:bg-black transition-all duration-700 cursor-default relative overflow-hidden"
            >
              {/* Color bar */}
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: service.color }} />

              <div className="flex justify-between items-start mb-12">
                <span className="text-[9px] font-mono font-black tracking-[0.5em] uppercase text-black/30 group-hover:text-white/30 transition-colors">
                  {service.tag}
                </span>
                <span className="text-[9px] font-mono font-black text-black/20 group-hover:text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-[-0.07em] leading-none text-black group-hover:text-white transition-colors duration-500 mb-6">
                {service.titleFull}
              </h2>

              <p className="text-sm text-black/60 font-medium leading-loose mb-12 group-hover:text-white/60 transition-colors">
                {service.desc}
              </p>

              <div className="grid grid-cols-2 gap-y-3 gap-x-6 pt-8 border-t border-black/10 group-hover:border-white/10">
                {service.details.map((d, j) => (
                  <div key={j} className="flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest text-black/40 group-hover:text-white/40 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-20 border border-black/10 bg-white">
          <p className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 mb-6">Ready to Start?</p>
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-[-0.08em] mb-10 text-black">
            Let's Build Something<span className="text-[#ff4d4d]"> Great.</span>
          </h3>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ff4d4d" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-black text-white font-mono font-black text-[11px] tracking-[0.5em] uppercase transition-colors duration-300"
            >
              Get Free Consultation
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
