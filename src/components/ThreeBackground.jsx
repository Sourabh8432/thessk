"use client";

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

import { servicesContent, stats } from '@/src/constants/content';

// Re-export for backward compat
export { servicesContent, stats };

const AdvancedCity = () => {
  const meshBasesRef  = useRef();
  const meshTowersRef = useRef();
  const meshGlassRef  = useRef();
  const dummy         = useMemo(() => new THREE.Object3D(), []);
  const { size }      = useThree();

  const isMobile = size.width < 768;
  const BUILDING_COUNT = isMobile ? 100 : 180; 
  const START_Z        = 40;
  const END_Z          = -6000;

  const cityData = useMemo(() => {
    const data = [];
    const rng = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const z     = START_Z - Math.random() * (START_Z - END_Z);
      const side  = Math.random() > 0.5 ? 1 : -1;
      const x     = side * (rng(isMobile ? 25 : 35, isMobile ? 120 : 200));
      const w     = rng(isMobile ? 18 : 25, isMobile ? 32 : 45);
      const d     = rng(isMobile ? 18 : 25, isMobile ? 32 : 45);
      const h     = rng(isMobile ? 60 : 80, isMobile ? 240 : 320);
      const color = Math.random() > 0.8 ? "#ffd8b1" : "#f8fafc"; 
      data.push({ x, z, w, d, h, color });
    }
    return data;
  }, [BUILDING_COUNT, isMobile]);

  useEffect(() => {
    if (!meshBasesRef.current || !meshTowersRef.current || !meshGlassRef.current) return;
    cityData.forEach((b, i) => {
      const col = new THREE.Color(b.color);
      dummy.position.set(b.x, (25 / 2) - 0.55, b.z);
      dummy.scale.set(b.w, 25, b.d);
      dummy.updateMatrix();
      meshBasesRef.current.setMatrixAt(i, dummy.matrix);
      meshBasesRef.current.setColorAt(i, col);
      const towerH = b.h;
      dummy.position.set(b.x, (towerH / 2) - 0.55, b.z);
      dummy.scale.set(b.w * 0.85, towerH, b.d * 0.85);
      dummy.updateMatrix();
      meshTowersRef.current.setMatrixAt(i, dummy.matrix);
      meshTowersRef.current.setColorAt(i, col);
      const glassH = b.h * 0.92;
      dummy.position.set(b.x, (glassH / 2) - 0.55, b.z);
      dummy.scale.set(b.w * 0.88, glassH, b.d * 0.88);
      dummy.updateMatrix();
      meshGlassRef.current.setMatrixAt(i, dummy.matrix);
      meshGlassRef.current.setColorAt(i, new THREE.Color(b.color).multiplyScalar(1.1));
    });
    [meshBasesRef, meshTowersRef, meshGlassRef].forEach(ref => {
      ref.current.instanceMatrix.needsUpdate = true;
      ref.current.instanceColor.needsUpdate = true;
    });
  }, [dummy, cityData]);

  const archMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      roughness: 0.2, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.05, color: "#f8fafc", emissive: "#ffffff", emissiveIntensity: 0.015, transparent: true
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime   = { value: 0 }; 
      shader.uniforms.uRise   = { value: 0 };
      shader.uniforms.uFinale = { value: 0 };
      
      shader.vertexShader = shader.vertexShader
        .replace(`#include <common>`, `#include <common>
          uniform float uRise;
          varying float vCustomY;
          varying vec2 vCustomUv;
        `)
        .replace(`#include <begin_vertex>`, `#include <begin_vertex>
          vCustomUv = uv;
          float instanceZ = instanceMatrix[3][2];
          float stagger = clamp(uRise * 1.5 + (instanceZ / 6000.0), 0.0, 1.0);
          transformed.y *= stagger;
          vCustomY = position.y;
        `);

      shader.fragmentShader = shader.fragmentShader
        .replace(`#include <common>`, `#include <common>
          uniform float uTime;
          uniform float uFinale;
          varying float vCustomY;
          varying vec2 vCustomUv;
        `)
        .replace(`#include <color_fragment>`, `
          #include <color_fragment> 
          vec2 grid = vCustomUv * vec2(4.0, 24.0);
          vec2 f = fract(grid);
          float window = smoothstep(0.12, 0.15, f.x) * smoothstep(0.88, 0.85, f.x) *
                         smoothstep(0.12, 0.15, f.y) * smoothstep(0.88, 0.85, f.y);
          float noise = fract(sin(dot(floor(grid), vec2(12.9898, 78.233))) * 43758.5453);
          float blink = step(0.96, fract(noise + uTime * 0.04));
          vec3 windowColor = vec3(1.0, 0.98, 0.92); 
          diffuseColor.rgb = mix(diffuseColor.rgb, windowColor, window * blink * 0.25);
          float edge = 1.0 - pow(abs(dot(normalize(vViewPosition), vec3(0,0,1))), 3.0);
          diffuseColor.rgb += vec3(1.0) * edge * 0.08;
        `)
        .replace(`#include <opaque_fragment>`, `
          #include <opaque_fragment>
          gl_FragColor.a *= (1.0 - uFinale);
        `);
      mat.userData.shader = shader;
    };
    return mat;
  }, []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    roughness: 0.01, metalness: 0.2, transmission: 0.05, thickness: 2.0, transparent: true, opacity: 0.7, color: "#ffffff", clearcoat: 1.0
  }), []);

  useFrame((state) => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const finale = Math.max(0, (scrollProgress - 0.48) * 10); // Starts at 48%, full wash at 58%
    
    if (archMaterial.userData.shader) {
      archMaterial.userData.shader.uniforms.uTime.value   = state.clock.getElapsedTime();
      archMaterial.userData.shader.uniforms.uRise.value   = THREE.MathUtils.lerp(archMaterial.userData.shader.uniforms.uRise.value, 1, 0.03);
      archMaterial.userData.shader.uniforms.uFinale.value = finale;
    }
    glassMaterial.opacity = 0.7 * (1.0 - finale);
  });

  const boxGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  return (
    <>
      <instancedMesh ref={meshBasesRef} args={[boxGeo, archMaterial, BUILDING_COUNT]} castShadow receiveShadow frustumCulled={false} />
      <instancedMesh ref={meshTowersRef} args={[boxGeo, archMaterial, BUILDING_COUNT]} castShadow receiveShadow frustumCulled={false} />
      <instancedMesh ref={meshGlassRef} args={[boxGeo, glassMaterial, BUILDING_COUNT]} receiveShadow frustumCulled={false} />
    </>
  );
};

const Ground = () => {
  const meshRef = useRef();
  useFrame(() => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const finale = Math.max(0, (scrollProgress - 0.48) * 10);
    if (meshRef.current) meshRef.current.material.opacity = 1.0 - finale;
  });
  return (
    <>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -3000]} receiveShadow>
        <planeGeometry args={[15000, 20000]} /><meshStandardMaterial color="#ffffff" roughness={0.02} metalness={0.02} transparent />
      </mesh>
      <ContactShadows position={[0, -0.48, 0]} opacity={0.18} scale={3000} blur={2.5} far={20} color="#000000" />
    </>
  );
};

const FinaleShards = () => {
  const meshRef = useRef();
  const shards  = useMemo(() => {
    const data = [];
    for (let i = 0; i < 800; i++) {
      data.push({
        x: (Math.random() - 0.5) * 800,
        y: Math.random() * 800 + 400,
        z: -Math.random() * 2000 - 500,
        rot: Math.random() * Math.PI,
        speed: 10 + Math.random() * 30,
        spin: (Math.random() - 0.5) * 0.2,
        color: Math.random() > 0.8 ? "#ffd8b1" : "#ffffff"
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mat   = useMemo(() => new THREE.MeshPhysicalMaterial({ metalness: 0.9, roughness: 0.05, clearcoat: 1.0, transparent: true }), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const finale = Math.max(0, (progress - 0.53) * 20); // Quick ramp up at 53%
    
    mat.opacity = finale > 0 ? Math.min(1.0, finale * 2.0) : 0;
    
    shards.forEach((s, i) => {
      // Shards fall based on finale progress + individual offset
      const fallY = s.y - (finale * s.speed * 40);
      dummy.position.set(s.x, fallY, s.z);
      dummy.rotation.set(s.rot + finale * s.spin * 50, s.rot, s.rot);
      dummy.scale.set(0.5, 4.0, 0.5); // Slivers
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(s.color));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  const shardGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  return <instancedMesh ref={meshRef} args={[shardGeo, mat, 800]} frustumCulled={false} />;
};

const CameraRig = () => {
  const { camera, size } = useThree();
  const scrollRef = useRef(0);
  const isMobile = size.width < 768;

  const START_Z = 40;
  const END_Z   = -5500; 

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      scrollRef.current = progress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    const t = scrollRef.current;
    const finaleProgress = Math.max(0, (t - 0.48) * 10);
    const breakMoment    = Math.max(0, (t - 0.53) * 20); // Sharper "hit"

    const targetZ = THREE.MathUtils.lerp(START_Z, END_Z, t) - (finaleProgress * 800);
    const curveX  = (Math.sin(t * Math.PI * 2) * (isMobile ? 15 : 35)) + (Math.cos(t * Math.PI * 1.5) * (isMobile ? 5 : 15));
    const targetY = (isMobile ? 2.5 : 2.2) + Math.sin(t * Math.PI * 2.5) * (isMobile ? 0.8 : 1.0) + (finaleProgress * 15); 

    // SHAKE EFFECT
    const shake = Math.sin(state.clock.elapsedTime * 60) * breakMoment * (isMobile ? 0.2 : 0.4);

    const smoothFactor = isMobile ? 5.0 : 4.2; 
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, smoothFactor, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, curveX + shake,  smoothFactor, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + shake, smoothFactor, delta);
    
    const lookAtPos = new THREE.Vector3(curveX * 0.25, (isMobile ? 3.5 : 4.0) + (finaleProgress * 10), camera.position.z - (isMobile ? 300 : 500));
    camera.lookAt(lookAtPos);
    
    const tilt = (camera.position.x - curveX) * (isMobile ? 0.02 : 0.04);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, tilt, smoothFactor, delta);
  });

  return null;
};

const World = () => {
  const { size, scene } = useThree();
  const isMobile = size.width < 768;

  useFrame(() => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const finale = Math.max(0, (scrollProgress - 0.48) * 10);
    
    if (scene.fog) {
      scene.fog.far = THREE.MathUtils.lerp(7000, 50, finale);
    }
  });

  return (
  <>
    <ambientLight intensity={1.1} /><pointLight position={[100, 500, 100]} intensity={3.0} />
    <directionalLight 
      position={[60, 400, 200]} 
      intensity={3.5} 
      color="#ffffff" 
      castShadow 
      shadow-mapSize={[isMobile ? 512 : 2048, isMobile ? 512 : 2048]} 
      shadow-camera-left={-2500} 
      shadow-camera-right={2500} 
      shadow-camera-top={2500} 
      shadow-camera-bottom={-2500} 
      shadow-camera-far={7500} 
    />
    <Ground /><AdvancedCity /><FinaleShards />
    <Sparkles count={isMobile ? 100 : 250} scale={[isMobile ? 1000 : 2000, 400, isMobile ? 1000 : 2000]} position={[0, 120, -1000]} size={isMobile ? 0.6 : 0.8} speed={0.03} opacity={0.15 * (1.0 - (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) > 0.46 ? 1 : 0))} color="#fff" /><CameraRig />
    <EffectComposer disableNormalPass><Noise opacity={isMobile ? 0.003 : 0.005} /></EffectComposer>
  </>
  );
};

export default function ThreeBackground() {
  const vignetteRef = useRef(null);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (vignetteRef.current) {
        const finaleState = Math.max(0, (progress - 0.45) * 8); // Start bloom at 45%
        const opacity = Math.min(1.0, 0.6 - progress * 2.5 + (finaleState * 1.5));
        const blur = Math.max(0, 5 - progress * 100 + (finaleState * 15)); 
        
        vignetteRef.current.style.opacity = opacity;
        vignetteRef.current.style.backdropFilter = `blur(${blur}px)`;
        vignetteRef.current.style.background = `radial-gradient(circle at center, transparent ${45 - finaleState * 45}%, rgba(255,255,255,${0.6 + finaleState * 0.4}) 100%)`;
        vignetteRef.current.style.transform = `scale(${1 + progress * 0.4})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fov = windowWidth < 768 ? 55 : (windowWidth < 1200 ? 48 : 40);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas 
        shadows={{ type: THREE.VSMShadowMap }} 
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance', 
          alpha: false, 
          stencil: false, 
          depth: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.05 
        }} 
        dpr={windowWidth < 768 ? 1 : [1, 1.5]}
      >
        <color attach="background" args={['#ffffff']} /><fog attach="fog" args={['#ffffff', 50, 7000]} />
        <PerspectiveCamera makeDefault fov={fov} near={0.5} far={22000} position={[0, 10, 60]} />
        <Suspense fallback={null}><World /></Suspense>
      </Canvas>
      <div ref={vignetteRef} style={{ opacity: 0.6, transform: 'scale(1)', background: 'radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.6) 100%)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', transition: 'opacity 0.2s linear' }} className="absolute inset-0 z-[100] pointer-events-none" />
    </div>
  );
}
