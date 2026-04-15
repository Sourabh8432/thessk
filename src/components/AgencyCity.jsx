"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Text, Box, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { services } from '../constants';

// Internal component handling the 3D city and camera scroll logic
const CityScene = () => {
  const scroll = useScroll();
  const cameraGroup = useRef();

  // Z-axis journey limits
  const startZ = 15;
  const endZ = -85; // Length of the city ride

  // Animate Camera based on Scroll
  useFrame((state, delta) => {
    if (cameraGroup.current) {
      // scroll.offset goes from 0 to 1 scaling linearly with HTML scroll page depth
      const targetZ = THREE.MathUtils.lerp(startZ, endZ, scroll.offset);
      
      // Smoothly move the camera forward along the z-axis
      // Add a slight sine wave to Y and X for a floating, vehicular flythrough feel
      const wobbleX = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      const wobbleY = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;

      cameraGroup.current.position.z = THREE.MathUtils.damp(cameraGroup.current.position.z, targetZ, 4, delta);
      cameraGroup.current.position.x = THREE.MathUtils.damp(cameraGroup.current.position.x, wobbleX, 4, delta);
      cameraGroup.current.position.y = THREE.MathUtils.damp(cameraGroup.current.position.y, 2 + wobbleY, 4, delta);
    }
  });

  // Generate 50+ background buildings programmatically
  const backgroundBuildings = useMemo(() => {
    const buildings = [];
    const count = 100; // Dense cyberpunk city
    for (let i = 0; i < count; i++) {
        // Distribute them widely but leave a central gap for the street
        const isLeft = Math.random() > 0.5;
        const xOffset = Math.random() * 40 + 8; // start minimum 8 units away from center
        const x = isLeft ? -xOffset : xOffset;
        const z = startZ + 10 - Math.random() * Math.abs(endZ - startZ - 20); // spread along entire z-axis
        
        const height = Math.random() * 25 + 5; // random heights 5 to 30
        const width = Math.random() * 4 + 2;
        const depth = Math.random() * 4 + 2;
        
        buildings.push({
            position: [x, height / 2, z],
            scale: [width, height, depth],
            baseColor: '#030303', // very dark grey almost black
            edgeColor: ["#bd00ff", "#ff007f", "#00ff41", "#ffaa00"][Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.2 + 0.1
        });
    }
    return buildings;
  }, []);

  return (
    <>
      <group ref={cameraGroup}>
        <perspectiveCamera makeDefault fov={55} near={0.1} far={150} />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 30, 10]} intensity={3} color="#bd00ff" />
      <pointLight position={[0, 5, startZ]} intensity={2} color="#ffffff" distance={30} />
      
      <group>
        {/* Background Cityscape */}
        {backgroundBuildings.map((b, i) => (
          <Box key={`bg-build-${i}`} position={b.position} scale={b.scale}>
            <meshStandardMaterial color={b.baseColor} roughness={0.9} />
            <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial attach="material" color={b.edgeColor} transparent opacity={b.opacity} />
            </lineSegments>
          </Box>
        ))}

        {/* 4 Hero Buildings mapped from services context */}
        {services.map((service, index) => {
            // Space them out 20 units apart down the Z-axis
            const zPosition = startZ - 15 - (index * 20); 
            // Alternate left and right side of the street
            const xPosition = index % 2 === 0 ? -7 : 7;
            
            return (
                <group key={`hero-${index}`} position={[xPosition, 0, zPosition]}>
                    {/* Main Building Structure */}
                    <Box args={[6, 20, 6]} position={[0, 10, 0]}>
                        <meshStandardMaterial color="#020202" roughness={0.1} metalness={0.9} emissive="#000000" />
                        <lineSegments>
                            <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(6, 20, 6)]} />
                            <lineBasicMaterial attach="material" color={service.color} linewidth={3} transparent opacity={0.6} />
                        </lineSegments>
                    </Box>
                    
                    {/* Glowing Inner Core Column */}
                    <Box args={[2, 18, 2]} position={[0, 10, 0]}>
                        <meshBasicMaterial color={service.color} transparent opacity={0.3} toneMapped={false} />
                    </Box>

                    {/* Floating 3D Text Title */}
                    <Text 
                        position={[xPosition > 0 ? -4 : 4, 22, 0]} 
                        fontSize={2} 
                        color="white" 
                        fontWeight="bold"
                        anchorX="center" 
                        anchorY="middle"
                        outlineWidth={0.06}
                        outlineColor={service.color}
                        rotation={[0, xPosition > 0 ? -0.2 : 0.2, 0]}
                    >
                        {service.title}
                    </Text>

                    {/* Aesthetic Number / Floor ID */}
                    <Text 
                        position={[0, 10, xPosition > 0 ? 3.1 : -3.1]} 
                        fontSize={8} 
                        color={service.color} 
                        fillOpacity={0.15}
                        rotation={[0, xPosition > 0 ? 0 : Math.PI, 0]}
                    >
                        {`0${index + 1}`}
                    </Text>
                </group>
            );
        })}
      </group>
    </>
  );
};

export default function AgencyCity() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <Canvas>
        <color attach="background" args={['#010006']} /> // Pitch black with slight purple tint
        
        {/* Deep dark purple fog for massive cyberpunk scale and clipping occlusion */}
        <fog attach="fog" args={['#0c001f', 10, 60]} />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25} distance={1.2}>
            
            <CityScene />

            {/* Glowing Neon Grid Floor down the city street */}
            <Grid 
                position={[0, -0.1, -40]} 
                args={[200, 200]} 
                cellSize={1} 
                cellThickness={0.5} 
                cellColor="#bd00ff" 
                sectionSize={5} 
                sectionThickness={1.5} 
                sectionColor="#7e00ff"
                fadeDistance={80} 
                fadeStrength={1.5} 
            />

            {/* HTML Tailwind Overlay */}
            {/* Using Scroll html makes it scroll 100vh vertically for each 'page' */}
            <Scroll html style={{ width: '100vw' }}>
                
                {/* PAGE 1: Intro sequence */}
                <div className="w-full h-screen flex flex-col items-center justify-center pointer-events-none p-6">
                    <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500 tracking-tighter text-center uppercase" style={{ filter: 'drop-shadow(0 0 20px rgba(189,0,255,0.6))' }}>
                        The<br/>Digital<br/>Grid.
                    </h1>
                    <div className="mt-8 flex items-center justify-center gap-4 bg-black/60 px-8 py-3 rounded-full border border-[#bd00ff]/30 backdrop-blur-md animate-pulse">
                        <span className="w-3 h-3 rounded-full bg-[#bd00ff]"></span>
                        <p className="text-white font-mono uppercase tracking-[0.3em] text-sm">Scroll Sequence to Initiate</p>
                    </div>
                </div>

                {/* PAGE 2: Service 1 */}
                <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 items-center pointer-events-none p-6 md:p-24 relative">
                  <div className="md:col-start-2 bg-black/40 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-3xl ml-auto max-w-xl pointer-events-auto hover:bg-[#bd00ff]/10 hover:border-[#bd00ff]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight" style={{ textShadow: '0 0 15px #bd00ff' }}>Web Engine</h2>
                      <p className="text-gray-400 text-xl font-light mb-10 leading-relaxed">Architecting ultra-fast, high converting physical and virtual digital real estate. Designed strictly for dominance inside the grid.</p>
                      <button className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]">Connect Module</button>
                  </div>
                </div>

                {/* PAGE 3: Service 2 */}
                <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 items-center pointer-events-none p-6 md:p-24">
                  <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-3xl max-w-xl pointer-events-auto hover:bg-[#ff007f]/10 hover:border-[#ff007f]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight" style={{ textShadow: '0 0 15px #ff007f' }}>App Protocols</h2>
                      <p className="text-gray-400 text-xl font-light mb-10 leading-relaxed">Deploying cutting edge native applications optimized for engagement and unprecedented user retention rates in mobile ecosystems.</p>
                      <button className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]">Connect Module</button>
                  </div>
                </div>

                {/* PAGE 4: Service 3 */}
                <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 items-center pointer-events-none p-6 md:p-24 relative">
                  <div className="md:col-start-2 bg-black/40 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-3xl ml-auto max-w-xl pointer-events-auto hover:bg-[#ffaa00]/10 hover:border-[#ffaa00]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight" style={{ textShadow: '0 0 15px #ffaa00' }}>Marketing Matrix</h2>
                      <p className="text-gray-400 text-xl font-light mb-10 leading-relaxed">Infiltrating market limits. Data-driven growth frameworks that compound automated leads into relentless scaling revenue.</p>
                      <button className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]">Connect Module</button>
                  </div>
                </div>

                {/* PAGE 5: Outro / Contact */}
                <div className="w-full h-screen flex flex-col items-center justify-center pointer-events-none p-6">
                    <div className="bg-black/60 backdrop-blur-3xl border border-[#00ff41]/20 p-12 md:p-24 rounded-[3rem] text-center pointer-events-auto shadow-[0_0_80px_rgba(0,255,65,0.1)] hover:border-[#00ff41]/50 transition-colors duration-700">
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase" style={{ textShadow: '0 0 40px #00ff41' }}>Link Configured</h2>
                        <p className="text-white/60 text-xl md:text-2xl font-light mb-12">System sequence complete. Ready to establish your future presence.</p>
                        <a href="mailto:contact@thessk.com" className="inline-block px-12 py-6 bg-linear-to-r from-[#00ff41] to-[#00a82a] text-black text-xl font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,65,0.6)] transition-all duration-300">
                            Initialize Comms
                        </a>
                    </div>
                </div>

            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Absolute Header overlay outside canvas */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between pointer-events-none mix-blend-difference">
          <div className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-1 pointer-events-auto">
              thessk<span className="w-3 h-3 block rounded-full bg-white animate-pulse"></span>
          </div>
          <div className="text-xs text-white/50 tracking-[0.3em] font-mono pointer-events-auto uppercase">
              V_0.1 // CYBER_GRID
          </div>
      </nav>
    </div>
  );
}
