'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useAtomValue } from 'jotai';
import { resolvedThemeAtom } from '@/lib/theme';
import MeshGradient from './MeshGradient';
import GridFloor from './GridFloor';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

const DARK_BG = '#09090f';
const LIGHT_BG = '#d8d9e4';

// Cyberpunk angular shape configurations
const SHAPES = [
  {
    position: [-3.0, 1.3, -2] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.55,
    rotationSpeed: [0.006, 0.008, 0.003] as [number, number, number],
    bobSpeed: 0.8,
    bobAmount: 0.18,
    opacity: 0.4,
    emissiveIntensity: 0.6,
    color: '#8000FF',
    edgeColor: '#00ffff',
    edgeOpacity: 0.4,
  },
  {
    position: [2.8, -0.6, -1.5] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.4,
    rotationSpeed: [0.007, 0.004, 0.009] as [number, number, number],
    bobSpeed: 1.2,
    bobAmount: 0.12,
    opacity: 0.35,
    emissiveIntensity: 0.5,
    color: '#8000FF',
    edgeColor: '#00ffff',
    edgeOpacity: 0.45,
  },
  {
    position: [3.5, 1.8, -3.5] as [number, number, number],
    geometryType: 'tetrahedron' as const,
    scale: 0.6,
    rotationSpeed: [0.005, 0.007, 0.006] as [number, number, number],
    bobSpeed: 0.6,
    bobAmount: 0.22,
    opacity: 0.3,
    emissiveIntensity: 0.5,
    color: '#6600cc',
    edgeColor: '#00ffff',
    edgeOpacity: 0.35,
  },
  {
    position: [-3.2, -1.3, -2.5] as [number, number, number],
    geometryType: 'cross' as const,
    scale: 0.35,
    rotationSpeed: [0.008, 0.005, 0.004] as [number, number, number],
    bobSpeed: 1.0,
    bobAmount: 0.15,
    opacity: 0.35,
    emissiveIntensity: 0.4,
    color: '#8000FF',
    edgeColor: '#00ffff',
    edgeOpacity: 0.5,
  },
  {
    position: [0.5, 2.0, -4] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.45,
    rotationSpeed: [0.004, 0.009, 0.003] as [number, number, number],
    bobSpeed: 0.7,
    bobAmount: 0.2,
    opacity: 0.25,
    emissiveIntensity: 0.7,
    color: '#5500aa',
    edgeColor: '#00ffff',
    edgeOpacity: 0.3,
  },
  {
    position: [1.5, 0.3, -2.8] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.25,
    rotationSpeed: [0.006, 0.01, 0.007] as [number, number, number],
    bobSpeed: 1.1,
    bobAmount: 0.08,
    opacity: 0.3,
    emissiveIntensity: 0.6,
    color: '#8000FF',
    edgeColor: '#00ffff',
    edgeOpacity: 0.5,
  },
];

/** Syncs the Canvas background and fog color with the current theme */
function ThemeSync({ isDark }: { isDark: boolean }) {
  const { scene, gl } = useThree();

  useEffect(() => {
    const bg = isDark ? DARK_BG : LIGHT_BG;
    gl.setClearColor(bg);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.set(bg);
    }
  }, [isDark, scene, gl]);

  return null;
}

function SceneContent({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ThemeSync isDark={isDark} />

      {/* Layer 1: Mesh gradient background */}
      <MeshGradient isDark={isDark} />

      {/* Layer 2: Perspective grid floor */}
      <GridFloor isDark={isDark} />

      {/* Lighting — adjusted per theme */}
      <ambientLight intensity={isDark ? 0.12 : 0.35} color="#ffffff" />
      <pointLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 0.7}
        color="#8000FF"
        distance={20}
        decay={2}
      />
      <pointLight
        position={[-5, -3, 3]}
        intensity={isDark ? 0.5 : 0.45}
        color="#00ffff"
        distance={15}
        decay={2}
      />
      <pointLight
        position={[0, 0, 5]}
        intensity={isDark ? 0.15 : 0.25}
        color="#ffffff"
        distance={12}
        decay={2}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={[isDark ? DARK_BG : LIGHT_BG, isDark ? 5 : 6, isDark ? 14 : 16]} />

      {/* Layer 3: Floating angular geometry with cyberpunk edge lines — draggable */}
      {SHAPES.map((shape, index) => (
        <FloatingGeometry
          key={index}
          position={[...shape.position]}
          geometryType={shape.geometryType}
          scale={shape.scale}
          rotationSpeed={[...shape.rotationSpeed]}
          bobSpeed={shape.bobSpeed}
          bobAmount={shape.bobAmount}
          opacity={isDark ? shape.opacity : shape.opacity * 0.35}
          emissiveIntensity={isDark ? shape.emissiveIntensity : shape.emissiveIntensity * 0.15}
          color={isDark ? shape.color : '#b080ff'}
          edgeColor={isDark ? shape.edgeColor : '#6b00d6'}
          edgeOpacity={isDark ? shape.edgeOpacity : shape.edgeOpacity * 2.5}
          metalness={isDark ? 0.8 : 0.1}
          roughness={isDark ? 0.7 : 0.3}
          draggable
        />
      ))}

      {/* Layer 4: Cyberpunk square particles */}
      <ParticleField count={200} radius={7} size={0.025} isDark={isDark} />
    </>
  );
}

export default function HeroScene() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom);
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to dark on SSR / before mount
  const themeDark = mounted ? isDark : true;

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 60, near: 0.1, far: 20 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: themeDark ? DARK_BG : LIGHT_BG,
      }}
    >
      <Suspense fallback={null}>
        <SceneContent isDark={themeDark} />
      </Suspense>
    </Canvas>
  );
}
