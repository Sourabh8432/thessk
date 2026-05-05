"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { stats, servicesContent } from "@/src/constants/content";
import Link from "next/link";
import SmoothScroll from "@/src/components/SmoothScroll";

// Import components directly for better SSR and to avoid hydration/blank screen issues on Desktop
import ArchitecturalPanel from "@/src/components/ArchitecturalPanel";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import Works from "@/src/components/Works";
import Process from "@/src/components/Process";

// Background is fine as dynamic since it's purely decorative and heavy
const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#f0f0f0]" />,
});

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full bg-[#f0f0f0] overflow-x-hidden">
        {/* ── 3D FIXED BACKGROUND ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ThreeBackground />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full">
          {/* HERO */}
          <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 md:pt-32">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] animate-pulse" />
              <span className="text-[10px] md:text-sm font-mono font-black text-black/40 tracking-[0.5em] uppercase">
                Freelance Digital Agency · Jaipur, India
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d] animate-pulse" />
            </m.div>

            <h1 className="text-[clamp(2.2rem,12vw,14rem)] font-black text-black leading-[0.8] sm:leading-none tracking-tighter uppercase mb-2">
              THESSK<span className="text-[#ff4d4d]">.</span>
            </h1>

            <m.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ transformOrigin: "left" }}
              className="w-full max-w-4xl h-px bg-black/20 mb-6"
            />

            <p className="text-base md:text-lg font-mono text-black/60 tracking-[0.25em] uppercase mb-12">
              Digital Solutions for Your Online Growth
            </p>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pointer-events-auto mb-16 w-full sm:w-auto"
            >
              <Link href="/contact">
                <m.button
                  whileHover={{ scale: 1.04, backgroundColor: "#ff4d4d" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-9 py-4 bg-black text-white font-mono font-black text-xs tracking-[0.5em] uppercase transition-colors duration-300 shadow-xl"
                >
                  Free Consultation
                </m.button>
              </Link>
              <Link href="/services">
                <m.button
                  whileHover={{ scale: 1.04, backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-9 py-4 border-2 border-black text-black font-mono font-black text-xs tracking-[0.5em] uppercase transition-all duration-300"
                >
                  Our Services
                </m.button>
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
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
            </m.div>
          </section>
        
          {/* SERVICES */}
          <div className="relative z-10">
            {servicesContent.map((service, i) => (
              <ArchitecturalPanel key={i} service={service} index={i} />
            ))}
          </div>

          <WhyChooseUs />
          <Works />
          <Process />

        </div>
      </main>
    </SmoothScroll>
  );
}
