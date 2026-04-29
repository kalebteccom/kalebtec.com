'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useAtomValue } from 'jotai';
import { resolvedThemeAtom } from '@/lib/theme';
import MeshGradient from './MeshGradient';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

const DARK_BG = '#080f11';
const LIGHT_BG = '#e5e4d8';

// Monochrome ambient geometry — slow, matte, near-invisible.
// Roles as quiet texture, not focal art.
const SHAPES = [
  {
    position: [-3.0, 1.3, -2] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.55,
    rotationSpeed: [0.0024, 0.0032, 0.0012] as [number, number, number],
    bobSpeed: 0.4,
    bobAmount: 0.18,
    opacity: 0.18,
  },
  {
    position: [2.8, -0.6, -1.5] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.4,
    rotationSpeed: [0.0028, 0.0016, 0.0036] as [number, number, number],
    bobSpeed: 0.5,
    bobAmount: 0.12,
    opacity: 0.16,
  },
  {
    position: [3.5, 1.8, -3.5] as [number, number, number],
    geometryType: 'tetrahedron' as const,
    scale: 0.6,
    rotationSpeed: [0.002, 0.0028, 0.0024] as [number, number, number],
    bobSpeed: 0.3,
    bobAmount: 0.22,
    opacity: 0.14,
  },
  {
    position: [-3.2, -1.3, -2.5] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.35,
    rotationSpeed: [0.0032, 0.002, 0.0016] as [number, number, number],
    bobSpeed: 0.4,
    bobAmount: 0.15,
    opacity: 0.16,
  },
  {
    position: [0.5, 2.0, -4] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.45,
    rotationSpeed: [0.0016, 0.0036, 0.0012] as [number, number, number],
    bobSpeed: 0.35,
    bobAmount: 0.2,
    opacity: 0.12,
  },
  {
    position: [1.5, 0.3, -2.8] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.25,
    rotationSpeed: [0.0024, 0.004, 0.0028] as [number, number, number],
    bobSpeed: 0.45,
    bobAmount: 0.08,
    opacity: 0.16,
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
  // Geometry tone: ink on light theme, paper on dark theme.
  const surfaceColor = isDark ? '#f1f0e4' : '#080f11';
  // Edges: brand purple — subtle but adds chromaticity
  const edgeColor = '#8000FF';

  return (
    <>
      <ThemeSync isDark={isDark} />

      {/* Layer 1: Mesh gradient background — cream/ink with soft brand-purple wash */}
      <MeshGradient isDark={isDark} />

      {/* Lighting — neutral ambient + soft brand-tinted accent for chromatic life */}
      <ambientLight intensity={isDark ? 0.42 : 0.58} color="#ffffff" />
      <directionalLight
        position={[3, 4, 5]}
        intensity={isDark ? 0.35 : 0.4}
        color="#ffffff"
      />
      <pointLight
        position={[4, 2, 3]}
        intensity={isDark ? 0.45 : 0.3}
        color="#8000FF"
        distance={14}
        decay={2}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={[isDark ? DARK_BG : LIGHT_BG, isDark ? 5 : 6, isDark ? 14 : 16]} />

      {/* Floating geometry — matte with brand-purple edges */}
      {SHAPES.map((shape, index) => (
        <FloatingGeometry
          key={index}
          position={[...shape.position]}
          geometryType={shape.geometryType}
          scale={shape.scale}
          rotationSpeed={[...shape.rotationSpeed]}
          bobSpeed={shape.bobSpeed}
          bobAmount={shape.bobAmount}
          opacity={shape.opacity}
          emissiveIntensity={isDark ? 0.15 : 0}
          color={surfaceColor}
          edgeColor={edgeColor}
          edgeOpacity={isDark ? 0.5 : 0.42}
          metalness={0.05}
          roughness={0.95}
          draggable
        />
      ))}

      {/* Particle field — monochrome, low opacity, normal blending */}
      <ParticleField count={140} radius={7} size={0.018} isDark={isDark} />
    </>
  );
}

export default function HeroScene() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom);
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to light on SSR / before mount (matches NR's primary cream theme)
  const themeDark = mounted ? isDark : false;

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 60, near: 0.1, far: 20 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
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
