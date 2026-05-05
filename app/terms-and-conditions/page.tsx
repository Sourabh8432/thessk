"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });
import SmoothScroll from "@/src/components/SmoothScroll";

export default function TermsAndConditions() {
  return (
    <SmoothScroll>
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury selection:bg-[#ff4d4d] selection:text-white">
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1200px] mx-auto">
        <div className="mb-20 border-b border-black/10 pb-14">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Service_Agreement</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,10vw,6rem)] font-black tracking-tighter leading-none uppercase text-black"
          >
            TERMS & CONDITIONS<span className="text-[#ff4d4d]">.</span>
          </motion.h1>
          <p className="text-xs font-mono text-black/40 mt-6 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 01. Acceptance
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>Welcome to THESSK. By accessing this website and utilizing our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.</p>
              <p>These terms apply to all visitors, users, and clients who access or use our digital solutions including web development, app development, and marketing services.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 02. Use of Services
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>Our services are provided on an "as is" and "as available" basis. You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of or restrict the use of this site by any third party.</p>
              <p>Any unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 03. Intellectual Property
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>The content, layout, design, data, and graphics on this website are protected by intellectual property laws and are owned by THESSK unless otherwise stated. Reproduction is prohibited other than in accordance with the copyright notice.</p>
              <p>Once a project is completed and fully paid for, the intellectual property rights of the specific deliverables (e.g., website code, app code) are transferred to the client, while THESSK retains the right to showcase the work in our portfolio.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 04. Limitation of Liability
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>THESSK shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or the inability to use our services or for the cost of procurement of substitute services.</p>
              <p>We do not guarantee that our services will be uninterrupted, timely, secure, or error-free, although we strive for 100% excellence in every deployment.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 05. Payment & Billing
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>Clients agree to pay all fees and charges associated with our services as outlined in the specific project agreement or invoice. Failure to make payments on time may result in the suspension or termination of services.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 06. Governing Law
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan.</p>
            </div>
          </section>

          <section className="bg-black text-white p-12 border border-white/10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-6">Inquiries</h2>
            <p className="text-sm font-mono text-white/60 mb-6">For any clarifications regarding our Terms & Conditions, please reach out to us.</p>
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
