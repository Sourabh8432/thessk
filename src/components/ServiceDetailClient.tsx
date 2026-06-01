"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import SmoothScroll from "@/src/components/SmoothScroll";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });

interface Service {
  title: string;
  titleFull: string;
  slug: string;
  externalLink?: string;
  desc: string;
  fullDesc: string;
  features: string[];
  process: { step: string; name: string; text: string }[];
  tech: string[];
  color: string;
  tag: string;
  details: string[];
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  return (
    <SmoothScroll>
      <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury selection:bg-[#ff4d4d] selection:text-white">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground />
        </div>

        <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <Link href="/services" className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-black/40 hover:text-[#ff4d4d] transition-colors">
              ← Back to Services
            </Link>
          </motion.div>

          {/* Hero Header */}
          <div className="mb-24 border-b border-black/10 pb-14">
            <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">
              {service.tag}
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-[clamp(3rem,12vw,6rem)] md:text-[12rem] font-black tracking-[-0.1em] leading-none uppercase text-black"
            >
              {service.titleFull.split(' ')[0]}<br />
              <span style={{ color: service.color }}>{service.titleFull.split(' ').slice(1).join(' ')}</span>
              <span className="text-black">.</span>
            </motion.h1>
          </div>

          {/* Specialized Portal Callout Banner */}
          {service.externalLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mb-20 p-8 md:p-12 relative overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
            >
              <div 
                className="absolute top-0 left-0 w-2 h-full" 
                style={{ backgroundColor: service.color }}
              />
              <div className="max-w-3xl relative z-10">
                <span className="text-[10px] font-mono font-black tracking-[0.4em] uppercase text-black/40 block mb-3">
                  SPECIALIZED_PORTAL // SYNCED
                </span>
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-black mb-3">
                  Looking for custom web packages & targeting?
                </h3>
                <p className="text-sm font-mono text-black/60 leading-relaxed">
                  We have launched a dedicated platform for our core web clients. Visit <strong className="text-black font-black">web.thessk.in</strong> to explore custom pricing, advanced case studies, and dedicated client dashboard features.
                </p>
              </div>
              <a
                href={service.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto shrink-0 relative z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: service.color, color: "#fff", borderColor: service.color }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full lg:w-auto px-8 py-4 bg-black text-white font-mono font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-300 rounded-sm shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Launch Web Portal</span>
                  <span className="text-[13px] font-sans">↗</span>
                </motion.button>
              </a>
            </motion.div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-black mb-10"
              >
                {service.desc}
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1.2 }}
                className="h-[3px] mb-10"
                style={{ backgroundColor: service.color }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-black/70 font-medium leading-relaxed"
              >
                {service.fullDesc}
              </motion.p>
            </div>

            <div className="space-y-12">
              <div>
                <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-black/30 block mb-8">Core_Capabilities</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-white border border-black/5 hover:border-black/20 transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0 group-hover:scale-150 transition-transform" style={{ backgroundColor: service.color }} />
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-black/70">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-black tracking-[0.5em] uppercase text-black/30 block mb-8">Tech_Stack</span>
                <div className="flex flex-wrap gap-3">
                  {service.tech.map((t, i) => (
                    <span key={i} className="px-5 py-2 border border-black/10 text-[10px] font-mono font-black uppercase tracking-widest text-black/50 hover:bg-black hover:text-white transition-all cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-32">
            <span className="text-[10px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-16 text-center">Development_Workflow</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5">
              {service.process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 group hover:bg-black transition-all duration-500"
                >
                  <div className="text-4xl font-black text-black/10 mb-6 group-hover:text-white/10">{p.step}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-black group-hover:text-white">{p.name}</h3>
                  <p className="text-sm font-mono text-black/50 leading-loose group-hover:text-white/50">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-black text-white p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
               <span className="text-[15rem] md:text-[30rem] font-black tracking-tighter leading-none uppercase block whitespace-nowrap">
                 {service.title}
               </span>
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-mono font-black tracking-[0.7em] uppercase text-white/30 block mb-8">Ready_To_Innovate?</span>
              <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12">
                LET'S BUILD YOUR<br />
                <span style={{ color: service.color }}>NEXT CHAPTER.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: service.color }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-5 bg-white text-black font-mono font-black text-xs tracking-[0.5em] uppercase transition-colors duration-300 w-full sm:w-auto"
                  >
                    Get Started
                  </motion.button>
                </Link>
                {service.externalLink && (
                  <a href={service.externalLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "transparent", color: service.color, borderColor: service.color }}
                      whileTap={{ scale: 0.95 }}
                      className="px-16 py-5 border border-white text-white font-mono font-black text-xs tracking-[0.5em] uppercase transition-colors duration-300 bg-transparent w-full sm:w-auto"
                    >
                      Visit Dedicated Portal ↗
                    </motion.button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
