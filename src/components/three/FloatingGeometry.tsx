'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type GeometryType = 'box' | 'octahedron' | 'torus' | 'icosahedron' | 'dodecahedron' | 'tetrahedron'

interface FloatingGeometryProps {
  position: [number, number, number]
  geometryType: GeometryType
  scale?: number
  rotationSpeed?: [number, number, number]
  bobSpeed?: number
  bobAmount?: number
  wireframe?: boolean
  opacity?: number
  emissiveIntensity?: number
  color?: string
}

export default function FloatingGeometry({
  position,
  geometryType,
  scale = 1,
  rotationSpeed = [0.003, 0.005, 0.002],
  bobSpeed = 1,
  bobAmount = 0.15,
  wireframe = false,
  opacity = 0.7,
  emissiveIntensity = 0.4,
  color = '#8000FF',
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mounted, setMounted] = useState(false)
  const initialY = position[1]
  const timeOffset = useRef(Math.random() * Math.PI * 2)

  // Entrance animation state
  const entranceProgress = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return

    // Entrance animation: scale in over ~1.5 seconds
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + 0.012)
      const eased = easeOutCubic(entranceProgress.current)
      meshRef.current.scale.setScalar(scale * eased)

      if (!mounted && entranceProgress.current >= 1) {
        setMounted(true)
      }
    }

    const time = state.clock.elapsedTime

    // Rotation
    meshRef.current.rotation.x += rotationSpeed[0]
    meshRef.current.rotation.y += rotationSpeed[1]
    meshRef.current.rotation.z += rotationSpeed[2]

    // Bobbing with sine wave
    meshRef.current.position.y =
      initialY + Math.sin(time * bobSpeed + timeOffset.current) * bobAmount

    // Subtle horizontal drift
    meshRef.current.position.x =
      position[0] + Math.sin(time * 0.3 + timeOffset.current) * 0.05

    // Mouse parallax — gentle drift toward mouse
    const mouseX = state.pointer.x * 0.15
    const mouseY = state.pointer.y * 0.1
    meshRef.current.position.x += mouseX * (1 + position[2] * 0.1)
    meshRef.current.position.y += mouseY * (1 + position[2] * 0.1)
  })

  const renderGeometry = () => {
    switch (geometryType) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.35, 16, 32]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />
      default:
        return <octahedronGeometry args={[1, 0]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} scale={0}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        wireframe={wireframe}
        transparent
        opacity={opacity}
        roughness={0.3}
        metalness={0.6}
        side={wireframe ? THREE.DoubleSide : THREE.FrontSide}
      />
    </mesh>
  )
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
