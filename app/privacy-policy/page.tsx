"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });
import SmoothScroll from "@/src/components/SmoothScroll";

export default function PrivacyPolicy() {
  return (
    <SmoothScroll>
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury selection:bg-[#ff4d4d] selection:text-white">
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1200px] mx-auto">
        <div className="mb-20 border-b border-black/10 pb-14">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Security_Protocol</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,10vw,6rem)] font-black tracking-tighter leading-none uppercase text-black"
          >
            PRIVACY POLICY<span className="text-[#ff4d4d]">.</span>
          </motion.h1>
          <p className="text-xs font-mono text-black/40 mt-6 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 01. Introduction
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>At THESSK, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (thessk.in) and use our digital services.</p>
              <p>By using our site, you consent to the data practices described in this policy. We ensure that your data is handled with the highest level of security and transparency.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 02. Data Collection
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact Information: Name, email address, phone number, and physical address.</li>
                <li>Project Details: Information regarding your business and project requirements provided via contact forms or consultations.</li>
                <li>Communication Records: Any correspondence you have with us.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 03. Use of Information
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>The information we collect is used for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and manage our services (Web Dev, App Dev, Marketing).</li>
                <li>To communicate with you regarding project updates and inquiries.</li>
                <li>To improve our website performance and user experience.</li>
                <li>To comply with legal obligations and prevent fraudulent activities.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 04. Data Protection
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is restricted to authorized personnel only.</p>
              <p>While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security during transmission over the internet.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 05. Third-Party Sharing
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 06. Your Rights
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction of any inaccurate or incomplete data.</li>
                <li>Request deletion of your data when it is no longer necessary for the purposes collected.</li>
                <li>Object to the processing of your data for specific purposes.</li>
              </ul>
            </div>
          </section>

          <section className="bg-black text-white p-12 border border-white/10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-6">Contact Us</h2>
            <p className="text-sm font-mono text-white/60 mb-6">If you have any questions regarding this Privacy Policy, you may contact us using the information below.</p>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-[#ff4d4d]">Email: sourabhsharmakhandal37@gmail.com</p>
              <p>WhatsApp: +91 83026 48076</p>
              <p>Jaipur, Rajasthan, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </SmoothScroll>
  );
}
