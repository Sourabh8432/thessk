"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });

const contactMethods = [
  {
    label: "Email",
    value: "sourabhsharmakhandal37@gmail.com",
    href: "mailto:sourabhsharmakhandal37@gmail.com",
    tag: "Direct_Neural_Link",
    color: "#00b8ff",
  },
  {
    label: "WhatsApp",
    value: "+91 8302648076",
    href: "https://wa.me/918302648076?text=Hi%20THESSK%2C%20I'd%20like%20to%20discuss%20a%20project.",
    tag: "Signal_WhatsApp",
    color: "#ff4d4d",
  },
  {
    label: "Location",
    value: "22, Mangal Vihar, Kaveri Path, Gokulpura, Kalwar Road, Jaipur – 302012",
    href: "https://maps.google.com",
    tag: "Satellite_Base",
    color: "#ffaa00",
  },
];

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1600px] mx-auto">

        {/* Hero */}
        <div className="mb-24 border-b border-black/10 pb-14">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Terminal_Access</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-[clamp(3rem,12vw,6rem)] md:text-[13rem] font-black tracking-[-0.1em] leading-none uppercase text-black"
          >
            CONNECT<span className="text-[#00b8ff]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-mono text-black/40 mt-6 max-w-md leading-loose"
          >
            Ready to build something powerful? Let's talk about your project — web development, mobile apps, or digital marketing.
          </motion.p>
        </div>

        {/* Main card */}
        <div className="bg-black text-white p-14 md:p-20 mb-10 relative overflow-hidden">
          {/* Ghost text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[10rem] sm:text-[20rem] font-black text-white/[0.02] tracking-tighter">SYNC.</span>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10 border-b border-white/10 pb-16">
              <div>
                <h2 className="text-4xl sm:text-6xl md:text-[10rem] font-black tracking-[-0.1em] leading-none uppercase">
                  LET'S<br /><span className="text-[#ff4d4d]">TALK.</span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-mono font-black tracking-[0.5em] uppercase text-white/30 mb-3">Response_Time</p>
                <p className="text-2xl font-black text-white">Within 24 Hours</p>
              </div>
            </div>

            {/* Contact methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {contactMethods.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ backgroundColor: c.color }}
                  className="bg-[#111] p-10 group transition-colors duration-500 block"
                >
                  <p className="text-[9px] font-mono font-black tracking-[0.5em] uppercase text-white/30 mb-6 group-hover:text-white/60">
                    {c.tag}
                  </p>
                  <p className="text-base font-black text-white break-all leading-snug group-hover:text-white">
                    {c.value}
                  </p>
                  <div className="mt-6 text-[9px] font-mono font-black tracking-widest uppercase text-white/20 group-hover:text-white/60">
                    {c.label} →
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-black/5 p-12 text-center"
        >
          <p className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 mb-4">WhatsApp_Quick_Connect</p>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.06em] mb-8 text-black">
            Want to discuss a project?
          </h3>
          <motion.a
            href="https://wa.me/918302648076?text=Hi%20THESSK%2C%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, backgroundColor: "#ff4d4d" }}
            whileTap={{ scale: 0.96 }}
            className="inline-block px-12 py-4 bg-black text-white font-mono font-black text-[11px] tracking-[0.5em] uppercase transition-colors duration-300"
          >
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        {/* Footer bar */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-black/10 opacity-30">
          <span className="text-[9px] font-mono font-black tracking-widest uppercase">© 2026 THESSK</span>
          <span className="text-[9px] font-mono font-black tracking-widest uppercase">Jaipur · India · Worldwide</span>
        </div>
      </div>
    </div>
  );
}
