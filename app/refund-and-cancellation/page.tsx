"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ThreeBackground = dynamic(() => import("@/src/components/ThreeBackground"), { ssr: false });
import SmoothScroll from "@/src/components/SmoothScroll";

export default function RefundAndCancellation() {
  return (
    <SmoothScroll>
    <div className="w-full min-h-screen bg-[#f2f2f2] selection-luxury selection:bg-[#ff4d4d] selection:text-white">
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <ThreeBackground />
      </div>

      <div className="relative z-10 pt-36 pb-24 px-8 md:px-24 max-w-[1200px] mx-auto">
        <div className="mb-20 border-b border-black/10 pb-14">
          <span className="text-[9px] font-mono font-black tracking-[0.7em] uppercase text-black/30 block mb-6">Financial_Policy</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,10vw,6rem)] font-black tracking-tighter leading-none uppercase text-black"
          >
            REFUND & CANCELLATION<span className="text-[#ff4d4d]">.</span>
          </motion.h1>
          <p className="text-xs font-mono text-black/40 mt-6 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 01. Cancellation Policy
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>At THESSK, we understand that business plans can change. Our cancellation policy is designed to be fair to both the client and our development team.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clients can cancel a project request at any time before the formal project commencement.</li>
                <li>Once a project has started and the initial deposit has been paid, cancellation requests must be submitted in writing.</li>
                <li>In the event of cancellation after project commencement, the client is responsible for paying for the work completed up to the date of cancellation.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 02. Refund Policy
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>Due to the nature of digital services (Web Development, App Development, Design), our refund policy is as follows:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-bold text-black">Initial Deposits:</span> The initial deposit (advance payment) is generally non-refundable once the research and design phase has begun.</li>
                <li><span className="font-bold text-black">Milestone Payments:</span> Payments made for completed milestones are non-refundable.</li>
                <li><span className="font-bold text-black">Third-Party Costs:</span> Fees paid for domain names, hosting services, SSL certificates, or premium third-party plugins/API credits are non-refundable under any circumstances as these are paid to external providers.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 03. Exceptions
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>Refunds may be considered on a case-by-case basis if THESSK fails to deliver the project as per the agreed specifications and within a reasonable timeframe (excluding delays caused by the client).</p>
              <p>Any refund approved will be processed within 15-30 business days and will be credited back to the original payment method or as mutually agreed.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#ff4d4d]"></span> 04. Contact for Refunds
            </h2>
            <div className="text-sm font-mono text-black/60 leading-loose space-y-4">
              <p>To request a cancellation or discuss a refund, please contact us immediately with your project details and the reason for the request.</p>
            </div>
          </section>

          <section className="bg-black text-white p-12 border border-white/10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-6">Billing Support</h2>
            <p className="text-sm font-mono text-white/60 mb-6">Reach out for any payment or billing related queries.</p>
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
