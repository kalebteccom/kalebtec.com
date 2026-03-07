'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import MeshGradient from './MeshGradient'
import GridFloor from './GridFloor'
import FloatingGeometry from './FloatingGeometry'
import ParticleField from './ParticleField'

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
    rotationSpeed: [0.006, 0.010, 0.007] as [number, number, number],
    bobSpeed: 1.1,
    bobAmount: 0.08,
    opacity: 0.3,
    emissiveIntensity: 0.6,
    color: '#8000FF',
    edgeColor: '#00ffff',
    edgeOpacity: 0.5,
  },
]

function SceneContent() {
  return (
    <>
      {/* Layer 1: Mesh gradient background */}
      <MeshGradient />

      {/* Layer 2: Perspective grid floor */}
      <GridFloor />

      {/* Lighting */}
      <ambientLight intensity={0.12} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8000FF" distance={20} decay={2} />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#00ffff" distance={15} decay={2} />
      <pointLight position={[0, 0, 5]} intensity={0.15} color="#ffffff" distance={12} decay={2} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#09090f', 5, 14]} />

      {/* Layer 3: Floating angular geometry with cyberpunk edge lines */}
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
          emissiveIntensity={shape.emissiveIntensity}
          color={shape.color}
          edgeColor={shape.edgeColor}
          edgeOpacity={shape.edgeOpacity}
        />
      ))}

      {/* Layer 4: Cyberpunk square particles */}
      <ParticleField count={200} radius={7} size={0.025} />
    </>
  )
}

export default function HeroScene() {
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
        background: '#09090f',
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
