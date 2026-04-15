"use client";

import React, { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Grid, Sparkles, Scroll, MeshTransmissionMaterial, Text, Float, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Exp." }
];

const servicesContent = [
  {
    title: "Web Development",
    desc: "Custom Business Websites, Landing Pages & E-commerce using Next.js, TypeScript & Tailwind CSS.",
    color: "#bd00ff", 
    details: ["React / Next.js", "TypeScript", "Tailwind CSS", "E-commerce", "Admin Panels"]
  },
  {
    title: "App Development",
    desc: "Seamless iOS & Android applications built with Flutter & React Native. High performance & User Testing.",
    color: "#ff007f",
    details: ["iOS & Android", "Flutter / React Native", "ASO", "Prototyping"]
  },
  {
    title: "Digital Marketing",
    desc: "Lead-oriented strategies including SEO, Google Ads (PPC), and Social Media Marketing.",
    color: "#ffaa00",
    details: ["SEO Mastery", "Google Ads (PPC)", "Social Media", "Conversion Optimization"]
  },
  {
    title: "UI/UX Design",
    desc: "Modern design systems, wireframing, and interactive prototypes built for engagement.",
    color: "#00b8ff",
    details: ["Visual Design", "Prototypes", "Design Systems", "Motion Design"]
  }
];

const projects = [
  { name: "Apex E-com", type: "Web & E-comm", tech: "Next.js / Stripe" },
  { name: "Nova Mobile", type: "Mobile App", tech: "Flutter / Firebase" },
  { name: "Vanguard SEO", type: "Marketing", tech: "Traffic Growth" },
  { name: "Prism UI", type: "VFX & Design", tech: "React Three Fiber" }
];

const processSteps = [
  { id: "01", title: "Strategy", desc: "Deep discovery and goal alignment." },
  { id: "02", title: "Design", desc: "Minimalist, intuitive user interfaces." },
  { id: "03", title: "Develop", desc: "Sleek, performant modern code." },
  { id: "04", title: "Deploy", desc: "Launch and global-scale optimization." }
];

// --- FUTURISTIC VFX COMPONENTS ---

const TargetHUD = ({ position, active, color }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.05;
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.1);
    }
  });

  if (!active) return null;

  return (
    <group position={[position[0], 0.2, position[2]]}>
      <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.5, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.2, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

const Shockwave = ({ position, active, color }) => {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useFrame((state, delta) => {
    if (active && opacity > 0) {
      setScale(s => s + delta * 25);
      setOpacity(o => Math.max(0, o - delta * 2.5));
    }
  });

  if (!active || opacity <= 0) return null;

  return (
    <mesh position={[position[0], 0.1, position[2]]} rotation={[-Math.PI / 2, 0, 0]} scale={[scale, scale, 1]}>
      <ringGeometry args={[0.95, 1, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

const Asteroid = ({ position, color, trigger, onImpact }) => {
  const rigidBody = useRef();
  const [active, setActive] = useState(false);
  const [impacted, setImpacted] = useState(false);

  useEffect(() => {
    if (trigger && !active) setActive(true);
  }, [trigger]);

  useFrame(() => {
    if (active && rigidBody.current && !impacted) {
      const pos = rigidBody.current.translation();
      if (pos.y < 1.5 && !impacted) {
        setImpacted(true);
        if (onImpact) onImpact();
      }
    }
  });

  if (!active) return null;

  return (
    <RigidBody ref={rigidBody} position={[position[0], position[1] + 40, position[2]]} colliders="ball" restitution={0} friction={1} linearVelocity={[0, -60, 0]}>
      <mesh castShadow>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} toneMapped={false} />
      </mesh>
      <Sparkles count={50} scale={2} size={4} color={color} speed={4} />
      <Trail width={5} length={10} color={color} attenuation={(t) => t * t}>
         <mesh position={[0, 2, 0]} />
      </Trail>
    </RigidBody>
  );
};

// --- DYNAMIC INFRASTRUCTURE ---

const DestructibleMonument = ({ position, color, impacted }) => {
  const blocks = useMemo(() => {
    const b = [];
    for (let i = 0; i < 5; i++) {
        b.push({ pos: [position[0], i * 4 + 2, position[2]], size: [6 - i, 4, 6 - i], mass: 2 - (i * 0.2) });
    }
    return b;
  }, [position]);

  return (
    <group>
      {blocks.map((block, i) => (
        <RigidBody key={i} position={block.pos} colliders="cuboid" mass={block.mass} friction={1}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={block.size} />
            <meshStandardMaterial color={impacted ? "#e5e5e5" : "#fff"} roughness={0.1} metalness={0.05} />
            <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(...block.size)]} />
                <lineBasicMaterial attach="material" color={color} transparent opacity={0.4} />
            </lineSegments>
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
};

const BackgroundCity = () => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const startZ = 20;
  const endZ = -350;

  useEffect(() => {
    if (meshRef.current) {
        for (let i = 0; i < 600; i++) {
            const z = startZ - Math.random() * Math.abs(endZ - startZ);
            const curveX = Math.sin((z - startZ) * 0.03) * 16;
            const x = curveX + (Math.random() > 0.5 ? 40 + Math.random() * 120 : -40 - Math.random() * 120);
            const h = 5 + Math.random() * 90;
            dummy.position.set(x, h/2, z); dummy.scale.set(6, h, 6);
            dummy.updateMatrix(); meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, 600]} receiveShadow castShadow opacity={0.8}>
      <boxGeometry />
      <meshStandardMaterial color="#ffffff" roughness={0.8} />
    </instancedMesh>
  );
};

const CityScene = () => {
  const scroll = useScroll();
  const { camera } = useThree();
  const [events, setEvents] = useState([{ trigger: false, impact: false }, { trigger: false, impact: false }, { trigger: false, impact: false }, { trigger: false, impact: false }]);

  const startZ = 20;
  const endZ = -320; 

  useFrame((state, delta) => {
    const targetZ = THREE.MathUtils.lerp(startZ, endZ, scroll.offset);
    const curveX = Math.sin((targetZ - startZ) * 0.03) * 16;
    const introProgress = THREE.MathUtils.clamp(scroll.offset / 0.1, 0, 1);
    const targetY = THREE.MathUtils.lerp(18, 5, introProgress);

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, curveX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);

    const lookAheadZ = targetZ - 20;
    const targetLookAt = new THREE.Vector3(Math.sin((lookAheadZ - startZ) * 0.03) * 16, 5, lookAheadZ);
    camera.quaternion.slerp(new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(camera.position, targetLookAt, camera.up)), 0.05);

    const updated = [...events];
    let changed = false;
    servicesContent.forEach((_, i) => {
        const triggerPoint = (i + 1) / 10;
        if (scroll.offset > triggerPoint && !updated[i].trigger) { updated[i].trigger = true; changed = true; }
    });
    if (changed) setEvents(updated);
  });

  return (
    <Physics gravity={[0, -50, 0]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[100, 100, 50]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <RigidBody type="fixed">
        <mesh receiveShadow position={[0, -0.5, -150]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1200, 1200]} />
          <meshStandardMaterial color="#fafafa" />
        </mesh>
      </RigidBody>
      <BackgroundCity />
      {servicesContent.map((service, i) => {
          const zPos = startZ - 50 - (i * 70);
          const xPos = Math.sin((zPos - startZ) * 0.03) * 16 + (i % 2 === 0 ? -18 : 18);
          return (
            <group key={i}>
              <TargetHUD position={[xPos, 0, zPos]} active={events[i].trigger && !events[i].impact} color={service.color} />
              <Shockwave position={[xPos, 0, zPos]} active={events[i].impact} color={service.color} />
              <DestructibleMonument position={[xPos, 0, zPos]} color={service.color} impacted={events[i].impact} />
              <Asteroid position={[xPos, 20, zPos]} color={service.color} trigger={events[i].trigger} onImpact={() => { const updated = [...events]; updated[i].impact = true; setEvents(updated); }} />
            </group>
          );
      })}
    </Physics>
  );
};

export default function AgencyScene() {
  return (
    <div className="w-full h-screen bg-[#fafafa] overflow-hidden relative font-sans selection:bg-black selection:text-white">
      <Canvas shadows camera={{ fov: 45 }}>
        <fog attach="fog" args={['#fafafa', 40, 180]} />
        <Suspense fallback={null}>
          <ScrollControls pages={14} damping={0.3} distance={1.2}>
            <CityScene />
            <Grid position={[0, -0.1, -150]} args={[1200, 1200]} cellSize={2} cellThickness={0.5} cellColor="#f3f4f6" sectionSize={10} sectionThickness={1.5} sectionColor="#e5e7eb" fadeDistance={200} />
            <Scroll html style={{ width: '100%', pointerEvents: 'none' }}>
              
              {/* LANDING SECTION */}
              <div className="w-screen h-screen flex flex-col items-center justify-center">
                 <div className="max-w-6xl text-center">
                    <h1 className="text-[14rem] font-black text-black leading-none tracking-tighter mix-blend-multiply opacity-90 select-none">THESSK</h1>
                    <p className="text-2xl font-bold text-gray-400 tracking-[0.5em] uppercase mt-6">Design // Code // Growth</p>
                    <div className="flex gap-24 justify-center mt-24">
                      {stats.map((s, i) => (
                        <div key={i} className="text-center group">
                           <div className="text-7xl font-black text-black group-hover:scale-110 transition-transform duration-500">{s.value}</div>
                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{s.label}</div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

              {/* SERVICE HIGHLIGHTS */}
              {servicesContent.map((service, i) => (
                <div key={i} className={`w-screen h-screen flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'} px-32`}>
                   <div className="max-w-xl p-14 bg-white/20 backdrop-blur-[40px] rounded-[4rem] border border-white/50 shadow-[0_40px_100px_rgba(0,0,0,0.03)] pointer-events-auto transition-all duration-700">
                      <div className="w-16 h-2 mb-10" style={{ backgroundColor: service.color }} />
                      <h3 className="text-6xl font-black mb-6 uppercase tracking-tighter text-black">{service.title}</h3>
                      <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                         {service.details.map((d, j) => (
                           <span key={j} className="px-4 py-2 border border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl">
                              {d}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
              ))}

              <div className="w-screen h-screen" />

              {/* DETAILED "PAGES" SECTION */}
              <div className="w-full bg-white relative z-50 pointer-events-auto border-t border-gray-100">
                 <div className="max-w-7xl mx-auto py-40 px-10">
                    
                    {/* WORK SECTION */}
                    <div className="mb-60">
                       <h2 className="text-8xl font-black text-black tracking-tighter mb-20">SELECTED WORK.</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {projects.map((p, i) => (
                             <div key={i} className="group cursor-pointer">
                                <div className="aspect-[16/10] bg-gray-50 rounded-[3rem] p-12 mb-8 group-hover:bg-gray-100 transition-colors duration-500 flex flex-col justify-end">
                                   <div className="w-20 h-2 bg-black mb-6" />
                                   <h4 className="text-5xl font-black text-black mb-2 uppercase tracking-tighter">{p.name}</h4>
                                   <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{p.type} — {p.tech}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* PROCESS SECTION */}
                    <div className="mb-60">
                       <h2 className="text-8xl font-black text-black tracking-tighter mb-20 text-center">THE APPROACH.</h2>
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                          {processSteps.map((s, i) => (
                             <div key={i} className="text-center">
                                <div className="text-9xl font-black text-gray-50 mb-[-1.5rem] select-none">{s.id}</div>
                                <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter relative z-10">{s.title}</h4>
                                <p className="text-gray-400 font-medium leading-relaxed">{s.desc}</p>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* CONTACT SECTION FIX */}
                    <div className="bg-black text-white rounded-[6rem] p-24 md:p-40 text-center relative overflow-hidden">
                       <h2 className="text-9xl font-black mb-10 tracking-tighter relative z-10">LETS BUILD.</h2>
                       <p className="text-2xl text-gray-500 mb-24 relative z-10 max-w-2xl mx-auto">
                          Ready to deploy? Experience the high-end digital agency of Jaipur.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-24 mb-24 relative z-10 text-left md:text-center items-start">
                          <div className="bg-white/5 p-10 rounded-3xl border border-white/5">
                             <div className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Email Nexus</div>
                             <div className="text-xl md:text-2xl font-black break-all">sourabhsharmakhandal37@gmail.com</div>
                          </div>
                          <div className="bg-white/5 p-10 rounded-3xl border border-white/5">
                             <div className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Communication</div>
                             <div className="text-2xl font-black text-[#00b8ff]">+91 8302648076</div>
                          </div>
                          <div className="bg-white/5 p-10 rounded-3xl border border-white/5">
                             <div className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Operations</div>
                             <div className="text-xs font-black uppercase leading-relaxed tracking-wider">Mangal Vihar, Gokulpura, Jaipur – 302012</div>
                          </div>
                       </div>
                       <a href="mailto:sourabhsharmakhandal37@gmail.com" className="inline-block px-24 py-10 bg-white text-black font-black text-2xl uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform">
                          INITIALIZE
                       </a>
                    </div>

                    <div className="mt-24 text-center text-gray-400 font-bold uppercase text-[10px] tracking-[0.8em]">
                       © THESSK // JAIPUR INDIA 
                    </div>
                 </div>
              </div>

            </Scroll>
            <EffectComposer>
                <Bloom luminanceThreshold={1} intensity={0.5} />
                <Vignette offset={0.1} darkness={0.3} />
            </EffectComposer>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
