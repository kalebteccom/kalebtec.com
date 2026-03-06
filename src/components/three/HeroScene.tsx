'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import FloatingGeometry from './FloatingGeometry'
import ParticleField from './ParticleField'

// Shape configurations for the scene
const SHAPES = [
  {
    position: [-2.8, 1.2, -2] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.55,
    rotationSpeed: [0.003, 0.005, 0.001] as [number, number, number],
    bobSpeed: 0.8,
    bobAmount: 0.2,
    wireframe: true,
    opacity: 0.5,
    emissiveIntensity: 0.6,
  },
  {
    position: [2.5, -0.8, -1.5] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.4,
    rotationSpeed: [0.004, 0.002, 0.006] as [number, number, number],
    bobSpeed: 1.2,
    bobAmount: 0.12,
    wireframe: false,
    opacity: 0.6,
    emissiveIntensity: 0.5,
  },
  {
    position: [3.2, 1.8, -3] as [number, number, number],
    geometryType: 'icosahedron' as const,
    scale: 0.7,
    rotationSpeed: [0.002, 0.004, 0.003] as [number, number, number],
    bobSpeed: 0.6,
    bobAmount: 0.25,
    wireframe: true,
    opacity: 0.35,
    emissiveIntensity: 0.5,
  },
  {
    position: [-3.5, -1.5, -2.5] as [number, number, number],
    geometryType: 'torus' as const,
    scale: 0.35,
    rotationSpeed: [0.005, 0.003, 0.002] as [number, number, number],
    bobSpeed: 1.0,
    bobAmount: 0.18,
    wireframe: false,
    opacity: 0.55,
    emissiveIntensity: 0.4,
  },
  {
    position: [0.8, 2.2, -4] as [number, number, number],
    geometryType: 'dodecahedron' as const,
    scale: 0.5,
    rotationSpeed: [0.002, 0.006, 0.001] as [number, number, number],
    bobSpeed: 0.7,
    bobAmount: 0.15,
    wireframe: true,
    opacity: 0.4,
    emissiveIntensity: 0.7,
  },
  {
    position: [-1.2, -2.0, -1] as [number, number, number],
    geometryType: 'tetrahedron' as const,
    scale: 0.3,
    rotationSpeed: [0.006, 0.004, 0.005] as [number, number, number],
    bobSpeed: 1.4,
    bobAmount: 0.1,
    wireframe: false,
    opacity: 0.65,
    emissiveIntensity: 0.3,
  },
  {
    position: [1.5, 0.5, -2.8] as [number, number, number],
    geometryType: 'box' as const,
    scale: 0.25,
    rotationSpeed: [0.003, 0.007, 0.004] as [number, number, number],
    bobSpeed: 1.1,
    bobAmount: 0.08,
    wireframe: true,
    opacity: 0.45,
    emissiveIntensity: 0.6,
  },
  {
    position: [-0.5, 1.0, -3.5] as [number, number, number],
    geometryType: 'octahedron' as const,
    scale: 0.6,
    rotationSpeed: [0.001, 0.003, 0.005] as [number, number, number],
    bobSpeed: 0.9,
    bobAmount: 0.22,
    wireframe: false,
    opacity: 0.5,
    emissiveIntensity: 0.45,
    color: '#a64dff',
  },
] as const

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#8000FF" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8000FF" distance={20} decay={2} />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a64dff" distance={15} decay={2} />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#ffffff" distance={12} decay={2} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 4, 12]} />

      {/* Floating geometric shapes */}
      {SHAPES.map((shape, index) => (
        <FloatingGeometry
          key={index}
          position={[...shape.position]}
          geometryType={shape.geometryType}
          scale={shape.scale}
          rotationSpeed={[...shape.rotationSpeed]}
          bobSpeed={shape.bobSpeed}
          bobAmount={shape.bobAmount}
          wireframe={shape.wireframe}
          opacity={shape.opacity}
          emissiveIntensity={shape.emissiveIntensity}
          color={'color' in shape ? shape.color : '#8000FF'}
        />
      ))}

      {/* Particle field */}
      <ParticleField count={350} radius={7} size={0.025} />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 20 }}
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
        background: '#0a0a0a',
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
