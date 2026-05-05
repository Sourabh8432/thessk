"use client";

import { m, useTransform } from "framer-motion";
import { memo } from "react";
import { MotionValue } from "framer-motion";

interface ServiceVisualEffectProps {
  service: any;
  index: number;
  progress: MotionValue<number>;
}

const ServiceVisualEffect = memo(({ service, index, progress }: ServiceVisualEffectProps) => {
  const opacity = useTransform(progress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const rotateX = useTransform(progress, [0, 1], [15, -15]);
  const rotateY = useTransform(progress, [0, 1], [-20, 20]);

  const renderEffect = () => {
    switch (service.title) {
      case "WEB_PROTOCOLS":
        return (
          <div className="relative w-full h-full flex items-center justify-center pt-20" style={{ perspective: "1200px" }}>
            <m.div 
              style={{ rotateX, rotateY }}
              className="w-[clamp(280px,90vw,450px)] h-[clamp(200px,65vw,300px)] border border-black/10 bg-white/5 backdrop-blur-sm rounded-lg relative overflow-hidden shadow-2xl"
            >
              <div className="h-6 w-full border-b border-black/10 flex items-center px-3 gap-1.5 bg-black/5">
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
              </div>
              <div className="p-6 space-y-4">
                 <div className="w-1/2 h-3 bg-black/5 rounded" />
                 <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-black/5 rounded" />
                    <div className="h-20 bg-black/5 rounded" />
                    <div className="h-20 bg-black/5 rounded" />
                 </div>
                 <div className="w-full h-20 bg-black/5 rounded" />
              </div>
              <m.div 
                animate={{ y: [0, 300] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-px bg-black/[0.05] shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              />
            </m.div>

            {[...Array(6)].map((_: any, i: number) => (
              <m.div
                key={i}
                style={{ 
                  y: useTransform(progress, [0, 1], [100 * (i+1), -100 * (i+1)]),
                  top: `${15 * i}%`, 
                  left: index % 2 === 0 ? `-10%` : `75%`,
                  opacity: 0.2
                }}
                className="absolute text-[10px] font-mono text-black/10 whitespace-nowrap pointer-events-none"
              >
                {"0x" + ((i + 1) * 1357924).toString(16).toUpperCase().padStart(8, '0')}
              </m.div>
            ))}
          </div>
        );

      case "MOBILE_SYNAPSE":
        return (
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
            <div className="relative w-[clamp(200px,60vw,256px)] h-[clamp(350px,80vh,450px)]">
               <m.div 
                 style={{ rotateY: -30, rotateX: 20, z: -50 }}
                 className="absolute inset-0 border-2 border-black/5 bg-black/[0.02] rounded-[3rem]"
               />
               <m.div 
                 style={{ 
                   rotateY: -30, rotateX: 20, z: 50,
                   y: useTransform(progress, [0, 1], [40, -40])
                 }}
                 className="absolute inset-4 border border-black/10 bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl"
               >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 mb-6" />
                  <div className="space-y-4">
                     <div className="w-full h-8 bg-black/5 rounded-xl" />
                     <div className="w-3/4 h-8 bg-black/5 rounded-xl" />
                  </div>
               </m.div>
               {[...Array(3)].map((_: any, i: number) => (
                 <m.div
                    key={i}
                    style={{ 
                      rotateY: -30, rotateX: 20, z: 120 + i*30,
                      y: useTransform(progress, [0, 1], [80 + i*20, -80 - i*20]),
                      top: `${25 + i*20}%`,
                      left: i % 2 === 0 ? "85%" : "-20%"
                    }}
                    className="absolute w-12 h-12 rounded-xl bg-white shadow-lg border border-black/5 flex items-center justify-center text-[10px] font-bold opacity-80"
                 >
                   {["App", "Log", "UI"][i]}
                 </m.div>
               ))}
            </div>
          </div>
        );

      case "MARKET_MATRIX":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[clamp(250px,80vw,384px)] h-[clamp(250px,80vw,384px)] flex items-center justify-center">
               {[...Array(2)].map((_: any, i: number) => (
                 <m.div
                   key={i}
                   animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                   transition={{ duration: 25 + i*10, repeat: Infinity, ease: "linear" }}
                   className="absolute border border-dashed border-black/[0.08] rounded-full"
                   style={{ width: `${100 - i*30}%`, height: `${100 - i*30}%` }}
                 >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-black/10 rounded-full shadow-sm flex items-center justify-center">
                       <div className="w-1 h-1 rounded-full bg-black/40" />
                    </div>
                 </m.div>
               ))}
               
               <m.div 
                 style={{ scale: useTransform(progress, [0, 0.5, 1], [1, 1.15, 1]) }}
                 className="w-24 h-24 rounded-full bg-white border border-black/5 shadow-2xl flex flex-col items-center justify-center gap-1"
               >
                  <span className="text-[10px] font-mono font-black text-black/30">ROI</span>
                  <span className="text-xl font-black text-black">98%</span>
               </m.div>
            </div>
          </div>
        );

      case "VISUAL_IDENTITY":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[clamp(280px,85vw,500px)] h-[clamp(280px,85vw,500px)] flex items-center justify-center">
               <m.div 
                 animate={{ 
                   borderRadius: ["20%", "50%", "10%", "20%"],
                   rotate: [0, 90, 180, 270, 360]
                 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                 className="w-[70%] h-[70%] bg-white/5 border-2 border-black/5 backdrop-blur-sm relative"
               >
                  <div className="absolute inset-8 border border-black/[0.03] grid grid-cols-4 grid-rows-4">
                     {[...Array(16)].map((_: any, i: number) => <div key={i} className="border-[0.5px] border-black/[0.02]" />)}
                  </div>
               </m.div>

               {[...Array(3)].map((_: any, i: number) => (
                 <m.div
                   key={i}
                   style={{ 
                     y: useTransform(progress, [0, 1], [50 * (i+1), -50 * (i+1)]),
                     top: `${20 + i*20}%`,
                     left: i % 2 === 0 ? "5%" : "80%" 
                   }}
                   className="absolute px-4 py-2 bg-white/80 border border-black/5 shadow-md rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-black/40"
                 >
                   {["TYPO", "GRID", "UI"][i]}
                 </m.div>
               ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <m.div
      style={{ opacity }}
      className={`absolute top-1/2 -translate-y-1/2 w-[95%] lg:w-[42%] xl:w-[55%] h-[350px] sm:h-[500px] lg:h-[550px] xl:h-[700px] pointer-events-none z-0 ${
        index % 2 === 0 ? "lg:left-auto lg:right-[-2%] left-1/2 -translate-x-1/2 lg:translate-x-0" : "lg:right-auto lg:left-[-2%] right-1/2 translate-x-1/2 lg:translate-x-0"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center lg:hidden">
        <div 
          className="w-64 h-64 rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: service.color }}
        />
      </div>
      
      <div className="hidden lg:block w-full h-full">
        {renderEffect()}
      </div>
    </m.div>
  );
});

ServiceVisualEffect.displayName = "ServiceVisualEffect";
export default ServiceVisualEffect;
