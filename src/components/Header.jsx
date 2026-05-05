"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-[5vw] h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
              <span className="text-[clamp(1.25rem,4vw,1.5rem)] font-black tracking-[-0.08em] text-black uppercase">
                THESSK
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ff4d4d] group-hover:scale-150 transition-transform duration-300" />
            </motion.div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link key={i} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="relative group"
                  >
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.35em] transition-colors duration-200 ${
                      isActive ? "text-black" : "text-black/50 hover:text-black"
                    }`}>
                      {item.label}
                    </span>
                    {/* Active underline */}
                    <span className={`absolute -bottom-1 left-0 h-px bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* CTA + HAMBURGER */}
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hidden md:block">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-[0.4em] hover:bg-[#ff4d4d] transition-colors duration-300"
              >
                Start Project
              </motion.button>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 flex flex-col justify-center items-end gap-[5px] focus:outline-none"
            >
              <span className={`block h-px bg-black transition-all duration-400 ${isOpen ? 'w-8 rotate-45 translate-y-[7px]' : 'w-8'}`} />
              <span className={`block h-px bg-black transition-all duration-400 ${isOpen ? 'w-8 opacity-0' : 'w-5'}`} />
              <span className={`block h-px bg-black transition-all duration-400 ${isOpen ? 'w-8 -rotate-45 -translate-y-[7px]' : 'w-8'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[190] bg-white flex flex-col px-10 pt-32 pb-16"
          >
            <nav className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <Link key={i} href={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex items-center justify-between border-b border-black/10 pb-8"
                  >
                    <span className="text-5xl font-black uppercase tracking-[-0.06em] text-black group-hover:text-[#ff4d4d] transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-black/30 tracking-widest">0{i + 1}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <p className="text-[10px] font-mono text-black/30 tracking-[0.5em] uppercase mb-4">Direct_Contact</p>
              <a href="mailto:sourabhsharmakhandal37@gmail.com" className="text-sm font-bold text-black">
                sourabhsharmakhandal37@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
