"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { techStack } from "@/src/constants/content";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-32 px-8 md:px-24 border-t border-black/5 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-24">
          <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-8">Tech_Arsenal</span>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2.5 md:px-6 md:py-3 border border-black/10 text-[9px] md:text-xs font-mono font-black uppercase tracking-widest text-black/60 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-default rounded-sm bg-black/[0.02]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 lg:gap-16 mb-20 border-b border-black/20 pb-20">
          <div className="max-w-4xl text-center md:text-left">
            <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.7em] uppercase text-black/40 block mb-6">Ready_To_Launch?</span>
            <h2 className="text-[3.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] font-black tracking-tighter leading-[0.9] uppercase mb-10 md:mb-0">
              LET'S<br /><span className="italic text-[#ff4d4d]">BUILD IT.</span>
            </h2>
          </div>
          <Link href="/contact" className="w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 aspect-square rounded-full bg-black text-white flex items-center justify-center font-black text-xs md:text-sm lg:text-base uppercase tracking-widest cursor-pointer transition-all duration-300 text-center leading-tight shadow-3xl group mx-auto md:mx-0"
            >
              <span className="group-hover:text-[#ff4d4d] transition-colors">Get Free<br />Consult</span>
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 mb-16">
          {[
            { label: "Email", value: "sourabhsharmakhandal37@gmail.com", href: "mailto:sourabhsharmakhandal37@gmail.com", color: "#4d91ff" },
            { label: "WhatsApp", value: "+91 83026 48076", href: "https://wa.me/918302648076", color: "#25D366" },
            { label: "Location", value: "Jaipur, Rajasthan", sub: "Serving clients worldwide", color: "#ff4d4d" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-black/5 hover:bg-black/10 transition-colors p-8 lg:p-10 border border-black/5 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500" style={{ backgroundColor: item.color }} />
              <p className="text-[10px] font-mono font-black text-black/30 tracking-[0.4em] uppercase mb-4">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-base sm:text-lg lg:text-xl font-black text-black hover:text-[#ff4d4d] transition-colors break-all">
                  {item.value}
                </a>
              ) : (
                <div>
                  <p className="text-base sm:text-lg lg:text-xl font-black text-black leading-tight mb-2">{item.value}</p>
                  <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest">{item.sub}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 py-8 border-t border-black/5">
          {[
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms & Conditions", href: "/terms-and-conditions" },
            { name: "Refund & Cancellation", href: "/refund-and-cancellation" }
          ].map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              className="text-[10px] font-mono font-black uppercase tracking-widest text-black/40 hover:text-[#ff4d4d] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-black/10">
          <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-black tracking-[0.5em] uppercase text-black/40">© 2026 THESSK</span>
          <div className="flex gap-8">
            {["Twitter", "LinkedIn", "Behance"].map(social => (
              <a key={social} href="#" className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-black/40 hover:text-[#ff4d4d] transition-colors tracking-widest">{social}</a>
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-black tracking-[0.5em] uppercase text-[#ff4d4d]">Design by ssk</span>
        </div>
      </div>
    </footer>
  );
}
